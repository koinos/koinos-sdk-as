import { Arrays, Base58, MockVM, StringBytes, System } from "../assembly";
import { chain, protocol, authority, system_calls } from '@koinos/proto-as';


const mockAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
const mockAccount2 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
const mockId = StringBytes.stringToBytes("0x12345");

describe('MockVM', () => {

  it('should get the chain id', () => {
    const chainId = mockAccount;

    MockVM.setChainId(chainId);

    expect(Arrays.equal(System.getChainId(), chainId)).toBe(true);
  });

  it('should set the contract arguments', () => {
    const setEntryPoint = 0xc3ab8ff1;
    MockVM.setEntryPoint(0xc3ab8ff1);
    MockVM.setContractArguments(mockAccount);

    const getContractArgs = System.getArguments();

    expect(Arrays.equal(getContractArgs.args, mockAccount)).toBe(true);
    expect(getContractArgs.entry_point).toBe(setEntryPoint);
  });

  it('should set the contract id', () => {
    MockVM.setContractId(mockAccount);

    const getContractId = System.getContractId();

    expect(Arrays.equal(getContractId, mockAccount)).toBe(true);
  });

  it('should set the head info', () => {
    const setHeadInfo = new chain.head_info();
    setHeadInfo.head_block_time = 123456789;
    setHeadInfo.last_irreversible_block = 3;

    MockVM.setHeadInfo(setHeadInfo);

    const getHeadInfo = System.getHeadInfo();

    expect(getHeadInfo.head_block_time).toBe(setHeadInfo.head_block_time);
    expect(getHeadInfo.last_irreversible_block).toBe(setHeadInfo.last_irreversible_block);
  });

  it('should set the last irreversible block', () => {
    const setLastIrreversibleBlock = 987654321;
    MockVM.setLastIrreversibleBlock(setLastIrreversibleBlock);

    const getLastIrreversibleBlock = System.getLastIrreversibleBlock();

    expect(getLastIrreversibleBlock).toBe(setLastIrreversibleBlock);
  });

  it('should set the caller', () => {
    const setCallerData = new chain.caller_data(mockAccount, chain.privilege.user_mode);

    MockVM.setCaller(setCallerData);

    const getCallerData = System.getCaller();

    expect(getCallerData.caller_privilege).toBe(setCallerData.caller_privilege);
    expect(Arrays.equal(getCallerData.caller, mockAccount)).toBe(true);
  });

  it('should set the transaction', () => {
    let setTransaction = new protocol.transaction(mockId);

    MockVM.setTransaction(setTransaction);

    const getTransaction = System.getTransaction();

    expect(Arrays.equal(getTransaction.id, setTransaction.id)).toBe(true);
  });

  it('should set the operation', () => {
    let setOperation = new protocol.operation();
    setOperation.set_system_contract = new protocol.set_system_contract_operation(mockAccount, true);

    MockVM.setOperation(setOperation);

    const getOperation = System.getOperation();

    expect(Arrays.equal(getOperation.set_system_contract!.contract_id, setOperation.set_system_contract!.contract_id)).toBe(true);
    expect(getOperation.set_system_contract!.system_contract).toBe(true);
  });

  it('should set the block', () => {
    let setBlock = new protocol.block(mockId);

    MockVM.setBlock(setBlock);

    const getBlock = System.getBlock();

    expect(Arrays.equal(getBlock.id, setBlock.id)).toBe(true);
  });

  it('should set the authorities', () => {
    const auth1 = new MockVM.MockAuthority(authority.authorization_type.contract_call, mockAccount, true);
    const auth2 = new MockVM.MockAuthority(authority.authorization_type.contract_upload, mockAccount, false);
    const auth3 = new MockVM.MockAuthority(authority.authorization_type.contract_upload, mockAccount2, true);

    MockVM.setAuthorities([auth1, auth2, auth3]);

    // the System.requireAuthority that will fail will revert the database's VM, so we need to commit the transaction
    // this will backup the database
    MockVM.commitTransaction();

    expect(System.checkAuthority(authority.authorization_type.contract_call, mockAccount)).toBe(true);
    expect(System.checkAuthority(authority.authorization_type.contract_upload, mockAccount2)).toBe(true);
    expect(System.checkAuthority(authority.authorization_type.contract_upload, mockAccount)).toBe(false);
    expect(System.checkAuthority(authority.authorization_type.transaction_application, mockAccount)).toBe(false);
  });

  it('should set the call contract results', () => {
    const callRes1 = mockAccount;
    const callRes2 = mockAccount2;

    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(callRes1)),
      new system_calls.exit_arguments(0, new chain.result(callRes2))
    ]);

    let callRes = System.call(mockAccount, 1, new Uint8Array(0));

    expect(callRes).not.toBeNull();
    expect(Arrays.equal(callRes.res.object, mockAccount)).toBe(true);

    callRes = System.call(mockAccount, 1, new Uint8Array(0));
    expect(callRes).not.toBeNull();
    expect(Arrays.equal(callRes.res.object, mockAccount2)).toBe(true);
  });

  it('should reset the MockVM database', () => {
    const space = new chain.object_space(false, mockAccount, 0);
    const val = StringBytes.stringToBytes('value1');
    System.putBytes(space, 'key1', val);

    let bytes = System.getBytes(space, 'key1');

    expect(bytes).not.toBeNull();
    expect(Arrays.equal(bytes, val)).toBe(true);

    MockVM.reset();

    bytes = System.getBytes(space, 'key1');
    expect(bytes).toBeNull();
  });

  it('should handle transactions', () => {
    const space = new chain.object_space(false, mockAccount, 0);
    const val1 = StringBytes.stringToBytes('value1');
    const val2 = StringBytes.stringToBytes('value1');
    System.putBytes(space, 'key1', val1);

    let bytes = System.getBytes(space, 'key1');

    expect(bytes).not.toBeNull();
    expect(Arrays.equal(bytes, val1)).toBe(true);

    MockVM.commitTransaction();

    System.putBytes(space, 'key1', val2);

    MockVM.rollbackTransaction();

    bytes = System.getBytes(space, 'key1');

    expect(bytes).not.toBeNull();
    expect(Arrays.equal(bytes, val1)).toBe(true);

    MockVM.commitTransaction();

    System.putBytes(space, 'key1', val2);

    MockVM.commitTransaction();

    System.putBytes(space, 'key1', val1);

    MockVM.rollbackTransaction();

    bytes = System.getBytes(space, 'key1');

    expect(bytes).not.toBeNull();
    expect(Arrays.equal(bytes, val2)).toBe(true);

  });

  it("should handle logs", () => {
    System.log("log 1");
    expect(MockVM.getLogs()).toStrictEqual(["log 1"]);
    System.log("log 2");
    expect(MockVM.getLogs()).toStrictEqual(["log 1", "log 2"]);
    MockVM.clearLogs();
    System.log("log 3");
    expect(MockVM.getLogs()).toStrictEqual(["log 3"]);
  });

  it("should handle error messages", () => {
    const message = "my message";
    System.putBytes(MockVM.METADATA_SPACE, 'error_message', StringBytes.stringToBytes(message));

    expect(MockVM.getErrorMessage()).toBe(message);
  });

  it("should set verify vrf proof results", () => {
    MockVM.setVerifyVRFProofResults([false, true]);

    expect(System.verifyVRFProof(new Uint8Array(0), new Uint8Array(0), new Uint8Array(0), new Uint8Array(0))).toBe(false);
    expect(System.verifyVRFProof(new Uint8Array(0), new Uint8Array(0), new Uint8Array(0), new Uint8Array(0))).toBe(true);
  });

  it("should set system authority", () => {
    expect(System.checkSystemAuthority()).toBe(false);

    MockVM.setSystemAuthority(true);

    expect(System.checkSystemAuthority()).toBe(true);
  });
});

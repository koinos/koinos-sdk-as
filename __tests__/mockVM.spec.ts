import { Arrays, Base58, MockVM, StringBytes, System } from "../assembly";
import { chain, protocol, authority } from 'koinos-proto-as';


const mockAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
const mockAccount2 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
const mockId = StringBytes.stringToBytes("0x12345");

describe('MockVM', () => {
  it('should set the entry point', () => {
    const setEntryPoint = 0xc3ab8ff1;
    MockVM.setEntryPoint(0xc3ab8ff1);

    const getEntryPoint = System.getEntryPoint();

    expect(getEntryPoint).toBe(setEntryPoint);
  });

  it('should set the contract arguments', () => {
    MockVM.setContractArguments(mockAccount);

    const getContractArgs = System.getContractArguments();

    expect(Arrays.equal(getContractArgs, mockAccount)).toBe(true);
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

    expect(() => {
      System.requireAuthority(authority.authorization_type.contract_call, mockAccount);
    }).not.toThrow();

    expect(() => {
      System.requireAuthority(authority.authorization_type.contract_upload, mockAccount2);
    }).not.toThrow();

    expect(() => {
      // will print "account 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe has not authorized action"
      System.requireAuthority(authority.authorization_type.contract_upload, mockAccount);
    }).toThrow();

    expect(() => {
      // will print "account 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe has not authorized action"
      System.requireAuthority(authority.authorization_type.transaction_application, mockAccount);
    }).toThrow();
  });

  it('should set the call contract results', () => {
    const callRes1 = mockAccount;
    const callRes2 = mockAccount2;

    MockVM.setCallContractResults([callRes1, callRes2]);

    let callRes = System.callContract(mockAccount, 1, new Uint8Array(0));

    expect(callRes).not.toBeNull();
    expect(Arrays.equal(callRes, mockAccount)).toBe(true);

    callRes = System.callContract(mockAccount, 1, new Uint8Array(0));
    expect(callRes).not.toBeNull();
    expect(Arrays.equal(callRes, mockAccount2)).toBe(true);
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
});

import { Arrays, authority, Base58, chain, MockVM, protocol, StringBytes, System, Crypto, Base64 } from "../assembly";

const mockAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
const mockAccount2 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
const mockId = Arrays.fromHexString("0x1220d15a1c2ea198178ae860c1284a7ec929e7804b15651b9f4303dc1fc6a8eefd27");
const mockStr = 'Hello World!';
const mockStrBytes = StringBytes.stringToBytes(mockStr);

describe('SystemCalls', () => {
  it('should get the head info', () => {
    const setHeadInfo = new chain.head_info();
    setHeadInfo.head_block_time = 123456789;
    setHeadInfo.last_irreversible_block = 3;

    MockVM.setHeadInfo(setHeadInfo);

    const getHeadInfo = System.getHeadInfo();

    expect(getHeadInfo.head_block_time).toBe(setHeadInfo.head_block_time);
    expect(getHeadInfo.last_irreversible_block).toBe(setHeadInfo.last_irreversible_block);
  });

  it('should get the transaction', () => {
    let setTransaction = new protocol.transaction(mockId);

    MockVM.setTransaction(setTransaction);

    const getTransaction = System.getTransaction();

    expect(Arrays.Uint8ArrayEqual(getTransaction.id, setTransaction.id)).toBe(true);
  });

  it('should get the transaction field', () => {
    let setTransaction = new protocol.transaction(mockId);

    MockVM.setTransaction(setTransaction);

    const getTransaction = System.getTransactionField('id');

    expect(Arrays.Uint8ArrayEqual(getTransaction!.bytes_value, setTransaction.id)).toBe(true);
  });

  it('should get the block', () => {
    let setBlock = new protocol.block(mockId);

    MockVM.setBlock(setBlock);

    const getBlock = System.getBlock();

    expect(Arrays.Uint8ArrayEqual(getBlock.id, setBlock.id)).toBe(true);
  });

  it('should get the block field', () => {
    let setBlock = new protocol.block(mockId);

    MockVM.setBlock(setBlock);

    const getBlock = System.getBlockField('id');

    expect(getBlock).not.toBeNull();
    expect(Arrays.Uint8ArrayEqual(getBlock!.bytes_value, setBlock.id)).toBe(true);
  });

  it('should get the last irreversible block', () => {
    const setLastIrreversibleBlock = 987654321;
    MockVM.setLastIrreversibleBlock(setLastIrreversibleBlock);

    const getLastIrreversibleBlock = System.getLastIrreversibleBlock();

    expect(getLastIrreversibleBlock).toBe(setLastIrreversibleBlock);
  });

  it('should require authorities', () => {
    const auth1 = new MockVM.MockAuthority(authority.authorization_type.contract_call, mockAccount, true);
    const auth2 = new MockVM.MockAuthority(authority.authorization_type.contract_upload, mockAccount, false);
    const auth3 = new MockVM.MockAuthority(authority.authorization_type.contract_upload, mockAccount2, true);

    MockVM.setAuthorities([auth1, auth2, auth3]);

    // the System.requireAuthority that will fail will revert the database's VM, so we need to begin a transaction
    // this will backup the database
    MockVM.beginTransaction();

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

  it('should log', () => {
    System.log(mockStr);

    const logs = MockVM.getLogs();

    expect(logs[0]).toBe(mockStr);
  });

  it('should emit an event', () => {
    const eventName = mockStr;
    const eventData = StringBytes.stringToBytes(eventName);
    const impacted = [mockAccount];
    System.event(eventName, eventData, impacted);

    const events = MockVM.getEvents();

    events[0].impacted.forEach(imp => {
      System.log(Base58.encode(imp));
    });

    expect(events[0].name).toBe(mockStr);
    expect(Arrays.Uint8ArrayEqual(events[0].data, eventData)).toBe(true);
    expect(Arrays.Uint8ArrayEqual(events[0].impacted[0], mockAccount)).toBe(true);
  });

  it('should hash', () => {
    const expectedSha1 = Arrays.fromHexString('0x12142ef7bde608ce5404e97d5f042f95f89f1c232871');
    const sha1 = System.hash(Crypto.multicodec.sha1, mockStrBytes);

    expect(sha1).not.toBeNull();
    if (sha1) {
      expect(Arrays.Uint8ArrayEqual(sha1, expectedSha1)).toBe(true);
    }

    const expectedSha256 = Arrays.fromHexString('0x12207f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
    const sha256 = System.hash(Crypto.multicodec.sha2_256, mockStrBytes);

    expect(sha256).not.toBeNull();
    if (sha256) {
      expect(Arrays.Uint8ArrayEqual(sha256, expectedSha256)).toBe(true);
    }

    const expectedSha512 = Arrays.fromHexString('0x1240861844d6704e8573fec34d967e20bcfef3d424cf48be04e6dc08f2bd58c729743371015ead891cc3cf1c9d34b49264b510751b1ff9e537937bc46b5d6ff4ecc8');
    const sha512 = System.hash(Crypto.multicodec.sha2_512, mockStrBytes);

    expect(sha512).not.toBeNull();
    if (sha512) {
      expect(Arrays.Uint8ArrayEqual(sha512, expectedSha512)).toBe(true);
    }

    const expectedRipemd160 = Arrays.fromHexString('0x12148476ee4631b9b30ac2754b0ee0c47e161d3f724c');
    const ripemd160 = System.hash(Crypto.multicodec.ripemd_160, mockStrBytes);

    expect(ripemd160).not.toBeNull();
    if (ripemd160) {
      expect(Arrays.Uint8ArrayEqual(ripemd160, expectedRipemd160)).toBe(true);
    }

    const expectedKeccak256 = Arrays.fromHexString('0x12203ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0');
    const keccak256 = System.hash(Crypto.multicodec.keccak_256, mockStrBytes);

    expect(keccak256).not.toBeNull();
    if (keccak256) {
      expect(Arrays.Uint8ArrayEqual(keccak256, expectedKeccak256)).toBe(true);
    }
  });

  it('should recover a public key', () => {
    const message = 'hello-world';
    const signatureData = Base64.decode('IHhJwlD7P-o6x7L38den1MnumUhnYmNhTZhIUQQhezvEMf7rx89NbIIioNCIQSk1PQYdQ9mOI4-rDYiwO2pLvM4=');
    const digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes(message));
    const recoveredKey = System.recoverPublicKey(signatureData, digest!);
    const addr = Crypto.addressFromPublicKey(recoveredKey!);

    expect(Base58.encode(addr)).toBe('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
  });

  it('should verify a signature', () => {
    const message = 'hello-world';
    const signatureData = Base64.decode('IHhJwlD7P-o6x7L38den1MnumUhnYmNhTZhIUQQhezvEMf7rx89NbIIioNCIQSk1PQYdQ9mOI4-rDYiwO2pLvM4=');
    let digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes(message));
    const recoveredKey = System.recoverPublicKey(signatureData, digest!);

    let verify = System.verifySignature(recoveredKey!, signatureData, digest!);

    expect(verify).toBe(true);

    digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes('message'));
    verify = System.verifySignature(recoveredKey!, signatureData, digest!);

    expect(verify).toBe(false);
  });

  it('should should call a contract', () => {
    const callRes1 = mockAccount;
    const callRes2 = mockAccount2;

    MockVM.setCallContractResults([callRes1, callRes2]);

    let callRes = System.callContract(mockAccount, 1, new Uint8Array(0));

    expect(callRes).not.toBeNull();
    expect(Arrays.Uint8ArrayEqual(callRes, mockAccount)).toBe(true);

    callRes = System.callContract(mockAccount, 1, new Uint8Array(0));
    expect(callRes).not.toBeNull();
    expect(Arrays.Uint8ArrayEqual(callRes, mockAccount2)).toBe(true);
  });

  it('should get the entry point', () => {
    const setEntryPoint = 0xc3ab8ff1;
    MockVM.setEntryPoint(0xc3ab8ff1);

    const getEntryPoint = System.getEntryPoint();

    expect(getEntryPoint).toBe(setEntryPoint);
  });

  it('should get the contract arguments', () => {
    MockVM.setContractArguments(mockAccount);

    const getContractArgs = System.getContractArguments();

    expect(Arrays.Uint8ArrayEqual(getContractArgs, mockAccount)).toBe(true);
  });

  it('should get the contract id', () => {
    MockVM.setContractId(mockAccount);

    const getContractId = System.getContractId();

    expect(Arrays.Uint8ArrayEqual(getContractId, mockAccount)).toBe(true);
  });

  it('should get the head info', () => {
    const setHeadInfo = new chain.head_info();
    setHeadInfo.head_block_time = 123456789;
    setHeadInfo.last_irreversible_block = 3;

    MockVM.setHeadInfo(setHeadInfo);

    const getHeadInfo = System.getHeadInfo();

    expect(getHeadInfo.head_block_time).toBe(setHeadInfo.head_block_time);
    expect(getHeadInfo.last_irreversible_block).toBe(setHeadInfo.last_irreversible_block);
  });

  it('should get the caller', () => {
    const setCallerData = new chain.caller_data(mockAccount, chain.privilege.user_mode);

    MockVM.setCaller(setCallerData);

    const getCallerData = System.getCaller();

    expect(getCallerData.caller_privilege).toBe(setCallerData.caller_privilege);
    expect(Arrays.Uint8ArrayEqual(getCallerData.caller, mockAccount)).toBe(true);
  });

  it('should set the contract result', () => {
    System.setContractResult(mockStrBytes);

    const contractRes = MockVM.getContractResult();

    expect(Arrays.Uint8ArrayEqual(contractRes, mockStrBytes)).toBe(true);
  });

  it('should exit a contract', () => {
    expect(() => {
      System.exitContract(0);
    }).toThrow();

    let exitCode = MockVM.getExitCode();
    
    expect(exitCode).toBe(0);

    expect(() => {
      System.exitContract(1);
    }).toThrow();

    exitCode = MockVM.getExitCode();
    
    expect(exitCode).toBe(1);
  });
});

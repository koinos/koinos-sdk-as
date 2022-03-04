import { test } from "./proto/test";
import { foobar } from "./proto/foobar";
import { token as koin, token } from "./proto/token";
import { System, Protobuf, Base58, Base64, Crypto, StringBytes, chain, common, authority, protocol } from "../../assembly";

export function main(): i32 {
  const entryPoint = System.getEntryPoint();
  System.log('entryPoint: ' + entryPoint.toString());
  System.require(entryPoint == 0xc3ab8ff1, `expected entry point "0xc3ab8ff1", got "${entryPoint}"`);

  const rdbuf = System.getContractArguments();
  const contractArgs = Protobuf.decode<foobar.foobar_arguments>(rdbuf, foobar.foobar_arguments.decode);
  System.log('contractArgs: ' + contractArgs.value.toString());

  const contractId = System.getContractId();
  System.log('contractId (b58): ' + Base58.encode(contractId));

  System.requireAuthority(authority.authorization_type.transaction_application, contractId);

  const headInfo = System.getHeadInfo();
  System.log('headInfo.head_block_time: ' + headInfo.head_block_time.toString());
  System.log('headInfo.head_topology.height: ' + (headInfo.head_topology as common.block_topology).height.toString());
  System.log('headInfo.last_irreversible_block.: ' + headInfo.last_irreversible_block.toString());

  const callerData = System.getCaller();
  System.log('callerData.caller_privilege: ' + callerData.caller_privilege.toString());
  if (callerData.caller) {
    System.log('callerData.caller (b58): ' + Base58.encode(callerData.caller as Uint8Array));
  }

  const lastIrreversibleBlock = System.getLastIrreversibleBlock();
  System.log('lastIrreversibleBlock: ' + lastIrreversibleBlock.toString());

  const contractSpace = new chain.object_space(false, contractId, 1);
 
  const putRes = System.putBytes(contractSpace, 'testKey', StringBytes.stringToBytes('testValue'));
  System.log('putRes: ' + putRes.toString());

  const obj = System.getBytes(contractSpace, 'testKey');

  if (obj) {
    const strObj = StringBytes.bytesToString(obj) as string;
    System.log('obj: ' + strObj);
    System.require(strObj == 'testValue', `expected "testValue", got "${strObj}"`);
  }

  const contractSpace2 = new chain.object_space(false, contractId, 2);
  const putRes2 = System.putBytes(contractSpace2, StringBytes.stringToBytes('testKey'), StringBytes.stringToBytes('testValue2'));
  System.log('putRes: ' + putRes2.toString());

  const obj2 = System.getBytes(contractSpace2, 'testKey');

  if (obj2) {
    const strObj = StringBytes.bytesToString(obj2) as string;
    System.log('obj: ' + strObj);
    System.require(strObj == 'testValue2', `expected "testValue2", got "${strObj}"`);
  }

  const obj3 = System.getBytes(contractSpace2, StringBytes.stringToBytes('testKey'));

  if (obj3) {
    const strObj = StringBytes.bytesToString(obj3) as string;
    System.log('obj: ' + strObj);
    System.require(strObj == 'testValue2', `expected "testValue2", got "${strObj}"`);
  }

  const contractSpace3 = new chain.object_space(false, contractId, 3);

  const obj4 = new test.test_object(42);

  const putRes3 = System.putObject(contractSpace3, "test", obj4, test.test_object.encode);
  System.log('putRes3: ' + putRes3.toString());

  let obj5 = System.getObject<string, test.test_object>(contractSpace3, "test", test.test_object.decode);
  System.require(obj5, `expected "obj5", got "null"`);

  if (obj5) {
    System.log('obj5.value: ' + obj5.value.toString());
    System.require(obj5.value == 42, `expected "42", got "${obj5.value}"`);
  }

  System.removeObject(contractSpace3, "test");

  obj5 = System.getObject<string, test.test_object>(contractSpace3, "test", test.test_object.decode);
  System.require(!obj5, `expected "null", got "obj5"`);

  if (!obj5) {
    System.log('no obj5');
  }


  const message = 'hello-world';
  const signatureData = Base64.decode('IHhJwlD7P-o6x7L38den1MnumUhnYmNhTZhIUQQhezvEMf7rx89NbIIioNCIQSk1PQYdQ9mOI4-rDYiwO2pLvM4=');
  const digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes(message));
  const recoveredKey = System.recoverPublicKey(signatureData, digest as Uint8Array);
  const addr = Crypto.addressFromPublicKey(recoveredKey as Uint8Array);
  System.log('recoveredKey (b58): ' + Base58.encode(addr));

  System.require('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe' == Base58.encode(addr), `expected "1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe", got "${Base58.encode(addr)}"`);

  let verify = System.verifySignature(recoveredKey as Uint8Array, signatureData, digest as Uint8Array);
  System.require(verify == true, `expected "true", got "${verify}"`);

  verify = System.verifySignature(addr, signatureData, digest as Uint8Array);
  System.require(verify == false, `expected "false", got "${verify}"`);

  const contractSpace100 = new chain.object_space(false, contractId, 100);
  System.putBytes(contractSpace100, StringBytes.stringToBytes('key3'), StringBytes.stringToBytes('value3'));
  System.putBytes(contractSpace100, StringBytes.stringToBytes('key1'), StringBytes.stringToBytes('value1'));
  System.putBytes(contractSpace100, StringBytes.stringToBytes('key2'), StringBytes.stringToBytes('value2'));

  let obj100 = System.getBytes(contractSpace100, StringBytes.stringToBytes('key2'));

  if (obj100) {
    const str = StringBytes.bytesToString(obj100) as string;
    System.log(str);
    System.require(str == 'value2', `expected "value2", got "${str}"`);
  }

  obj100 = System.getBytes(contractSpace100, StringBytes.stringToBytes('key5'));
  System.require(!obj100, `expected "null", got "obj100"`);

  if (!obj100) {
    System.log('no key5');
  }

  let obj101 = System.getNextBytes(contractSpace100, StringBytes.stringToBytes('key2'));

  if (obj101) {
    const key = StringBytes.bytesToString(obj101.key) as string;
    System.log(key);
    System.require(key == 'key3', `expected "key3", got "${key}"`);
    const val = StringBytes.bytesToString(obj101.value) as string;
    System.log(val);
    System.require(val == 'value3', `expected "value3", got "${val}"`);
  }

  let obj102 = System.getPrevBytes(contractSpace100, StringBytes.stringToBytes('key2'));

  if (obj102) {
    const key = StringBytes.bytesToString(obj102.key) as string;
    System.log(key);
    System.require(key == 'key1', `expected "key1", got "${key}"`);
    const val = StringBytes.bytesToString(obj102.value) as string;
    System.log(val);
    System.require(val == 'value1', `expected "value1", got "${val}"`);
  }

  let obj103 = System.getPrevBytes(contractSpace100, StringBytes.stringToBytes('key1'));
  System.require(!obj103, `expected "null", got "obj103"`);

  if (!obj103) {
    System.log('nothing before key1');
  }

  let obj104 = System.getNextBytes(contractSpace100, StringBytes.stringToBytes('key3'));
  System.require(!obj104, `expected "null", got "obj104"`);

  if (!obj104) {
    System.log('nothing after key3');
  }

  const obj200 = new test.test_object(300);

  System.putObject<string, test.test_object>(contractSpace100, 'key3', obj200, test.test_object.encode);
  obj200.value = 100;
  System.putObject<string, test.test_object>(contractSpace100, 'key1', obj200, test.test_object.encode);
  obj200.value = 200;
  System.putObject<string, test.test_object>(contractSpace100, 'key2', obj200, test.test_object.encode);

  let obj201 = System.getObject<string, test.test_object>(contractSpace100, 'key2', test.test_object.decode);

  if (obj201) {
    System.log('obj201.value: ' + obj201.value.toString());
    System.require(obj201.value == 200, `expected "200", got "${obj201.value}"`);
  }

  let obj202 = System.getNextObject<string, test.test_object>(contractSpace100, 'key2', test.test_object.decode);

  if (obj202) {
    System.log('next obj202.value: ' + obj202.value.value.toString());
    System.require(obj202.value.value == 300, `expected "300", got "${obj202.value.value}"`);
  }

  obj202 = System.getPrevObject<string, test.test_object>(contractSpace100, 'key2', test.test_object.decode);

  if (obj202) {
    System.log('prev obj202.value: ' + obj202.value.value.toString());
    System.require(obj202.value.value == 100, `expected "100", got "${obj202.value.value}"`);
  }

  obj202 = System.getPrevObject<string, test.test_object>(contractSpace100, 'key1', test.test_object.decode);
  System.require(!obj202, `expected "null" for prev "key1", got "obj202"`);

  if (!obj202) {
    System.log('nothing before key1');
  }

  obj202 = System.getNextObject<string, test.test_object>(contractSpace100, 'key3', test.test_object.decode);
  System.require(!obj202, `expected "null" for next "key3", got "obj202"`);

  if (!obj202) {
    System.log('nothing after key3');
  }

  const tx = System.getTransaction();
  const header = tx.header as protocol.transaction_header;
  System.log("payer: " + Base58.encode((header.payer) as Uint8Array));

  const txField = System.getTransactionField('header.payer');
  if (txField) {
    System.log("payer: " + Base58.encode(txField.bytes_value as Uint8Array));
  }

  // Transfer 10 tKOIN to 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe
  const koinContractId = Base58.decode("1NvZvWNqDX7t93inmLBvbv6kxhpEZYRFWK");
  const tranferEntryPoint = 0x62efa292;
  const from = contractId; // this contract
  const to = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
  const amount = 10 * 10 ** 8; // needs to be multiplied by 10^8 because Koin is 8 decimals

  const koinTransferArgs = new koin.transfer_arguments();
  koinTransferArgs.from = from;
  koinTransferArgs.to = to;
  koinTransferArgs.value = amount;

  const resBuf = System.callContract(koinContractId, tranferEntryPoint, Protobuf.encode(koinTransferArgs, koin.transfer_arguments.encode));
  System.require(resBuf, `expected resBuf not "null", got "null"`);

  if (resBuf) {
    const transferRes = Protobuf.decode<koin.transfer_result>(resBuf, koin.transfer_result.decode);
    System.require(transferRes.value, `expected transfer not "true", got "false"`);

    const impacted: Uint8Array[] = [];
    impacted.push(from);
    impacted.push(to);

    const transferEvent = new token.transfer_event();
    transferEvent.from = from;
    transferEvent.to = to;
    transferEvent.value = amount;

    System.event('koin.transfer', Protobuf.encode(transferEvent, token.transfer_event.encode), impacted);

    System.log(`transfered ${amount / 10 ** 8} tKoin from ${Base58.encode(from)} to ${Base58.encode(to)}`);
  }

  const b = System.getBlock();
  const blheader = b.header as protocol.block_header;
  System.log("signer: " + Base58.encode((blheader.signer) as Uint8Array));
  System.require('1GXe3r3VmkKAEhj6C156jPxQC8p1xbQD2i' == Base58.encode(blheader.signer as Uint8Array), `expected "1GXe3r3VmkKAEhj6C156jPxQC8p1xbQD2i", got "${Base58.encode(blheader.signer as Uint8Array)}"`);


  const blField = System.getBlockField('header.signer');
  System.require(blField, `expected blField not "null", got "null"`);

  if (blField) {
    System.log("signer: " + Base58.encode(blField.bytes_value as Uint8Array));
    System.require('1GXe3r3VmkKAEhj6C156jPxQC8p1xbQD2i' == Base58.encode(blField.bytes_value as Uint8Array), `expected "1GXe3r3VmkKAEhj6C156jPxQC8p1xbQD2i", got "${Base58.encode(blField.bytes_value as Uint8Array)}"`);

  }

  const contractRes = new foobar.foobar_result(42);
  System.setContractResult(Protobuf.encode(contractRes, foobar.foobar_result.encode));

  System.exitContract(0);
  return 0;
}

main();
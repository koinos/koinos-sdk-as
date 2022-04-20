import { env } from "./env";
import { Protobuf, Reader, Writer } from 'as-proto';
import { system_calls, system_call_ids, chain, protocol, authority, value } from 'koinos-proto-as';
import {  StringBytes } from ".";
export namespace System {
  export const DEFAULT_MAX_BUFFER_SIZE = 1024;
  export let MAX_BUFFER_SIZE = DEFAULT_MAX_BUFFER_SIZE;

  // General Blockchain Management

  /**
    * Get the blockchain head information (head block time, height, last irreversible block, etc...)
    * @returns chain.head_info
    * @example
    * ```ts
    *  const headInfo = System.getHeadInfo();
    *  System.log('headInfo.head_block_time: ' + headInfo.head_block_time.toString());
    *  System.log('headInfo.head_topology.height: ' + headInfo.head_topology!.height.toString());
    *  System.log('headInfo.last_irreversible_block.: ' + headInfo.last_irreversible_block.toString());
    * ```
    */
  export function getHeadInfo(): chain.head_info {
    const args = new system_calls.get_head_info_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_head_info_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_head_info, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_head_info_result>(readBuffer, system_calls.get_head_info_result.decode, len);

    return result.value!;
  }

  export function applyBlock(block: protocol.block): void {
    const args = new system_calls.apply_block_arguments(block);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_block_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.apply_block, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applyTransaction(transaction: protocol.transaction): void {
    const args = new system_calls.apply_transaction_arguments(transaction);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_transaction_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.apply_transaction, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applyUploadContractOperation(op: protocol.upload_contract_operation): void {
    const args = new system_calls.apply_upload_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_upload_contract_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.apply_upload_contract_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applyCallContractOperation(op: protocol.call_contract_operation): void {
    const args = new system_calls.apply_call_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_call_contract_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.apply_call_contract_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applySetSystemCallOperation(op: protocol.set_system_call_operation): void {
    const args = new system_calls.apply_set_system_call_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_set_system_call_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.apply_set_system_call_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applySetSystemContractOperation(op: protocol.set_system_contract_operation): void {
    const args = new system_calls.apply_set_system_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_set_system_contract_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.apply_set_system_contract_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  // System Helpers

  export function processBlockSignature(digest: Uint8Array, header: protocol.block_header, signature: Uint8Array): bool {
    const args = new system_calls.process_block_signature_arguments(digest, header, signature);
    const encodedArgs = Protobuf.encode(args, system_calls.process_block_signature_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.process_block_signature, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.process_block_signature_result>(readBuffer, system_calls.process_block_signature_result.decode, len);

    return result.value;
  }

  /**
    * Get the current transaction
    * @returns protocol.transaction
    * @example
    * ```ts
    *  const tx = System.getTransaction();
    *  System.log("payer: " + Base58.encode((tx.header!.payer!)));
    * ```
    */
  export function getTransaction(): protocol.transaction {
    const args = new system_calls.get_transaction_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_transaction_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_transaction, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_transaction_result>(readBuffer, system_calls.get_transaction_result.decode, len);

    return result.value!;
  }

  /**
    * Get a field from the current transaction
    * @param field field to get (i.e.: 'id', 'header.payer')
    * @returns value.value_type | null
    * @example
    * ```ts
    *  const txField = System.getTransactionField('header.payer');
    *  if (txField) {
    *    System.log("payer: " + Base58.encode(txField.bytes_value!));
    *  }
    * ```
    */
  export function getTransactionField(field: string): value.value_type | null {
    const args = new system_calls.get_transaction_field_arguments(field);
    const encodedArgs = Protobuf.encode(args, system_calls.get_transaction_field_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_transaction_field, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_transaction_field_result>(readBuffer, system_calls.get_transaction_field_result.decode, len);

    return result.value;
  }

  /**
    * Get the current block
    * @returns protocol.block
    * @example
    * ```ts
    *  const b = System.getBlock();
    *  System.log("signer: " + Base58.encode((b.header!.signer!)));
    * ```
    */
  export function getBlock(): protocol.block {
    const args = new system_calls.get_block_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_block_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_block, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_block_result>(readBuffer, system_calls.get_block_result.decode, len);

    return result.value!;
  }

  /**
    * Get a field from the current block
    * @param field field to get (i.e.: 'id', 'header.signer')
    * @returns value.value_type | null
    * @example
    * ```ts
    * const blField = System.getBlockField('header.signer');
    * System.require(blField, `expected blField not "null", got "null"`);
    *
    * if (blField) {
    *   System.log("signer: " + Base58.encode(blField.bytes_value!));
    * }
    * ```
    */
  export function getBlockField(field: string): value.value_type | null {
    const args = new system_calls.get_block_field_arguments(field);
    const encodedArgs = Protobuf.encode(args, system_calls.get_block_field_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_block_field, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_block_field_result>(readBuffer, system_calls.get_block_field_result.decode, len);

    return result.value;
  }

  /**
    * Get the last irreversible block height
    * @returns u64
    * @example
    * ```ts
    * const lastIrreversibleBlock = System.getLastIrreversibleBlock();
    * System.log('lastIrreversibleBlock: ' + lastIrreversibleBlock.toString());
    * ```
    */
  export function getLastIrreversibleBlock(): u64 {
    const args = new system_calls.get_last_irreversible_block_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_last_irreversible_block_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_last_irreversible_block, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_last_irreversible_block_result>(readBuffer, system_calls.get_last_irreversible_block_result.decode, len);

    return result.value;
  }

  export function getAccountNonce(account: Uint8Array): Uint8Array | null {
    const args = new system_calls.get_account_nonce_arguments(account);
    const encodedArgs = Protobuf.encode(args, system_calls.get_account_nonce_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_account_nonce, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_account_nonce_result>(readBuffer, system_calls.get_account_nonce_result.decode, len);

    return result.value;
  }

  export function verifyAccountNonce(account: Uint8Array, nonce: Uint8Array): bool {
    const args = new system_calls.verify_account_nonce_arguments(account, nonce);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_account_nonce_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.verify_account_nonce, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.verify_account_nonce_result>(readBuffer, system_calls.verify_account_nonce_result.decode, len);

    return result.value;
  }

  export function setAccountNonce(account: Uint8Array, nonce: Uint8Array): void {
    const args = new system_calls.set_account_nonce_arguments(account, nonce);

    const encodedArgs = Protobuf.encode(args, system_calls.set_account_nonce_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.verify_account_nonce, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function requireSystemAuthority(type: system_calls.system_authorization_type): void {
    const args = new system_calls.require_system_authority_arguments(type);
    const encodedArgs = Protobuf.encode(args, system_calls.require_system_authority_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.require_system_authority, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  // Resource Subsystem

  export function getAccountRC(account: Uint8Array): u64 {
    const args = new system_calls.get_account_rc_arguments(account);
    const encodedArgs = Protobuf.encode(args, system_calls.get_account_rc_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_account_rc, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_account_rc_result>(readBuffer, system_calls.get_account_rc_result.decode, len);

    return result.value;
  }

  export function consumeAccountRC(account: Uint8Array, value: u64): bool {
    const args = new system_calls.consume_account_rc_arguments(account, value);
    const encodedArgs = Protobuf.encode(args, system_calls.consume_account_rc_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.consume_account_rc, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.consume_account_rc_result>(readBuffer, system_calls.consume_account_rc_result.decode, len);

    return result.value;
  }

  export function getResourceLimits(): chain.resource_limit_data {
    const args = new system_calls.get_resource_limits_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_resource_limits_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_resource_limits, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_resource_limits_result>(readBuffer, system_calls.get_resource_limits_result.decode, len);

    return result.value!;
  }

  export function consumeBlockResources(disk_storage_consumed: u64, network_bandwidth_consumed: u64, compute_bandwidth_consumed: u64): bool {
    const args = new system_calls.consume_block_resources_arguments(disk_storage_consumed, network_bandwidth_consumed, compute_bandwidth_consumed);
    const encodedArgs = Protobuf.encode(args, system_calls.consume_block_resources_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.consume_block_resources, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.consume_block_resources_result>(readBuffer, system_calls.consume_block_resources_result.decode, len);

    return result.value;
  }

  // Logging

  /**
    * Log a string
    * @param s string to log
    * @example
    * ```ts
    * System.log('Hello World!');
    * ```
    */
  export function log(s: string): void {
    const args = new system_calls.log_arguments(s);
    const encodedArgs = Protobuf.encode(args, system_calls.log_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.log, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  /**
    * Emit an event
    * @param name name of the event
    * @param data data associated to the event
    * @param impacted accounts impacted by the event
    * @example
    * ```ts
    * const from = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
    * const to = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
    * const impacted: Uint8Array[] = [];
    * impacted.push(from);
    * impacted.push(to);
    *
    * const transferEvent = new token.transfer_event();
    * transferEvent.from = from;
    * transferEvent.to = to;
    * transferEvent.value = amount;
    *
    * System.event('koin.transfer', Protobuf.encode(transferEvent, token.transfer_event.encode), impacted);
    * ```
    */
  export function event(name: string, data: Uint8Array, impacted: Uint8Array[]): void {
    const args = new system_calls.event_arguments(name, data, impacted);
    const encodedArgs = Protobuf.encode(args, system_calls.event_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.event, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  // Cryptography

  /**
    * Hash an object
    * @param code a Crypto.multicodec code
    * @param obj object to hash
    * @param size size of the object to hash
    * @returns Uint8Array | null
    * @example
    * ```ts
    * const digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes('hello world!));
    * ```
    */
  export function hash(code: u64, obj: Uint8Array, size: u64 = 0): Uint8Array | null {
    const args = new system_calls.hash_arguments(code, obj, size);
    const encodedArgs = Protobuf.encode(args, system_calls.hash_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.hash, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.hash_result>(readBuffer, system_calls.hash_result.decode, len);

    return result.value;
  }

  /**
    * Recover a publick key given a signature and a digest that was signed by the public key
    * @param signatureData the signature of the digest
    * @param digest digest that was signed by the public key
    * @param type type of signature
    * @returns Uint8Array | null
    * @example
    * ```ts
    * const message = 'hello-world';
    * const signatureData = Base64.decode('IHhJwlD7P-o6x7L38den1MnumUhnYmNhTZhIUQQhezvEMf7rx89NbIIioNCIQSk1PQYdQ9mOI4-rDYiwO2pLvM4=');
    * const digest = System.hash(Crypto.multicodec.sha2_256, StringBytes.stringToBytes(message));
    * const recoveredKey = System.recoverPublicKey(signatureData, digest!);
    * const addr = Crypto.addressFromPublicKey(recoveredKey!);
    * System.log('recoveredKey (b58): ' + Base58.encode(addr));
    * ```
    */
  export function recoverPublicKey(signatureData: Uint8Array, digest: Uint8Array, type: chain.dsa = chain.dsa.ecdsa_secp256k1): Uint8Array | null {
    const args = new system_calls.recover_public_key_arguments(type, signatureData, digest);
    const encodedArgs = Protobuf.encode(args, system_calls.recover_public_key_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.recover_public_key, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.recover_public_key_result>(readBuffer, system_calls.recover_public_key_result.decode, len);

    return result.value;
  }

  /**
    * Verify a merkle root
    * @param root merkle root to verify
    * @param hashes hashes to verify
    * @returns bool
    * @example
    * ```ts
    * ```
    */
  export function verifyMerkleRoot(root: Uint8Array, hashes: Array<Uint8Array>): bool {
    const args = new system_calls.verify_merkle_root_arguments(root, hashes);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_merkle_root_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.verify_merkle_root, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.verify_merkle_root_result>(readBuffer, system_calls.verify_merkle_root_result.decode, len);

    return result.value;
  }

  /**
    * Verify that a public key signed a digest
    * @param publicKey public key that signed the digest
    * @param signature signature of the digest
    * @param digest digest that was signed
    * @param type type of signature
    * @returns bool
    * @example
    * ```ts
    * let verify = System.verifySignature(recoveredKey!, signatureData, digest!);
    * System.require(verify == true, `expected "true", got "${verify}"`);
    * ```
    */
  export function verifySignature(publicKey: Uint8Array, signature: Uint8Array, digest: Uint8Array, type: chain.dsa = chain.dsa.ecdsa_secp256k1): bool {
    const args = new system_calls.verify_signature_arguments(type, publicKey, signature, digest);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_signature_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.verify_signature, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.verify_signature_result>(readBuffer, system_calls.verify_signature_result.decode, len);

    return result.value;
  }

  // Contract Management

  /**
    * Call a contract
    * @param contractId id of the contract to call
    * @param entryPoint entry point of the contract to call
    * @param contractArgs arguments of the contract to call
    * @returns Uint8Array | null
    * @example
    * ```ts
    * // Transfer 10 tKOIN to 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe
    * const koinContractId = Base58.decode("1NvZvWNqDX7t93inmLBvbv6kxhpEZYRFWK");
    * const tranferEntryPoint = 0x62efa292;
    * const from = contractId; // this contract
    * const to = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
    * const amount = 10 * 10 ** 8; // needs to be multiplied by 10^8 because Koin is 8 decimals
    *
    * const koinTransferArgs = new koin.transfer_arguments();
    * koinTransferArgs.from = from;
    * koinTransferArgs.to = to;
    * koinTransferArgs.value = amount;
    *
    * const resBuf = System.callContract(koinContractId, tranferEntryPoint, Protobuf.encode(koinTransferArgs, koin.transfer_arguments.encode));
    * System.require(resBuf, `expected resBuf not "null", got "null"`);
    *
    * if (resBuf) {
    *   const transferRes = Protobuf.decode<koin.transfer_result>(resBuf, koin.transfer_result.decode);
    *   System.require(transferRes.value, `expected transfer not "true", got "false"`);
    *
    *   const impacted: Uint8Array[] = [];
    *   impacted.push(from);
    *   impacted.push(to);
    *
    *   const transferEvent = new token.transfer_event();
    *   transferEvent.from = from;
    *   transferEvent.to = to;
    *   transferEvent.value = amount;
    *
    *   System.event('koin.transfer', Protobuf.encode(transferEvent, token.transfer_event.encode), impacted);
    *
    *   System.log(`transfered ${amount / 10 ** 8} tKoin from ${Base58.encode(from)} to ${Base58.encode(to)}`);
    * }
    * ```
    */
  export function callContract(contractId: Uint8Array, entryPoint: u32, contractArgs: Uint8Array): Uint8Array | null {
    const args = new system_calls.call_contract_arguments(contractId, entryPoint, contractArgs);
    const encodedArgs = Protobuf.encode(args, system_calls.call_contract_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.call_contract, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.call_contract_result>(readBuffer, system_calls.call_contract_result.decode, len);

    return result.value;
  }

  /**
    * Get entry point that was used when calling the contract
    * @returns u32
    * @example
    * ```ts
    * const entryPoint = System.getEntryPoint();
    * System.log('entryPoint: ' + entryPoint.toString());
    * ```
    */
  export function getEntryPoint(): u32 {
    const args = new system_calls.get_entry_point_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_entry_point_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_entry_point, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_entry_point_result>(readBuffer, system_calls.get_entry_point_result.decode, len);

    return result.value;
  }

  /**
    * Get arguments that were used when calling the contract
    * @returns Uint8Array
    * @example
    * ```ts
    * const rdbuf = System.getContractArguments();
    * const contractArgs = Protobuf.decode<foobar.foobar_arguments>(rdbuf, foobar.foobar_arguments.decode);
    * System.log('contractArgs: ' + contractArgs.value.toString());
    * ```
    */
  export function getContractArguments(): Uint8Array {
    const args = new system_calls.get_contract_arguments_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_contract_arguments_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_contract_arguments, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_contract_arguments_result>(readBuffer, system_calls.get_contract_arguments_result.decode, len);

    if (result.value) {
      return result.value!;
    }

    return new Uint8Array(0);
  }

  /**
    * Set the result of a contract call
    * @param res result to set
    * @example
    * ```ts
    * const contractRes = new foobar.foobar_result(42);
    * System.setContractResult(Protobuf.encode(contractRes, foobar.foobar_result.encode));
    * ```
    */
  export function setContractResult(res: Uint8Array | null): void {
    const args = new system_calls.set_contract_result_arguments(res);
    const encodedArgs = Protobuf.encode(args, system_calls.set_contract_result_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.set_contract_result, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  /**
    * Exit a contract
    * @param exitCode 0 (success) or 1 (failed, will revert the transaction)
    * @example
    * ```ts
    * System.exitContract(0);
    * ```
    */
  export function exitContract(exitCode: i32): void {
    const args = new system_calls.exit_contract_arguments(exitCode);
    const encodedArgs = Protobuf.encode(args, system_calls.exit_contract_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.exit_contract, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  /**
    * Get the id of the contract
    * @returns Uint8Array
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * System.log('contractId (b58): ' + Base58.encode(contractId));
    * ```
    */
  export function getContractId(): Uint8Array {
    const args = new system_calls.get_contract_id_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_contract_id_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_contract_id, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_contract_id_result>(readBuffer, system_calls.get_contract_id_result.decode, len);

    return result.value!;
  }

  /**
    * Get the contract caller information
    * @returns chain.caller_data
    * @example
    * ```ts
    * const callerData = System.getCaller();
    * System.log('callerData.caller_privilege: ' + callerData.caller_privilege.toString());
    * if (callerData.caller) {
    *   System.log('callerData.caller (b58): ' + Base58.encode(callerData.caller!));
    * }
    * ```
    */
  export function getCaller(): chain.caller_data {
    const args = new system_calls.get_caller_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_caller_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_caller, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_caller_result>(readBuffer, system_calls.get_caller_result.decode, len);

    return result.value!;
  }

  /**
    * Require authority for an account
    * @param type type of authority required
    * @param account account to check
    * @throws revert the transaction if the account is not authorized
    * @example
    * ```ts
    * System.requireAuthority(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe));
    * ```
    */
  export function requireAuthority(type: authority.authorization_type, account: Uint8Array): void {
    const args = new system_calls.require_authority_arguments(type, account);
    const encodedArgs = Protobuf.encode(args, system_calls.require_authority_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.require_authority, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  /**
    * Require an expression to be true, log a message and exit the contract otherise
    * @returns T it is Trueish, will exit the contract with `exitCode` otherwise
    * @example
    * ```ts
    * System.require(1 + 1 == 11, `expected "11", got "2"`);
    * ```
    */
  export function require<T>(isTrueish: T, message: string = "", exitCode: i32 = 1): T {

    if (!isTrueish) {
      if (message != "") {
        log(message);
      }
      exitContract(exitCode);
    }

    return isTrueish;
  }

  // Database

  /**
    * Store bytes (Uint8Array)
    * @param { chain.object_space } space space where to put the byets
    * @param { string | Uint8Array } key key of the bytes to store (string or Uint8Array)
    * @param { Uint8Array } obj bytes to store (Uint8Array)
    * @returns number of bytes that were put in the database
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    *
    * const nbBytesWritten = System.putBytes(contractSpace, 'testKey', StringBytes.stringToBytes('testValue'));
    * System.log('nbBytesWritten: ' + nbBytesWritten.toString());
    * ```
   */
  export function putBytes<K>(space: chain.object_space, key: K, obj: Uint8Array): i32 {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == "string") {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exitContract(1);
    }

    // @ts-ignore
    const args = new system_calls.put_object_arguments(space, finalKey, obj);
    const encodedArgs = Protobuf.encode(args, system_calls.put_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.put_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.put_object_result>(readBuffer, system_calls.put_object_result.decode, len);

    return result.value;
  }

  /**
    * Store proto object
    * @param { chain.object_space } space space where to put the object
    * @param { string | Uint8Array } key key of the object to store (string or Uint8Array)
    * @param { TMessage } obj object to store (string or Uint8Array)
    * @returns number of bytes that were put in the database
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    * const obj = new test.test_object(42);
    *
    * const nbBytesWritten = System.putObject(contractSpace, "test", obj, test.test_object.encode);
    * System.log('nbBytesWritten: ' + nbBytesWritten.toString());
    * ```
   */
  export function putObject<K, TMessage>(
    space: chain.object_space,
    key: K,
    obj: TMessage,
    encoder: (message: TMessage, writer: Writer) => void
  ): i32 {
    let finalObj = Protobuf.encode<TMessage>(obj, encoder);

    return putBytes(space, key, finalObj);
  }

  /**
    * Remove an object
    * @param { chain.object_space } space space where to put the byets
    * @param { string | Uint8Array } key key of the bytes to store (string or Uint8Array)
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    *
    * System.removeObject(contractSpace, 'testKey');
    * ```
    */
  export function removeObject<K>(space: chain.object_space, key: K): void {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == "string") {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exitContract(1);
    }

    // @ts-ignore
    const args = new system_calls.remove_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.remove_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_ids.system_call_id.remove_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  /**
    * Get bytes (Uint8Array)
    * @param { chain.object_space } space space where to get the object
    * @param { string | Uint8Array } key key of object to get
    * @returns Uint8Array | null
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    * let obj = System.getBytes(contractSpace, StringBytes.stringToBytes('key2'));
    *
    * if (obj) {
    *   const str = StringBytes.bytesToString(obj)!;
    *   System.log(str);
    * }
    * ```
   */
  export function getBytes<K>(
    space: chain.object_space,
    key: K
  ): Uint8Array | null {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exitContract(1);
    }

    // @ts-ignore
    const args = new system_calls.get_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.get_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);

    if (!len) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_object_result>(readBuffer, system_calls.get_object_result.decode, len);

    return (result.value!).value;
  }

  /**
    * Get proto object
    * @param { chain.object_space } space space where to get the object
    * @param { string | Uint8Array } key key of object to get
    * @returns proto object (TMessage) or null
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    * let obj = System.getObject<string, test.test_object>(contractSpace, 'key2', test.test_object.decode);
    *
    * if (obj) {
    *   System.log('obj.value: ' + obj.value.toString());
    * }
    * ```
   */
  export function getObject<K, TMessage>(
    space: chain.object_space,
    key: K,
    decoder: (reader: Reader, length: i32) => TMessage
  ): TMessage | null {

    const value = getBytes(space, key);

    if (!value) {
      return null;
    }

    return Protobuf.decode<TMessage>(value, decoder);
  }

  export class ProtoDatabaseObject<TMessage> {
    value: TMessage;
    key: Uint8Array | null;

    constructor(obj: system_calls.database_object, decoder: (reader: Reader, length: i32) => TMessage) {
      this.key = obj.key;
      this.value = Protobuf.decode<TMessage>(obj.value!, decoder);
    }
  }

  /**
    * Get next bytes (Uint8Array)
    * @param { string | Uint8Array } key key of object
    * @returns system_calls.database_object
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    * let obj = System.getNextBytes(contractSpace, StringBytes.stringToBytes('key2'));
    *
    * if (obj) {
    *   System.log('obj.value: ' + obj.value.toString());
    * }
    * ```
   */
  export function getNextBytes<K>(
    space: chain.object_space,
    key: K
  ): system_calls.database_object | null {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exitContract(1);
    }

    // @ts-ignore
    const args = new system_calls.get_next_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.get_next_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_next_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    if (!len) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_next_object_result>(readBuffer, system_calls.get_next_object_result.decode, len);
    return result.value!;
  }


  /**
    * Get next proto object
    * @param { string | Uint8Array } key key of object
    * @returns proto object (TMessage)
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    * let obj = System.getNextObject<string, test.test_object>(contractSpace, 'key3', test.test_object.decode);
    *
    * if (obj) {
    *   System.log('next obj.value: ' + obj.value.value.toString());
    * }
    * ```
    */
  export function getNextObject<K, TMessage>(
    space: chain.object_space,
    key: K,
    decoder: (reader: Reader, length: i32) => TMessage
  ): ProtoDatabaseObject<TMessage> | null {

    const value = getNextBytes(space, key);

    if (!value) {
      return null;
    }

    return new ProtoDatabaseObject(value, decoder);
  }

  /**
   * Get next bytes (Uint8Array)
   * @param { string | Uint8Array } key key of object
   * @returns system_calls.database_object
   * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    * let obj = System.getPrevBytes(contractSpace, StringBytes.stringToBytes('key2'));
    *
    * if (obj) {
    *   System.log('obj.value: ' + obj.value.toString());
    * }
    * ```
   */
  export function getPrevBytes<K>(
    space: chain.object_space,
    key: K
  ): system_calls.database_object | null {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exitContract(1);
    }

    // @ts-ignore
    const args = new system_calls.get_prev_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.get_prev_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_ids.system_call_id.get_prev_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);

    if (!len) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_prev_object_result>(readBuffer, system_calls.get_prev_object_result.decode, len);
    return result.value!;
  }

  /**
   * Get previous proto object
   * @param { string | Uint8Array } key key of object
   * @returns proto object (TMessage)
   * @example
    * ```ts
    * const contractId = System.getContractId();
    * const contractSpace = new chain.object_space(false, contractId, 1);
    * let obj = System.getPrevObject<string, test.test_object>(contractSpace, 'key3', test.test_object.decode);
    *
    * if (obj) {
    *   System.log('next obj.value: ' + obj.value.value.toString());
    * }
    * ```
   */
  export function getPrevObject<K, TMessage>(
    space: chain.object_space,
    key: K,
    decoder: (reader: Reader, length: i32) => TMessage
  ): ProtoDatabaseObject<TMessage> | null {

    const value = getPrevBytes(space, key);

    if (!value) {
      return null;
    }

    return new ProtoDatabaseObject(value, decoder);
  }
}

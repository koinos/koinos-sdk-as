import { env } from "./env";
import { Protobuf, Reader, Writer } from 'as-proto';
import { system_calls, system_call_id, chain, protocol, StringBytes, value, authority } from ".";

const MAX_BUFFER_SIZE = 2 ** 10;
export namespace System {
  // General Blockchain Management

  export function getHeadInfo(): chain.head_info {
    const args = new system_calls.get_head_info_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_head_info_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_head_info, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_head_info_result>(readBuffer, system_calls.get_head_info_result.decode, len);

    return result.value as chain.head_info;
  }

  export function applyBlock(block: protocol.block): void {
    const args = new system_calls.apply_block_arguments(block);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_block_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.apply_block, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applyTransaction(transaction: protocol.transaction): void {
    const args = new system_calls.apply_transaction_arguments(transaction);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_transaction_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.apply_transaction, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applyUploadContractOperation(op: protocol.upload_contract_operation): void {
    const args = new system_calls.apply_upload_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_upload_contract_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.apply_upload_contract_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applyCallContractOperation(op: protocol.call_contract_operation): void {
    const args = new system_calls.apply_call_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_call_contract_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.apply_call_contract_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applySetSystemCallOperation(op: protocol.set_system_call_operation): void {
    const args = new system_calls.apply_set_system_call_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_set_system_call_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.apply_set_system_call_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function applySetSystemContractOperation(op: protocol.set_system_contract_operation): void {
    const args = new system_calls.apply_set_system_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_set_system_contract_operation_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.apply_set_system_contract_operation, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  // System Helpers

  export function processBlockSignature(digest: Uint8Array, header: protocol.block_header, signature: Uint8Array): bool {
    const args = new system_calls.process_block_signature_arguments(digest, header, signature);
    const encodedArgs = Protobuf.encode(args, system_calls.process_block_signature_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.process_block_signature, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.process_block_signature_result>(readBuffer, system_calls.process_block_signature_result.decode, len);

    return result.value;
  }

  export function getTransaction(): protocol.transaction {
    const args = new system_calls.get_transaction_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_transaction_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_transaction, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_transaction_result>(readBuffer, system_calls.get_transaction_result.decode, len);

    return result.value as protocol.transaction;
  }

  export function getTransactionField(field: string): value.value_type | null {
    const args = new system_calls.get_transaction_field_arguments(field);
    const encodedArgs = Protobuf.encode(args, system_calls.get_transaction_field_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_transaction_field, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_transaction_field_result>(readBuffer, system_calls.get_transaction_field_result.decode, len);

    return result.value;
  }

  export function getBlock(): protocol.block {
    const args = new system_calls.get_block_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_block_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_block, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_block_result>(readBuffer, system_calls.get_block_result.decode, len);

    return result.value as protocol.block;
  }

  export function getBlockField(field: string): value.value_type | null {
    const args = new system_calls.get_block_field_arguments(field);
    const encodedArgs = Protobuf.encode(args, system_calls.get_block_field_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_block_field, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_block_field_result>(readBuffer, system_calls.get_block_field_result.decode, len);

    return result.value;
  }

  export function getLastIrreversibleBlock(): u64 {
    const args = new system_calls.get_last_irreversible_block_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_last_irreversible_block_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_last_irreversible_block, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_last_irreversible_block_result>(readBuffer, system_calls.get_last_irreversible_block_result.decode, len);

    return result.value;
  }

  export function getAccountNonce(account: Uint8Array): Uint8Array | null {
    const args = new system_calls.get_account_nonce_arguments(account);
    const encodedArgs = Protobuf.encode(args, system_calls.get_account_nonce_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_account_nonce, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_account_nonce_result>(readBuffer, system_calls.get_account_nonce_result.decode, len);

    return result.value;
  }

  export function verifyAccountNonce(account: Uint8Array, nonce: Uint8Array): bool {
    const args = new system_calls.verify_account_nonce_arguments(account, nonce);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_account_nonce_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.verify_account_nonce, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.verify_account_nonce_result>(readBuffer, system_calls.verify_account_nonce_result.decode, len);

    return result.value;
  }

  export function setAccountNonce(account: Uint8Array, nonce: Uint8Array): void {
    const args = new system_calls.set_account_nonce_arguments(account, nonce);

    const encodedArgs = Protobuf.encode(args, system_calls.set_account_nonce_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.verify_account_nonce, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function requireSystemAuthority(type: system_calls.system_authorization_type): void {
    const args = new system_calls.require_system_authority_arguments(type);
    const encodedArgs = Protobuf.encode(args, system_calls.require_system_authority_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.require_system_authority, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  // Resource Subsystem

  export function getAccountRC(account: Uint8Array): u64 {
    const args = new system_calls.get_account_rc_arguments(account);
    const encodedArgs = Protobuf.encode(args, system_calls.get_account_rc_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_account_rc, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_account_rc_result>(readBuffer, system_calls.get_account_rc_result.decode, len);

    return result.value;
  }

  export function consumeAccountRC(account: Uint8Array, value: u64): bool {
    const args = new system_calls.consume_account_rc_arguments(account, value);
    const encodedArgs = Protobuf.encode(args, system_calls.consume_account_rc_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.consume_account_rc, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.consume_account_rc_result>(readBuffer, system_calls.consume_account_rc_result.decode, len);

    return result.value;
  }

  export function getResourceLimits(): chain.resource_limit_data {
    const args = new system_calls.get_resource_limits_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_resource_limits_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_resource_limits, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_resource_limits_result>(readBuffer, system_calls.get_resource_limits_result.decode, len);

    return result.value as chain.resource_limit_data;
  }

  export function consumeBlockResources(disk_storage_consumed: u64, network_bandwidth_consumed: u64, compute_bandwidth_consumed: u64): bool {
    const args = new system_calls.consume_block_resources_arguments(disk_storage_consumed, network_bandwidth_consumed, compute_bandwidth_consumed);
    const encodedArgs = Protobuf.encode(args, system_calls.consume_block_resources_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.consume_block_resources, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.consume_block_resources_result>(readBuffer, system_calls.consume_block_resources_result.decode, len);

    return result.value;
  }

  // Logging

  export function log(s: string): void {
    const args = new system_calls.log_arguments(s);
    const encodedArgs = Protobuf.encode(args, system_calls.log_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.log, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function event(name: string, data: Uint8Array, impacted: Array<Uint8Array>): void {
    const args = new system_calls.event_arguments(name, data, impacted);
    const encodedArgs = Protobuf.encode(args, system_calls.event_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.event, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  // Cryptography

  export function hash(code: u64, obj: Uint8Array, size: u64 = 0): Uint8Array | null {
    const args = new system_calls.hash_arguments(code, obj, size);
    const encodedArgs = Protobuf.encode(args, system_calls.hash_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.hash, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.hash_result>(readBuffer, system_calls.hash_result.decode, len);

    return result.value;
  }

  export function recoverPublicKey(signatureData: Uint8Array, digest: Uint8Array, type: system_calls.dsa = system_calls.dsa.ecdsa_secp256k1): Uint8Array | null {
    const args = new system_calls.recover_public_key_arguments(type, signatureData, digest);
    const encodedArgs = Protobuf.encode(args, system_calls.recover_public_key_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.recover_public_key, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.recover_public_key_result>(readBuffer, system_calls.recover_public_key_result.decode, len);

    return result.value;
  }

  export function verifyMerkleRoot(root: Uint8Array, hashes: Array<Uint8Array>): bool {
    const args = new system_calls.verify_merkle_root_arguments(root, hashes);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_merkle_root_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.verify_merkle_root, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.verify_merkle_root_result>(readBuffer, system_calls.verify_merkle_root_result.decode, len);

    return result.value;
  }

  export function verifySignature(publicKey: Uint8Array, signature: Uint8Array, digest: Uint8Array, type: system_calls.dsa = system_calls.dsa.ecdsa_secp256k1): bool {
    const args = new system_calls.verify_signature_arguments(type, publicKey, signature, digest);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_signature_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.verify_signature, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.verify_signature_result>(readBuffer, system_calls.verify_signature_result.decode, len);

    return result.value;
  }

  // Contract Management

  export function callContract(contractId: Uint8Array, entryPoint: u32, contractArgs: Uint8Array): Uint8Array | null {
    const args = new system_calls.call_contract_arguments(contractId, entryPoint, contractArgs);
    const encodedArgs = Protobuf.encode(args, system_calls.call_contract_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.call_contract, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.call_contract_result>(readBuffer, system_calls.call_contract_result.decode, len);

    return result.value;
  }

  export function getEntryPoint(): u32 {
    const args = new system_calls.get_entry_point_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_entry_point_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
    const len = env.invokeSystemCall(system_call_id.get_entry_point, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_entry_point_result>(readBuffer, system_calls.get_entry_point_result.decode, len);

    return result.value;
  }

  export function getContractArguments(): Uint8Array {
    const args = new system_calls.get_contract_arguments_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_contract_arguments_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_contract_arguments, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_contract_arguments_result>(readBuffer, system_calls.get_contract_arguments_result.decode, len);

    if (result.value) {
      return result.value as Uint8Array;
    }

    return new Uint8Array(0);
  }

  export function setContractResult(res: Uint8Array | null): void {
    const args = new system_calls.set_contract_result_arguments(res);
    const encodedArgs = Protobuf.encode(args, system_calls.set_contract_result_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.set_contract_result, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function exitContract(exitCode: i32): void {
    const args = new system_calls.exit_contract_arguments(exitCode);
    const encodedArgs = Protobuf.encode(args, system_calls.exit_contract_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.exit_contract, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function getContractId(): Uint8Array {
    const args = new system_calls.get_contract_id_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_contract_id_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_contract_id, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_contract_id_result>(readBuffer, system_calls.get_contract_id_result.decode, len);

    return result.value as Uint8Array;
  }

  export function getCaller(): chain.caller_data {
    const args = new system_calls.get_caller_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_caller_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_caller, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.get_caller_result>(readBuffer, system_calls.get_caller_result.decode, len);

    return result.value as chain.caller_data;
  }

  export function requireAuthority(type: authority.authorization_type, account: Uint8Array): void {
    const args = new system_calls.require_authority_arguments(type, account);
    const encodedArgs = Protobuf.encode(args, system_calls.require_authority_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.require_authority, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function assert<T>(isTrueish: T): T {

    if (!isTrueish) {
      exitContract(1);
    }

    return isTrueish;
  }

  // Database

  /**
   * Store bytes (Uint8Array)
   * @param { chain.object_space } space
   * @param { string | Uint8Array } key key of object to store (string or Uint8Array)
   * @param { Uint8Array } obj bytes to store (Uint8Array)
   * @returns { i32 } number of bytes that were put in the database
   */
  export function putBytes<K>(space: chain.object_space, key: K, obj: Uint8Array): i32 {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key === "string") {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exitContract(1);
    }

    // @ts-ignore
    const args = new system_calls.put_object_arguments(space, finalKey, obj);
    const encodedArgs = Protobuf.encode(args, system_calls.put_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.put_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<system_calls.put_object_result>(readBuffer, system_calls.put_object_result.decode, len);

    return result.value;
  }

  /**
   * Store proto object
   * @param { chain.object_space } space
   * @param { string | Uint8Array } key key of object to store (string or Uint8Array)
   * @param { TMessage } obj object to store (string or Uint8Array)
   * @returns { bool } key already existed
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
   * Get bytes (Uint8Array)
   * @param { chain.object_space } space
   * @param { string | Uint8Array } key key of object
   * @returns Uint8Array | null
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

    const len = env.invokeSystemCall(system_call_id.get_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);

    if (!len) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_object_result>(readBuffer, system_calls.get_object_result.decode, len);

    return (result.value as system_calls.database_object).value;
  }

  /**
   * Get proto object
   * @param { string | Uint8Array } key key of object
   * @returns proto object (TMessage) or null
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

    return Protobuf.decode<TMessage>(value as Uint8Array, decoder);
  }

  class ProtoDatabaseObject<TMessage> {
    value: TMessage;
    key: Uint8Array | null;

    constructor(obj: system_calls.database_object, decoder: (reader: Reader, length: i32) => TMessage) {
      this.key = obj.key;
      this.value = Protobuf.decode<TMessage>(obj.value as Uint8Array, decoder);
    }
  }

  /**
   * Get next bytes (Uint8Array)
   * @param { string | Uint8Array } key key of object
   * @returns system_calls.database_object
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

    const len = env.invokeSystemCall(system_call_id.get_next_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    if (!len) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_next_object_result>(readBuffer, system_calls.get_next_object_result.decode, len);
    return result.value as system_calls.database_object;
  }


  /**
   * Get next proto object
   * @param { string | Uint8Array } key key of object
   * @returns proto object (TMessage)
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

    const len = env.invokeSystemCall(system_call_id.get_prev_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);

    if (!len) {
      return null;
    }
  
    const result = Protobuf.decode<system_calls.get_prev_object_result>(readBuffer, system_calls.get_prev_object_result.decode, len);
    return result.value as system_calls.database_object;
  }

  /**
   * Get previous proto object
   * @param { string | Uint8Array } key key of object
   * @returns proto object (TMessage)
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
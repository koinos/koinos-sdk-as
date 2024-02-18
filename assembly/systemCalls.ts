import { env } from "./env";
import { Protobuf, Reader, Writer } from 'as-proto';
import { system_calls, system_call_ids, chain, protocol, authority, value, error, name_service } from '@koinos/proto-as';
import { Base58, StringBytes, Arrays } from "./util";

export namespace System {
  export const DEFAULT_MAX_BUFFER_SIZE = 1024;
  let MAX_BUFFER_SIZE = DEFAULT_MAX_BUFFER_SIZE;
  let SYSTEM_CALL_BUFFER = new Uint8Array(MAX_BUFFER_SIZE);
  let RETURN_BYTES = new Uint32Array(1);

  let ERROR_MESSAGE = "";

  function checkErrorCode(code: i32, message: Uint8Array): void {
    if (code != error.error_code.success)
    {
      let errorMessage = new Uint8Array(0);
      let eData = Protobuf.decode<chain.error_data>(message, chain.error_data.decode);
      if (eData.message != null)
        errorMessage = StringBytes.stringToBytes(eData.message);
      exit(code, errorMessage);
    }
  }

  export function setSystemBufferSize(size: u32): void {
    MAX_BUFFER_SIZE = size;
    SYSTEM_CALL_BUFFER = new Uint8Array(MAX_BUFFER_SIZE);
  }

  export function getSystemBufferSize(): u32 {
    return MAX_BUFFER_SIZE;
  }

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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_head_info, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_head_info_result>(SYSTEM_CALL_BUFFER, system_calls.get_head_info_result.decode, RETURN_BYTES[0]);

    return result.value!;
  }

  export function applyBlock(block: protocol.block): i32 {
    const args = new system_calls.apply_block_arguments(block);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_block_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.apply_block, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    ERROR_MESSAGE = StringBytes.bytesToString(SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    return retcode;
  }

  export function applyTransaction(transaction: protocol.transaction): i32 {
    const args = new system_calls.apply_transaction_arguments(transaction);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_transaction_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.apply_transaction, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    ERROR_MESSAGE = StringBytes.bytesToString(SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    return retcode;
  }

  export function applyUploadContractOperation(op: protocol.upload_contract_operation): i32 {
    const args = new system_calls.apply_upload_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_upload_contract_operation_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.apply_upload_contract_operation, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    ERROR_MESSAGE = StringBytes.bytesToString(SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    return retcode;
  }

  export function applyCallContractOperation(op: protocol.call_contract_operation): i32 {
    const args = new system_calls.apply_call_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_call_contract_operation_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.apply_call_contract_operation, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    ERROR_MESSAGE = StringBytes.bytesToString(SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    return retcode;
  }

  export function applySetSystemCallOperation(op: protocol.set_system_call_operation): i32 {
    const args = new system_calls.apply_set_system_call_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_set_system_call_operation_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.apply_set_system_call_operation, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    ERROR_MESSAGE = StringBytes.bytesToString(SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    return retcode;
  }

  export function applySetSystemContractOperation(op: protocol.set_system_contract_operation): i32 {
    const args = new system_calls.apply_set_system_contract_operation_arguments(op);
    const encodedArgs = Protobuf.encode(args, system_calls.apply_set_system_contract_operation_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.apply_set_system_contract_operation, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    ERROR_MESSAGE = StringBytes.bytesToString(SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    return retcode;
  }

  export function getChainId(): Uint8Array {
    const args = new system_calls.get_chain_id_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_chain_id_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_chain_id, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_chain_id_result>(SYSTEM_CALL_BUFFER, system_calls.get_chain_id_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  // System Helpers

  export function processBlockSignature(digest: Uint8Array, header: protocol.block_header, signature: Uint8Array): bool {
    const args = new system_calls.process_block_signature_arguments(digest, header, signature);
    const encodedArgs = Protobuf.encode(args, system_calls.process_block_signature_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.process_block_signature, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.process_block_signature_result>(SYSTEM_CALL_BUFFER, system_calls.process_block_signature_result.decode, RETURN_BYTES[0]);

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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_transaction, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_transaction_result>(SYSTEM_CALL_BUFFER, system_calls.get_transaction_result.decode, RETURN_BYTES[0]);

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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_transaction_field, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_transaction_field_result>(SYSTEM_CALL_BUFFER, system_calls.get_transaction_field_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  /**
    * Get the current operation
    * @returns protocol.operation
    * @example
    * ```ts
    *  const op = System.getOperation();
    * ```
    */
  export function getOperation(): protocol.operation {
    const args = new system_calls.get_operation_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_operation_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_operation, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_operation_result>(SYSTEM_CALL_BUFFER, system_calls.get_operation_result.decode, RETURN_BYTES[0]);

    return result.value!;
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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_block, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_block_result>(SYSTEM_CALL_BUFFER, system_calls.get_block_result.decode, RETURN_BYTES[0]);

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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_block_field, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_block_field_result>(SYSTEM_CALL_BUFFER, system_calls.get_block_field_result.decode, RETURN_BYTES[0]);

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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_last_irreversible_block, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_last_irreversible_block_result>(SYSTEM_CALL_BUFFER, system_calls.get_last_irreversible_block_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  export function getAccountNonce(account: Uint8Array): Uint8Array | null {
    const args = new system_calls.get_account_nonce_arguments(account);
    const encodedArgs = Protobuf.encode(args, system_calls.get_account_nonce_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_account_nonce, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_account_nonce_result>(SYSTEM_CALL_BUFFER, system_calls.get_account_nonce_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  export function verifyAccountNonce(account: Uint8Array, nonce: Uint8Array): bool {
    const args = new system_calls.verify_account_nonce_arguments(account, nonce);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_account_nonce_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.verify_account_nonce, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.verify_account_nonce_result>(SYSTEM_CALL_BUFFER, system_calls.verify_account_nonce_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  export function setAccountNonce(account: Uint8Array, nonce: Uint8Array): void {
    const args = new system_calls.set_account_nonce_arguments(account, nonce);

    const encodedArgs = Protobuf.encode(args, system_calls.set_account_nonce_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.verify_account_nonce, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
  }

  export function checkSystemAuthority(): bool {
    const args = new system_calls.check_system_authority_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.check_system_authority_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.check_system_authority, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    return Protobuf.decode<system_calls.check_system_authority_result>(SYSTEM_CALL_BUFFER, system_calls.check_system_authority_result.decode, RETURN_BYTES[0]).value;
  }

  export function requireSystemAuthority(): void {
    require(checkSystemAuthority());
  }

  // Resource Subsystem

  export function getAccountRC(account: Uint8Array): u64 {
    const args = new system_calls.get_account_rc_arguments(account);
    const encodedArgs = Protobuf.encode(args, system_calls.get_account_rc_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_account_rc, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_account_rc_result>(SYSTEM_CALL_BUFFER, system_calls.get_account_rc_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  export function consumeAccountRC(account: Uint8Array, value: u64): bool {
    const args = new system_calls.consume_account_rc_arguments(account, value);
    const encodedArgs = Protobuf.encode(args, system_calls.consume_account_rc_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.consume_account_rc, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.consume_account_rc_result>(SYSTEM_CALL_BUFFER, system_calls.consume_account_rc_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  export function getResourceLimits(): chain.resource_limit_data {
    const args = new system_calls.get_resource_limits_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_resource_limits_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_resource_limits, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_resource_limits_result>(SYSTEM_CALL_BUFFER, system_calls.get_resource_limits_result.decode, RETURN_BYTES[0]);

    return result.value!;
  }

  export function consumeBlockResources(disk_storage_consumed: u64, network_bandwidth_consumed: u64, compute_bandwidth_consumed: u64): bool {
    const args = new system_calls.consume_block_resources_arguments(disk_storage_consumed, network_bandwidth_consumed, compute_bandwidth_consumed);
    const encodedArgs = Protobuf.encode(args, system_calls.consume_block_resources_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.consume_block_resources, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.consume_block_resources_result>(SYSTEM_CALL_BUFFER, system_calls.consume_block_resources_result.decode, RETURN_BYTES[0]);

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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.log, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.event, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.hash, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.hash_result>(SYSTEM_CALL_BUFFER, system_calls.hash_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  /**
    * Recover a publick key given a signature and a digest that was signed by the public key
    * @param signatureData the signature of the digest
    * @param digest digest that was signed by the public key
    * @param type type of signature
    * @param compressed whether the public key should be compressed
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
  export function recoverPublicKey(signatureData: Uint8Array, digest: Uint8Array, type: chain.dsa = chain.dsa.ecdsa_secp256k1, compressed: bool = true): Uint8Array | null {
    const args = new system_calls.recover_public_key_arguments(type, signatureData, digest, compressed);
    const encodedArgs = Protobuf.encode(args, system_calls.recover_public_key_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.recover_public_key, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.recover_public_key_result>(SYSTEM_CALL_BUFFER, system_calls.recover_public_key_result.decode, RETURN_BYTES[0]);

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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.verify_merkle_root, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.verify_merkle_root_result>(SYSTEM_CALL_BUFFER, system_calls.verify_merkle_root_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  /**
    * Verify that a public key signed a digest
    * @param publicKey public key that signed the digest
    * @param signature signature of the digest
    * @param digest digest that was signed
    * @param type type of signature
    * @param compressed whether or not the public key is compressed
    * @returns bool
    * @example
    * ```ts
    * let verify = System.verifySignature(recoveredKey!, signatureData, digest!);
    * System.require(verify == true, `expected "true", got "${verify}"`);
    * ```
    */
  export function verifySignature(publicKey: Uint8Array, signature: Uint8Array, digest: Uint8Array, type: chain.dsa = chain.dsa.ecdsa_secp256k1, compressed: bool = true): bool {
    const args = new system_calls.verify_signature_arguments(type, publicKey, signature, digest, compressed);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_signature_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.verify_signature, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.verify_signature_result>(SYSTEM_CALL_BUFFER, system_calls.verify_signature_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  /**
   * Verifies a VRF proof
   * @param publicKey public key that generated the proof
   * @param proof the VRF proof itself
   * @param hash the hash of the proof
   * @param message the original message input
   * @param type type of signature
   */
  export function verifyVRFProof(publicKey: Uint8Array, proof: Uint8Array, hash: Uint8Array, message: Uint8Array, type: chain.dsa = chain.dsa.ecdsa_secp256k1): bool {
    const args = new system_calls.verify_vrf_proof_arguments(type, publicKey, proof, hash, message);
    const encodedArgs = Protobuf.encode(args, system_calls.verify_vrf_proof_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.verify_vrf_proof, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.verify_signature_result>(SYSTEM_CALL_BUFFER, system_calls.verify_signature_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  // Contract Management

  export class callReturn {
    code: i32 = 0;
    res: chain.result = new chain.result();
  }

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
    *   const transferRes = Protobuf.decode<koin.transfer_result>(resBuf, koin.transfer_result.decode, RETURN_BYTES[0]);
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
  export function call(contractId: Uint8Array, entryPoint: u32, contractArgs: Uint8Array): callReturn {
    const args = new system_calls.call_arguments(contractId, entryPoint, contractArgs);
    const encodedArgs = Protobuf.encode(args, system_calls.call_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.call, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);

    let result = new chain.result();
    if (retcode) {
      result.error = Protobuf.decode<chain.error_data>(SYSTEM_CALL_BUFFER, chain.error_data.decode, RETURN_BYTES[0]);
    }
    else {
      result.object = Protobuf.decode<system_calls.call_result>(SYSTEM_CALL_BUFFER, system_calls.call_result.decode, RETURN_BYTES[0]).value;
    }

    return { code: retcode, res: result };
  }

  export class getArgumentsReturn {
    constructor() {
      this.entry_point = 0;
      this.args = new Uint8Array(0);
    }

    entry_point: u32;
    args: Uint8Array;
  }

  /**
    * Get arguments that were used when calling the contract
    * @returns Uint8Array
    * @example
    * ```ts
    * const rdbuf = System.getContractArguments();
    * const contractArgs = Protobuf.decode<foobar.foobar_arguments>(rdbuf, foobar.foobar_arguments.decode, RETURN_BYTES[0]);
    * System.log('contractArgs: ' + contractArgs.value.toString());
    * ```
    */
  export function getArguments(): getArgumentsReturn {
    const args = new system_calls.get_arguments_arguments();
    const encodedArgs = Protobuf.encode(args, system_calls.get_arguments_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_arguments, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_arguments_result>(SYSTEM_CALL_BUFFER, system_calls.get_arguments_result.decode, RETURN_BYTES[0]);

    let ret = new getArgumentsReturn();

    if (result.value) {
      ret.entry_point = result.value!.entry_point;
      ret.args = result.value!.arguments;
    }

    return ret;
  }

  /**
    * Exit a contract
    * @param exitCode 0 (success) or 1 (failed, will revert the transaction)
    * @example
    * ```ts
    * System.exitContract(0);
    * ```
    */
  export function exit(code: i32, value: Uint8Array | null = null): void {
    let args = new system_calls.exit_arguments();
    args.code = code;

    if (value) {
      if (code == error.error_code.success) {
        args.res = new chain.result(value);
      } else {
        args.res = new chain.result(new Uint8Array(0), new chain.error_data(StringBytes.bytesToString(value)));
      }
    }

    const encodedArgs = Protobuf.encode(args, system_calls.exit_arguments.encode);

    env.invokeSystemCall(system_call_ids.system_call_id.exit, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
  }

  /**
   * Fail the transaction in progress
   * @param message Optional failure message
   * @param code Optional error code, must be < 0, else code -1 is used (failure exit code)
   * ```ts
   * if (!System.checkAuthority(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe)))
   *   System.fail("contract is not authorized");
   * ```
   */
  export function fail(message: string = "", code: i32 = -1): void {
    let args = new system_calls.exit_arguments();
    args.res = new chain.result(new Uint8Array(0), new chain.error_data(message));
    args.code = code < error.error_code.success ? code : error.error_code.failure;

    const encodedArgs = Protobuf.encode(args, system_calls.exit_arguments.encode);

    env.invokeSystemCall(system_call_ids.system_call_id.exit, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
  }

  /**
   * Revert the transaction in progress
   * @param message Optional reversion message
   * @param code Optional error code, must be > 0, else code 1 is used (reverted exit code)
   * ```ts
   * if (!System.checkAuthority(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe)))
   *   System.revert("contract is not authorized");
   * ```
   */
  export function revert(message: string = "", code: i32 = 1): void {
    let args = new system_calls.exit_arguments();
    args.res = new chain.result(new Uint8Array(0), new chain.error_data(message));
    args.code = code > error.error_code.success ? code : error.error_code.reversion;

    const encodedArgs = Protobuf.encode(args, system_calls.exit_arguments.encode);

    env.invokeSystemCall(system_call_ids.system_call_id.exit, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
  }

  /**
   * Gets a stored error message after a system call that can return an error.
   * @returns string
   * @example
   * ```ts
   * if (System.applyTransaction(trx) != error.error_code.success)
   *   System.log(getErrorMessage())
   * ```
   */
  export function getErrorMessage(): string {
    return ERROR_MESSAGE;
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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_contract_id, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_contract_id_result>(SYSTEM_CALL_BUFFER, system_calls.get_contract_id_result.decode, RETURN_BYTES[0]);

    return result.value;
  }

  /**
   * Get the name of a system contract for a given address
   * @param address The address of the system contract
   * @returns string The contract's name
   * @example
   * ```ts
   * const name = System.getContractName(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'));
   * System.log('contract name: ' + name);
   * ```
   */
  export function getContractName(address:Uint8Array): string {
    const args = new name_service.get_name_arguments(address);
    const encodedArgs = Protobuf.encode(args, name_service.get_name_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_contract_name, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<name_service.get_name_result>(SYSTEM_CALL_BUFFER, name_service.get_name_result.decode, RETURN_BYTES[0]);

    return result.value!.name;
  }

   /**
   * Get the address for a given system contract name
   * @param name The name of the system contract
   * @returns Uint8Array The contract's address
   * @example
   * ```ts
   * const address = System.getContractAddress('koin');
   * System.log('address (b58): ' + Base58.encode(address));
   * ```
   */
  export function getContractAddress(name:string): Uint8Array {
    const args = new name_service.get_address_arguments(name);
    const encodedArgs = Protobuf.encode(args, name_service.get_address_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_contract_address, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<name_service.get_address_result>(SYSTEM_CALL_BUFFER, name_service.get_address_result.decode, RETURN_BYTES[0]);

    return result.value!.address;
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

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_caller, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_caller_result>(SYSTEM_CALL_BUFFER, system_calls.get_caller_result.decode, RETURN_BYTES[0]);

    return result.value!;
  }

  /**
   * Get contract metadata
   */
  export function getContractMetadata(contractId: Uint8Array): chain.contract_metadata_object | null {
    const args = new system_calls.get_contract_metadata_arguments(contractId);
    const encodedArgs = Protobuf.encode(args, system_calls.get_contract_metadata_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_contract_metadata, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.get_contract_metadata_result>(SYSTEM_CALL_BUFFER, system_calls.get_contract_metadata_result.decode, RETURN_BYTES[0]);
    return result.value;
  }

  /**
   * Legacy function to check authority for an account (not secure,
   * it is recommended to use System.checkAuthority or
   * System.checkCallContractAuthority)
   * @param type type of authority required
   * @param account account to check
   * @param data data to be passed
   * @returns bool true if the account has authority
   * @example
   * @deprecated
   * ```ts
   * System.checkAuthorityLegacy(authority.authorization_type.transaction_application, Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe));
   * ```
   */
  export function checkAuthorityLegacy(type: authority.authorization_type, account: Uint8Array, data: Uint8Array | null = null): bool {
    const args = new system_calls.check_authority_arguments(type, account, data !== null ? data : new Uint8Array(0));
    const encodedArgs = Protobuf.encode(args, system_calls.check_authority_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.check_authority, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.check_authority_result>(SYSTEM_CALL_BUFFER, system_calls.check_authority_result.decode, RETURN_BYTES[0]);
    return result.value;
  }

  /**
   * Check authority for an account
   * @param account account to check
   * @param type type of authority required. By default it uses contract_call
   * @param data data to be passed. By default it uses operation args
   * @param caller contract caller. By default it calls the function to get the caller
   * @returns bool true if the account has authority
   * @example
   * ```ts
   * // check contract call authority
   * System.checkAuthority(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe));
   *
   * // if you already have the caller or args you can
   * // pass them to save mana
   * System.checkAuthority(
   *   Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe),
   *   authority.authorization_type.contract_call,
   *   args,
   *   caller
   * );
   * ```
   */
  export function checkAuthority(
    account: Uint8Array,
    type: authority.authorization_type = authority.authorization_type.contract_call,
    data: Uint8Array | null = getArguments().args,
    caller: Uint8Array | null = getCaller().caller
  ): bool {
    // if there is a caller and the account does not use a
    // smart wallet then reject the operation. Otherwise call
    // the native check authority thunk
    if (caller && caller.length > 0) {
      if (Arrays.equal(caller, account)) return true;
      const contractMetadata = getContractMetadata(account);
      if (
        !contractMetadata ||
        (type == authority.authorization_type.contract_call && !contractMetadata.authorizes_call_contract) ||
        (type == authority.authorization_type.contract_upload && !contractMetadata.authorizes_upload_contract) ||
        (type == authority.authorization_type.transaction_application && !contractMetadata.authorizes_transaction_application)
      ) {
        return false;
      }
    }

    // call the native check authority thunk
    const args = new system_calls.check_authority_arguments(type, account, data !== null ? data : new Uint8Array(0));
    const encodedArgs = Protobuf.encode(args, system_calls.check_authority_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.check_authority, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
    const result = Protobuf.decode<system_calls.check_authority_result>(SYSTEM_CALL_BUFFER, system_calls.check_authority_result.decode, RETURN_BYTES[0]);
    return result.value;
  }

  /**
   * Require authority for an account
   * @param account account to check
   * @param type type of authority required. By default it uses contract_call
   * @param data data to be passed. By default it uses operation args
   * @param caller contract caller. By default it calls the function to get the caller
   * @throws revert the transaction if the account is not authorized
   * @example
   * ```ts
   * // check contract call authority
   * System.requireAuthority(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe));
   *
   * // if you already have the caller or args you can
   * // pass them to save mana
   * System.requireAuthority(
   *   Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe),
   *   authority.authorization_type.contract_call,
   *   args,
   *   caller
   * );
   * ```
   */
  export function requireAuthority(
    account: Uint8Array,
    type: authority.authorization_type = authority.authorization_type.contract_call,
    data: Uint8Array | null = getArguments().args,
    caller: Uint8Array | null = getCaller().caller
  ): void {
    require(checkAuthority(account, type, data, caller), "account '" + Base58.encode(account) + "' authorization failed", error.error_code.authorization_failure);
  }

  /**
    * Require an expression to be true, log a message and exit the contract otherise
    * @returns T it is Trueish, will exit the contract with `exitCode` otherwise
    * @example
    * ```ts
    * System.require(1 + 1 == 11, `expected "11", got "2"`);
    * ```
    */
  export function require<T>(isTrueish: T, message: string = "", code: i32 = 1): T {

    if (!isTrueish) {
      exit(code, StringBytes.stringToBytes(message));
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
  export function putBytes<K>(space: chain.object_space, key: K, obj: Uint8Array): void {
    let finalKey: Uint8Array = new Uint8Array(0);
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == "string") {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exit(1, StringBytes.stringToBytes("An invalid key was passed to putBytes"));
    }

    const args = new system_calls.put_object_arguments(space, finalKey, obj);
    const encodedArgs = Protobuf.encode(args, system_calls.put_object_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.put_object, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
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
  ): void {
    let finalObj = Protobuf.encode<TMessage>(obj, encoder);

    putBytes(space, key, finalObj);
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
    let finalKey: Uint8Array = new Uint8Array(0);
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == "string") {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exit(1, StringBytes.stringToBytes("An invalid key was passed to removeObject"));
    }

    const args = new system_calls.remove_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.remove_object_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.remove_object, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));
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
    *   const str = StringBytes.bytesToString(obj);
    *   System.log(str);
    * }
    * ```
   */
  export function getBytes<K>(
    space: chain.object_space,
    key: K
  ): Uint8Array | null {
    let finalKey: Uint8Array = new Uint8Array(0);
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exit(1, StringBytes.stringToBytes("An invalid key was passed to getBytes"));
    }

    const args = new system_calls.get_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.get_object_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_object, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));

    if (!RETURN_BYTES[0]) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_object_result>(SYSTEM_CALL_BUFFER, system_calls.get_object_result.decode, RETURN_BYTES[0]);

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
      this.value = Protobuf.decode<TMessage>(obj.value, decoder);
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
    let finalKey: Uint8Array = new Uint8Array(0);
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exit(1, StringBytes.stringToBytes("An invalid key was passed to getNextBytes"));
    }

    const args = new system_calls.get_next_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.get_next_object_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_next_object, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));

    if (retcode) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_next_object_result>(SYSTEM_CALL_BUFFER, system_calls.get_next_object_result.decode, RETURN_BYTES[0]);
    return result.value;
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
    let finalKey: Uint8Array = new Uint8Array(0);
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      exit(1, StringBytes.stringToBytes("An invalid key was passed to getPrevBytes"));
    }

    const args = new system_calls.get_prev_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, system_calls.get_prev_object_arguments.encode);

    const retcode = env.invokeSystemCall(system_call_ids.system_call_id.get_prev_object, SYSTEM_CALL_BUFFER.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength, RETURN_BYTES.dataStart as u32);
    checkErrorCode(retcode, SYSTEM_CALL_BUFFER.slice(0, RETURN_BYTES[0]));

    if (retcode) {
      return null;
    }

    const result = Protobuf.decode<system_calls.get_prev_object_result>(SYSTEM_CALL_BUFFER, system_calls.get_prev_object_result.decode, RETURN_BYTES[0]);
    return result.value;
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

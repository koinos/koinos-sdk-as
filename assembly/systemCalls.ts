import { env } from "./env";
import { Protobuf, Reader, Writer } from 'as-proto';
import { chain } from "./proto/chain";
import { system_call_id } from "./proto/system_call_ids";
import { StringBytes } from "./util";

const MAX_BUFFER_SIZE = 2 ** 10;

export namespace System {
  export function getEntryPoint(): u32 {
    const args = new chain.get_entry_point_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_entry_point_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
    const len = env.invokeSystemCall(system_call_id.get_entry_point, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_entry_point_result>(readBuffer, chain.get_entry_point_result.decode, len);

    return result.value;
  }

  export function getContractArguments(): Uint8Array {
    const args = new chain.get_contract_arguments_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_contract_arguments_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_contract_arguments, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_contract_arguments_result>(readBuffer, chain.get_contract_arguments_result.decode, len);

    if (result.value) {
      return result.value as Uint8Array;
    }

    return new Uint8Array(0);
  }

  export function getContractArgumentsSize(): u32 {
    const args = new chain.get_contract_arguments_size_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_contract_arguments_size_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_contract_arguments_size, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_contract_arguments_size_result>(readBuffer, chain.get_contract_arguments_size_result.decode, len);

    return result.value;
  }

  export function setContractResultBytes(res: Uint8Array | null): void {
    const args = new chain.set_contract_result_arguments(res);
    const encodedArgs = Protobuf.encode(args, chain.set_contract_result_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.set_contract_result, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function exitContract(exitCode: i32): void {
    const args = new chain.exit_contract_arguments(exitCode);
    const encodedArgs = Protobuf.encode(args, chain.exit_contract_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.exit_contract, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function print(s: string): void {
    const args = new chain.prints_arguments(s);
    const encodedArgs = Protobuf.encode(args, chain.prints_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.prints, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function getHeadInfo(): chain.head_info {
    const args = new chain.get_head_info_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_head_info_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_head_info, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_head_info_result>(readBuffer, chain.get_head_info_result.decode, len);

    return result.value as chain.head_info;
  }

  export function hash(code: u64, obj: Uint8Array, size: u64 = 0): Uint8Array {
    const args = new chain.hash_arguments(code, obj, size);
    const encodedArgs = Protobuf.encode(args, chain.hash_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.hash, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.hash_result>(readBuffer, chain.hash_result.decode, len);

    if (result.value) {
      return result.value as Uint8Array;
    }

    return new Uint8Array(0);
  }

  export function recoverPublicKey(signatureData: Uint8Array, digest: Uint8Array): Uint8Array {
    const args = new chain.recover_public_key_arguments(signatureData, digest);
    const encodedArgs = Protobuf.encode(args, chain.recover_public_key_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.recover_public_key, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.recover_public_key_result>(readBuffer, chain.recover_public_key_result.decode, len);

    if (result.value) {
      return result.value as Uint8Array;
    }

    return new Uint8Array(0);
  }

  export function getLastIrreversibleBlock(): u64 {
    const args = new chain.get_last_irreversible_block_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_last_irreversible_block_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_last_irreversible_block, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_last_irreversible_block_result>(readBuffer, chain.get_last_irreversible_block_result.decode, len);

    return result.value;
  }

  export function getCaller(): chain.caller_data {
    const args = new chain.get_caller_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_caller_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_caller, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_caller_result>(readBuffer, chain.get_caller_result.decode, len);

    return result.value as chain.caller_data;
  }

  export function requireAuthority(account: Uint8Array): void {
    const args = new chain.require_authority_arguments(account);
    const encodedArgs = Protobuf.encode(args, chain.require_authority_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    env.invokeSystemCall(system_call_id.require_authority, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
  }

  export function getContractId(): Uint8Array {
    const args = new chain.get_contract_id_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_contract_id_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_contract_id, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_contract_id_result>(readBuffer, chain.get_contract_id_result.decode, len);

    return result.value as Uint8Array;
  }

  /**
   * Store bytes (Uint8Array)
   * @param { string | Uint8Array } key key of object to store (string or Uint8Array)
   * @param { Uint8Array } obj bytes to store (Uint8Array)
   * @returns { bool } key already existed
   */
  export function putBytes<K>(space: chain.object_space, key: K, obj: Uint8Array): bool {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key === "string") {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      print('key type is not supported');
      exitContract(1);
    }

    // @ts-ignore
    const args = new chain.put_object_arguments(space, finalKey, obj);
    const encodedArgs = Protobuf.encode(args, chain.put_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.put_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.put_object_result>(readBuffer, chain.put_object_result.decode, len);

    return result.value;
  }

  /**
   * Store proto object
   * @param { string | Uint8Array } key key of object to store (string or Uint8Array)
   * @param { TMessage } obj object to store (string or Uint8Array)
   * @returns { bool } key already existed
   */
  export function putObject<K, TMessage>(
    space: chain.object_space,
    key: K,
    obj: TMessage,
    encoder: (message: TMessage, writer: Writer) => void
  ): bool {
    let finalObj = Protobuf.encode<TMessage>(obj, encoder);

    return putBytes(space, key, finalObj);
  }

  /**
   * Get bytes (Uint8Array)
   * @param { string | Uint8Array } key key of object
   * @returns bytes (Uint8Array)
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
      print('key type is not supported');
      exitContract(1);
    }

    // @ts-ignore
    const args = new chain.get_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, chain.get_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_object_result>(readBuffer, chain.get_object_result.decode, len);

    if (result.value) {
      return result.value as Uint8Array;
    }

    return null;
  }

  /**
   * Get proto object
   * @param { string | Uint8Array } key key of object
   * @returns proto object (TMessage)
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

  /**
   * Get next bytes (Uint8Array)
   * @param { string | Uint8Array } key key of object
   * @returns bytes (Uint8Array)
   */
  export function getNextBytes<K>(
    space: chain.object_space,
    key: K
  ): Uint8Array | null {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      print('key type is not supported');
      exitContract(1);
    }

    // @ts-ignore
    const args = new chain.get_next_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, chain.get_next_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_next_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_next_object_result>(readBuffer, chain.get_next_object_result.decode, len);
    
    if (result.value) {
      return result.value as Uint8Array;
    }

    return null;
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
  ): TMessage | null {

    const value = getNextBytes(space, key);

    if (!value) {
      return null;
    }

    return Protobuf.decode<TMessage>(value, decoder);
  }

  /**
   * Get previous bytes (Uint8Array)
   * @param { string | Uint8Array } key key of object
   * @returns bytes (Uint8Array)
   */
  export function getPrevBytes<K>(
    space: chain.object_space,
    key: K
  ): Uint8Array | null {
    let finalKey: Uint8Array;
    if (key instanceof Uint8Array) {
      finalKey = key;
    } else if (typeof key == 'string') {
      finalKey = StringBytes.stringToBytes(key);
    } else {
      print('key type is not supported');
      exitContract(1);
    }

    // @ts-ignore
    const args = new chain.get_prev_object_arguments(space, finalKey);
    const encodedArgs = Protobuf.encode(args, chain.get_prev_object_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_prev_object, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_prev_object_result>(readBuffer, chain.get_prev_object_result.decode, len);
    
    if (result.value) {
      return result.value as Uint8Array;
    }

    return null;
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
  ): TMessage | null {

    const value = getPrevBytes(space, key);

    if (!value) {
      return null;
    }

    return Protobuf.decode<TMessage>(value, decoder);
  }

  export function callContract(contractId: Uint8Array, entryPoint: u32, contractArgs: Uint8Array): Uint8Array {
    const args = new chain.call_contract_arguments(contractId, entryPoint, contractArgs);
    const encodedArgs = Protobuf.encode(args, chain.call_contract_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.call_contract, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.call_contract_result>(readBuffer, chain.call_contract_result.decode, len);

    if (result.value) {
      return result.value as Uint8Array;
    }

    return new Uint8Array(0);
  }

  export function getAccountRC(account: Uint8Array): u64 {
    const args = new chain.get_account_rc_arguments(account);
    const encodedArgs = Protobuf.encode(args, chain.get_account_rc_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_account_rc, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_account_rc_result>(readBuffer, chain.get_account_rc_result.decode, len);

    return result.value;
  }

  export function getTransactionSignature(): Uint8Array {
    const args = new chain.get_transaction_signature_arguments();
    const encodedArgs = Protobuf.encode(args, chain.get_transaction_signature_arguments.encode);
    const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);

    const len = env.invokeSystemCall(system_call_id.get_transaction_signature, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedArgs.dataStart as u32, encodedArgs.byteLength);
    const result = Protobuf.decode<chain.get_transaction_signature_result>(readBuffer, chain.get_transaction_signature_result.decode, len);

    return result.value as Uint8Array;
  }

  export function assert<T>(isTrueish: T, message?: string): T {

    if (!isTrueish) {
      if (message) {
        print(message);
      }
      exitContract(1);
    }

    return isTrueish;
  }
}
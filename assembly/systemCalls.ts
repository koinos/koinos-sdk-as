import { env } from "./env/env";
import { Protobuf } from 'as-proto';
import { chain } from "./protos/chain";
import { system_call_id } from "./protos/system_call_ids";

const MAX_BUFFER_SIZE = 2 ** 10;

export namespace system {
    export function getEntryPoint(): u32 {
      const entryPointArguments = new chain.get_entry_point_arguments();
      const encodedEntryPointArguments = Protobuf.encode(entryPointArguments, chain.get_entry_point_arguments.encode);
      const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
      env.invoke_system_call(system_call_id.get_entry_point, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedEntryPointArguments.dataStart as u32, encodedEntryPointArguments.byteLength);
      const getEntryPointResult = Protobuf.decode<chain.get_entry_point_result>(readBuffer, chain.get_entry_point_result.decode);

      return getEntryPointResult.value;
    }

    export function getContractArguments(): Uint8Array {
      const getContractArgumentsArguments = new chain.get_contract_arguments_arguments();
      const encodedGetContractArgumentsArguments = Protobuf.encode(getContractArgumentsArguments, chain.get_contract_arguments_arguments.encode);
      const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
    
      env.invoke_system_call(system_call_id.get_contract_arguments, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedGetContractArgumentsArguments.dataStart as u32, encodedGetContractArgumentsArguments.byteLength);
      const getContractArgumentsResult = Protobuf.decode<chain.get_contract_arguments_result>(readBuffer, chain.get_contract_arguments_result.decode);

      return getContractArgumentsResult.value as Uint8Array;
    }

    export function setContractResultBytes(res: Uint8Array | null): void {        
      const setContractResultArguments = new chain.set_contract_result_arguments(res);
      const encodedSetContractResultArguments = Protobuf.encode(setContractResultArguments, chain.set_contract_result_arguments.encode);
      const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
    
      env.invoke_system_call(system_call_id.set_contract_result, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedSetContractResultArguments.dataStart as u32, encodedSetContractResultArguments.byteLength);
    }

    export function exitContract(exitCode: i32): void {
      const exitContractArguments = new chain.exit_contract_arguments(exitCode);
      const encodedExitContractArguments = Protobuf.encode(exitContractArguments, chain.exit_contract_arguments.encode);
      const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
    
      env.invoke_system_call(system_call_id.exit_contract, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedExitContractArguments.dataStart as u32, encodedExitContractArguments.byteLength);
    }

    export function print(s: string): void {
      const printsArguments = new chain.prints_arguments(s);
      const encodedPrintsArgument = Protobuf.encode(printsArguments, chain.prints_arguments.encode);
      const readBuffer = new Uint8Array(MAX_BUFFER_SIZE);
    
      env.invoke_system_call(system_call_id.prints, readBuffer.dataStart as u32, MAX_BUFFER_SIZE, encodedPrintsArgument.dataStart as u32, encodedPrintsArgument.byteLength);
    }
}
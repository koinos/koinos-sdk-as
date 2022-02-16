import { Writer, Reader } from "as-proto";

export namespace authority {
  export class call_target {
    static encode(message: call_target, writer: Writer): void {
      const contract_id = message.contract_id;
      if (contract_id !== null) {
        writer.uint32(10);
        writer.bytes(contract_id);
      }

      writer.uint32(16);
      writer.uint32(message.entry_point);
    }

    static decode(reader: Reader, length: i32): call_target {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_target();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contract_id = reader.bytes();
            break;

          case 2:
            message.entry_point = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contract_id: Uint8Array | null;
    entry_point: u32;

    constructor(contract_id: Uint8Array | null = null, entry_point: u32 = 0) {
      this.contract_id = contract_id;
      this.entry_point = entry_point;
    }
  }

  export class authorize_arguments {
    static encode(message: authorize_arguments, writer: Writer): void {
      writer.uint32(8);
      writer.int32(message.type);

      const call = message.call;
      if (call !== null) {
        writer.uint32(18);
        writer.fork();
        authority.call_target.encode(call, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): authorize_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new authorize_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.type = reader.int32();
            break;

          case 2:
            message.call = authority.call_target.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    type: authority.authorization_type;
    call: authority.call_target | null;

    constructor(
      type: authority.authorization_type = 0,
      call: authority.call_target | null = null
    ) {
      this.type = type;
      this.call = call;
    }
  }

  @unmanaged
  export class authorize_result {
    static encode(message: authorize_result, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): authorize_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new authorize_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  export enum authorization_type {
    contract_call = 0,
    transaction_application = 1,
    contract_upload = 2,
  }
}

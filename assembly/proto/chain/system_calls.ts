import { Writer, Reader } from "as-proto";
import { chain } from "./chain";
import { protocol } from "../protocol/protocol";
import { value as koinos_value } from "./value";
import { authority } from "./authority";

export namespace system_calls {
  @unmanaged
  export class get_head_info_arguments {
    static encode(message: get_head_info_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_head_info_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_head_info_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_head_info_result {
    static encode(message: get_head_info_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        chain.head_info.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_head_info_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_head_info_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = chain.head_info.decode(
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

    value: chain.head_info | null;

    constructor(value: chain.head_info | null = null) {
      this.value = value;
    }
  }

  export class apply_block_arguments {
    static encode(message: apply_block_arguments, writer: Writer): void {
      const block = message.block;
      if (block !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.block.encode(block, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): apply_block_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_block_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.block = protocol.block.decode(
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

    block: protocol.block | null;

    constructor(block: protocol.block | null = null) {
      this.block = block;
    }
  }

  @unmanaged
  export class apply_block_result {
    static encode(message: apply_block_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): apply_block_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_block_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_transaction_arguments {
    static encode(
      message: apply_transaction_arguments,
      writer: Writer
    ): void {
      const transaction = message.transaction;
      if (transaction !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.transaction.encode(transaction, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): apply_transaction_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_transaction_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.transaction = protocol.transaction.decode(
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

    transaction: protocol.transaction | null;

    constructor(transaction: protocol.transaction | null = null) {
      this.transaction = transaction;
    }
  }

  @unmanaged
  export class apply_transaction_result {
    static encode(message: apply_transaction_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): apply_transaction_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_transaction_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_upload_contract_operation_arguments {
    static encode(
      message: apply_upload_contract_operation_arguments,
      writer: Writer
    ): void {
      const op = message.op;
      if (op !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.upload_contract_operation.encode(op, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): apply_upload_contract_operation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_upload_contract_operation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.op = protocol.upload_contract_operation.decode(
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

    op: protocol.upload_contract_operation | null;

    constructor(op: protocol.upload_contract_operation | null = null) {
      this.op = op;
    }
  }

  @unmanaged
  export class apply_upload_contract_operation_result {
    static encode(
      message: apply_upload_contract_operation_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): apply_upload_contract_operation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_upload_contract_operation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_call_contract_operation_arguments {
    static encode(
      message: apply_call_contract_operation_arguments,
      writer: Writer
    ): void {
      const op = message.op;
      if (op !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.call_contract_operation.encode(op, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): apply_call_contract_operation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_call_contract_operation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.op = protocol.call_contract_operation.decode(
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

    op: protocol.call_contract_operation | null;

    constructor(op: protocol.call_contract_operation | null = null) {
      this.op = op;
    }
  }

  @unmanaged
  export class apply_call_contract_operation_result {
    static encode(
      message: apply_call_contract_operation_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): apply_call_contract_operation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_call_contract_operation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_set_system_call_operation_arguments {
    static encode(
      message: apply_set_system_call_operation_arguments,
      writer: Writer
    ): void {
      const op = message.op;
      if (op !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.set_system_call_operation.encode(op, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): apply_set_system_call_operation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_set_system_call_operation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.op = protocol.set_system_call_operation.decode(
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

    op: protocol.set_system_call_operation | null;

    constructor(op: protocol.set_system_call_operation | null = null) {
      this.op = op;
    }
  }

  @unmanaged
  export class apply_set_system_call_operation_result {
    static encode(
      message: apply_set_system_call_operation_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): apply_set_system_call_operation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_set_system_call_operation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class apply_set_system_contract_operation_arguments {
    static encode(
      message: apply_set_system_contract_operation_arguments,
      writer: Writer
    ): void {
      const op = message.op;
      if (op !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.set_system_contract_operation.encode(op, writer);
        writer.ldelim();
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): apply_set_system_contract_operation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_set_system_contract_operation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.op = protocol.set_system_contract_operation.decode(
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

    op: protocol.set_system_contract_operation | null;

    constructor(
      op: protocol.set_system_contract_operation | null = null
    ) {
      this.op = op;
    }
  }

  @unmanaged
  export class apply_set_system_contract_operation_result {
    static encode(
      message: apply_set_system_contract_operation_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): apply_set_system_contract_operation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new apply_set_system_contract_operation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class pre_block_callback_arguments {
    static encode(
      message: pre_block_callback_arguments,
      writer: Writer
    ): void { }

    static decode(reader: Reader, length: i32): pre_block_callback_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new pre_block_callback_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class pre_block_callback_result {
    static encode(message: pre_block_callback_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): pre_block_callback_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new pre_block_callback_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class post_block_callback_arguments {
    static encode(
      message: post_block_callback_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): post_block_callback_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new post_block_callback_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class post_block_callback_result {
    static encode(
      message: post_block_callback_result,
      writer: Writer
    ): void { }

    static decode(reader: Reader, length: i32): post_block_callback_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new post_block_callback_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class pre_transaction_callback_arguments {
    static encode(
      message: pre_transaction_callback_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): pre_transaction_callback_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new pre_transaction_callback_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class pre_transaction_callback_result {
    static encode(
      message: pre_transaction_callback_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): pre_transaction_callback_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new pre_transaction_callback_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class post_transaction_callback_arguments {
    static encode(
      message: post_transaction_callback_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): post_transaction_callback_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new post_transaction_callback_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class post_transaction_callback_result {
    static encode(
      message: post_transaction_callback_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): post_transaction_callback_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new post_transaction_callback_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class process_block_signature_arguments {
    static encode(
      message: process_block_signature_arguments,
      writer: Writer
    ): void {
      const digest = message.digest;
      if (digest !== null) {
        writer.uint32(10);
        writer.bytes(digest);
      }

      const header = message.header;
      if (header !== null) {
        writer.uint32(18);
        writer.fork();
        protocol.block_header.encode(header, writer);
        writer.ldelim();
      }

      const signature = message.signature;
      if (signature !== null) {
        writer.uint32(26);
        writer.bytes(signature);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): process_block_signature_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new process_block_signature_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.digest = reader.bytes();
            break;

          case 2:
            message.header = protocol.block_header.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.signature = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    digest: Uint8Array | null;
    header: protocol.block_header | null;
    signature: Uint8Array | null;

    constructor(
      digest: Uint8Array | null = null,
      header: protocol.block_header | null = null,
      signature: Uint8Array | null = null
    ) {
      this.digest = digest;
      this.header = header;
      this.signature = signature;
    }
  }

  @unmanaged
  export class process_block_signature_result {
    static encode(
      message: process_block_signature_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): process_block_signature_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new process_block_signature_result();

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

  @unmanaged
  export class get_transaction_arguments {
    static encode(message: get_transaction_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_transaction_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_transaction_result {
    static encode(message: get_transaction_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.transaction.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_transaction_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = protocol.transaction.decode(
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

    value: protocol.transaction | null;

    constructor(value: protocol.transaction | null = null) {
      this.value = value;
    }
  }

  export class get_transaction_field_arguments {
    static encode(
      message: get_transaction_field_arguments,
      writer: Writer
    ): void {
      const field = message.field;
      if (field !== null) {
        writer.uint32(10);
        writer.string(field);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_transaction_field_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_field_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.field = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    field: string | null;

    constructor(field: string | null = null) {
      this.field = field;
    }
  }

  export class get_transaction_field_result {
    static encode(
      message: get_transaction_field_result,
      writer: Writer
    ): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        koinos_value.value_type.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_transaction_field_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_transaction_field_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = koinos_value.value_type.decode(
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

    value: koinos_value.value_type | null;

    constructor(value: koinos_value.value_type | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_block_arguments {
    static encode(message: get_block_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_block_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_block_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_block_result {
    static encode(message: get_block_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.block.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_block_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_block_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = protocol.block.decode(
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

    value: protocol.block | null;

    constructor(value: protocol.block | null = null) {
      this.value = value;
    }
  }

  export class get_block_field_arguments {
    static encode(message: get_block_field_arguments, writer: Writer): void {
      const field = message.field;
      if (field !== null) {
        writer.uint32(10);
        writer.string(field);
      }
    }

    static decode(reader: Reader, length: i32): get_block_field_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_block_field_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.field = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    field: string | null;

    constructor(field: string | null = null) {
      this.field = field;
    }
  }

  export class get_block_field_result {
    static encode(message: get_block_field_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        koinos_value.value_type.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_block_field_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_block_field_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = koinos_value.value_type.decode(
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

    value: koinos_value.value_type | null;

    constructor(value: koinos_value.value_type | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_last_irreversible_block_arguments {
    static encode(
      message: get_last_irreversible_block_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_last_irreversible_block_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_last_irreversible_block_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_last_irreversible_block_result {
    static encode(
      message: get_last_irreversible_block_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.uint64(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_last_irreversible_block_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_last_irreversible_block_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  export class get_account_nonce_arguments {
    static encode(
      message: get_account_nonce_arguments,
      writer: Writer
    ): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }
    }

    static decode(reader: Reader, length: i32): get_account_nonce_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_nonce_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  export class get_account_nonce_result {
    static encode(message: get_account_nonce_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): get_account_nonce_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_nonce_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class verify_account_nonce_arguments {
    static encode(
      message: verify_account_nonce_arguments,
      writer: Writer
    ): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }

      const nonce = message.nonce;
      if (nonce !== null) {
        writer.uint32(18);
        writer.bytes(nonce);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): verify_account_nonce_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_account_nonce_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          case 2:
            message.nonce = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;
    nonce: Uint8Array | null;

    constructor(
      account: Uint8Array | null = null,
      nonce: Uint8Array | null = null
    ) {
      this.account = account;
      this.nonce = nonce;
    }
  }

  @unmanaged
  export class verify_account_nonce_result {
    static encode(
      message: verify_account_nonce_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): verify_account_nonce_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_account_nonce_result();

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

  export class set_account_nonce_arguments {
    static encode(
      message: set_account_nonce_arguments,
      writer: Writer
    ): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }

      const nonce = message.nonce;
      if (nonce !== null) {
        writer.uint32(18);
        writer.bytes(nonce);
      }
    }

    static decode(reader: Reader, length: i32): set_account_nonce_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_account_nonce_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          case 2:
            message.nonce = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;
    nonce: Uint8Array | null;

    constructor(
      account: Uint8Array | null = null,
      nonce: Uint8Array | null = null
    ) {
      this.account = account;
      this.nonce = nonce;
    }
  }

  @unmanaged
  export class set_account_nonce_result {
    static encode(message: set_account_nonce_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): set_account_nonce_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_account_nonce_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class require_system_authority_arguments {
    static encode(
      message: require_system_authority_arguments,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.int32(message.type);
    }

    static decode(
      reader: Reader,
      length: i32
    ): require_system_authority_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new require_system_authority_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.type = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    type: system_authorization_type;

    constructor(type: system_authorization_type = 0) {
      this.type = type;
    }
  }

  @unmanaged
  export class require_system_authority_result {
    static encode(
      message: require_system_authority_result,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): require_system_authority_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new require_system_authority_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_account_rc_arguments {
    static encode(message: get_account_rc_arguments, writer: Writer): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }
    }

    static decode(reader: Reader, length: i32): get_account_rc_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_rc_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  @unmanaged
  export class get_account_rc_result {
    static encode(message: get_account_rc_result, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.value);
    }

    static decode(reader: Reader, length: i32): get_account_rc_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_account_rc_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  export class consume_account_rc_arguments {
    static encode(
      message: consume_account_rc_arguments,
      writer: Writer
    ): void {
      const account = message.account;
      if (account !== null) {
        writer.uint32(10);
        writer.bytes(account);
      }

      writer.uint32(16);
      writer.uint64(message.value);
    }

    static decode(reader: Reader, length: i32): consume_account_rc_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_account_rc_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          case 2:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;
    value: u64;

    constructor(account: Uint8Array | null = null, value: u64 = 0) {
      this.account = account;
      this.value = value;
    }
  }

  @unmanaged
  export class consume_account_rc_result {
    static encode(message: consume_account_rc_result, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): consume_account_rc_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_account_rc_result();

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

  @unmanaged
  export class get_resource_limits_arguments {
    static encode(
      message: get_resource_limits_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_resource_limits_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_resource_limits_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_resource_limits_result {
    static encode(message: get_resource_limits_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        chain.resource_limit_data.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_resource_limits_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_resource_limits_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = chain.resource_limit_data.decode(
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

    value: chain.resource_limit_data | null;

    constructor(value: chain.resource_limit_data | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class consume_block_resources_arguments {
    static encode(
      message: consume_block_resources_arguments,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.uint64(message.disk_storage_consumed);

      writer.uint32(16);
      writer.uint64(message.network_bandwidth_consumed);

      writer.uint32(24);
      writer.uint64(message.compute_bandwidth_consumed);
    }

    static decode(
      reader: Reader,
      length: i32
    ): consume_block_resources_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_block_resources_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.disk_storage_consumed = reader.uint64();
            break;

          case 2:
            message.network_bandwidth_consumed = reader.uint64();
            break;

          case 3:
            message.compute_bandwidth_consumed = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    disk_storage_consumed: u64;
    network_bandwidth_consumed: u64;
    compute_bandwidth_consumed: u64;

    constructor(
      disk_storage_consumed: u64 = 0,
      network_bandwidth_consumed: u64 = 0,
      compute_bandwidth_consumed: u64 = 0
    ) {
      this.disk_storage_consumed = disk_storage_consumed;
      this.network_bandwidth_consumed = network_bandwidth_consumed;
      this.compute_bandwidth_consumed = compute_bandwidth_consumed;
    }
  }

  @unmanaged
  export class consume_block_resources_result {
    static encode(
      message: consume_block_resources_result,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(
      reader: Reader,
      length: i32
    ): consume_block_resources_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_block_resources_result();

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

  export class put_object_arguments {
    static encode(message: put_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }

      const obj = message.obj;
      if (obj !== null) {
        writer.uint32(26);
        writer.bytes(obj);
      }
    }

    static decode(reader: Reader, length: i32): put_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new put_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          case 3:
            message.obj = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;
    obj: Uint8Array | null;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null,
      obj: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
      this.obj = obj;
    }
  }

  @unmanaged
  export class put_object_result {
    static encode(message: put_object_result, writer: Writer): void {
      writer.uint32(8);
      writer.int32(message.value);
    }

    static decode(reader: Reader, length: i32): put_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new put_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: i32;

    constructor(value: i32 = 0) {
      this.value = value;
    }
  }

  export class remove_object_arguments {
    static encode(message: remove_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }
    }

    static decode(reader: Reader, length: i32): remove_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new remove_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
    }
  }

  @unmanaged
  export class remove_object_result {
    static encode(message: remove_object_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): remove_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new remove_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_object_arguments {
    static encode(message: get_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }
    }

    static decode(reader: Reader, length: i32): get_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
    }
  }

  export class database_object {
    static encode(message: database_object, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.exists);

      const value = message.value;
      if (value !== null) {
        writer.uint32(18);
        writer.bytes(value);
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(26);
        writer.bytes(key);
      }
    }

    static decode(reader: Reader, length: i32): database_object {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new database_object();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.exists = reader.bool();
            break;

          case 2:
            message.value = reader.bytes();
            break;

          case 3:
            message.key = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    exists: bool;
    value: Uint8Array | null;
    key: Uint8Array | null;

    constructor(
      exists: bool = false,
      value: Uint8Array | null = null,
      key: Uint8Array | null = null
    ) {
      this.exists = exists;
      this.value = value;
      this.key = key;
    }
  }

  export class get_object_result {
    static encode(message: get_object_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        database_object.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = database_object.decode(
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

    value: database_object | null;

    constructor(value: database_object | null = null) {
      this.value = value;
    }
  }

  export class get_next_object_arguments {
    static encode(message: get_next_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }
    }

    static decode(reader: Reader, length: i32): get_next_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_next_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
    }
  }

  export class get_next_object_result {
    static encode(message: get_next_object_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        database_object.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_next_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_next_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = database_object.decode(
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

    value: database_object | null;

    constructor(value: database_object | null = null) {
      this.value = value;
    }
  }

  export class get_prev_object_arguments {
    static encode(message: get_prev_object_arguments, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        chain.object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }
    }

    static decode(reader: Reader, length: i32): get_prev_object_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_prev_object_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = chain.object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: chain.object_space | null;
    key: Uint8Array | null;

    constructor(
      space: chain.object_space | null = null,
      key: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
    }
  }

  export class get_prev_object_result {
    static encode(message: get_prev_object_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        database_object.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_prev_object_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_prev_object_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = database_object.decode(
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

    value: database_object | null;

    constructor(value: database_object | null = null) {
      this.value = value;
    }
  }

  export class log_arguments {
    static encode(message: log_arguments, writer: Writer): void {
      const message_2 = message.message;
      if (message_2 !== null) {
        writer.uint32(10);
        writer.string(message_2);
      }
    }

    static decode(reader: Reader, length: i32): log_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new log_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.message = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    message: string | null;

    constructor(message: string | null = null) {
      this.message = message;
    }
  }

  @unmanaged
  export class log_result {
    static encode(message: log_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): log_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new log_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class event_arguments {
    static encode(message: event_arguments, writer: Writer): void {
      const name = message.name;
      if (name !== null) {
        writer.uint32(10);
        writer.string(name);
      }

      const data = message.data;
      if (data !== null) {
        writer.uint32(18);
        writer.bytes(data);
      }

      const impacted = message.impacted;
      if (impacted.length !== 0) {
        for (let i = 0; i < impacted.length; ++i) {
          writer.uint32(26);
          writer.bytes(impacted[i]);
        }
      }
    }

    static decode(reader: Reader, length: i32): event_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new event_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.name = reader.string();
            break;

          case 2:
            message.data = reader.bytes();
            break;

          case 3:
            message.impacted.push(reader.bytes());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    name: string | null;
    data: Uint8Array | null;
    impacted: Array<Uint8Array>;

    constructor(
      name: string | null = null,
      data: Uint8Array | null = null,
      impacted: Array<Uint8Array> = []
    ) {
      this.name = name;
      this.data = data;
      this.impacted = impacted;
    }
  }

  @unmanaged
  export class event_result {
    static encode(message: event_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): event_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new event_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class hash_arguments {
    static encode(message: hash_arguments, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.code);

      const obj = message.obj;
      if (obj !== null) {
        writer.uint32(18);
        writer.bytes(obj);
      }

      writer.uint32(24);
      writer.uint64(message.size);
    }

    static decode(reader: Reader, length: i32): hash_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new hash_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.code = reader.uint64();
            break;

          case 2:
            message.obj = reader.bytes();
            break;

          case 3:
            message.size = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    code: u64;
    obj: Uint8Array | null;
    size: u64;

    constructor(code: u64 = 0, obj: Uint8Array | null = null, size: u64 = 0) {
      this.code = code;
      this.obj = obj;
      this.size = size;
    }
  }

  export class hash_result {
    static encode(message: hash_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): hash_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new hash_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class recover_public_key_arguments {
    static encode(
      message: recover_public_key_arguments,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.int32(message.type);

      const signature = message.signature;
      if (signature !== null) {
        writer.uint32(18);
        writer.bytes(signature);
      }

      const digest = message.digest;
      if (digest !== null) {
        writer.uint32(26);
        writer.bytes(digest);
      }
    }

    static decode(reader: Reader, length: i32): recover_public_key_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new recover_public_key_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.type = reader.int32();
            break;

          case 2:
            message.signature = reader.bytes();
            break;

          case 3:
            message.digest = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    type: dsa;
    signature: Uint8Array | null;
    digest: Uint8Array | null;

    constructor(
      type: dsa = 0,
      signature: Uint8Array | null = null,
      digest: Uint8Array | null = null
    ) {
      this.type = type;
      this.signature = signature;
      this.digest = digest;
    }
  }

  export class recover_public_key_result {
    static encode(message: recover_public_key_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): recover_public_key_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new recover_public_key_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class verify_merkle_root_arguments {
    static encode(
      message: verify_merkle_root_arguments,
      writer: Writer
    ): void {
      const root = message.root;
      if (root !== null) {
        writer.uint32(10);
        writer.bytes(root);
      }

      const hashes = message.hashes;
      if (hashes.length !== 0) {
        for (let i = 0; i < hashes.length; ++i) {
          writer.uint32(18);
          writer.bytes(hashes[i]);
        }
      }
    }

    static decode(reader: Reader, length: i32): verify_merkle_root_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_merkle_root_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.root = reader.bytes();
            break;

          case 2:
            message.hashes.push(reader.bytes());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    root: Uint8Array | null;
    hashes: Array<Uint8Array>;

    constructor(
      root: Uint8Array | null = null,
      hashes: Array<Uint8Array> = []
    ) {
      this.root = root;
      this.hashes = hashes;
    }
  }

  @unmanaged
  export class verify_merkle_root_result {
    static encode(message: verify_merkle_root_result, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): verify_merkle_root_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_merkle_root_result();

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

  export class verify_signature_arguments {
    static encode(message: verify_signature_arguments, writer: Writer): void {
      writer.uint32(8);
      writer.int32(message.type);

      const public_key = message.public_key;
      if (public_key !== null) {
        writer.uint32(18);
        writer.bytes(public_key);
      }

      const signature = message.signature;
      if (signature !== null) {
        writer.uint32(26);
        writer.bytes(signature);
      }

      const digest = message.digest;
      if (digest !== null) {
        writer.uint32(34);
        writer.bytes(digest);
      }
    }

    static decode(reader: Reader, length: i32): verify_signature_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_signature_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.type = reader.int32();
            break;

          case 2:
            message.public_key = reader.bytes();
            break;

          case 3:
            message.signature = reader.bytes();
            break;

          case 4:
            message.digest = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    type: dsa;
    public_key: Uint8Array | null;
    signature: Uint8Array | null;
    digest: Uint8Array | null;

    constructor(
      type: dsa = 0,
      public_key: Uint8Array | null = null,
      signature: Uint8Array | null = null,
      digest: Uint8Array | null = null
    ) {
      this.type = type;
      this.public_key = public_key;
      this.signature = signature;
      this.digest = digest;
    }
  }

  @unmanaged
  export class verify_signature_result {
    static encode(message: verify_signature_result, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.value);
    }

    static decode(reader: Reader, length: i32): verify_signature_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new verify_signature_result();

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

  export class call_contract_arguments {
    static encode(message: call_contract_arguments, writer: Writer): void {
      const contract_id = message.contract_id;
      if (contract_id !== null) {
        writer.uint32(10);
        writer.bytes(contract_id);
      }

      writer.uint32(16);
      writer.uint32(message.entry_point);

      const args = message.args;
      if (args !== null) {
        writer.uint32(26);
        writer.bytes(args);
      }
    }

    static decode(reader: Reader, length: i32): call_contract_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_contract_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contract_id = reader.bytes();
            break;

          case 2:
            message.entry_point = reader.uint32();
            break;

          case 3:
            message.args = reader.bytes();
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
    args: Uint8Array | null;

    constructor(
      contract_id: Uint8Array | null = null,
      entry_point: u32 = 0,
      args: Uint8Array | null = null
    ) {
      this.contract_id = contract_id;
      this.entry_point = entry_point;
      this.args = args;
    }
  }

  export class call_contract_result {
    static encode(message: call_contract_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): call_contract_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_contract_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_entry_point_arguments {
    static encode(message: get_entry_point_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_entry_point_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_entry_point_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_entry_point_result {
    static encode(message: get_entry_point_result, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.value);
    }

    static decode(reader: Reader, length: i32): get_entry_point_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_entry_point_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u32;

    constructor(value: u32 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_contract_arguments_arguments {
    static encode(
      message: get_contract_arguments_arguments,
      writer: Writer
    ): void { }

    static decode(
      reader: Reader,
      length: i32
    ): get_contract_arguments_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_arguments_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_contract_arguments_result {
    static encode(
      message: get_contract_arguments_result,
      writer: Writer
    ): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_contract_arguments_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_arguments_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  export class set_contract_result_arguments {
    static encode(
      message: set_contract_result_arguments,
      writer: Writer
    ): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): set_contract_result_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_contract_result_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class set_contract_result_result {
    static encode(
      message: set_contract_result_result,
      writer: Writer
    ): void { }

    static decode(reader: Reader, length: i32): set_contract_result_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_contract_result_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class exit_contract_arguments {
    static encode(message: exit_contract_arguments, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.exit_code);
    }

    static decode(reader: Reader, length: i32): exit_contract_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new exit_contract_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.exit_code = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    exit_code: u32;

    constructor(exit_code: u32 = 0) {
      this.exit_code = exit_code;
    }
  }

  @unmanaged
  export class exit_contract_result {
    static encode(message: exit_contract_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): exit_contract_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new exit_contract_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  @unmanaged
  export class get_contract_id_arguments {
    static encode(message: get_contract_id_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_contract_id_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_id_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_contract_id_result {
    static encode(message: get_contract_id_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): get_contract_id_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_contract_id_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class get_caller_arguments {
    static encode(message: get_caller_arguments, writer: Writer): void { }

    static decode(reader: Reader, length: i32): get_caller_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_caller_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export class get_caller_result {
    static encode(message: get_caller_result, writer: Writer): void {
      const value = message.value;
      if (value !== null) {
        writer.uint32(10);
        writer.fork();
        chain.caller_data.encode(value, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_caller_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_caller_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = chain.caller_data.decode(
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

    value: chain.caller_data | null;

    constructor(value: chain.caller_data | null = null) {
      this.value = value;
    }
  }

  export class require_authority_arguments {
    static encode(
      message: require_authority_arguments,
      writer: Writer
    ): void {
      writer.uint32(8);
      writer.int32(message.type);

      const account = message.account;
      if (account !== null) {
        writer.uint32(18);
        writer.bytes(account);
      }
    }

    static decode(reader: Reader, length: i32): require_authority_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new require_authority_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.type = reader.int32();
            break;

          case 2:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    type: authority.authorization_type;
    account: Uint8Array | null;

    constructor(
      type: authority.authorization_type = 0,
      account: Uint8Array | null = null
    ) {
      this.type = type;
      this.account = account;
    }
  }

  @unmanaged
  export class require_authority_result {
    static encode(message: require_authority_result, writer: Writer): void { }

    static decode(reader: Reader, length: i32): require_authority_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new require_authority_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() { }
  }

  export enum dsa {
    ecdsa_secp256k1 = 0,
  }

  export enum system_authorization_type {
    set_system_contract = 0,
    set_system_call = 1,
  }
}

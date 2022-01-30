import { Writer, Reader } from "as-proto";

export namespace protocol {
  export class contract_call_bundle {
    static encode(message: contract_call_bundle, writer: Writer): void {
      const contract_id = message.contract_id;
      if (contract_id !== null) {
        writer.uint32(10);
        writer.bytes(contract_id);
      }

      writer.uint32(16);
      writer.uint32(message.entry_point);
    }

    static decode(reader: Reader, length: i32): contract_call_bundle {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new contract_call_bundle();

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

  export class system_call_target {
    static encode(message: system_call_target, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.thunk_id);

      const system_call_bundle = message.system_call_bundle;
      if (system_call_bundle !== null) {
        writer.uint32(18);
        writer.fork();
        protocol.contract_call_bundle.encode(
          system_call_bundle,
          writer
        );
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): system_call_target {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new system_call_target();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.thunk_id = reader.uint32();
            break;

          case 2:
            message.system_call_bundle =
              protocol.contract_call_bundle.decode(
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

    thunk_id: u32;
    system_call_bundle: protocol.contract_call_bundle | null;

    constructor(
      thunk_id: u32 = 0,
      system_call_bundle: protocol.contract_call_bundle | null = null
    ) {
      this.thunk_id = thunk_id;
      this.system_call_bundle = system_call_bundle;
    }
  }

  export class upload_contract_operation {
    static encode(message: upload_contract_operation, writer: Writer): void {
      const contract_id = message.contract_id;
      if (contract_id !== null) {
        writer.uint32(10);
        writer.bytes(contract_id);
      }

      const bytecode = message.bytecode;
      if (bytecode !== null) {
        writer.uint32(18);
        writer.bytes(bytecode);
      }
    }

    static decode(reader: Reader, length: i32): upload_contract_operation {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new upload_contract_operation();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contract_id = reader.bytes();
            break;

          case 2:
            message.bytecode = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contract_id: Uint8Array | null;
    bytecode: Uint8Array | null;

    constructor(
      contract_id: Uint8Array | null = null,
      bytecode: Uint8Array | null = null
    ) {
      this.contract_id = contract_id;
      this.bytecode = bytecode;
    }
  }

  export class call_contract_operation {
    static encode(message: call_contract_operation, writer: Writer): void {
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

    static decode(reader: Reader, length: i32): call_contract_operation {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new call_contract_operation();

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

  export class set_system_call_operation {
    static encode(message: set_system_call_operation, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.call_id);

      const target = message.target;
      if (target !== null) {
        writer.uint32(18);
        writer.fork();
        protocol.system_call_target.encode(target, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): set_system_call_operation {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_system_call_operation();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.call_id = reader.uint32();
            break;

          case 2:
            message.target = protocol.system_call_target.decode(
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

    call_id: u32;
    target: protocol.system_call_target | null;

    constructor(
      call_id: u32 = 0,
      target: protocol.system_call_target | null = null
    ) {
      this.call_id = call_id;
      this.target = target;
    }
  }

  export class operation {
    static encode(message: operation, writer: Writer): void {
      const upload_contract = message.upload_contract;
      if (upload_contract !== null) {
        writer.uint32(10);
        writer.fork();
        protocol.upload_contract_operation.encode(
          upload_contract,
          writer
        );
        writer.ldelim();
      }

      const call_contract = message.call_contract;
      if (call_contract !== null) {
        writer.uint32(18);
        writer.fork();
        protocol.call_contract_operation.encode(call_contract, writer);
        writer.ldelim();
      }

      const set_system_call = message.set_system_call;
      if (set_system_call !== null) {
        writer.uint32(26);
        writer.fork();
        protocol.set_system_call_operation.encode(
          set_system_call,
          writer
        );
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): operation {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new operation();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.upload_contract =
              protocol.upload_contract_operation.decode(
                reader,
                reader.uint32()
              );
            break;

          case 2:
            message.call_contract =
              protocol.call_contract_operation.decode(
                reader,
                reader.uint32()
              );
            break;

          case 3:
            message.set_system_call =
              protocol.set_system_call_operation.decode(
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

    upload_contract: protocol.upload_contract_operation | null;
    call_contract: protocol.call_contract_operation | null;
    set_system_call: protocol.set_system_call_operation | null;

    constructor(
      upload_contract: protocol.upload_contract_operation | null = null,
      call_contract: protocol.call_contract_operation | null = null,
      set_system_call: protocol.set_system_call_operation | null = null
    ) {
      this.upload_contract = upload_contract;
      this.call_contract = call_contract;
      this.set_system_call = set_system_call;
    }
  }

  export class active_transaction_data {
    static encode(message: active_transaction_data, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.rc_limit);

      writer.uint32(16);
      writer.uint64(message.nonce);

      const operations = message.operations;
      for (let i = 0; i < operations.length; ++i) {
        writer.uint32(26);
        writer.fork();
        protocol.operation.encode(operations[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): active_transaction_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new active_transaction_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.rc_limit = reader.uint64();
            break;

          case 2:
            message.nonce = reader.uint64();
            break;

          case 3:
            message.operations.push(
              protocol.operation.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    rc_limit: u64;
    nonce: u64;
    operations: Array<protocol.operation>;

    constructor(
      rc_limit: u64 = 0,
      nonce: u64 = 0,
      operations: Array<protocol.operation> = []
    ) {
      this.rc_limit = rc_limit;
      this.nonce = nonce;
      this.operations = operations;
    }
  }

  @unmanaged
  export class passive_transaction_data {
    static encode(message: passive_transaction_data, writer: Writer): void { }

    static decode(reader: Reader, length: i32): passive_transaction_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new passive_transaction_data();

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

  export class transaction {
    static encode(message: transaction, writer: Writer): void {
      const id = message.id;
      if (id !== null) {
        writer.uint32(10);
        writer.bytes(id);
      }

      const active = message.active;
      if (active !== null) {
        writer.uint32(18);
        writer.bytes(active);
      }

      const passive = message.passive;
      if (passive !== null) {
        writer.uint32(26);
        writer.bytes(passive);
      }

      const signature_data = message.signature_data;
      if (signature_data !== null) {
        writer.uint32(34);
        writer.bytes(signature_data);
      }
    }

    static decode(reader: Reader, length: i32): transaction {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new transaction();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.id = reader.bytes();
            break;

          case 2:
            message.active = reader.bytes();
            break;

          case 3:
            message.passive = reader.bytes();
            break;

          case 4:
            message.signature_data = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    id: Uint8Array | null;
    active: Uint8Array | null;
    passive: Uint8Array | null;
    signature_data: Uint8Array | null;

    constructor(
      id: Uint8Array | null = null,
      active: Uint8Array | null = null,
      passive: Uint8Array | null = null,
      signature_data: Uint8Array | null = null
    ) {
      this.id = id;
      this.active = active;
      this.passive = passive;
      this.signature_data = signature_data;
    }
  }

  export class active_block_data {
    static encode(message: active_block_data, writer: Writer): void {
      const transaction_merkle_root = message.transaction_merkle_root;
      if (transaction_merkle_root !== null) {
        writer.uint32(10);
        writer.bytes(transaction_merkle_root);
      }

      const passive_data_merkle_root = message.passive_data_merkle_root;
      if (passive_data_merkle_root !== null) {
        writer.uint32(18);
        writer.bytes(passive_data_merkle_root);
      }

      const signer = message.signer;
      if (signer !== null) {
        writer.uint32(26);
        writer.bytes(signer);
      }
    }

    static decode(reader: Reader, length: i32): active_block_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new active_block_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.transaction_merkle_root = reader.bytes();
            break;

          case 2:
            message.passive_data_merkle_root = reader.bytes();
            break;

          case 3:
            message.signer = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    transaction_merkle_root: Uint8Array | null;
    passive_data_merkle_root: Uint8Array | null;
    signer: Uint8Array | null;

    constructor(
      transaction_merkle_root: Uint8Array | null = null,
      passive_data_merkle_root: Uint8Array | null = null,
      signer: Uint8Array | null = null
    ) {
      this.transaction_merkle_root = transaction_merkle_root;
      this.passive_data_merkle_root = passive_data_merkle_root;
      this.signer = signer;
    }
  }

  @unmanaged
  export class passive_block_data {
    static encode(message: passive_block_data, writer: Writer): void { }

    static decode(reader: Reader, length: i32): passive_block_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new passive_block_data();

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

  export class block_header {
    static encode(message: block_header, writer: Writer): void {
      const previous = message.previous;
      if (previous !== null) {
        writer.uint32(10);
        writer.bytes(previous);
      }

      writer.uint32(16);
      writer.uint64(message.height);

      writer.uint32(24);
      writer.uint64(message.timestamp);
    }

    static decode(reader: Reader, length: i32): block_header {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new block_header();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.previous = reader.bytes();
            break;

          case 2:
            message.height = reader.uint64();
            break;

          case 3:
            message.timestamp = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    previous: Uint8Array | null;
    height: u64;
    timestamp: u64;

    constructor(
      previous: Uint8Array | null = null,
      height: u64 = 0,
      timestamp: u64 = 0
    ) {
      this.previous = previous;
      this.height = height;
      this.timestamp = timestamp;
    }
  }

  export class block {
    static encode(message: block, writer: Writer): void {
      const id = message.id;
      if (id !== null) {
        writer.uint32(10);
        writer.bytes(id);
      }

      const header = message.header;
      if (header !== null) {
        writer.uint32(18);
        writer.fork();
        protocol.block_header.encode(header, writer);
        writer.ldelim();
      }

      const active = message.active;
      if (active !== null) {
        writer.uint32(26);
        writer.bytes(active);
      }

      const passive = message.passive;
      if (passive !== null) {
        writer.uint32(34);
        writer.bytes(passive);
      }

      const signature_data = message.signature_data;
      if (signature_data !== null) {
        writer.uint32(42);
        writer.bytes(signature_data);
      }

      const transactions = message.transactions;
      for (let i = 0; i < transactions.length; ++i) {
        writer.uint32(50);
        writer.fork();
        protocol.transaction.encode(transactions[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): block {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new block();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.id = reader.bytes();
            break;

          case 2:
            message.header = protocol.block_header.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.active = reader.bytes();
            break;

          case 4:
            message.passive = reader.bytes();
            break;

          case 5:
            message.signature_data = reader.bytes();
            break;

          case 6:
            message.transactions.push(
              protocol.transaction.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    id: Uint8Array | null;
    header: protocol.block_header | null;
    active: Uint8Array | null;
    passive: Uint8Array | null;
    signature_data: Uint8Array | null;
    transactions: Array<protocol.transaction>;

    constructor(
      id: Uint8Array | null = null,
      header: protocol.block_header | null = null,
      active: Uint8Array | null = null,
      passive: Uint8Array | null = null,
      signature_data: Uint8Array | null = null,
      transactions: Array<protocol.transaction> = []
    ) {
      this.id = id;
      this.header = header;
      this.active = active;
      this.passive = passive;
      this.signature_data = signature_data;
      this.transactions = transactions;
    }
  }

  @unmanaged
  export class block_receipt {
    static encode(message: block_receipt, writer: Writer): void { }

    static decode(reader: Reader, length: i32): block_receipt {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new block_receipt();

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
}

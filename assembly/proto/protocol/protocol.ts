import { Writer, Reader } from "as-proto";

export namespace protocol {
  export class event_data {
    static encode(message: event_data, writer: Writer): void {
      writer.uint32(8);
      writer.uint32(message.sequence);

      const source = message.source;
      if (source !== null) {
        writer.uint32(18);
        writer.bytes(source);
      }

      const name = message.name;
      if (name !== null) {
        writer.uint32(26);
        writer.string(name);
      }

      const data = message.data;
      if (data !== null) {
        writer.uint32(34);
        writer.bytes(data);
      }

      const impacted = message.impacted;
      if (impacted.length !== 0) {
        writer.uint32(42);
        writer.fork();
        for (let i = 0; i < impacted.length; ++i) {
          writer.bytes(impacted[i]);
        }
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): event_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new event_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.sequence = reader.uint32();
            break;

          case 2:
            message.source = reader.bytes();
            break;

          case 3:
            message.name = reader.string();
            break;

          case 4:
            message.data = reader.bytes();
            break;

          case 5:
            if ((tag & 7) === 2) {
              const repeatedEnd: usize = reader.ptr + reader.uint32();
              while (reader.ptr < repeatedEnd) {
                message.impacted.push(reader.bytes());
              }
            } else {
              message.impacted.push(reader.bytes());
            }
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    sequence: u32;
    source: Uint8Array | null;
    name: string | null;
    data: Uint8Array | null;
    impacted: Array<Uint8Array>;

    constructor(
      sequence: u32 = 0,
      source: Uint8Array | null = null,
      name: string | null = null,
      data: Uint8Array | null = null,
      impacted: Array<Uint8Array> = []
    ) {
      this.sequence = sequence;
      this.source = source;
      this.name = name;
      this.data = data;
      this.impacted = impacted;
    }
  }

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
        contract_call_bundle.encode(
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
              contract_call_bundle.decode(
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
    system_call_bundle: contract_call_bundle | null;

    constructor(
      thunk_id: u32 = 0,
      system_call_bundle: contract_call_bundle | null = null
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

      const abi = message.abi;
      if (abi !== null) {
        writer.uint32(26);
        writer.string(abi);
      }

      writer.uint32(32);
      writer.bool(message.authorizes_call_contract);

      writer.uint32(40);
      writer.bool(message.authorizes_transaction_application);

      writer.uint32(48);
      writer.bool(message.authorizes_upload_contract);
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

          case 3:
            message.abi = reader.string();
            break;

          case 4:
            message.authorizes_call_contract = reader.bool();
            break;

          case 5:
            message.authorizes_transaction_application = reader.bool();
            break;

          case 6:
            message.authorizes_upload_contract = reader.bool();
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
    abi: string | null;
    authorizes_call_contract: bool;
    authorizes_transaction_application: bool;
    authorizes_upload_contract: bool;

    constructor(
      contract_id: Uint8Array | null = null,
      bytecode: Uint8Array | null = null,
      abi: string | null = null,
      authorizes_call_contract: bool = false,
      authorizes_transaction_application: bool = false,
      authorizes_upload_contract: bool = false
    ) {
      this.contract_id = contract_id;
      this.bytecode = bytecode;
      this.abi = abi;
      this.authorizes_call_contract = authorizes_call_contract;
      this.authorizes_transaction_application =
        authorizes_transaction_application;
      this.authorizes_upload_contract = authorizes_upload_contract;
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
        system_call_target.encode(target, writer);
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
            message.target = system_call_target.decode(
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
    target: system_call_target | null;

    constructor(
      call_id: u32 = 0,
      target: system_call_target | null = null
    ) {
      this.call_id = call_id;
      this.target = target;
    }
  }

  export class set_system_contract_operation {
    static encode(
      message: set_system_contract_operation,
      writer: Writer
    ): void {
      const contract_id = message.contract_id;
      if (contract_id !== null) {
        writer.uint32(10);
        writer.bytes(contract_id);
      }

      writer.uint32(16);
      writer.bool(message.system_contract);
    }

    static decode(
      reader: Reader,
      length: i32
    ): set_system_contract_operation {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new set_system_contract_operation();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contract_id = reader.bytes();
            break;

          case 2:
            message.system_contract = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contract_id: Uint8Array | null;
    system_contract: bool;

    constructor(
      contract_id: Uint8Array | null = null,
      system_contract: bool = false
    ) {
      this.contract_id = contract_id;
      this.system_contract = system_contract;
    }
  }

  export class operation {
    static encode(message: operation, writer: Writer): void {
      const upload_contract = message.upload_contract;
      if (upload_contract !== null) {
        writer.uint32(10);
        writer.fork();
        upload_contract_operation.encode(
          upload_contract,
          writer
        );
        writer.ldelim();
      }

      const call_contract = message.call_contract;
      if (call_contract !== null) {
        writer.uint32(18);
        writer.fork();
        call_contract_operation.encode(call_contract, writer);
        writer.ldelim();
      }

      const set_system_call = message.set_system_call;
      if (set_system_call !== null) {
        writer.uint32(26);
        writer.fork();
        set_system_call_operation.encode(
          set_system_call,
          writer
        );
        writer.ldelim();
      }

      const set_system_contract = message.set_system_contract;
      if (set_system_contract !== null) {
        writer.uint32(34);
        writer.fork();
        set_system_contract_operation.encode(
          set_system_contract,
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
              upload_contract_operation.decode(
                reader,
                reader.uint32()
              );
            break;

          case 2:
            message.call_contract =
              call_contract_operation.decode(
                reader,
                reader.uint32()
              );
            break;

          case 3:
            message.set_system_call =
              set_system_call_operation.decode(
                reader,
                reader.uint32()
              );
            break;

          case 4:
            message.set_system_contract =
              set_system_contract_operation.decode(
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

    upload_contract: upload_contract_operation | null;
    call_contract: call_contract_operation | null;
    set_system_call: set_system_call_operation | null;
    set_system_contract: set_system_contract_operation | null;

    constructor(
      upload_contract: upload_contract_operation | null = null,
      call_contract: call_contract_operation | null = null,
      set_system_call: set_system_call_operation | null = null,
      set_system_contract: set_system_contract_operation | null = null
    ) {
      this.upload_contract = upload_contract;
      this.call_contract = call_contract;
      this.set_system_call = set_system_call;
      this.set_system_contract = set_system_contract;
    }
  }

  export class transaction_header {
    static encode(message: transaction_header, writer: Writer): void {
      const chain_id = message.chain_id;
      if (chain_id !== null) {
        writer.uint32(10);
        writer.bytes(chain_id);
      }

      writer.uint32(16);
      writer.uint64(message.rc_limit);

      const nonce = message.nonce;
      if (nonce !== null) {
        writer.uint32(26);
        writer.bytes(nonce);
      }

      const operation_merkle_root = message.operation_merkle_root;
      if (operation_merkle_root !== null) {
        writer.uint32(34);
        writer.bytes(operation_merkle_root);
      }

      const payer = message.payer;
      if (payer !== null) {
        writer.uint32(42);
        writer.bytes(payer);
      }

      const payee = message.payee;
      if (payee !== null) {
        writer.uint32(50);
        writer.bytes(payee);
      }
    }

    static decode(reader: Reader, length: i32): transaction_header {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new transaction_header();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.chain_id = reader.bytes();
            break;

          case 2:
            message.rc_limit = reader.uint64();
            break;

          case 3:
            message.nonce = reader.bytes();
            break;

          case 4:
            message.operation_merkle_root = reader.bytes();
            break;

          case 5:
            message.payer = reader.bytes();
            break;

          case 6:
            message.payee = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    chain_id: Uint8Array | null;
    rc_limit: u64;
    nonce: Uint8Array | null;
    operation_merkle_root: Uint8Array | null;
    payer: Uint8Array | null;
    payee: Uint8Array | null;

    constructor(
      chain_id: Uint8Array | null = null,
      rc_limit: u64 = 0,
      nonce: Uint8Array | null = null,
      operation_merkle_root: Uint8Array | null = null,
      payer: Uint8Array | null = null,
      payee: Uint8Array | null = null
    ) {
      this.chain_id = chain_id;
      this.rc_limit = rc_limit;
      this.nonce = nonce;
      this.operation_merkle_root = operation_merkle_root;
      this.payer = payer;
      this.payee = payee;
    }
  }

  export class transaction {
    static encode(message: transaction, writer: Writer): void {
      const id = message.id;
      if (id !== null) {
        writer.uint32(10);
        writer.bytes(id);
      }

      const header = message.header;
      if (header !== null) {
        writer.uint32(18);
        writer.fork();
        transaction_header.encode(header, writer);
        writer.ldelim();
      }

      const operations = message.operations;
      for (let i = 0; i < operations.length; ++i) {
        writer.uint32(26);
        writer.fork();
        operation.encode(operations[i], writer);
        writer.ldelim();
      }

      const signatures = message.signatures;
      if (signatures.length !== 0) {
        writer.uint32(34);
        writer.fork();
        for (let i = 0; i < signatures.length; ++i) {
          writer.bytes(signatures[i]);
        }
        writer.ldelim();
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
            message.header = transaction_header.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.operations.push(
              operation.decode(reader, reader.uint32())
            );
            break;

          case 4:
            if ((tag & 7) === 2) {
              const repeatedEnd: usize = reader.ptr + reader.uint32();
              while (reader.ptr < repeatedEnd) {
                message.signatures.push(reader.bytes());
              }
            } else {
              message.signatures.push(reader.bytes());
            }
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    id: Uint8Array | null;
    header: transaction_header | null;
    operations: Array<operation>;
    signatures: Array<Uint8Array>;

    constructor(
      id: Uint8Array | null = null,
      header: transaction_header | null = null,
      operations: Array<operation> = [],
      signatures: Array<Uint8Array> = []
    ) {
      this.id = id;
      this.header = header;
      this.operations = operations;
      this.signatures = signatures;
    }
  }

  export class transaction_receipt {
    static encode(message: transaction_receipt, writer: Writer): void {
      const id = message.id;
      if (id !== null) {
        writer.uint32(10);
        writer.bytes(id);
      }

      const payer = message.payer;
      if (payer !== null) {
        writer.uint32(18);
        writer.bytes(payer);
      }

      writer.uint32(24);
      writer.uint64(message.max_payer_rc);

      writer.uint32(32);
      writer.uint64(message.rc_limit);

      writer.uint32(40);
      writer.uint64(message.rc_used);

      writer.uint32(48);
      writer.uint64(message.disk_storage_used);

      writer.uint32(56);
      writer.uint64(message.network_bandwidth_used);

      writer.uint32(64);
      writer.uint64(message.compute_bandwidth_used);

      writer.uint32(72);
      writer.bool(message.reverted);

      const events = message.events;
      for (let i = 0; i < events.length; ++i) {
        writer.uint32(82);
        writer.fork();
        event_data.encode(events[i], writer);
        writer.ldelim();
      }

      const logs = message.logs;
      if (logs.length !== 0) {
        writer.uint32(90);
        writer.fork();
        for (let i = 0; i < logs.length; ++i) {
          writer.string(logs[i]);
        }
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): transaction_receipt {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new transaction_receipt();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.id = reader.bytes();
            break;

          case 2:
            message.payer = reader.bytes();
            break;

          case 3:
            message.max_payer_rc = reader.uint64();
            break;

          case 4:
            message.rc_limit = reader.uint64();
            break;

          case 5:
            message.rc_used = reader.uint64();
            break;

          case 6:
            message.disk_storage_used = reader.uint64();
            break;

          case 7:
            message.network_bandwidth_used = reader.uint64();
            break;

          case 8:
            message.compute_bandwidth_used = reader.uint64();
            break;

          case 9:
            message.reverted = reader.bool();
            break;

          case 10:
            message.events.push(
              event_data.decode(reader, reader.uint32())
            );
            break;

          case 11:
            if ((tag & 7) === 2) {
              const repeatedEnd: usize = reader.ptr + reader.uint32();
              while (reader.ptr < repeatedEnd) {
                message.logs.push(reader.string());
              }
            } else {
              message.logs.push(reader.string());
            }
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    id: Uint8Array | null;
    payer: Uint8Array | null;
    max_payer_rc: u64;
    rc_limit: u64;
    rc_used: u64;
    disk_storage_used: u64;
    network_bandwidth_used: u64;
    compute_bandwidth_used: u64;
    reverted: bool;
    events: Array<event_data>;
    logs: Array<string>;

    constructor(
      id: Uint8Array | null = null,
      payer: Uint8Array | null = null,
      max_payer_rc: u64 = 0,
      rc_limit: u64 = 0,
      rc_used: u64 = 0,
      disk_storage_used: u64 = 0,
      network_bandwidth_used: u64 = 0,
      compute_bandwidth_used: u64 = 0,
      reverted: bool = false,
      events: Array<event_data> = [],
      logs: Array<string> = []
    ) {
      this.id = id;
      this.payer = payer;
      this.max_payer_rc = max_payer_rc;
      this.rc_limit = rc_limit;
      this.rc_used = rc_used;
      this.disk_storage_used = disk_storage_used;
      this.network_bandwidth_used = network_bandwidth_used;
      this.compute_bandwidth_used = compute_bandwidth_used;
      this.reverted = reverted;
      this.events = events;
      this.logs = logs;
    }
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

      const previous_state_merkle_root = message.previous_state_merkle_root;
      if (previous_state_merkle_root !== null) {
        writer.uint32(34);
        writer.bytes(previous_state_merkle_root);
      }

      const transaction_merkle_root = message.transaction_merkle_root;
      if (transaction_merkle_root !== null) {
        writer.uint32(42);
        writer.bytes(transaction_merkle_root);
      }

      const signer = message.signer;
      if (signer !== null) {
        writer.uint32(50);
        writer.bytes(signer);
      }
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

          case 4:
            message.previous_state_merkle_root = reader.bytes();
            break;

          case 5:
            message.transaction_merkle_root = reader.bytes();
            break;

          case 6:
            message.signer = reader.bytes();
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
    previous_state_merkle_root: Uint8Array | null;
    transaction_merkle_root: Uint8Array | null;
    signer: Uint8Array | null;

    constructor(
      previous: Uint8Array | null = null,
      height: u64 = 0,
      timestamp: u64 = 0,
      previous_state_merkle_root: Uint8Array | null = null,
      transaction_merkle_root: Uint8Array | null = null,
      signer: Uint8Array | null = null
    ) {
      this.previous = previous;
      this.height = height;
      this.timestamp = timestamp;
      this.previous_state_merkle_root = previous_state_merkle_root;
      this.transaction_merkle_root = transaction_merkle_root;
      this.signer = signer;
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
        block_header.encode(header, writer);
        writer.ldelim();
      }

      const transactions = message.transactions;
      for (let i = 0; i < transactions.length; ++i) {
        writer.uint32(26);
        writer.fork();
        transaction.encode(transactions[i], writer);
        writer.ldelim();
      }

      const signature = message.signature;
      if (signature !== null) {
        writer.uint32(34);
        writer.bytes(signature);
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
            message.header = block_header.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.transactions.push(
              transaction.decode(reader, reader.uint32())
            );
            break;

          case 4:
            message.signature = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    id: Uint8Array | null;
    header: block_header | null;
    transactions: Array<transaction>;
    signature: Uint8Array | null;

    constructor(
      id: Uint8Array | null = null,
      header: block_header | null = null,
      transactions: Array<transaction> = [],
      signature: Uint8Array | null = null
    ) {
      this.id = id;
      this.header = header;
      this.transactions = transactions;
      this.signature = signature;
    }
  }

  export class block_receipt {
    static encode(message: block_receipt, writer: Writer): void {
      const id = message.id;
      if (id !== null) {
        writer.uint32(10);
        writer.bytes(id);
      }

      writer.uint32(16);
      writer.uint64(message.height);

      writer.uint32(24);
      writer.uint64(message.disk_storage_used);

      writer.uint32(32);
      writer.uint64(message.network_bandwidth_used);

      writer.uint32(40);
      writer.uint64(message.compute_bandwidth_used);

      const state_merkle_root = message.state_merkle_root;
      if (state_merkle_root !== null) {
        writer.uint32(50);
        writer.bytes(state_merkle_root);
      }

      const events = message.events;
      for (let i = 0; i < events.length; ++i) {
        writer.uint32(58);
        writer.fork();
        event_data.encode(events[i], writer);
        writer.ldelim();
      }

      const transaction_receipts = message.transaction_receipts;
      for (let i = 0; i < transaction_receipts.length; ++i) {
        writer.uint32(66);
        writer.fork();
        transaction_receipt.encode(
          transaction_receipts[i],
          writer
        );
        writer.ldelim();
      }

      const logs = message.logs;
      if (logs.length !== 0) {
        writer.uint32(74);
        writer.fork();
        for (let i = 0; i < logs.length; ++i) {
          writer.string(logs[i]);
        }
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): block_receipt {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new block_receipt();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.id = reader.bytes();
            break;

          case 2:
            message.height = reader.uint64();
            break;

          case 3:
            message.disk_storage_used = reader.uint64();
            break;

          case 4:
            message.network_bandwidth_used = reader.uint64();
            break;

          case 5:
            message.compute_bandwidth_used = reader.uint64();
            break;

          case 6:
            message.state_merkle_root = reader.bytes();
            break;

          case 7:
            message.events.push(
              event_data.decode(reader, reader.uint32())
            );
            break;

          case 8:
            message.transaction_receipts.push(
              transaction_receipt.decode(
                reader,
                reader.uint32()
              )
            );
            break;

          case 9:
            if ((tag & 7) === 2) {
              const repeatedEnd: usize = reader.ptr + reader.uint32();
              while (reader.ptr < repeatedEnd) {
                message.logs.push(reader.string());
              }
            } else {
              message.logs.push(reader.string());
            }
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    id: Uint8Array | null;
    height: u64;
    disk_storage_used: u64;
    network_bandwidth_used: u64;
    compute_bandwidth_used: u64;
    state_merkle_root: Uint8Array | null;
    events: Array<event_data>;
    transaction_receipts: Array<transaction_receipt>;
    logs: Array<string>;

    constructor(
      id: Uint8Array | null = null,
      height: u64 = 0,
      disk_storage_used: u64 = 0,
      network_bandwidth_used: u64 = 0,
      compute_bandwidth_used: u64 = 0,
      state_merkle_root: Uint8Array | null = null,
      events: Array<event_data> = [],
      transaction_receipts: Array<transaction_receipt> = [],
      logs: Array<string> = []
    ) {
      this.id = id;
      this.height = height;
      this.disk_storage_used = disk_storage_used;
      this.network_bandwidth_used = network_bandwidth_used;
      this.compute_bandwidth_used = compute_bandwidth_used;
      this.state_merkle_root = state_merkle_root;
      this.events = events;
      this.transaction_receipts = transaction_receipts;
      this.logs = logs;
    }
  }
}

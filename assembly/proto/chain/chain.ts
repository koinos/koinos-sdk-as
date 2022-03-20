import { Writer, Reader } from "as-proto";
import { common } from "../common";

export namespace chain {
  export class object_space {
    static encode(message: object_space, writer: Writer): void {
      writer.uint32(8);
      writer.bool(message.system);

      const zone = message.zone;
      if (zone !== null) {
        writer.uint32(18);
        writer.bytes(zone);
      }

      writer.uint32(24);
      writer.uint32(message.id);
    }

    static decode(reader: Reader, length: i32): object_space {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new object_space();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.system = reader.bool();
            break;

          case 2:
            message.zone = reader.bytes();
            break;

          case 3:
            message.id = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    system: bool;
    zone: Uint8Array | null;
    id: u32;

    constructor(
      system: bool = false,
      zone: Uint8Array | null = null,
      id: u32 = 0
    ) {
      this.system = system;
      this.zone = zone;
      this.id = id;
    }
  }

  export class database_key {
    static encode(message: database_key, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }
    }

    static decode(reader: Reader, length: i32): database_key {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new database_key();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = object_space.decode(
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

    space: object_space | null;
    key: Uint8Array | null;

    constructor(
      space: object_space | null = null,
      key: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
    }
  }

  @unmanaged
  export class max_account_resources {
    static encode(message: max_account_resources, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.value);
    }

    static decode(reader: Reader, length: i32): max_account_resources {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new max_account_resources();

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

  export class head_info {
    static encode(message: head_info, writer: Writer): void {
      const head_topology = message.head_topology;
      if (head_topology !== null) {
        writer.uint32(10);
        writer.fork();
        common.block_topology.encode(head_topology, writer);
        writer.ldelim();
      }

      writer.uint32(16);
      writer.uint64(message.head_block_time);

      writer.uint32(24);
      writer.uint64(message.last_irreversible_block);
    }

    static decode(reader: Reader, length: i32): head_info {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new head_info();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.head_topology = common.block_topology.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.head_block_time = reader.uint64();
            break;

          case 3:
            message.last_irreversible_block = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    head_topology: common.block_topology | null;
    head_block_time: u64;
    last_irreversible_block: u64;

    constructor(
      head_topology: common.block_topology | null = null,
      head_block_time: u64 = 0,
      last_irreversible_block: u64 = 0
    ) {
      this.head_topology = head_topology;
      this.head_block_time = head_block_time;
      this.last_irreversible_block = last_irreversible_block;
    }
  }

  export class caller_data {
    static encode(message: caller_data, writer: Writer): void {
      const caller = message.caller;
      if (caller !== null) {
        writer.uint32(10);
        writer.bytes(caller);
      }

      writer.uint32(16);
      writer.int32(message.caller_privilege);
    }

    static decode(reader: Reader, length: i32): caller_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new caller_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.caller = reader.bytes();
            break;

          case 2:
            message.caller_privilege = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    caller: Uint8Array | null;
    caller_privilege: privilege;

    constructor(
      caller: Uint8Array | null = null,
      caller_privilege: privilege = 0
    ) {
      this.caller = caller;
      this.caller_privilege = caller_privilege;
    }
  }

  @unmanaged
  export class resource_limit_data {
    static encode(message: resource_limit_data, writer: Writer): void {
      writer.uint32(8);
      writer.uint64(message.disk_storage_limit);

      writer.uint32(16);
      writer.uint64(message.disk_storage_cost);

      writer.uint32(24);
      writer.uint64(message.network_bandwidth_limit);

      writer.uint32(32);
      writer.uint64(message.network_bandwidth_cost);

      writer.uint32(40);
      writer.uint64(message.compute_bandwidth_limit);

      writer.uint32(48);
      writer.uint64(message.compute_bandwidth_cost);
    }

    static decode(reader: Reader, length: i32): resource_limit_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new resource_limit_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.disk_storage_limit = reader.uint64();
            break;

          case 2:
            message.disk_storage_cost = reader.uint64();
            break;

          case 3:
            message.network_bandwidth_limit = reader.uint64();
            break;

          case 4:
            message.network_bandwidth_cost = reader.uint64();
            break;

          case 5:
            message.compute_bandwidth_limit = reader.uint64();
            break;

          case 6:
            message.compute_bandwidth_cost = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    disk_storage_limit: u64;
    disk_storage_cost: u64;
    network_bandwidth_limit: u64;
    network_bandwidth_cost: u64;
    compute_bandwidth_limit: u64;
    compute_bandwidth_cost: u64;

    constructor(
      disk_storage_limit: u64 = 0,
      disk_storage_cost: u64 = 0,
      network_bandwidth_limit: u64 = 0,
      network_bandwidth_cost: u64 = 0,
      compute_bandwidth_limit: u64 = 0,
      compute_bandwidth_cost: u64 = 0
    ) {
      this.disk_storage_limit = disk_storage_limit;
      this.disk_storage_cost = disk_storage_cost;
      this.network_bandwidth_limit = network_bandwidth_limit;
      this.network_bandwidth_cost = network_bandwidth_cost;
      this.compute_bandwidth_limit = compute_bandwidth_limit;
      this.compute_bandwidth_cost = compute_bandwidth_cost;
    }
  }

  export class contract_metadata_object {
    static encode(message: contract_metadata_object, writer: Writer): void {
      const hash = message.hash;
      if (hash !== null) {
        writer.uint32(10);
        writer.bytes(hash);
      }

      writer.uint32(16);
      writer.bool(message.system);

      writer.uint32(24);
      writer.bool(message.authorizes_call_contract);

      writer.uint32(32);
      writer.bool(message.authorizes_transaction_application);

      writer.uint32(40);
      writer.bool(message.authorizes_upload_contract);
    }

    static decode(reader: Reader, length: i32): contract_metadata_object {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new contract_metadata_object();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.hash = reader.bytes();
            break;

          case 2:
            message.system = reader.bool();
            break;

          case 3:
            message.authorizes_call_contract = reader.bool();
            break;

          case 4:
            message.authorizes_transaction_application = reader.bool();
            break;

          case 5:
            message.authorizes_upload_contract = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    hash: Uint8Array | null;
    system: bool;
    authorizes_call_contract: bool;
    authorizes_transaction_application: bool;
    authorizes_upload_contract: bool;

    constructor(
      hash: Uint8Array | null = null,
      system: bool = false,
      authorizes_call_contract: bool = false,
      authorizes_transaction_application: bool = false,
      authorizes_upload_contract: bool = false
    ) {
      this.hash = hash;
      this.system = system;
      this.authorizes_call_contract = authorizes_call_contract;
      this.authorizes_transaction_application =
        authorizes_transaction_application;
      this.authorizes_upload_contract = authorizes_upload_contract;
    }
  }

  export class compute_bandwidth_entry {
    static encode(message: compute_bandwidth_entry, writer: Writer): void {
      const name = message.name;
      if (name !== null) {
        writer.uint32(10);
        writer.string(name);
      }

      writer.uint32(16);
      writer.uint64(message.compute);
    }

    static decode(reader: Reader, length: i32): compute_bandwidth_entry {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new compute_bandwidth_entry();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.name = reader.string();
            break;

          case 2:
            message.compute = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    name: string | null;
    compute: u64;

    constructor(name: string | null = null, compute: u64 = 0) {
      this.name = name;
      this.compute = compute;
    }
  }

  export class compute_bandwidth_registry {
    static encode(message: compute_bandwidth_registry, writer: Writer): void {
      const entries = message.entries;
      for (let i = 0; i < entries.length; ++i) {
        writer.uint32(10);
        writer.fork();
        compute_bandwidth_entry.encode(entries[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): compute_bandwidth_registry {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new compute_bandwidth_registry();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.entries.push(
              compute_bandwidth_entry.decode(
                reader,
                reader.uint32()
              )
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    entries: Array<compute_bandwidth_entry>;

    constructor(entries: Array<compute_bandwidth_entry> = []) {
      this.entries = entries;
    }
  }

  export class genesis_entry {
    static encode(message: genesis_entry, writer: Writer): void {
      const space = message.space;
      if (space !== null) {
        writer.uint32(10);
        writer.fork();
        object_space.encode(space, writer);
        writer.ldelim();
      }

      const key = message.key;
      if (key !== null) {
        writer.uint32(18);
        writer.bytes(key);
      }

      const value = message.value;
      if (value !== null) {
        writer.uint32(26);
        writer.bytes(value);
      }
    }

    static decode(reader: Reader, length: i32): genesis_entry {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new genesis_entry();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.space = object_space.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.key = reader.bytes();
            break;

          case 3:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    space: object_space | null;
    key: Uint8Array | null;
    value: Uint8Array | null;

    constructor(
      space: object_space | null = null,
      key: Uint8Array | null = null,
      value: Uint8Array | null = null
    ) {
      this.space = space;
      this.key = key;
      this.value = value;
    }
  }

  export class genesis_data {
    static encode(message: genesis_data, writer: Writer): void {
      const entries = message.entries;
      for (let i = 0; i < entries.length; ++i) {
        writer.uint32(10);
        writer.fork();
        genesis_entry.encode(entries[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): genesis_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new genesis_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.entries.push(
              genesis_entry.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    entries: Array<genesis_entry>;

    constructor(entries: Array<genesis_entry> = []) {
      this.entries = entries;
    }
  }

  export enum privilege {
    kernel_mode = 0,
    user_mode = 1,
  }
}
import { Writer, Reader } from "as-proto";

@unmanaged
export class name_arguments {
  static encode(message: name_arguments, writer: Writer): void {}

  static decode(reader: Reader, length: i32): name_arguments {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new name_arguments();

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

  constructor() {}
}

export class name_result {
  static encode(message: name_result, writer: Writer): void {
    const field_value = message.value;
    if (field_value !== null) {
      writer.uint32(10);
      writer.string(field_value);
    }
  }

  static decode(reader: Reader, length: i32): name_result {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new name_result();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  value: string | null;

  constructor(value: string | null = null) {
    this.value = value;
  }
}

@unmanaged
export class symbol_arguments {
  static encode(message: symbol_arguments, writer: Writer): void {}

  static decode(reader: Reader, length: i32): symbol_arguments {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new symbol_arguments();

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

  constructor() {}
}

export class symbol_result {
  static encode(message: symbol_result, writer: Writer): void {
    const field_value = message.value;
    if (field_value !== null) {
      writer.uint32(10);
      writer.string(field_value);
    }
  }

  static decode(reader: Reader, length: i32): symbol_result {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new symbol_result();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  value: string | null;

  constructor(value: string | null = null) {
    this.value = value;
  }
}

@unmanaged
export class decimals_arguments {
  static encode(message: decimals_arguments, writer: Writer): void {}

  static decode(reader: Reader, length: i32): decimals_arguments {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new decimals_arguments();

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

  constructor() {}
}

@unmanaged
export class decimals_result {
  static encode(message: decimals_result, writer: Writer): void {
    writer.uint32(8);
    writer.uint32(message.value);
  }

  static decode(reader: Reader, length: i32): decimals_result {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new decimals_result();

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
export class total_supply_arguments {
  static encode(message: total_supply_arguments, writer: Writer): void {}

  static decode(reader: Reader, length: i32): total_supply_arguments {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new total_supply_arguments();

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

  constructor() {}
}

@unmanaged
export class total_supply_result {
  static encode(message: total_supply_result, writer: Writer): void {
    writer.uint32(8);
    writer.uint64(message.value);
  }

  static decode(reader: Reader, length: i32): total_supply_result {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new total_supply_result();

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

export class balance_of_arguments {
  static encode(message: balance_of_arguments, writer: Writer): void {
    const field_owner = message.owner;
    if (field_owner !== null) {
      writer.uint32(10);
      writer.bytes(field_owner);
    }
  }

  static decode(reader: Reader, length: i32): balance_of_arguments {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new balance_of_arguments();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  owner: Uint8Array | null;

  constructor(owner: Uint8Array | null = null) {
    this.owner = owner;
  }
}

@unmanaged
export class balance_of_result {
  static encode(message: balance_of_result, writer: Writer): void {
    writer.uint32(8);
    writer.uint64(message.value);
  }

  static decode(reader: Reader, length: i32): balance_of_result {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new balance_of_result();

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

export class transfer_arguments {
  static encode(message: transfer_arguments, writer: Writer): void {
    const field_from = message.from;
    if (field_from !== null) {
      writer.uint32(10);
      writer.bytes(field_from);
    }

    const field_to = message.to;
    if (field_to !== null) {
      writer.uint32(18);
      writer.bytes(field_to);
    }

    writer.uint32(24);
    writer.uint64(message.value);
  }

  static decode(reader: Reader, length: i32): transfer_arguments {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new transfer_arguments();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.bytes();
          break;

        case 2:
          message.to = reader.bytes();
          break;

        case 3:
          message.value = reader.uint64();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  from: Uint8Array | null;
  to: Uint8Array | null;
  value: u64;

  constructor(
    from: Uint8Array | null = null,
    to: Uint8Array | null = null,
    value: u64 = 0
  ) {
    this.from = from;
    this.to = to;
    this.value = value;
  }
}

@unmanaged
export class transfer_result {
  static encode(message: transfer_result, writer: Writer): void {
    writer.uint32(8);
    writer.bool(message.value);
  }

  static decode(reader: Reader, length: i32): transfer_result {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new transfer_result();

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

export class mint_arguments {
  static encode(message: mint_arguments, writer: Writer): void {
    const field_to = message.to;
    if (field_to !== null) {
      writer.uint32(10);
      writer.bytes(field_to);
    }

    writer.uint32(16);
    writer.uint64(message.value);
  }

  static decode(reader: Reader, length: i32): mint_arguments {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new mint_arguments();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.to = reader.bytes();
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

  to: Uint8Array | null;
  value: u64;

  constructor(to: Uint8Array | null = null, value: u64 = 0) {
    this.to = to;
    this.value = value;
  }
}

@unmanaged
export class mint_result {
  static encode(message: mint_result, writer: Writer): void {
    writer.uint32(8);
    writer.bool(message.value);
  }

  static decode(reader: Reader, length: i32): mint_result {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new mint_result();

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
export class balance_object {
  static encode(message: balance_object, writer: Writer): void {
    writer.uint32(8);
    writer.uint64(message.value);
  }

  static decode(reader: Reader, length: i32): balance_object {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new balance_object();

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

@unmanaged
export class mana_balance_object {
  static encode(message: mana_balance_object, writer: Writer): void {
    writer.uint32(8);
    writer.uint64(message.balance);

    writer.uint32(16);
    writer.uint64(message.mana);

    writer.uint32(24);
    writer.uint64(message.last_mana_update);
  }

  static decode(reader: Reader, length: i32): mana_balance_object {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new mana_balance_object();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.uint64();
          break;

        case 2:
          message.mana = reader.uint64();
          break;

        case 3:
          message.last_mana_update = reader.uint64();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  balance: u64;
  mana: u64;
  last_mana_update: u64;

  constructor(balance: u64 = 0, mana: u64 = 0, last_mana_update: u64 = 0) {
    this.balance = balance;
    this.mana = mana;
    this.last_mana_update = last_mana_update;
  }
}

export class mint_event {
  static encode(message: mint_event, writer: Writer): void {
    const field_to = message.to;
    if (field_to !== null) {
      writer.uint32(10);
      writer.bytes(field_to);
    }

    writer.uint32(24);
    writer.uint64(message.value);
  }

  static decode(reader: Reader, length: i32): mint_event {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new mint_event();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.to = reader.bytes();
          break;

        case 3:
          message.value = reader.uint64();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  to: Uint8Array | null;
  value: u64;

  constructor(to: Uint8Array | null = null, value: u64 = 0) {
    this.to = to;
    this.value = value;
  }
}

export class transfer_event {
  static encode(message: transfer_event, writer: Writer): void {
    const field_from = message.from;
    if (field_from !== null) {
      writer.uint32(10);
      writer.bytes(field_from);
    }

    const field_to = message.to;
    if (field_to !== null) {
      writer.uint32(18);
      writer.bytes(field_to);
    }

    writer.uint32(24);
    writer.uint64(message.value);
  }

  static decode(reader: Reader, length: i32): transfer_event {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new transfer_event();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = reader.bytes();
          break;

        case 2:
          message.to = reader.bytes();
          break;

        case 3:
          message.value = reader.uint64();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  from: Uint8Array | null;
  to: Uint8Array | null;
  value: u64;

  constructor(
    from: Uint8Array | null = null,
    to: Uint8Array | null = null,
    value: u64 = 0
  ) {
    this.from = from;
    this.to = to;
    this.value = value;
  }
}

import { Writer, Reader } from "as-proto";
import { google } from "../any";

export namespace value {
  export class value_type {
    static encode(message: value_type, writer: Writer): void {
      const message_value = message.message_value;
      if (message_value !== null) {
        writer.uint32(10);
        writer.fork();
        google.protobuf.Any.encode(message_value, writer);
        writer.ldelim();
      }

      writer.uint32(17);
      writer.double(message.double_value);

      writer.uint32(29);
      writer.float(message.float_value);

      writer.uint32(32);
      writer.int32(message.int32_value);

      writer.uint32(40);
      writer.int64(message.int64_value);

      writer.uint32(48);
      writer.uint32(message.uint32_value);

      writer.uint32(56);
      writer.uint64(message.uint64_value);

      writer.uint32(64);
      writer.sint32(message.sint32_value);

      writer.uint32(72);
      writer.sint64(message.sint64_value);

      writer.uint32(85);
      writer.fixed32(message.fixed32_value);

      writer.uint32(89);
      writer.fixed64(message.fixed64_value);

      writer.uint32(101);
      writer.sfixed32(message.sfixed32_value);

      writer.uint32(105);
      writer.sfixed64(message.sfixed64_value);

      writer.uint32(112);
      writer.bool(message.bool_value);

      const string_value = message.string_value;
      if (string_value !== null) {
        writer.uint32(122);
        writer.string(string_value);
      }

      const bytes_value = message.bytes_value;
      if (bytes_value !== null) {
        writer.uint32(130);
        writer.bytes(bytes_value);
      }
    }

    static decode(reader: Reader, length: i32): value_type {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new value_type();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.message_value = google.protobuf.Any.decode(
              reader,
              reader.uint32()
            );
            break;

          case 2:
            message.double_value = reader.double();
            break;

          case 3:
            message.float_value = reader.float();
            break;

          case 4:
            message.int32_value = reader.int32();
            break;

          case 5:
            message.int64_value = reader.int64();
            break;

          case 6:
            message.uint32_value = reader.uint32();
            break;

          case 7:
            message.uint64_value = reader.uint64();
            break;

          case 8:
            message.sint32_value = reader.sint32();
            break;

          case 9:
            message.sint64_value = reader.sint64();
            break;

          case 10:
            message.fixed32_value = reader.fixed32();
            break;

          case 11:
            message.fixed64_value = reader.fixed64();
            break;

          case 12:
            message.sfixed32_value = reader.sfixed32();
            break;

          case 13:
            message.sfixed64_value = reader.sfixed64();
            break;

          case 14:
            message.bool_value = reader.bool();
            break;

          case 15:
            message.string_value = reader.string();
            break;

          case 16:
            message.bytes_value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    message_value: google.protobuf.Any | null;
    double_value: f64;
    float_value: f32;
    int32_value: i32;
    int64_value: i64;
    uint32_value: u32;
    uint64_value: u64;
    sint32_value: i32;
    sint64_value: i64;
    fixed32_value: i32;
    fixed64_value: i64;
    sfixed32_value: i32;
    sfixed64_value: i64;
    bool_value: bool;
    string_value: string | null;
    bytes_value: Uint8Array | null;

    constructor(
      message_value: google.protobuf.Any | null = null,
      double_value: f64 = 0.0,
      float_value: f32 = 0.0,
      int32_value: i32 = 0,
      int64_value: i64 = 0,
      uint32_value: u32 = 0,
      uint64_value: u64 = 0,
      sint32_value: i32 = 0,
      sint64_value: i64 = 0,
      fixed32_value: i32 = 0,
      fixed64_value: i64 = 0,
      sfixed32_value: i32 = 0,
      sfixed64_value: i64 = 0,
      bool_value: bool = false,
      string_value: string | null = null,
      bytes_value: Uint8Array | null = null
    ) {
      this.message_value = message_value;
      this.double_value = double_value;
      this.float_value = float_value;
      this.int32_value = int32_value;
      this.int64_value = int64_value;
      this.uint32_value = uint32_value;
      this.uint64_value = uint64_value;
      this.sint32_value = sint32_value;
      this.sint64_value = sint64_value;
      this.fixed32_value = fixed32_value;
      this.fixed64_value = fixed64_value;
      this.sfixed32_value = sfixed32_value;
      this.sfixed64_value = sfixed64_value;
      this.bool_value = bool_value;
      this.string_value = string_value;
      this.bytes_value = bytes_value;
    }
  }

  export class enum_type {
    static encode(message: enum_type, writer: Writer): void {
      const name = message.name;
      if (name !== null) {
        writer.uint32(10);
        writer.string(name);
      }

      writer.uint32(16);
      writer.int32(message.number);
    }

    static decode(reader: Reader, length: i32): enum_type {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new enum_type();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.name = reader.string();
            break;

          case 2:
            message.number = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    name: string | null;
    number: i32;

    constructor(name: string | null = null, number: i32 = 0) {
      this.name = name;
      this.number = number;
    }
  }

  export class list_type {
    static encode(message: list_type, writer: Writer): void {
      const values = message.values;
      for (let i = 0; i < values.length; ++i) {
        writer.uint32(10);
        value_type.encode(values[i], writer);
      }
    }

    static decode(reader: Reader, length: i32): list_type {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_type();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.values.push(
              value_type.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    values: Array<value_type>;

    constructor(values: Array<value_type> = []) {
      this.values = values;
    }
  }
}

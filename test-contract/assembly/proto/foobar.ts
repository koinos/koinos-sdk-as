import { Writer, Reader } from "as-proto";

export namespace foobar {
  @unmanaged
  export class foobar_arguments {
    static encode(message: foobar_arguments, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.value);
    }

    static decode(reader: Reader, length: i32): foobar_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new foobar_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.int64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: i64;

    constructor(value: i64 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class foobar_result {
    static encode(message: foobar_result, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.value);
    }

    static decode(reader: Reader, length: i32): foobar_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new foobar_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.int64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: i64;

    constructor(value: i64 = 0) {
      this.value = value;
    }
  }
}
import { Writer, Reader } from "as-proto";

export namespace test {
  @unmanaged
  export class test_object {
    static encode(message: test_object, writer: Writer): void {
      writer.uint32(8);
      writer.int64(message.value);
    }

    static decode(reader: Reader, length: i32): test_object {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new test_object();

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
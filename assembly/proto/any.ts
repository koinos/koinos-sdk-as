import { Writer, Reader } from "as-proto";

export namespace google {
  export namespace protobuf {
    export class Any {
      static encode(message: Any, writer: Writer): void {
        const type_url = message.type_url;
        if (type_url !== null) {
          writer.uint32(10);
          writer.string(type_url);
        }

        const value = message.value;
        if (value !== null) {
          writer.uint32(18);
          writer.bytes(value);
        }
      }

      static decode(reader: Reader, length: i32): Any {
        const end: usize = length < 0 ? reader.end : reader.ptr + length;
        const message = new Any();

        while (reader.ptr < end) {
          const tag = reader.uint32();
          switch (tag >>> 3) {
            case 1:
              message.type_url = reader.string();
              break;

            case 2:
              message.value = reader.bytes();
              break;

            default:
              reader.skipType(tag & 7);
              break;
          }
        }

        return message;
      }

      type_url: string | null;
      value: Uint8Array | null;

      constructor(
        type_url: string | null = null,
        value: Uint8Array | null = null
      ) {
        this.type_url = type_url;
        this.value = value;
      }
    }
  }
}

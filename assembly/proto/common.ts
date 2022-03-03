import { Writer, Reader } from "as-proto";

export namespace common {
  export class block_topology {
    static encode(message: block_topology, writer: Writer): void {
      const id = message.id;
      if (id !== null) {
        writer.uint32(10);
        writer.bytes(id);
      }

      writer.uint32(16);
      writer.uint64(message.height);

      const previous = message.previous;
      if (previous !== null) {
        writer.uint32(26);
        writer.bytes(previous);
      }
    }

    static decode(reader: Reader, length: i32): block_topology {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new block_topology();

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
            message.previous = reader.bytes();
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
    previous: Uint8Array | null;

    constructor(
      id: Uint8Array | null = null,
      height: u64 = 0,
      previous: Uint8Array | null = null
    ) {
      this.id = id;
      this.height = height;
      this.previous = previous;
    }
  }
}

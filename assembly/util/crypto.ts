import { System } from "../systemCalls";

export namespace Crypto {
  export const DEFAULT_PREFIX: u8 = 0x00;

  export enum multicodec {
    sha1 = 0x11,
    sha2_256 = 0x12,
    sha2_512 = 0x13,
    keccak_256 = 0x1b,
    ripemd_160 = 0x1053,
  }

  class Buffer {
    buffer: Uint8Array;
    ptr: usize;
    len: i32;

    constructor(buf: Uint8Array) {
      this.buffer = buf;
      this.len = 0;
      this.ptr = this.buffer.dataStart;
    }

    pop(): u8 {
      this.len--;
      return load<u8>(this.ptr++);
    }

    push(val: u8): void {
      this.len++;
      store<u8>(this.ptr++, val);
    }

    getData(): Uint8Array {
      let bytes = new Uint8Array(this.len);
      memory.copy(bytes.dataStart, this.buffer.dataStart, this.len);
      return bytes;
    }
  }

  export class UnsignedVarint {
    value: u64;

    constructor(v: u64 = 0) {
      this.value = v;
    }

    toBinary(buf: Buffer): void {
      let n: u64 = this.value;

      while (true) {
        buf.push(<u8>(n & 0x7F));

        if (n <= 0x7F)
          break;

        buf.buffer[<u32>(buf.ptr - 1)] |= 0x80;
        n = (n >> 7);
      }
    }

    fromBinary(buf: Buffer): void {
      this.value = 0;
      let data: u8 = 0;
      let i: u32 = 0;

      do {
        data = buf.pop();

        this.value |= (data & 0x7f) << <u8>i;
        i += 7;
      } while (data & 0x80);
    }
  }

  export class Multihash {
    code: u64 = 0;
    digest: Uint8Array;

    constructor() {
      this.code = 0;
      this.digest = new Uint8Array(0);
    }

    deserialize(buf: Uint8Array): void {
      const rb = new Buffer(buf);

      const mhCode = new UnsignedVarint();
      mhCode.fromBinary(rb);
      const mhSize = new UnsignedVarint();
      mhSize.fromBinary(rb);
      this.digest = new Uint8Array(<i32>mhSize.value);

      for (let i: u64 = 0; i < mhSize.value; i++ )
      {
        this.digest[<i32>i] = rb.pop();
      }

      this.code = mhCode.value;
    }

    serialize(): Uint8Array {
      const wb = new Buffer(new Uint8Array(532));

      const mhCode = new UnsignedVarint(this.code);
      mhCode.toBinary(wb);
      const mhSize = new UnsignedVarint(this.digest.byteLength);
      mhSize.toBinary(wb);

      for (let i: u64 = 0; i < <u64>this.digest.byteLength; i++ )
      {
        wb.push(this.digest[<i32>i]);
      }

      return wb.getData();
    }
  }

  /**
    * Decodes an address from a public key.
    * @param pubKey public key as a Uint8Array.
    * @param prefix address prefix
    * @returns Uint8Array
    * @example
    * ```ts
    * const recoveredKey = System.recoverPublicKey(signatureData, digest!);
    * const addr = Crypto.addressFromPublicKey(recoveredKey!);
    * System.log('recoveredKey (b58): ' + Base58.encode(addr));
    * ```
    */
  export function addressFromPublicKey(pubKey: Uint8Array, prefix: u8 = DEFAULT_PREFIX): Uint8Array {
    // Address is:
    // 1 byte prefix
    // 20 byte ripemd
    // 4 byte checksum

    const sha256 = new Multihash();
    const ripemd160 = new Multihash();

    sha256.deserialize(System.hash(multicodec.sha2_256, pubKey)!);
    ripemd160.deserialize(System.hash(multicodec.ripemd_160, sha256.digest)!);

    let tmpAddr = new Uint8Array(ripemd160.digest.byteLength + 1);
    tmpAddr[0] = prefix;
    memory.copy(tmpAddr.dataStart + 1, ripemd160.digest.dataStart, ripemd160.digest.byteLength);
 
    sha256.deserialize(System.hash(multicodec.sha2_256, tmpAddr)!);
    sha256.deserialize(System.hash(multicodec.sha2_256, sha256.digest)!);

    let address = new Uint8Array(tmpAddr.byteLength + 4);
    memory.copy(address.dataStart, tmpAddr.dataStart, tmpAddr.byteLength);
    memory.copy(address.dataStart + address.byteLength - 4, sha256.digest.dataStart, 4);
    return address;
  }
}
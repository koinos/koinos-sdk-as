export namespace Base58 {
  // @ts-ignore: decorator
  @lazy
    const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

  // @ts-ignore: decorator
  @lazy
    const BASE = 58;
  
  // @ts-ignore: decorator
  @lazy
    const BASE_MAP = StaticArray.fromArray<u8>([255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,0,1,2,3,4,5,6,7,8,255,255,255,255,255,255,255,9,10,11,12,13,14,15,16,255,17,18,19,20,21,255,22,23,24,25,26,27,28,29,30,31,32,255,255,255,255,255,255,33,34,35,36,37,38,39,40,41,42,43,255,44,45,46,47,48,49,50,51,52,53,54,55,56,57,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255]);

  /**
    * Encode Uint8Array as a base58 string.
    * @param bytes Byte array of type Uint8Array.
    * @example
    * ```ts
    * const contractId = System.getContractId();
    * System.log("contractId: " + Base58.encode(contractId));
    * ```
    */
  export function encode(source: Uint8Array): string {
    // Code converted from:
    // https://github.com/cryptocoinjs/base-x/blob/master/index.js
    const iFACTOR = 2; // TODO: Calculate precise value to avoid overallocating
    
    const LEADER = ALPHABET.charAt(0);

    // Skip & count leading zeroes.
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    let pend = source.length;

    while (pbegin != pend && source[pbegin] == 0) {
      pbegin++;
      zeroes++;
    }

    // Allocate enough space in big-endian base58 representation.
    let size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
    let b58 = new Uint8Array(size);

    // Process the bytes.
    while (pbegin != pend) {
      let carry = i32(source[pbegin]);

      // Apply "b58 = b58 * 256 + ch".
      let i = 0;
      for (
        let it = size - 1;
        (carry != 0 || i < length) && it != -1;
        it--, i++
      ) {
        carry += (256 * b58[it]) >>> 0;
        b58[it] = carry % BASE >>> 0;
        carry = (carry / BASE) >>> 0;
      }

      assert(carry == 0, "Non-zero carry");
      length = i;
      pbegin++;
    }

    // Skip leading zeroes in base58 result.
    let it = size - length;
    while (it != size && b58[it] == 0) {
      it++;
    }

    // Translate the result into a string.
    let str = LEADER.repeat(zeroes);
    for (; it < size; ++it) str += ALPHABET.charAt(b58[it]);

    return str;
  }

  /**
    * Decode a base58 string into aUint8Array
    * @param string base58 encoded string
    * @example
    * ```ts
    * const from = Base58.decode("1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe");
    * ```
    */
  export function decode(string: string): Uint8Array {
    const buffer = decodeUnsafe(string);
    if (buffer) {
      return buffer;
    }
    throw new Error("Non-base58 character");
  }

  function decodeUnsafe(source: string): Uint8Array {
    if (source.length == 0) {
      return new Uint8Array(0);
    }
    const LEADER = ALPHABET.charAt(0);
    const FACTOR = 1; // no floating point operations allowed so round up
  
    let psz = 0;
    // Skip leading spaces.
    while (source.charAt(psz) == " ") {
      psz++;
    }
  
    // Skip and count leading '1's.
    let length = 0;
  
    while (source.charAt(psz) == LEADER) {
      psz++;
    }
  
    // Allocate enough space in big-endian base256 representation.
    let size = i32((source.length - psz) * FACTOR + 1) >>> 0; // log(58) / log(256), rounded up.
    let b256 = new Uint8Array(size - 1);
  
    // Process the characters.
    while (source.charAt(psz)) {
      // Decode character
      let bmIdx = source.charCodeAt(psz);
  
      if (bmIdx < 0) break;
      let carry = i32(BASE_MAP[bmIdx]);
  
      // Invalid character
      if (carry == 255) {
        break;
      }
      let i = 0;
      for (
        let it = size - 2;
        (carry != 0 || i < length) && it != -1;
        it--, i++
      ) {
        carry += (BASE * b256[it]) >>> 0;
        b256[it] = carry % 256 >>> 0;
        carry = (carry / 256) >>> 0;
      }
      if (carry != 0) {
        throw new Error("Non-zero carry");
      }
      length = i;
      psz++;
    }
    // Skip trailing spaces.
    while (source.charAt(psz) == " ") {
      psz++;
    }
  
    // Skip leading zeroes in b256.
    let i = 0;
    while (b256[i] == 0) {
      i++;
    }
    i--; // keep the leading zero since that marked ed25519 (won't work with secp256k1)
  
    return <Uint8Array>b256.slice(i);
  }
}
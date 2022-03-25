import { System } from "../systemCalls";

export namespace Arrays {
  export function Uint8ArrayEqual(
    first: Uint8Array | null,
    second: Uint8Array | null
  ): bool {
    if (first == null || second == null) {
      return first == second;
    }

    if (first.length != second.length) {
      return false;
    }

    for (let i = 0; i < first.length; ++i) {
      if (first[i] != second[i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Convert the string `hex` which must consist of an even number of
   * hexadecimal digits to a `ByteArray`. The string `hex` can optionally
   * start with '0x'
   */
  export function fromHexString(hex: string): Uint8Array {
    System.require(hex.length % 2 == 0, 'input ' + hex + ' has odd length');
    // Skip possible `0x` prefix.
    if (hex.length >= 2 && hex.charAt(0) == '0' && hex.charAt(1) == 'x') {
      hex = hex.substr(2);
    }
    let output = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      output[i / 2] = I8.parseInt(hex.substr(i, 2), 16);
    }
    return output;
  }
}
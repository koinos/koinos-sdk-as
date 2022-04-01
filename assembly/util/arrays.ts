import { System } from "../systemCalls";

export namespace Arrays {
  /**
   * Checks if 2 Uint8Array are equal.
   * Note: if both first and second are null, then they are considered equal
   */
  export function equal(
    first: Uint8Array | null,
    second: Uint8Array | null
  ): bool {
    if (first == null && second == null) {
      return true;
    }

    if (first == null && second != null) {
      return false;
    }

    if (first != null && second == null) {
      return false;
    }

    if (first!.length != second!.length) {
      return false;
    }

    for (let i = 0; i < first!.length; ++i) {
      if (first![i] != second![i]) {
        return false;
      }
    }

    return true;
  }

  /**
   * Convert the string `hex` which must consist of an even number of
   * hexadecimal digits to a `Uint8Array`. The string `hex` can optionally
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
      output[i / 2] = U8.parseInt(hex.substr(i, 2), 16);
    }
    return output;
  }

  /**
   * Convert the Uint8Array `buffer` into a hexadecimal digits string. The string can optionally
   * be appended with '0x'
   */
  export function toHexString(buffer: Uint8Array, prepend0x: bool = true): string {
    let output = '';

    if (prepend0x) {
      output += '0x';
    }

    for (let i = 0; i < buffer.length; i += 1) {
      output += `0${buffer[i].toString(16)}`.slice(-2);
    }

    return output;
  }
}
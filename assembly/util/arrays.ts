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
}
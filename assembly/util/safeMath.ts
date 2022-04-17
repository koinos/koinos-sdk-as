import { System } from "../systemCalls";
import { u128 } from "as-bignum";

export namespace SafeMath {

  export class SafeInteger<T> {
    value: T;
    error: bool;
    constructor(value: T, error: bool) {
      this.value = value;
      this.error = error;
    }
  }

  /**
    * Try to add 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @returns SafeInteger
    * @example
    * ```ts
    * const res = SafeMath.tryAdd(1, 2);
    * 
    * if (!res.error) {
    *   System.Log('1 + 2 = ' + c.value.toString());
    * } else {
    *   System.log('could not add');
    * }
    * ```
    */
  export function tryAdd<T>(a: T, b: T): SafeInteger<T> {
    if (isInteger<T>()) {
      // @ts-ignore valid in AS
      const c = a + b;

      if (isSigned<T>()) {
        // signed integers
        // @ts-ignore valid in AS
        if ((b >= 0 && c >= a) || (b < 0 && c < a)) {
          return new SafeInteger<T>(c, false);
        }
      } else {
        // unsigned integers
        if (c >= a) {
          return new SafeInteger<T>(c, false);
        }
      }
    } else if (a instanceof u128) {
      // @ts-ignore valid in AS
      const c = a + b;

      if (c >= a) {
        return new SafeInteger(c, false);
      }

      // @ts-ignore valid in AS
      return new SafeInteger(u128.Zero, true);
    }

    // @ts-ignore valid in AS
    return new SafeInteger<T>(0, true);
  }

  /**
    * Add 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @param { string } message message that will be logged if the calculation reverts
    * @returns reverts if overflow/underflow, result otherwise
    * @example
    * ```ts
    * const res = SafeMath.add(1, 2);
    * 
    * // code here is not executed if the calculation above overflows/underflows
    * ```
    */
  export function add<T>(a: T, b: T, message: string = ''): T {
    const result = tryAdd(a, b);

    if (result.error) {
      // @ts-ignore valid in AS
      System.log(message != '' ? message : `could not add ${a.toString()} to ${b.toString()}`);
      System.exitContract(1);
    }

    return result.value;
  }

  /**
    * Try to subtract 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @returns SafeInteger
    * @example
    * ```ts
    * const res = SafeMath.trySub(2, 1);
    * 
    * if (!res.error) {
    *   System.Log('2 - 1 = ' + c.value.toString());
    * } else {
    *   System.log('could not subtract');
    * }
    * ```
    */
  export function trySub<T>(a: T, b: T): SafeInteger<T> {
    if (isInteger<T>()) {
      if (isSigned<T>()) {
        // signed integers
        // @ts-ignore valid in AS
        const c = a - b;
        // @ts-ignore valid in AS
        if ((b >= 0 && c <= a) || (b < 0 && c > a)) {
          // @ts-ignore valid in AS
          return new SafeInteger<T>(c, false);
        }
      } else {
        // unsigned integers
        if (b <= a) {
          // @ts-ignore valid in AS
          return new SafeInteger<T>(a - b, false);
        }
      }
    } else if (a instanceof u128) {
      if (b <= a) {
        // @ts-ignore valid in AS
        return new SafeInteger(a - b, false);
      }

      // @ts-ignore valid in AS
      return new SafeInteger(u128.Zero, true);
    }

    // @ts-ignore valid in AS
    return new SafeInteger<T>(0, true);
  }

  /**
    * Subtract 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @param { string } message message that will be logged if the calculation reverts
    * @returns reverts if overflow/underflow, result otherwise
    * @example
    * ```ts
    * const res = SafeMath.sub(1, 2);
    * 
    * // code here is not executed if the calculation above overflows/underflows
    * ```
    */
  export function sub<T>(a: T, b: T, message: string = ''): T {
    const result = trySub(a, b);

    if (result.error) {
      // @ts-ignore valid in AS
      System.log(message != '' ? message : `could not subtract ${b.toString()} from ${a.toString()}`);
      System.exitContract(1);
    }

    return result.value;
  }

  /**
    * Try to multiply 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @returns SafeInteger
    * @example
    * ```ts
    * const res = SafeMath.tryMul(2, 1);
    * 
    * if (!res.error) {
    *   System.Log('2 * 1 = ' + c.value.toString());
    * } else {
    *   System.log('could not multiply');
    * }
    * ```
    */
  export function tryMul<T>(a: T, b: T): SafeInteger<T> {
    if (isInteger<T>()) {
      // @ts-ignore valid in AS
      if (a == 0) {
        // @ts-ignore valid in AS
        return new SafeInteger<T>(0, false);
      }

      // @ts-ignore valid in AS
      if (isSigned<T>() && a == -1) {
        if (
          // @ts-ignore valid in AS
          (b instanceof i64 && b == i64.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (b instanceof i32 && b == i32.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (b instanceof i16 && b == i16.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (b instanceof i8 && b == i8.MIN_VALUE)
        ) {
          // @ts-ignore valid in AS
          return new SafeInteger<T>(0, true);
        }
      }

      // @ts-ignore valid in AS
      const c = a * b;
      // @ts-ignore valid in AS
      if (c / a == b) {
        // @ts-ignore valid in AS
        return new SafeInteger<T>(c, false);
      }
    } else if (a instanceof u128) {
      // @ts-ignore valid in AS
      if (a == u128.Zero) {
        // @ts-ignore valid in AS
        return new SafeInteger(u128.Zero, false);
      }
      
      // @ts-ignore valid in AS
      const c = a * b;
      // @ts-ignore valid in AS
      if (c / a == b) {
        // @ts-ignore valid in AS
        return new SafeInteger(c, false);
      }

      // @ts-ignore valid in AS
      return new SafeInteger(u128.Zero, true);
    }

    // @ts-ignore valid in AS
    return new SafeInteger<T>(0, true);
  }

  /**
    * Multiply 2  integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @param { string } message message that will be logged if the calculation reverts
    * @returns reverts if overflow/underflow, result otherwise
    * @example
    * ```ts
    * const res = SafeMath.mul(1, 2);
    * 
    * // code here is not executed if the calculation above overflows/underflows
    * ```
    */
  export function mul<T>(a: T, b: T, message: string = ''): T {
    const result = tryMul(a, b);

    if (result.error) {
      // @ts-ignore valid in AS
      System.log(message != '' ? message : `could not multiply ${a.toString()} by ${b.toString()}`);
      System.exitContract(1);
    }

    return result.value;
  }

  /**
    * Try to divide 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @returns SafeInteger
    * @example
    * ```ts
    * const res = SafeMath.tryDiv(2, 1);
    * 
    * if (!res.error) {
    *   System.Log('2 / 1 = ' + c.value.toString());
    * } else {
    *   System.log('could not divide');
    * }
    * ```
    */
  export function tryDiv<T>(a: T, b: T): SafeInteger<T> {
    if (isInteger<T>()) {
      // @ts-ignore valid in AS
      if (isSigned<T>() && b == -1) {
        if (
          // @ts-ignore valid in AS
          (a instanceof i64 && a == i64.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (a instanceof i32 && a == i32.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (a instanceof i16 && a == i16.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (a instanceof i8 && a == i8.MIN_VALUE)
        ) {
          // @ts-ignore valid in AS
          return new SafeInteger<T>(0, true);
        }
      }

      // @ts-ignore valid in AS
      if (b != 0) {
        // @ts-ignore valid in AS
        return new SafeInteger<T>(a / b, false);
      }
    } else if (a instanceof u128) {
      // @ts-ignore valid in AS
      if (b != u128.Zero) {
        // @ts-ignore valid in AS
        return new SafeInteger(a / b, false);
      }

      // @ts-ignore valid in AS
      return new SafeInteger(u128.Zero, true);
    }

    // @ts-ignore valid in AS
    return new SafeInteger<T>(0, true);
  }

  /**
    * Divide 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @param { string } message message that will be logged if the calculation reverts
    * @returns reverts if overflow/underflow, result otherwise
    * @example
    * ```ts
    * const res = SafeMath.div(1, 2);
    * 
    * // code here is not executed if the calculation above overflows/underflows
    * ```
    */
  export function div<T>(a: T, b: T, message: string = ''): T {
    const result = tryDiv(a, b);

    if (result.error) {
      // @ts-ignore valid in AS
      System.log(message != '' ? message : `could not divide ${a.toString()} by ${b.toString()}`);
      System.exitContract(1);
    }

    return result.value;
  }

  /**
    * Try to calculate the modulo of 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @returns SafeInteger
    * @example
    * ```ts
    * const res = SafeMath.tryMod(2, 1);
    * 
    * if (!res.error) {
    *   System.Log('2 % 1 = ' + c.value.toString());
    * } else {
    *   System.log('could not calculate modulo');
    * }
    * ```
    */
  export function tryMod<T>(a: T, b: T): SafeInteger<T> {
    if (isInteger<T>()) {
      // @ts-ignore valid in AS
      if (isSigned<T>() && b == -1) {
        if (
          // @ts-ignore valid in AS
          (a instanceof i64 && a == i64.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (a instanceof i32 && a == i32.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (a instanceof i16 && a == i16.MIN_VALUE) ||
          // @ts-ignore valid in AS
          (a instanceof i8 && a == i8.MIN_VALUE)
        ) {
          // @ts-ignore valid in AS
          return new SafeInteger<T>(0, true);
        }
      }

      // @ts-ignore valid in AS
      if (b != 0) {
        // @ts-ignore valid in AS
        return new SafeInteger<T>(a % b, false);
      }
    } else if (a instanceof u128) {
      // @ts-ignore valid in AS
      if (b != u128.Zero) {
        // @ts-ignore valid in AS
        return new SafeInteger(a % b, false);
      }

      // @ts-ignore valid in AS
      return new SafeInteger(u128.Zero, true);
    }

    // @ts-ignore valid in AS
    return new SafeInteger<T>(0, true);
  }

  /**
    * Calculate the modulo of 2 integers (unsigned or signed)
    * @param { T } a unsigned or signed integer
    * @param { T } b unsigned or signed integer
    * @param { string } message message that will be logged if the calculation reverts
    * @returns reverts if overflow/underflow, result otherwise
    * @example
    * ```ts
    * const res = SafeMath.mod(10, 2);
    * 
    * // code here is not executed if the calculation above overflows/underflows
    * ```
    */
  export function mod<T>(a: T, b: T, message: string = ''): T {
    const result = tryMod(a, b);

    if (result.error) {
      // @ts-ignore valid in AS
      System.log(message != '' ? message : `could not calulate ${a.toString()} modulo ${b.toString()}`);
      System.exitContract(1);
    }

    return result.value;
  }
}
import { MockVM, SafeMath } from "../assembly";

describe('SafeMath', () => {
  beforeEach(() => {
    MockVM.reset();
  });

  describe('tryAdd', () => {
    it('adds correctly', () => {
      let a: u64 = 5678;
      let b: u64 = 1234;
      let c = SafeMath.tryAdd(a, b);
      expect(c.value).toBe(6912);
      expect(c.error).toBe(false);

      c = SafeMath.tryAdd(b, a);
      expect(c.value).toBe(6912);
      expect(c.error).toBe(false);
    });

    it('reverts on addition overflow', () => {
      let a: u64 = u64.MAX_VALUE;
      let b: u64 = 1;
      let c = SafeMath.tryAdd(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryAdd(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('adds correctly if it does not overflow and the result is positive', () => {
      let a: i64 = 1234;
      let b: i64 = 5678;
      let c = SafeMath.tryAdd(a, b);
      expect(c.value).toBe(6912);
      expect(c.error).toBe(false);

      c = SafeMath.tryAdd(b, a);
      expect(c.value).toBe(6912);
      expect(c.error).toBe(false);
    });

    it('adds correctly if it does not overflow and the result is negative', () => {
      let a: i64 = i64.MAX_VALUE;
      let b: i64 = i64.MIN_VALUE;
      let c = SafeMath.tryAdd(a, b);
      expect(c.value).toBe(-1);
      expect(c.error).toBe(false);

      c = SafeMath.tryAdd(b, a);
      expect(c.value).toBe(-1);
      expect(c.error).toBe(false);
    });

    it('reverts on positive addition overflow', () => {
      let a: i64 = i64.MAX_VALUE;
      let b: i64 = 1;
      let c = SafeMath.tryAdd(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryAdd(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on negative addition overflow', () => {
      let a: i64 = i64.MIN_VALUE;
      let b: i64 = -1;
      let c = SafeMath.tryAdd(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryAdd(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });
  });

  describe('add', () => {
    it('adds correctly', () => {
      let a: u64 = 5678;
      let b: u64 = 1234;
      let c = SafeMath.add(a, b);
      expect(c).toBe(6912);

      c = SafeMath.add(b, a);
      expect(c).toBe(6912);
    });

    it('reverts on addition overflow', () => {
      expect(() => {
        let a: u64 = u64.MAX_VALUE;
        let b: u64 = 1;
        SafeMath.add(a, b);
      }).toThrow();

      expect(() => {
        let a: u64 = u64.MAX_VALUE;
        let b: u64 = 1;
        SafeMath.add(b, a);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not add 18446744073709551615 to 1');
      expect(logs[1]).toBe('could not add 1 to 18446744073709551615');
    });

    it('adds correctly if it does not overflow and the result is positive', () => {
      let a: i64 = 1234;
      let b: i64 = 5678;
      let c = SafeMath.add(a, b);
      expect(c).toBe(6912);

      c = SafeMath.add(b, a);
      expect(c).toBe(6912);
    });

    it('adds correctly if it does not overflow and the result is negative', () => {
      let a: i64 = i64.MAX_VALUE;
      let b: i64 = i64.MIN_VALUE;
      let c = SafeMath.add(a, b);
      expect(c).toBe(-1);

      c = SafeMath.add(b, a);
      expect(c).toBe(-1);
    });

    it('reverts on positive addition overflow', () => {
      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 1;
        SafeMath.add(a, b);
      }).toThrow();

      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 1;
        SafeMath.add(b, a);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not add 9223372036854775807 to 1');
      expect(logs[1]).toBe('could not add 1 to 9223372036854775807');
    });

    it('reverts on negative addition overflow', () => {
      expect(() => {
        let a: i64 = i64.MIN_VALUE;
        let b: i64 = -1;
        SafeMath.add(a, b);
      }).toThrow();

      expect(() => {
        let a: i64 = i64.MIN_VALUE;
        let b: i64 = -1;
        SafeMath.add(b, a);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not add -9223372036854775808 to -1');
      expect(logs[1]).toBe('could not add -1 to -9223372036854775808');
    });

    it('reverts with a custom message', () => {
      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 1;
        SafeMath.add(a, b, 'my message');
      }).toThrow();

      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 1;
        SafeMath.add(b, a, 'my message1');
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('my message');
      expect(logs[1]).toBe('my message1');
    });
  });

  describe('trySub', () => {
    it('subtracts correctly', () => {
      let a: u64 = 5678;
      let b: u64 = 1234;
      let c = SafeMath.trySub(a, b);
      expect(c.value).toBe(4444);
      expect(c.error).toBe(false);
    });

    it('reverts if subtraction result would be negative', () => {
      let a: u64 = 1234;
      let b: u64 = 5678;
      let c = SafeMath.trySub(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('subtracts correctly if it does not overflow and the result is positive', () => {
      // positive
      let a: i64 = 5678;
      let b: i64 = 1234;
      let c = SafeMath.trySub(a, b);
      expect(c.value).toBe(4444);
      expect(c.error).toBe(false);
    });

    it('subtracts correctly if it does not overflow and the result is negative', () => {
      // positive
      let a: i64 = 1234;
      let b: i64 = 5678;
      let c = SafeMath.trySub(a, b);
      expect(c.value).toBe(-4444);
      expect(c.error).toBe(false);
    });

    it('reverts on positive subtraction overflow', () => {
      // positive
      let a: i64 = i64.MAX_VALUE;
      let b: i64 = -1;
      let c = SafeMath.trySub(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on negative subtraction overflow', () => {
      // positive
      let a: i64 = i64.MIN_VALUE;
      let b: i64 = 1;
      let c = SafeMath.trySub(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });
  });

  describe('sub', () => {
    it('subtracts correctly', () => {
      let a: u64 = 5678;
      let b: u64 = 1234;
      let c = SafeMath.sub(a, b);
      expect(c).toBe(4444);
    });

    it('reverts if subtraction result would be negative', () => {
      expect(() => {
        let a: u64 = 1234;
        let b: u64 = 5678;
        SafeMath.sub(a, b);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not subtract 5678 from 1234');
    });

    it('subtracts correctly if it does not overflow and the result is positive', () => {
      let a: i64 = 5678;
      let b: i64 = 1234;
      let c = SafeMath.sub(a, b);
      expect(c).toBe(4444);
    });

    it('subtracts correctly if it does not overflow and the result is negative', () => {
      let a: i64 = 1234;
      let b: i64 = 5678;
      let c = SafeMath.sub(a, b);
      expect(c).toBe(-4444);
    });

    it('reverts on positive subtraction overflow', () => {
      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = -1;
        SafeMath.sub(a, b);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not subtract -1 from 9223372036854775807');
    });

    it('reverts on negative subtraction overflow', () => {
      expect(() => {
        let a: i64 = i64.MIN_VALUE;
        let b: i64 = 1;
        SafeMath.sub(a, b);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not subtract 1 from -9223372036854775808');
    });

    it('reverts with a custom message', () => {
      expect(() => {
        let a: i64 = i64.MIN_VALUE;
        let b: i64 = 1;
        SafeMath.sub(a, b, 'my message');
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('my message');
    });
  });

  describe('tryMul', () => {
    it('multiplies correctly', () => {
      let a: u64 = 1234;
      let b: u64 = 5678;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(7006652);
      expect(c.error).toBe(false);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(7006652);
      expect(c.error).toBe(false);
    });

    it('multiplies correctly', () => {
      let a: i64 = 1234;
      let b: i64 = 5678;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(7006652);
      expect(c.error).toBe(false);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(7006652);
      expect(c.error).toBe(false);

      let e: i32 = 1234;
      let f: i32 = 5678;
      let g = SafeMath.tryMul(e, f);
      expect(c.value).toBe(7006652);
      expect(c.error).toBe(false);

      g = SafeMath.tryMul(f, e);
      expect(c.value).toBe(7006652);
      expect(c.error).toBe(false);
    });

    it('multiplies by zero correctly', () => {
      let a: u64 = 0;
      let b: u64 = 5678;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(false);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(false);
    });

    it('multiplies by zero correctly', () => {
      let a: i64 = 0;
      let b: i64 = 5678;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(false);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(false);
    });

    it('reverts on multiplication overflow', () => {
      let a: u64 = u64.MAX_VALUE;
      let b: u64 = 2;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on multiplication overflow, positive operands', () => {
      let a: i64 = i64.MAX_VALUE;
      let b: i64 = 2;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts when minimum integer is multiplied by -1', () => {
      let a: i64 = i64.MIN_VALUE;
      let b: i64 = -1;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts when minimum integer is multiplied by -1', () => {
      let a: i32 = i32.MIN_VALUE;
      let b: i32 = -1;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts when minimum integer is multiplied by -1', () => {
      let a: i16 = i16.MIN_VALUE;
      let b: i16 = -1;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts when minimum integer is multiplied by -1', () => {
      let a: i8 = i8.MIN_VALUE;
      let b: i8 = -1;
      let c = SafeMath.tryMul(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);

      c = SafeMath.tryMul(b, a);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });
  });

  describe('mul', () => {
    it('multiplies correctly', () => {
      let a: u64 = 1234;
      let b: u64 = 5678;
      let c = SafeMath.mul(a, b);
      expect(c).toBe(7006652);

      c = SafeMath.mul(b, a);
      expect(c).toBe(7006652);
    });

    it('multiplies by zero correctly', () => {
      let a: u64 = 0;
      let b: u64 = 5678;
      let c = SafeMath.mul(a, b);
      expect(c).toBe(0);

      c = SafeMath.mul(b, a);
      expect(c).toBe(0);
    });

    it('reverts on multiplication overflow', () => {
      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 2;
        SafeMath.mul(a, b);
      }).toThrow();

      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 2;
        SafeMath.mul(b, a);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not multiply 9223372036854775807 by 2');
      expect(logs[1]).toBe('could not multiply 2 by 9223372036854775807');
    });

    it('reverts on multiplication overflow with a custom message', () => {
      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 2;
        SafeMath.mul(a, b, 'my message');
      }).toThrow();

      expect(() => {
        let a: i64 = i64.MAX_VALUE;
        let b: i64 = 2;
        SafeMath.mul(b, a, 'my message1');
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('my message');
      expect(logs[1]).toBe('my message1');
    });
  });

  describe('tryDiv', () => {
    it('divides correctly', () => {
      let a: u64 = 5678;
      let b: u64 = 5678;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(1);
      expect(c.error).toBe(false);
    });

    it('divides correctly', () => {
      let a: i64 = -5678;
      let b: i64 = 5678;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(-1);
      expect(c.error).toBe(false);
    });

    it('divides zero correctly', () => {
      let a: u64 = 0;
      let b: u64 = 5678;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(false);
    });

    it('divides zero correctly', () => {
      let a: i64 = 0;
      let b: i64 = 5678;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(false);
    });

    it('returns complete number result on non-even division', () => {
      let a: u64 = 7000;
      let b: u64 = 5678;
      let c = SafeMath.tryDiv(a, b);

      expect(c.value).toBe(1);
      expect(c.error).toBe(false);
    });

    it('returns complete number result on non-even division', () => {
      let a: i64 = 7000;
      let b: i64 = 5678;
      let c = SafeMath.tryDiv(a, b);

      expect(c.value).toBe(1);
      expect(c.error).toBe(false);
    });

    it('reverts on division by zero', () => {
      let a: u64 = 5678;
      let b: u64 = 0;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on division by zero', () => {
      let a: i64 = 5678;
      let b: i64 = 0;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i64 = i64.MIN_VALUE;
      let b: i64 = -1;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i32 = i32.MIN_VALUE;
      let b: i32 = -1;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i16 = i16.MIN_VALUE;
      let b: i16 = -1;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i8 = i8.MIN_VALUE;
      let b: i8 = -1;
      let c = SafeMath.tryDiv(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });
  });

  describe('div', () => {
    it('divides correctly', () => {
      let a: u64 = 5678;
      let b: u64 = 5678;
      let c = SafeMath.div(a, b);
      expect(c).toBe(1);
    });

    it('divides zero correctly', () => {
      let a: u64 = 0;
      let b: u64 = 5678;
      let c = SafeMath.div(a, b);
      expect(c).toBe(0);
    });

    it('returns complete number result on non-even division', () => {
      let a: u64 = 7000;
      let b: u64 = 5678;
      let c = SafeMath.div(a, b);

      expect(c).toBe(1);
    });

    it('reverts on division by zero', () => {
      expect(() => {
        let a: u64 = 5678;
        let b: u64 = 0;
        SafeMath.div(a, b);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not divide 5678 by 0');
    });

    it('reverts on division by zero with a custom message', () => {
      expect(() => {
        let a: u64 = 5678;
        let b: u64 = 0;
        SafeMath.div(a, b, 'my message');
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('my message');
    });
  });

  describe('trymod', () => {
    describe('modulos correctly', () => {

      test('when the dividend is smaller than the divisor', () => {
        let a: u64 = 284;
        let b: u64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(284);
        expect(c.error).toBe(false);
      });

      test('when the dividend is smaller than the divisor', () => {
        let a: i64 = 284;
        let b: i64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(284);
        expect(c.error).toBe(false);
      });

      test('when the dividend is equal to the divisor', () => {
        let a: u64 = 5678;
        let b: u64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(0);
        expect(c.error).toBe(false);
      });

      test('when the dividend is equal to the divisor', () => {
        let a: i64 = 5678;
        let b: i64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(0);
        expect(c.error).toBe(false);
      });

      test('when the dividend is larger than the divisor', () => {
        let a: u64 = 7000;
        let b: u64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(1322);
        expect(c.error).toBe(false);
      });

      test('when the dividend is larger than the divisor', () => {
        let a: i64 = 7000;
        let b: i64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(1322);
        expect(c.error).toBe(false);
      });

      test('when the dividend is a multiple of the divisor', () => {
        let a: u64 = 17034; // 17034 == 5678 * 3
        let b: u64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(0);
        expect(c.error).toBe(false);
      });

      test('when the dividend is a multiple of the divisor', () => {
        let a: i64 = 17034; // 17034 == 5678 * 3
        let b: i64 = 5678;
        let c = SafeMath.tryMod(a, b);

        expect(c.value).toBe(0);
        expect(c.error).toBe(false);
      });
    });

    it('reverts with a 0 divisor', () => {
      let a: u64 = 5678;
      let b: u64 = 0;
      let c = SafeMath.tryMod(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts with a 0 divisor', () => {
      let a: i64 = 5678;
      let b: i64 = 0;
      let c = SafeMath.tryMod(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i64 = i64.MIN_VALUE;
      let b: i64 = -1;
      let c = SafeMath.tryMod(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i32 = i32.MIN_VALUE;
      let b: i32 = -1;
      let c = SafeMath.tryMod(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i16 = i16.MIN_VALUE;
      let b: i16 = -1;
      let c = SafeMath.tryMod(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });

    it('reverts on overflow, negative second', () => {
      let a: i8 = i8.MIN_VALUE;
      let b: i8 = -1;
      let c = SafeMath.tryMod(a, b);
      expect(c.value).toBe(0);
      expect(c.error).toBe(true);
    });
  });

  describe('mod', () => {
    describe('modulos correctly', () => {

      test('when the dividend is smaller than the divisor', () => {
        let a: u64 = 284;
        let b: u64 = 5678;
        let c = SafeMath.mod(a, b);

        expect(c).toBe(284);
      });

      test('when the dividend is equal to the divisor', () => {
        let a: u64 = 5678;
        let b: u64 = 5678;
        let c = SafeMath.mod(a, b);

        expect(c).toBe(0);
      });

      test('when the dividend is larger than the divisor', () => {
        let a: u64 = 7000;
        let b: u64 = 5678;
        let c = SafeMath.mod(a, b);

        expect(c).toBe(1322);
      });

      test('when the dividend is a multiple of the divisor', () => {
        let a: u64 = 17034; // 17034 == 5678 * 3
        let b: u64 = 5678;
        let c = SafeMath.mod(a, b);

        expect(c).toBe(0);
      });
    });

    it('reverts with a 0 divisor', () => {
      expect(() => {
        let a: u64 = 5678;
        let b: u64 = 0;
        SafeMath.mod(a, b);
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('could not calulate 5678 modulo 0');
    });

    it('reverts with a 0 divisor with a custom message', () => {
      expect(() => {
        let a: u64 = 5678;
        let b: u64 = 0;
        SafeMath.mod(a, b, 'my message');
      }).toThrow();

      const logs = MockVM.getLogs();
      expect(logs[0]).toBe('my message');
    });
  });
});

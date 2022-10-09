import { System } from '../systemCalls';
import { chain } from '@koinos/proto-as';
import { Protobuf, Reader, Writer } from 'as-proto';
import { StringBytes } from './stringBytes';

const DEFAULT_KEY = new Uint8Array(0);

export namespace Storage {
  export enum Direction {
    Ascending,
    Descending
  }

  export class Map<TKey, TValue> {
    private space: chain.object_space;
    private defaultValue: (() => TValue | null) | null;
    private valueDecoder: (reader: Reader, length: i32) => TValue;
    private valueEncoder: (message: TValue, writer: Writer) => void;

    /**
    * Initialize a Space object with TKey the type of the keys and TValue the type of the values
    * @param contractId the id of the contract
    * @param spaceId the id of the space
    * @param valueDecoder the protobuf decoder for the values
    * @param valueEncoder the protobuf encoder for the values
    * @param defaultValue arrow function that returns the default value
    * @param system is system space
    * @example
    * ```ts
    * const contractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
    * const BALANCES_SPACE_ID = 1;
    * const balances = new Storage.Map(
    *   this.contractId,
    *   BALANCES_SPACE_ID,
    *   token.uint64.decode,
    *   token.uint64.encode,
    *   () => new token.uint64(0)
    * );
    * ```
    */
    constructor(
      contractId: Uint8Array,
      spaceId: u32,
      valueDecoder: (reader: Reader, length: i32) => TValue,
      valueEncoder: (message: TValue, writer: Writer) => void,
      defaultValue: (() => TValue | null) | null = null,
      system: bool = false) {
      this.space = new chain.object_space(system, contractId, spaceId);
      this.defaultValue = defaultValue;
      this.valueDecoder = valueDecoder;
      this.valueEncoder = valueEncoder;
    }

    /**
    * Check if `key` exists in the space
    * @param key key to check
    * @example
    * ```ts
    * const exists = Objects.has('key1');
    *
    * if (exists) {
    *   ...
    * }
    * ```
    */
    has(key: TKey): boolean {
      const object = this.get(key);

      return object ? true : false;
    }

    /**
    * Get an object from the space
    * @param key key to get
    * @returns the object if exists, null otherwise
    * @example
    * ```ts
    * const obj = Objects.get('key1');
    *
    * if (obj != null) {
    *   ...
    * }
    * ```
    */
    get(key: TKey): TValue | null {
      const value = System.getObject<TKey, TValue>(this.space, key, this.valueDecoder);
      if (!value && this.defaultValue) return this.defaultValue();
      return value;
    }

    /**
    * Get many objects from the space
    * @param offsetKey key used as the offset
    * @param limit number of objects to return
    * @param direction direction of the get, Ascending or Descending
    * @returns an array with the objects retrieved
    * @example
    * ```ts
    * const objs = Objects.getMany('key1', 10, Space.Direction.Descending);
    *
    * for (let index = 0; index < objs.length; index++) {
    *   const obj = objs[index];
    * }
    * ```
    */
    getMany(offsetKey: TKey, limit: i32 = i32.MAX_VALUE, direction: Direction = Direction.Ascending): System.ProtoDatabaseObject<TValue>[] {
      const result: System.ProtoDatabaseObject<TValue>[] = [];

      let key: Uint8Array;
      if (offsetKey instanceof Uint8Array) {
        key = offsetKey;
      } else if (typeof offsetKey == 'string') {
        key = StringBytes.stringToBytes(offsetKey);
      }

      let done = false;
      do {
        // @ts-ignore key is always initialized when reaching this code
        const obj = direction == Direction.Ascending ? System.getNextObject<Uint8Array, TValue>(this.space, key, this.valueDecoder) : System.getPrevObject<Uint8Array, TValue>(this.space, key, this.valueDecoder);
        if (obj) {
          result.push(obj);
          key = obj.key!;
        }

        done = obj == null || result.length >= limit;
      } while (!done);

      return result;
    }

    /**
    * Get many keys from the space
    * @param offsetKey key used as the offset
    * @param limit number of keys to return
    * @param direction direction of the get, Ascending or Descending
    * @returns an array with the keys retrieved
    * @example
    * ```ts
    * const keys = Objects.getManyKeys('key1', 10, Space.Direction.Descending);
    *
    * for (let index = 0; index < keys.length; index++) {
    *   const key = keys[index];
    * }
    * ```
    */
    getManyKeys(offsetKey: TKey, limit: i32 = i32.MAX_VALUE, direction: Direction = Direction.Ascending): TKey[] {
      const result: TKey[] = [];

      let key: Uint8Array;
      if (offsetKey instanceof Uint8Array) {
        key = offsetKey;
      } else if (typeof offsetKey == 'string') {
        key = StringBytes.stringToBytes(offsetKey);
      }

      let done = false;
      do {
        // @ts-ignore key is always initialized when reaching this code
        const obj = direction == Direction.Ascending ? System.getNextObject<Uint8Array, TValue>(this.space, key, this.valueDecoder) : System.getPrevObject<Uint8Array, TValue>(this.space, key, this.valueDecoder);
        if (obj) {
          key = obj.key!;
          if (offsetKey instanceof Uint8Array) {
            // @ts-ignore key here is a Uint8Array
            result.push(key);
          } else if (typeof offsetKey == 'string') {
            // @ts-ignore key here is a string
            result.push(StringBytes.bytesToString(key)!);
          }
        }

        done = obj == null || result.length >= limit;
      } while (!done);

      return result;
    }

    /**
    * Get many values from the space
    * @param offsetKey key used as the offset
    * @param limit number of values to return
    * @param direction direction of the get, Ascending or Descending
    * @returns an array with the values retrieved
    * @example
    * ```ts
    * const values = Objects.getManyValues('key1', 10, Space.Direction.Descending);
    *
    * for (let index = 0; index < values.length; index++) {
    *   const values = values[index];
    * }
    * ```
    */
    getManyValues(offsetKey: TKey, limit: i32 = i32.MAX_VALUE, direction: Direction = Direction.Ascending): TValue[] {
      const result: TValue[] = [];

      let key: Uint8Array;
      if (offsetKey instanceof Uint8Array) {
        key = offsetKey;
      } else if (typeof offsetKey == 'string') {
        key = StringBytes.stringToBytes(offsetKey);
      }

      let done = false;
      do {
        // @ts-ignore key is always initialized when reaching this code
        const obj = direction == Direction.Ascending ? System.getNextObject<Uint8Array, TValue>(this.space, key, this.valueDecoder) : System.getPrevObject<Uint8Array, TValue>(this.space, key, this.valueDecoder);
        if (obj) {
          result.push(obj.value);
          key = obj.key!;
        }

        done = obj == null || result.length >= limit;
      } while (!done);

      return result;
    }

    /**
    * Get the next object from the space
    * @param key key to get next
    * @returns a System.ProtoDatabaseObject if exists, null otherwise
    * @example
    * ```ts
    * const obj = Objects.getNext('key1');
    *
    * if (obj != null) {
    *   const key = obj.key;
    *   const val = obj.value;
    * }
    * ```
    */
    getNext(key: TKey): System.ProtoDatabaseObject<TValue> | null {
      return System.getNextObject<TKey, TValue>(this.space, key, this.valueDecoder);
    }

    /**
    * Get the previous object from the space
    * @param key key to get previous
    * @returns a System.ProtoDatabaseObject if exists, null otherwise
    * @example
    * ```ts
    * const obj = Objects.getPrev('key1');
    *
    * if (obj != null) {
    *   const key = obj.key;
    *   const val = obj.value;
    * }
    * ```
    */
    getPrev(key: TKey): System.ProtoDatabaseObject<TValue> | null {
      return System.getPrevObject<TKey, TValue>(this.space, key, this.valueDecoder);
    }

    /**
    * Put an object in the space
    * @param key key of the object
    * @param message object to put
    * @returns number of bytes that were written in the space
    * @example
    * ```ts
    * const nbBytesWritten = Objects.put('key1', new test_object(42));
    *
    * System.log(nbBytesWritten.toString());
    * ```
    */
    put(key: TKey, object: TValue): void {
      System.putObject(this.space, key, object, this.valueEncoder);
    }

    /**
    * Remove an object from the space
    * @param key key of the object
    * @example
    * ```ts
    * Objects.remove('key1');
    * ```
    */
    remove(key: TKey): void {
      System.removeObject(this.space, key);
    }
  }

  export class ProtoMap<TKey, TValue> extends Map<Uint8Array, TValue> {
    private keyDecoder: (reader: Reader, length: i32) => TKey;
    private keyEncoder: (message: TKey, writer: Writer) => void;

    /**
    * Initialize a Space object with TKey (a protobuf type) the type of the keys and TValue the type of the values
    * @param contractId the id of the contract
    * @param spaceId the id of the space
    * @param keyEncoder the protobuf encoder for the keys
    * @param valueDecoder the protobuf decoder for the values
    * @param valueEncoder the protobuf encoder for the values
    * @param system is system space
    * @example
    * ```ts
    * const contractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
    * const spaceId = 1;
    * const Objects = new Space.SpaceProtoKey<String, test_object>(contractId, spaceId, test_key.encode, test_object.decode, test_object.encode);
    * ```
    */
    constructor(
      contractId: Uint8Array,
      spaceId: u32,
      keyDecoder: (reader: Reader, length: i32) => TKey,
      keyEncoder: (message: TKey, writer: Writer) => void,
      valueDecoder: (reader: Reader, length: i32) => TValue,
      valueEncoder: (message: TValue, writer: Writer) => void,
      defaultValue: (() => TValue | null) | null = null,
      system: bool = false) {
      super(contractId, spaceId, valueDecoder, valueEncoder, defaultValue, system);
      this.keyDecoder = keyDecoder;
      this.keyEncoder = keyEncoder;
    }

    /**
    * Check if `key` exists in the space
    * @param key key to check
    * @example
    * ```ts
    * const exists = Objects.has(new test_key(1));
    *
    * if (exists) {
    *   ...
    * }
    * ```
    */
    // @ts-ignore valid in AS
    has(key: TKey): boolean {
      const finalKey = Protobuf.encode(key, this.keyEncoder);
      const object = super.get(finalKey);

      return object ? true : false;
    }

    /**
    * Get an object from the space
    * @param key key to get
    * @returns the object if exists, null otherwise
    * @example
    * ```ts
    * const obj = Objects.get(new test_key(1));
    *
    * if (obj != null) {
    *   ...
    * }
    * ```
    */
    // @ts-ignore valid in AS
    get(key: TKey): TValue | null {
      const finalKey = Protobuf.encode(key, this.keyEncoder);
      return super.get(finalKey);
    }

    /**
    * Get many objects from the space
    * @param offsetKey key used as the offset
    * @param limit number of objects to return
    * @param direction direction of the get, Ascending or Descending
    * @returns an array with the objects retrieved
    * @example
    * ```ts
    * const objs = Objects.getManyObj(new test_key(1), 10, Space.Direction.Descending);
    *
    * for (let index = 0; index < objs.length; index++) {
    *   const obj = objs[index];
    * }
    * ```
    */
    getManyObj(offsetKey: TKey, limit: i32 = i32.MAX_VALUE, direction: Direction = Direction.Ascending): System.ProtoDatabaseObject<TValue>[] {
      const finalKey = Protobuf.encode(offsetKey, this.keyEncoder);
      return super.getMany(finalKey, limit, direction);
    }

    /**
    * Get many values from the space
    * @param offsetKey key used as the offset
    * @param limit number of objects to return
    * @param direction direction of the get, Ascending or Descending
    * @returns an array with the objects retrieved
    * @example
    * ```ts
    * const values = Objects.getManyObjValues(new test_key(1), 10, Space.Direction.Descending);
    *
    * for (let index = 0; index < values.length; index++) {
    *   const value = values[index];
    * }
    * ```
    */
    getManyObjValues(offsetKey: TKey, limit: i32 = i32.MAX_VALUE, direction: Direction = Direction.Ascending): TValue[] {
      const finalKey = Protobuf.encode(offsetKey, this.keyEncoder);
      return super.getManyValues(finalKey, limit, direction);
    }

    /**
    * Get many keys from the space
    * @param offsetKey key used as the offset
    * @param limit number of keys to return
    * @param direction direction of the get, Ascending or Descending
    * @returns an array with the keys retrieved
    * @example
    * ```ts
    * const keys = Objects.getManyObjKeys(new test_key(1), 10, Space.Direction.Descending);
    *
    * for (let index = 0; index < keys.length; index++) {
    *   const key = keys[index];
    * }
    * ```
    */
    getManyObjKeys(offsetKey: TKey, limit: i32 = i32.MAX_VALUE, direction: Direction = Direction.Ascending): TKey[] {
      const result: TKey[] = [];

      let key = Protobuf.encode(offsetKey, this.keyEncoder);

      let done = false;
      do {
        // @ts-ignore key is always initialized when reaching this code
        const obj = direction == Direction.Ascending ? System.getNextObject<Uint8Array, TValue>(this.space, key, this.valueDecoder) : System.getPrevObject<Uint8Array, TValue>(this.space, key, this.valueDecoder);
        if (obj) {
          key = obj.key!;
          result.push(Protobuf.decode(key, this.keyDecoder));
        }

        done = obj == null || result.length >= limit;
      } while (!done);

      return result;
    }

    /**
    * Get the next object from the space
    * @param key key to get next
    * @returns a System.ProtoDatabaseObject if exists, null otherwise
    * @example
    * ```ts
    * const obj = Objects.getNext(new test_key(1));
    *
    * if (obj != null) {
    *   const key = obj.key;
    *   const val = obj.value;
    * }
    * ```
    */
    // @ts-ignore valid in AS
    getNext(key: TKey): System.ProtoDatabaseObject<TValue> | null {
      const finalKey = Protobuf.encode(key, this.keyEncoder);
      return super.getNext(finalKey);
    }

    /**
    * Get the previous object from the space
    * @param key key to get previous
    * @returns a System.ProtoDatabaseObject if exists, null otherwise
    * @example
    * ```ts
    * const obj = Objects.getPrev(new test_key(1));
    *
    * if (obj != null) {
    *   const key = obj.key;
    *   const val = obj.value;
    * }
    * ```
    */
    // @ts-ignore valid in AS
    getPrev(key: TKey): System.ProtoDatabaseObject<TValue> | null {
      const finalKey = Protobuf.encode(key, this.keyEncoder);
      return super.getPrev(finalKey);
    }

    /**
    * Put an object in the space
    * @param key key of the object
    * @param message object to put
    * @returns number of bytes that were written in the space
    * @example
    * ```ts
    * const nbBytesWritten = Objects.put(new test_key(1), new test_object(42));
    *
    * System.log(nbBytesWritten.toString());
    * ```
    */
    // @ts-ignore valid in AS
    put(key: TKey, object: TValue): void {
      const finalKey = Protobuf.encode(key, this.keyEncoder);
      super.put(finalKey, object);
    }

    /**
    * Remove an object from the space
    * @param key key of the object
    * @example
    * ```ts
    * Objects.remove(new test_key(1));
    * ```
    */
    // @ts-ignore valid in AS
    remove(key: TKey): void {
      const finalKey = Protobuf.encode(key, this.keyEncoder);
      super.remove(finalKey);
    }
  }

  export class Obj<TValue> {
    private space: chain.object_space;
    private defaultValue: (() => TValue | null) | null;
    private valueDecoder: (reader: Reader, length: i32) => TValue;
    private valueEncoder: (message: TValue, writer: Writer) => void;

    /**
    * Initialize a Space object with TKey the type of the keys and TValue the type of the values
    * @param contractId the id of the contract
    * @param spaceId the id of the space
    * @param valueDecoder the protobuf decoder for the values
    * @param valueEncoder the protobuf encoder for the values
    * @param defaultValue arrow function that returns the default value
    * @param system is system space
    * @example
    * ```ts
    * const contractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
    * const SUPPLY_ID = 1;
    * const supply = new Storage.Obj(
    *   contractId,
    *   SUPPLY_ID,
    *   token.uint64.decode,
    *   token.uint64.encode,
    *   () => new token.uint64(0)
    * );
    * ```
    */
    constructor(
      contractId: Uint8Array,
      spaceId: u32,
      valueDecoder: (reader: Reader, length: i32) => TValue,
      valueEncoder: (message: TValue, writer: Writer) => void,
      defaultValue: (() => TValue | null) | null = null,
      system: bool = false) {
      this.space = new chain.object_space(system, contractId, spaceId);
      this.defaultValue = defaultValue;
      this.valueDecoder = valueDecoder;
      this.valueEncoder = valueEncoder;
    }

    /**
    * Get the object from the space
    * @returns the object if exists, or the defaultValue
    * if exists, null otherwise
    * @example
    * ```ts
    * const myobj = obj.get();
    * ```
    */
    get(): TValue | null {
      const value = System.getObject<Uint8Array, TValue>(this.space, DEFAULT_KEY, this.valueDecoder);
      if (!value && this.defaultValue) return this.defaultValue();
      return value;
    }

    /**
    * Put an object in the space
    * @param object object to put
    * @example
    * ```ts
    * obj.put(new test_object(42));
    * ```
    */
    put(object: TValue): void {
      System.putObject(this.space, DEFAULT_KEY, object, this.valueEncoder);
    }

    /**
    * Remove the object from the space
    * @example
    * ```ts
    * obj.remove();
    * ```
    */
    remove(): void {
      System.removeObject(this.space, DEFAULT_KEY);
    }
  }
}

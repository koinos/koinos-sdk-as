import { Base58, StringBytes, Space, Arrays, Protobuf, System } from "../assembly";
import { test_object } from './test';

const mockContractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
const mockKey = StringBytes.stringToBytes("0x12345");

describe('space', () => {
  it('should put and get an object', () => {
    const obj = new test_object(42);
    const Objects = new Space.Space<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);
    const key = 'key1';

    Objects.put(key, obj);

    let storedObj = Objects.get(key);
    expect(storedObj).not.toBeNull();
    expect(storedObj!.value).toBe(obj.value);
  });

  it('should check if space has an object or not', () => {
    const key = 'key1';
    const Objects = new Space.Space<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    expect(Objects.has('key2')).toBe(false);
  });

  it('should remove an object', () => {
    const key = 'key1';
    const Objects = new Space.Space<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    Objects.remove(key);
    expect(Objects.has(key)).toBe(false);
  });

  it('should get next and prev object', () => {
    const obj = new test_object(42);
    const Objects = new Space.Space<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    Objects.put('key1', obj);
    Objects.put('key3', obj);
    Objects.put('key2', obj);

    let storedObj = Objects.getNext('key1');
    expect(storedObj).not.toBeNull();
    expect(Arrays.equal(storedObj!.key, StringBytes.stringToBytes('key2'))).toBe(true);
    expect(storedObj!.value.value).toBe(obj.value);

    storedObj = Objects.getPrev('key3');
    expect(storedObj).not.toBeNull();
    expect(Arrays.equal(storedObj!.key, StringBytes.stringToBytes('key2'))).toBe(true);
    expect(storedObj!.value.value).toBe(obj.value);
  });

  it('should get many', () => {
    const testObj = new test_object(42);
    const Objects = new Space.Space<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    Objects.put('key1', testObj);
    Objects.put('key3', testObj);
    Objects.put('key2', testObj);

    let objs = Objects.getMany('key1');

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key2'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key3'))).toBe(true);

    Objects.put('key4', testObj);

    objs = Objects.getMany('key1', 2);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key2'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key3'))).toBe(true);

    objs = Objects.getMany('key4', 2, Space.Direction.Descending);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key3'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key2'))).toBe(true);

    const Objects2 = new Space.Space<Uint8Array, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    objs = Objects2.getMany(StringBytes.stringToBytes('key4'), 2, Space.Direction.Descending);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key3'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key2'))).toBe(true);
  });
});

describe('space with proto key', () => {
  it('should put and get an object', () => {
    const key = new test_object(1);
    const obj = new test_object(42);
    const Objects = new Space.SpaceProtoKey<test_object, test_object>(mockContractId, 2, test_object.encode, test_object.decode, test_object.encode);

    Objects.put(key, obj);

    let storedObj = Objects.get(key);
    expect(storedObj).not.toBeNull();
    expect(storedObj!.value).toBe(obj.value);
  });

  it('should check if space has an object or not', () => {
    const key = new test_object(1);
    const Objects = new Space.SpaceProtoKey<test_object, test_object>(mockContractId, 2, test_object.encode, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    expect(Objects.has(new test_object(2))).toBe(false);
  });

  it('should remove an object', () => {
    const key = new test_object(1);
    const Objects = new Space.SpaceProtoKey<test_object, test_object>(mockContractId, 2, test_object.encode, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    Objects.remove(key);
    expect(Objects.has(key)).toBe(false);
  });

  it('should get next and prev object', () => {
    const obj = new test_object(42);
    const Objects = new Space.SpaceProtoKey<test_object, test_object>(mockContractId, 2, test_object.encode, test_object.decode, test_object.encode);

    Objects.put(new test_object(1), obj);
    Objects.put(new test_object(3), obj);
    Objects.put(new test_object(2), obj);

    let storedObj = Objects.getNext(new test_object(1));
    expect(storedObj).not.toBeNull();
    expect(Arrays.equal(storedObj!.key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);
    expect(storedObj!.value.value).toBe(obj.value);

    storedObj = Objects.getPrev(new test_object(3));
    expect(storedObj).not.toBeNull();
    expect(Arrays.equal(storedObj!.key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);
    expect(storedObj!.value.value).toBe(obj.value);
  });

  it('should get many', () => {
    const testObj = new test_object(42);
    const Objects = new Space.SpaceProtoKey<test_object, test_object>(mockContractId, 2, test_object.encode, test_object.decode, test_object.encode);

    Objects.put(new test_object(1), testObj);
    Objects.put(new test_object(3), testObj);
    Objects.put(new test_object(2), testObj);

    let objs = Objects.getManyObj(new test_object(1));

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);
    expect(Arrays.equal(objs[1].key, Protobuf.encode(new test_object(3), test_object.encode))).toBe(true);

    Objects.put(new test_object(4), testObj);

    objs = Objects.getManyObj(new test_object(1), 2);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);
    expect(Arrays.equal(objs[1].key, Protobuf.encode(new test_object(3), test_object.encode))).toBe(true);

    objs = Objects.getManyObj(new test_object(4), 2, Space.Direction.Descending);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, Protobuf.encode(new test_object(3), test_object.encode))).toBe(true);
    expect(Arrays.equal(objs[1].key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);
  });
});
import { Base58, StringBytes, Storage, Arrays, Protobuf } from "../assembly";
import { test_object } from './test';

const mockContractId = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
const mockKey = StringBytes.stringToBytes("0x12345");

describe('space', () => {
  it('should put and get an object', () => {
    const obj = new test_object(42);
    const Objects = new Storage.Map<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);
    const key = 'key1';

    Objects.put(key, obj);

    let storedObj = Objects.get(key);
    expect(storedObj).not.toBeNull();
    expect(storedObj!.value).toBe(obj.value);
  });

  it('should check if space has an object or not', () => {
    const key = 'key1';
    const Objects = new Storage.Map<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    expect(Objects.has('key2')).toBe(false);
  });

  it('should remove an object', () => {
    const key = 'key1';
    const Objects = new Storage.Map<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    Objects.remove(key);
    expect(Objects.has(key)).toBe(false);
  });

  it('should get next and prev object', () => {
    const obj = new test_object(42);
    const Objects = new Storage.Map<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

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
    const Objects = new Storage.Map<String, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    Objects.put('key1', new test_object(1));
    Objects.put('key3', new test_object(3));
    Objects.put('key2', new test_object(2));

    let objs = Objects.getMany('key1');

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key2'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key3'))).toBe(true);

    Objects.put('key4', new test_object(4));

    objs = Objects.getMany('key1', 2);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key2'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key3'))).toBe(true);

    objs = Objects.getMany('key4', 2, Storage.Direction.Descending);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key3'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key2'))).toBe(true);

    let keys = Objects.getManyKeys('key4', 2, Storage.Direction.Descending);
    expect(keys.length).toBe(2);
    expect(keys[0]).toBe('key3');
    expect(keys[1]).toBe('key2');

    keys = Objects.getManyKeys('key1', 2);
    expect(keys.length).toBe(2);
    expect(keys[0]).toBe('key2');
    expect(keys[1]).toBe('key3');

    let values = Objects.getManyValues('key4', 2, Storage.Direction.Descending);
    expect(values.length).toBe(2);
    expect(values[0].value).toBe(3);
    expect(values[1].value).toBe(2);

    values = Objects.getManyValues('key1', 2);
    expect(values.length).toBe(2);
    expect(values[0].value).toBe(2);
    expect(values[1].value).toBe(3);

    const Objects2 = new Storage.Map<Uint8Array, test_object>(mockContractId, 1, test_object.decode, test_object.encode);

    objs = Objects2.getMany(StringBytes.stringToBytes('key4'), 2, Storage.Direction.Descending);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, StringBytes.stringToBytes('key3'))).toBe(true);
    expect(Arrays.equal(objs[1].key, StringBytes.stringToBytes('key2'))).toBe(true);

    const keys2 = Objects2.getManyKeys(StringBytes.stringToBytes('key4'), 2, Storage.Direction.Descending);
    expect(keys2.length).toBe(2);
    expect(Arrays.equal(keys2[0], StringBytes.stringToBytes('key3'))).toBe(true);
    expect(Arrays.equal(keys2[1], StringBytes.stringToBytes('key2'))).toBe(true);

    const values2 = Objects2.getManyValues(StringBytes.stringToBytes('key4'), 2, Storage.Direction.Descending);
    expect(values2.length).toBe(2);
    expect(values2[0].value).toBe(3);
    expect(values2[1].value).toBe(2);
  });
});

describe('space with proto key', () => {
  it('should put and get an object', () => {
    const key = new test_object(1);
    const obj = new test_object(42);
    const Objects = new Storage.ProtoMap<test_object, test_object>(mockContractId, 2,test_object.decode, test_object.encode, test_object.decode, test_object.encode);

    Objects.put(key, obj);

    let storedObj = Objects.get(key);
    expect(storedObj).not.toBeNull();
    expect(storedObj!.value).toBe(obj.value);
  });

  it('should check if space has an object or not', () => {
    const key = new test_object(1);
    const Objects = new Storage.ProtoMap<test_object, test_object>(mockContractId, 2,test_object.decode, test_object.encode, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    expect(Objects.has(new test_object(2))).toBe(false);
  });

  it('should remove an object', () => {
    const key = new test_object(1);
    const Objects = new Storage.ProtoMap<test_object, test_object>(mockContractId, 2,test_object.decode, test_object.encode, test_object.decode, test_object.encode);

    expect(Objects.has(key)).toBe(true);
    Objects.remove(key);
    expect(Objects.has(key)).toBe(false);
  });

  it('should get next and prev object', () => {
    const obj = new test_object(42);
    const Objects = new Storage.ProtoMap<test_object, test_object>(mockContractId, 2,test_object.decode, test_object.encode, test_object.decode, test_object.encode);

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
    const Objects = new Storage.ProtoMap<test_object, test_object>(mockContractId, 2,test_object.decode, test_object.encode, test_object.decode, test_object.encode);

    Objects.put(new test_object(1), new test_object(10));
    Objects.put(new test_object(3), new test_object(30));
    Objects.put(new test_object(2), new test_object(20));

    let objs = Objects.getManyObj(new test_object(1));

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);
    expect(Arrays.equal(objs[1].key, Protobuf.encode(new test_object(3), test_object.encode))).toBe(true);

    Objects.put(new test_object(4), new test_object(40));

    objs = Objects.getManyObj(new test_object(1), 2);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);
    expect(Arrays.equal(objs[1].key, Protobuf.encode(new test_object(3), test_object.encode))).toBe(true);

    objs = Objects.getManyObj(new test_object(4), 2, Storage.Direction.Descending);

    expect(objs.length).toBe(2);
    expect(Arrays.equal(objs[0].key, Protobuf.encode(new test_object(3), test_object.encode))).toBe(true);
    expect(Arrays.equal(objs[1].key, Protobuf.encode(new test_object(2), test_object.encode))).toBe(true);

    let values = Objects.getManyObjValues(new test_object(1), 2);

    expect(values.length).toBe(2);
    expect(values[0].value).toBe(20);
    expect(values[1].value).toBe(30);

    values = Objects.getManyObjValues(new test_object(4), 2, Storage.Direction.Descending);

    expect(values.length).toBe(2);
    expect(values[0].value).toBe(30);
    expect(values[1].value).toBe(20);

    let key = Objects.getManyObjKeys(new test_object(1), 2);

    expect(key.length).toBe(2);
    expect(key[0].value).toBe(2);
    expect(key[1].value).toBe(3);
    
    key = Objects.getManyObjKeys(new test_object(4), 2, Storage.Direction.Descending);

    expect(key.length).toBe(2);
    expect(key[0].value).toBe(3);
    expect(key[1].value).toBe(2);
  });
});
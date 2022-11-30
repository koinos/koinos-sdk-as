import { Arrays, Base58, Base64, Crypto, StringBytes, System } from "../assembly";

describe('Base58', () => {
  it('should decode a Base58 string into a Uint8Array', () => {
    const decoded = new Uint8Array(25);
    decoded[0] = 0;
    decoded[1] = 136;
    decoded[2] = 43;
    decoded[3] = 104;
    decoded[4] = 181;
    decoded[5] = 57;
    decoded[6] = 157;
    decoded[7] = 49;
    decoded[8] = 60;
    decoded[9] = 144;
    decoded[10] = 103;
    decoded[11] = 243;
    decoded[12] = 132;
    decoded[13] = 22;
    decoded[14] = 7;
    decoded[15] = 230;
    decoded[16] = 40;
    decoded[17] = 193;
    decoded[18] = 45;
    decoded[19] = 84;
    decoded[20] = 32;
    decoded[21] = 60;
    decoded[22] = 140;
    decoded[23] = 71;
    decoded[24] = 77;

    let calculatedDecoded = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
    expect(Arrays.equal(calculatedDecoded, decoded)).toBe(true);
    calculatedDecoded = Base58.decode(' 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
    expect(Arrays.equal(calculatedDecoded, decoded)).toBe(true);
    calculatedDecoded = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe ');
    expect(Arrays.equal(calculatedDecoded, decoded)).toBe(true);
    calculatedDecoded = Base58.decode(' 1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe ');
    expect(Arrays.equal(calculatedDecoded, decoded)).toBe(true);

    calculatedDecoded = Base58.decode('');
    expect(calculatedDecoded.length).toBe(0);
  });

  it('should encode a Uint8Array into a Base58 string', () => {
    let decoded = new Uint8Array(25);
    decoded[0] = 0;
    decoded[1] = 136;
    decoded[2] = 43;
    decoded[3] = 104;
    decoded[4] = 181;
    decoded[5] = 57;
    decoded[6] = 157;
    decoded[7] = 49;
    decoded[8] = 60;
    decoded[9] = 144;
    decoded[10] = 103;
    decoded[11] = 243;
    decoded[12] = 132;
    decoded[13] = 22;
    decoded[14] = 7;
    decoded[15] = 230;
    decoded[16] = 40;
    decoded[17] = 193;
    decoded[18] = 45;
    decoded[19] = 84;
    decoded[20] = 32;
    decoded[21] = 60;
    decoded[22] = 140;
    decoded[23] = 71;
    decoded[24] = 77;

    let encoded = '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe';

    let calculatedEncoded = Base58.encode(decoded);
    expect(calculatedEncoded).toBe(encoded);

    calculatedEncoded = Base58.encode(new Uint8Array(0));
    expect(calculatedEncoded).toBe('');

    decoded = new Uint8Array(3);
    decoded[0] = 255;
    decoded[1] = 0;
    decoded[2] = 43;

    encoded = '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe';

    calculatedEncoded = Base58.encode(decoded);
    // expect(calculatedEncoded).toBe(encoded);
  });
});

describe('Base64', () => {
  it('should decode a Base64 string into a Uint8Array', () => {
    const decoded = new Uint8Array(11);
    decoded[0] = 73;
    decoded[1] = 39;
    decoded[2] = 109;
    decoded[3] = 32;
    decoded[4] = 98;
    decoded[5] = 97;
    decoded[6] = 115;
    decoded[7] = 101;
    decoded[8] = 32;
    decoded[9] = 54;
    decoded[10] = 52;

    let calculatedDecoded = Base64.decode('SSdtIGJhc2UgNjQ=');

    expect(Arrays.equal(calculatedDecoded, decoded)).toBe(true);

    calculatedDecoded = Base64.decode('');
    expect(calculatedDecoded.length).toBe(0);

    let str = 'SSBhbSBiYXNlNjQhIQ==';
    let b64 = Base64.decode(str);

    expect(Base64.encode(b64)).toBe(str);

    str = 'SSBhbSBiYXNlNjQh';
    b64 = Base64.decode(str);

    expect(Base64.encode(b64)).toBe(str);

    str = 'SSA=';
    b64 = Base64.decode(str);

    expect(Base64.encode(b64)).toBe(str);
  });

  it('should encode a Uint8Array into a Base64 string', () => {
    const decoded = new Uint8Array(11);
    decoded[0] = 73;
    decoded[1] = 39;
    decoded[2] = 109;
    decoded[3] = 32;
    decoded[4] = 98;
    decoded[5] = 97;
    decoded[6] = 115;
    decoded[7] = 101;
    decoded[8] = 32;
    decoded[9] = 54;
    decoded[10] = 52;

    const encoded = 'SSdtIGJhc2UgNjQ=';

    let calculatedEncoded = Base64.encode(decoded);

    expect(calculatedEncoded).toBe(encoded);

    calculatedEncoded = Base64.encode(new Uint8Array(0));
    expect(calculatedEncoded).toBe('');
  });
});

describe('StringBytes', () => {
  it('should convert a string into a Uint8Array', () => {
    const bytes = new Uint8Array(18);
    bytes[0] = 75;
    bytes[1] = 111;
    bytes[2] = 105;
    bytes[3] = 110;
    bytes[4] = 111;
    bytes[5] = 115;
    bytes[6] = 32;
    bytes[7] = 105;
    bytes[8] = 115;
    bytes[9] = 32;
    bytes[10] = 65;
    bytes[11] = 119;
    bytes[12] = 101;
    bytes[13] = 115;
    bytes[14] = 111;
    bytes[15] = 109;
    bytes[16] = 101;
    bytes[17] = 33;

    let calculatedBytes = StringBytes.stringToBytes('Koinos is Awesome!');

    expect(Arrays.equal(calculatedBytes, bytes)).toBe(true);

    calculatedBytes = StringBytes.stringToBytes('');
    expect(calculatedBytes.length).toBe(0);
  });

  it('should convert a Uint8Array into a string', () => {
    const bytes = new Uint8Array(18);
    bytes[0] = 75;
    bytes[1] = 111;
    bytes[2] = 105;
    bytes[3] = 110;
    bytes[4] = 111;
    bytes[5] = 115;
    bytes[6] = 32;
    bytes[7] = 105;
    bytes[8] = 115;
    bytes[9] = 32;
    bytes[10] = 65;
    bytes[11] = 119;
    bytes[12] = 101;
    bytes[13] = 115;
    bytes[14] = 111;
    bytes[15] = 109;
    bytes[16] = 101;
    bytes[17] = 33;

    const str = 'Koinos is Awesome!';

    let calculatedStr = StringBytes.bytesToString(bytes);

    expect(calculatedStr).toBe(str);

    calculatedStr = StringBytes.bytesToString(new Uint8Array(0));
    expect(calculatedStr).toBe('');

    expect(StringBytes.bytesToString(null)).toBe('');
  });
});

describe('Crypto', () => {
  it('should convert a public key into an address', () => {
    const publicKey = new Uint8Array(33);
    publicKey[0] = 3;
    publicKey[1] = 74;
    publicKey[2] = 182;
    publicKey[3] = 164;
    publicKey[4] = 51;
    publicKey[5] = 98;
    publicKey[6] = 12;
    publicKey[7] = 18;
    publicKey[8] = 197;
    publicKey[9] = 92;
    publicKey[10] = 127;
    publicKey[11] = 9;
    publicKey[12] = 79;
    publicKey[13] = 35;
    publicKey[14] = 113;
    publicKey[15] = 205;
    publicKey[16] = 93;
    publicKey[17] = 22;
    publicKey[18] = 226;
    publicKey[19] = 105;
    publicKey[20] = 213;
    publicKey[21] = 226;
    publicKey[22] = 217;
    publicKey[23] = 167;
    publicKey[24] = 219;
    publicKey[25] = 86;
    publicKey[26] = 120;
    publicKey[27] = 235;
    publicKey[28] = 117;
    publicKey[29] = 4;
    publicKey[30] = 178;
    publicKey[31] = 202;
    publicKey[32] = 153;

    const address = new Uint8Array(25);
    address[0] = 0;
    address[1] = 136;
    address[2] = 43;
    address[3] = 104;
    address[4] = 181;
    address[5] = 57;
    address[6] = 157;
    address[7] = 49;
    address[8] = 60;
    address[9] = 144;
    address[10] = 103;
    address[11] = 243;
    address[12] = 132;
    address[13] = 22;
    address[14] = 7;
    address[15] = 230;
    address[16] = 40;
    address[17] = 193;
    address[18] = 45;
    address[19] = 84;
    address[20] = 32;
    address[21] = 60;
    address[22] = 140;
    address[23] = 71;
    address[24] = 77;

    const b58Address = '1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe';

    let calculatedAddress = Crypto.addressFromPublicKey(publicKey);

    expect(Arrays.equal(calculatedAddress, address)).toBe(true);

    const calculatedB58 = Base58.encode(calculatedAddress);
    expect(calculatedB58).toBe(b58Address);
  });

  test('Multihash class', () => {
    const mockStr = 'Hello World!';
    const mockStrBytes = StringBytes.stringToBytes(mockStr);
    const mhdigest = Arrays.fromHexString('7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');

    const sha256digest = System.hash(Crypto.multicodec.sha2_256, mockStrBytes);

    const mh = new Crypto.Multihash();
    mh.deserialize(sha256digest!);
    
    expect(mh.code).toBe(18);
    expect(mh.digest.length).toBe(32);
    expect(Arrays.equal(mh.digest, mhdigest)).toBe(true);

    const mhsha256digest = Arrays.fromHexString('0x12207f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069');
    const serializedMh = mh.serialize();
    
    expect(Arrays.equal(serializedMh, mhsha256digest)).toBe(true);
  });
});

describe('Arrays', () => {
  it('should compare two Uint8Array', () => {
    let array1 = new Uint8Array(0);
    let array2 = new Uint8Array(0);

    expect(Arrays.equal(array1, array2)).toBe(true);
    expect(Arrays.equal(null, null)).toBe(true);

    array1 = new Uint8Array(10).fill(1);
    array2 = new Uint8Array(10).fill(1);

    expect(Arrays.equal(array1, array2)).toBe(true);

    array2 = new Uint8Array(10).fill(2);
    expect(Arrays.equal(array1, array2)).toBe(false);
    expect(Arrays.equal(null, array2)).toBe(false);
    expect(Arrays.equal(array1, null)).toBe(false);

    array2 = new Uint8Array(11).fill(2);
    expect(Arrays.equal(array1, array2)).toBe(false);
  });

  it('should convert hex strings', () => {
    const hexString = '0x12207f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069';
    const buff = Arrays.fromHexString(hexString);
    const calculatedHexString = Arrays.toHexString(buff);
    expect(calculatedHexString).toBe(hexString);
  });
});

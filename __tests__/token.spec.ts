import { Base58, MockVM, Protobuf, StringBytes, Token } from "../assembly";
import { token } from 'koinos-proto-as';


const mockTokenContractIdAccount = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
const mockAccount1 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
const mockAccount2 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
const mockId = StringBytes.stringToBytes("0x12345");

describe('token', () => {
  it('should get the name of a token', () => {
    const tokenName = 'Token';
    const nameRes = new token.name_result(tokenName);
    MockVM.setCallContractResults([Protobuf.encode(nameRes, token.name_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    const name = tkn.name();

    expect(name).toBe(tokenName);
  });

  it('should get the symbol of a token', () => {
    const tokenSymbol = 'TKN';
    const symbolRes = new token.symbol_result(tokenSymbol);
    MockVM.setCallContractResults([Protobuf.encode(symbolRes, token.symbol_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    const symbol = tkn.symbol();

    expect(symbol).toBe(tokenSymbol);
  });

  it('should get the decimals of a token', () => {
    const tokenDecimals = 8;
    const decimalsRes = new token.decimals_result(tokenDecimals);
    MockVM.setCallContractResults([Protobuf.encode(decimalsRes, token.decimals_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    const decimals = tkn.decimals();

    expect(decimals).toBe(tokenDecimals);
  });

  it('should get the total supply of a token', () => {
    const tokenTotalSupply = 1008767;
    const totalSupplyRes = new token.total_supply_result(tokenTotalSupply);
    MockVM.setCallContractResults([Protobuf.encode(totalSupplyRes, token.total_supply_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    const totalSupply = tkn.totalSupply();

    expect(totalSupply).toBe(tokenTotalSupply);
  });

  it('should get the balance of an account', () => {
    const accountBalance = 76231876;
    const balanceOfRes = new token.balance_of_result(accountBalance);
    MockVM.setCallContractResults([Protobuf.encode(balanceOfRes, token.balance_of_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    const balance = tkn.balanceOf(mockAccount1);

    expect(balance).toBe(accountBalance);
  });

  it('should/not tranfer a token', () => {
    let transferResult = true;
    let transferRes = new token.transfer_result(transferResult);
    MockVM.setCallContractResults([Protobuf.encode(transferRes, token.transfer_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    let transfer = tkn.transfer(mockAccount1, mockAccount2, 167);

    expect(transfer).toBe(transferResult);

    transferResult = false;
    transferRes.value = transferResult;
    MockVM.setCallContractResults([Protobuf.encode(transferRes, token.transfer_result.encode)]);

    transfer = tkn.transfer(mockAccount1, mockAccount2, 198);

    expect(transfer).toBe(transferResult);
  });

  it('should/not mint a token', () => {
    let mintResult = true;
    let mintRes = new token.mint_result(mintResult);
    MockVM.setCallContractResults([Protobuf.encode(mintRes, token.mint_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    let mint = tkn.mint(mockAccount1, 167);

    expect(mint).toBe(mintResult);

    mintResult = false;
    mintRes.value = mintResult;
    MockVM.setCallContractResults([Protobuf.encode(mintRes, token.mint_result.encode)]);

    mint = tkn.mint(mockAccount1, 76);

    expect(mint).toBe(mintResult);
  });

  it('should/not burn a token', () => {
    let burnResult = true;
    let burnRes = new token.burn_result(burnResult);
    MockVM.setCallContractResults([Protobuf.encode(burnRes, token.burn_result.encode)]);

    const tkn = new Token(mockTokenContractIdAccount);
    let burn = tkn.burn(mockAccount1, 167);

    expect(burn).toBe(burnResult);

    burnResult = false;
    burnRes.value = burnResult;

    MockVM.setCallContractResults([Protobuf.encode(burnRes, token.burn_result.encode)]);

    burn = tkn.burn(mockAccount1, 76);

    expect(burn).toBe(burnResult);
  });
});

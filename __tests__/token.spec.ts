import { Arrays, Base58, MockVM, Protobuf, StringBytes, Token } from "../index";
import { kcs4, system_calls, chain } from '@koinos/proto-as';


const mockTokenContractIdAccount = Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe');
const mockAccount1 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
const mockAccount2 = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
const mockId = StringBytes.stringToBytes("0x12345");

describe('token', () => {
  it('should get the name of a token', () => {
    const tokenName = 'Token';
    const nameRes = new kcs4.name_result(tokenName);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(nameRes, kcs4.name_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const name = tkn.name();

    expect(name).toBe(tokenName);
  });

  it('should get the symbol of a token', () => {
    const tokenSymbol = 'TKN';
    const symbolRes = new kcs4.symbol_result(tokenSymbol);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(symbolRes, kcs4.symbol_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const symbol = tkn.symbol();

    expect(symbol).toBe(tokenSymbol);
  });

  it('should get the decimals of a token', () => {
    const tokenDecimals = 8;
    const decimalsRes = new kcs4.decimals_result(tokenDecimals);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(decimalsRes, kcs4.decimals_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const decimals = tkn.decimals();

    expect(decimals).toBe(tokenDecimals);
  });

  it('should get info of a token', () => {
    const tokenName = "Token";
    const tokenSymbol = "TKN";
    const tokenDecimals = 8;
    const getInfoRes = new kcs4.get_info_result(tokenName, tokenSymbol, tokenDecimals);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(getInfoRes, kcs4.get_info_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const info = tkn.getInfo();

    expect(info.name).toBe(tokenName);
    expect(info.symbol).toBe(tokenSymbol);
    expect(info.decimals).toBe(tokenDecimals);
  });

  it('should get the total supply of a token', () => {
    const tokenTotalSupply = 1008767;
    const totalSupplyRes = new kcs4.total_supply_result(tokenTotalSupply);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(totalSupplyRes, kcs4.total_supply_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const totalSupply = tkn.totalSupply();

    expect(totalSupply).toBe(tokenTotalSupply);
  });

  it('should get the balance of an account', () => {
    const accountBalance = 76231876;
    const balanceOfRes = new kcs4.balance_of_result(accountBalance);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(balanceOfRes, kcs4.balance_of_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const balance = tkn.balanceOf(mockAccount1);

    expect(balance).toBe(accountBalance);
  });

  it('should get an allowance', () => {
    const allowanceValue = 12345678;
    const allowanceRes = new kcs4.allowance_result(allowanceValue);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(allowanceRes, kcs4.allowance_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const allowance = tkn.allowance(mockAccount1, mockAccount2);

    expect(allowance).toBe(allowanceValue);
  });

  it('should get allowances', () => {
    const allowanceValueA = 12345678;
    const allowanceValueB = 23456789;
    const allowancesRes = new kcs4.get_allowances_result(mockAccount1, [new kcs4.spender_value(mockAccount1, allowanceValueA), new kcs4.spender_value(mockAccount2, allowanceValueB)]);
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(allowancesRes, kcs4.get_allowances_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    const allowances = tkn.getAllowances(mockAccount1, new Uint8Array(0), 10, true);

    expect(allowances.length).toBe(2);
    expect(Arrays.equal(allowances[0].spender, mockAccount1)).toBe(true);
    expect(allowances[0].value).toBe(allowanceValueA);
    expect(Arrays.equal(allowances[1].spender, mockAccount2)).toBe(true);
    expect(allowances[1].value).toBe(allowanceValueB);
  });

  it('should transfer a token', () => {
    let transferRes = new kcs4.transfer_result();
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(transferRes, kcs4.transfer_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    let transfer = tkn.transfer(mockAccount1, mockAccount2, 167);

    expect(transfer).toBe(true);
  });

  it('should/not mint a token', () => {
    let mintRes = new kcs4.mint_result();
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(mintRes, kcs4.mint_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    let mint = tkn.mint(mockAccount1, 167);

    expect(mint).toBe(true);
  });

  it('should burn a token', () => {
    let burnRes = new kcs4.burn_result();
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(burnRes, kcs4.burn_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    let burn = tkn.burn(mockAccount1, 167);

    expect(burn).toBe(true);
  });

  it('should/not create an allowance', () => {
    let allowanceRes = new kcs4.approve_result();
    MockVM.setCallContractResults([
      new system_calls.exit_arguments(0, new chain.result(Protobuf.encode(allowanceRes, kcs4.approve_result.encode)))]);

    const tkn = new Token(mockTokenContractIdAccount);
    let approve = tkn.approve(mockAccount1, mockAccount2, 123);

    expect(approve).toBe(true);
  })
});

import { Protobuf } from "as-proto";
import { System } from "../systemCalls";
import { error, kcs4, system_calls } from "@koinos/proto-as";

enum entries {
  name_entry = 0x82a3537f,
  symbol_entry = 0xb76a7ca1,
  decimals_entry = 0xee80fd2f,
  get_info_entry = 0xbd7f6850,
  total_supply_entry = 0xb0da3934,
  balance_of_entry = 0x5c721497,
  allowance_entry = 0x32f09fa1,
  get_allowances_entry = 0x8fa16456,
  transfer_entry = 0x27f576ca,
  mint_entry = 0xdc6f17bb,
  burn_entry = 0x859facc5,
  approve_entry = 0x74e21680,
}

function checkErrorCode(callRes: System.callReturn, defaultMessage : string = ""): void {
  if (callRes.code != error.error_code.success) {
    System.fail(callRes.res.error!.message.length > 0 ? callRes.res.error!.message : defaultMessage );
  }
}

export class Token {
  _contractId: Uint8Array;

  /**
    * Create an instance of a token contract
    * @example
    * ```ts
    *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
    * ```
    */
  constructor(contractId: Uint8Array) {
    this._contractId = contractId;
  }

  /**
    * Get the name of the token
    * @returns string
    * @example
    * ```ts
    *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
    *  const name = token.name();
    * ```
    */
  name(): string {
    const args = new kcs4.name_arguments();

    const callRes = System.call(this._contractId, entries.name_entry, Protobuf.encode(args, kcs4.name_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve token name");
    const res = Protobuf.decode<kcs4.name_result>(callRes.res.object as Uint8Array, kcs4.name_result.decode);

    return res.value;
  }

  /**
    * Get the symbol of the token
    * @returns string
    * @example
    * ```ts
    *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
    *  const symbol = token.symbol();
    * ```
    */
  symbol(): string {
    const args = new kcs4.symbol_arguments();

    const callRes = System.call(this._contractId, entries.symbol_entry, Protobuf.encode(args, kcs4.symbol_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve token symbol");
    const res = Protobuf.decode<kcs4.symbol_result>(callRes.res.object as Uint8Array, kcs4.symbol_result.decode);

    return res.value;
  }

  /**
    * Get the decimal of the token
    * @returns u32
    * @example
    * ```ts
    *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
    *  const decimals = token.decimals();
    * ```
    */
  decimals(): u32 {
    const args = new kcs4.decimals_arguments();

    const callRes = System.call(this._contractId, entries.decimals_entry, Protobuf.encode(args, kcs4.decimals_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve token decimals");
    const res = Protobuf.decode<kcs4.decimals_result>(callRes.res.object as Uint8Array, kcs4.decimals_result.decode);

    return res.value;
  }

  /**
   * Get the token information
   * @returns kcs4.get_info_result
   * @example
   * ``` ts
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const tokenInfo = token.getInfo();
   * ```
   */
  getInfo(): kcs4.get_info_result {
    const args = new kcs4.get_info_arguments();

    const callRes = System.call(this._contractId, entries.get_info_entry, Protobuf.encode(args, kcs4.get_info_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve token info");
    return Protobuf.decode<kcs4.get_info_result>(callRes.res.object as Uint8Array, kcs4.get_info_result.decode);
  }

  /**
   * Get the total supply of the token
   * @returns u64
   * @example
   * ```ts
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const totalSupply = token.totalSupply();
   * ```
   */
  totalSupply(): u64 {
    const args = new kcs4.total_supply_arguments();

    const callRes = System.call(this._contractId, entries.total_supply_entry, Protobuf.encode(args, kcs4.total_supply_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve token supply");
    const res = Protobuf.decode<kcs4.total_supply_result>(callRes.res.object as Uint8Array, kcs4.total_supply_result.decode);

    return res.value;
  }

  /**
   * Get the balance of the `owner` account
   * @param owner owner account
   * @returns u64 balance
   * @example
   * ```ts
   *  const ownerAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const balance = token.balanceOf(ownerAccount);
   * ```
   */
  balanceOf(owner: Uint8Array): u64 {
    const args = new kcs4.balance_of_arguments(owner);

    const callRes = System.call(this._contractId, entries.balance_of_entry, Protobuf.encode(args, kcs4.balance_of_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve token balance");
    const res = Protobuf.decode<kcs4.balance_of_result>(callRes.res.object as Uint8Array, kcs4.balance_of_result.decode);

    return res.value;
  }

  /**
   * Get a 'spender' allowance of the 'owner' account
   * @param owner owner account
   * @param spender spender address
   * @returns u64 allowance
   * ```ts
   *  const ownerAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
   *  const spenderAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const allowance = token.allowance(ownerAccount, spenderAccount);
   * ```
   */
  allowance(owner: Uint8Array, spender: Uint8Array): u64 {
    const args = new kcs4.allowance_arguments(owner, spender);

    const callRes = System.call(this._contractId, entries.allowance_entry, Protobuf.encode(args, kcs4.allowance_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve allowance");
    const res = Protobuf.decode<kcs4.allowance_result>(callRes.res.object as Uint8Array, kcs4.allowance_result.decode);

    return res.value;
  }

  /**
   * Get allowances of the 'owner' account
   * @param owner owner account
   * @param start spender start address
   * @param limit maximum allowances to return
   * @param descending return allowances descending
   * @returns kcs4.spender_value[] allowances
   * ```ts
   *  const ownerAccount = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
   *  const spenderAccount = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const allowances = token.get_allowances(ownerAccount, new Uint8Array(0), 10, true);
   * ```
   */
  getAllowances(owner: Uint8Array, start: Uint8Array, limit: i32, descending: bool): kcs4.spender_value[] {
    const args = new kcs4.get_allowances_arguments(owner, start, limit, descending);

    const callRes = System.call(this._contractId, entries.get_allowances_entry, Protobuf.encode(args, kcs4.get_allowances_arguments.encode));
    checkErrorCode(callRes, "failed to retrieve allowances");
    const res = Protobuf.decode<kcs4.get_allowances_result>(callRes.res.object as Uint8Array, kcs4.get_allowances_result.decode);

    return res.allowances;
  }

  /**
   * Transfer tokens from `from` to `to`
   * @param from from account
   * @param to to account
   * @param value number of tokens to transfer
   * @returns bool transfer succeeded or not
   * @example
   * ```ts
   *  const from = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
   *  const to = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqE');
   *  const value = 12376182;
   *
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const success = token.transfer(from, to, value);
   *  if (success) {
   *    // transfer succeeded
   *  } else {
   *    // transfer failed
   *  }
   * ```
   */
  transfer(from: Uint8Array, to: Uint8Array, amount: u64): bool {
    const args = new kcs4.transfer_arguments(from, to, amount);
    const callRes = System.call(this._contractId, entries.transfer_entry, Protobuf.encode(args, kcs4.transfer_arguments.encode));
    if (callRes.code != error.error_code.success && callRes.res.error!.message.length > 0) {
      System.log(callRes.res.error!.message);
    }

    return callRes.code == error.error_code.success;
  }

  /**
   * Mint tokens to `to` account
   * @param to to account
   * @param value number of tokens to mint
   * @returns bool mint succeeded or not
   * @example
   * ```ts
   *  const to = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqA');
   *  const value = 12376182;
   *
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const success = token.mint(to, value);
   *  if (success) {
   *    // mint succeeded
   *  } else {
   *    // mint failed
   *  }
   * ```
   */
  mint(to: Uint8Array, amount: u64): bool {
    const args = new kcs4.mint_arguments(to, amount);
    const callRes = System.call(this._contractId, entries.mint_entry, Protobuf.encode(args, kcs4.mint_arguments.encode));
    if (callRes.code != error.error_code.success && callRes.res.error!.message.length > 0) {
      System.log(callRes.res.error!.message);
    }

    return callRes.code == error.error_code.success;
  }

  /**
   * Burn tokens from `from`
   * @param from from account
   * @param value number of tokens to burn
   * @returns bool burn succeeded or not
   * @example
   * ```ts
   *  const from = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
   *  const value = 12376182;
   *
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScFTU1Hc8BsyARTPqe'));
   *  const success = token.burn(from, value);
   *  if (success) {
   *    // transfer succeeded
   *  } else {
   *    // transfer failed
   *  }
   * ```
   */
  burn(from: Uint8Array, amount: u64): bool {
    const args = new kcs4.burn_arguments(from, amount);
    const callRes = System.call(this._contractId, entries.burn_entry, Protobuf.encode(args, kcs4.burn_arguments.encode));
    if (callRes.code != error.error_code.success && callRes.res.error!.message.length > 0) {
      System.log(callRes.res.error!.message);
    }

    return callRes.code == error.error_code.success;
  }

  /**
   * Approve the `spender` to spend `owner` tokens
   * @param owner owner account
   * @param spender spender account
   * @param value number of tokens to approve
   * @returns bool approve succeeded or not
   * ```ts
   *  const owner = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
   *  const spender = Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe');
   *  const value = 12345678;
   *
   *  const token = new Token(Base58.decode('1DQzuCcTKacbs9GGScRTU1Hc8BsyARTPqe'));
   *  if (token.approve(owner, spender, value)) {
   *    // approve succeeded
   *  } else {
   *    // approve failed
   *  }
   * ```
   */
  approve(owner: Uint8Array, spender: Uint8Array, value: u64): bool {
    const args = new kcs4.approve_arguments(owner, spender, value);
    const callRes = System.call(this._contractId, entries.approve_entry, Protobuf.encode(args, kcs4.approve_arguments.encode));
    if (callRes.code != error.error_code.success && callRes.res.error!.message.length > 0) {
      System.log(callRes.res.error!.message);
    }

    return callRes.code == error.error_code.success;
  }
}

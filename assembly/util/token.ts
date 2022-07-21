import { Protobuf, System } from "..";
import { token } from "koinos-proto-as";

enum entries {
  name_entry = 0x82a3537f,
  symbol_entry = 0xb76a7ca1,
  decimals_entry = 0xee80fd2f,
  total_supply_entry = 0xb0da3934,
  balance_of_entry = 0x5c721497,
  transfer_entry = 0x27f576ca,
  mint_entry = 0xdc6f17bb,
  burn_entry = 0x859facc5,
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
    const args = new token.name_arguments();

    const buf = System.callContract(this._contractId, entries.name_entry, Protobuf.encode(args, token.name_arguments.encode));
    const res = Protobuf.decode<token.name_result>(buf as Uint8Array, token.name_result.decode);

    return res.value!;
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
    const args = new token.symbol_arguments();

    const buf = System.callContract(this._contractId, entries.symbol_entry, Protobuf.encode(args, token.symbol_arguments.encode));
    const res = Protobuf.decode<token.symbol_result>(buf as Uint8Array, token.symbol_result.decode);

    return res.value!;
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
    const args = new token.decimals_arguments();

    const buf = System.callContract(this._contractId, entries.decimals_entry, Protobuf.encode(args, token.decimals_arguments.encode));
    const res = Protobuf.decode<token.decimals_result>(buf as Uint8Array, token.decimals_result.decode);

    return res.value;
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
    const args = new token.total_supply_arguments();

    const buf = System.callContract(this._contractId, entries.total_supply_entry, Protobuf.encode(args, token.total_supply_arguments.encode));
    const res = Protobuf.decode<token.total_supply_result>(buf as Uint8Array, token.total_supply_result.decode);

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
    const args = new token.balance_of_arguments(owner);

    const buf = System.callContract(this._contractId, entries.balance_of_entry, Protobuf.encode(args, token.balance_of_arguments.encode));

    const res = Protobuf.decode<token.balance_of_result>(buf as Uint8Array, token.balance_of_result.decode);

    return res.value;
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
  transfer(from: Uint8Array, to: Uint8Array, value: u64): bool {
    const args = new token.transfer_arguments(from, to, value);

    const buf = System.callContract(this._contractId, entries.transfer_entry, Protobuf.encode(args, token.transfer_arguments.encode));

    const res = Protobuf.decode<token.transfer_result>(buf!, token.transfer_result.decode);
    return res.value;
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
  mint(to: Uint8Array, value: u64): bool {
    const args = new token.mint_arguments(to, value);

    const buf = System.callContract(this._contractId, entries.mint_entry, Protobuf.encode(args, token.mint_arguments.encode));

    const res = Protobuf.decode<token.mint_result>(buf!, token.mint_result.decode);
    return res.value;
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
  burn(from: Uint8Array, value: u64): bool {
    const args = new token.burn_arguments(from, value);

    const buf = System.callContract(this._contractId, entries.burn_entry, Protobuf.encode(args, token.burn_arguments.encode));

    const res = Protobuf.decode<token.burn_result>(buf!, token.burn_result.decode);
    return res.value;
  }
}

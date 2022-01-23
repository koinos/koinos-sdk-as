export namespace env {
  // @ts-ignore
  @external("env", "invoke_thunk")
  export declare function invoke_thunk(tid: u32, ret_ptr: u32, ret_len: u32, arg_ptr: u32, arg_len: u32): u32;
  // @ts-ignore
  @external("env", "invoke_system_call")
  export declare function invoke_system_call(sid: u32, ret_ptr: u32, ret_len: u32, arg_ptr: u32, arg_len: u32): u32;
}
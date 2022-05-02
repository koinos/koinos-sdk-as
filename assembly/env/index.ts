export namespace env {
  // @ts-ignore
  @external("env", "invoke_thunk")
  export declare function invokeThunk(tid: u32, ret_ptr: u32, ret_len: u32, arg_ptr: u32, arg_len: u32): i32;
  // @ts-ignore
  @external("env", "invoke_system_call")
  export declare function invokeSystemCall(sid: u32, ret_ptr: u32, ret_len: u32, arg_ptr: u32, arg_len: u32): i32;
}

import { System, Protobuf } from 'koinos-as-sdk';
import { ##_CONTRACT_CLASS_NAME_## } from './##_CONTRACT_CLASS_NAME_##';
import { ##_CONTRACT_TYPES_CLASS_NAMES_## } from './proto/##_CONTRACT_CLASS_NAME_##';

export function main(): i32 {
  const entryPoint = System.getEntryPoint();
  const rdbuf = System.getContractArguments();
  let retbuf = new Uint8Array(1024);

  const c = new ##_CONTRACT_CLASS_NAME_##();

  switch (entryPoint) {
    ##_CONTRACT_ENTRY_POINTS_##
    default:
      System.exitContract(1);
      break;
  }
  
  System.setContractResultBytes(retbuf);
  
  System.exitContract(0);
  return 0;
}

main();
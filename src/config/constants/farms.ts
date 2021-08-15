import tokens from './tokens';
import { FarmConfig } from './types';

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 252) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'Kaco',
    lpAddresses: {
      97: '0xb6f33B452B3e179dA1C2De637547163c8caD9123',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'Kaco-BNB LP',
    lpAddresses: {
      97: '0x4d6F0B03AEbFa48E185Ec4d6f7118994F0EedCD0',
      56: '0x4d6F0B03AEbFa48E185Ec4d6f7118994F0EedCD0',
    },
    token: tokens.kaco,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
];

// const farms: FarmConfig[] = []

export default farms;

import tokens from './tokens';
import { FarmConfig } from './types';
export const KACO_LP_PID = 0;
export const KACO_BNB_LP_PID = 1;
export const BUSD_BNB_LP_PID = 2;
export const FARM_QUOTE_QUOTE_TOKEN_SYMBOL = tokens.dot.symbol;

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 1, 2) should always be at the top of the file.
   */
  {
    pid: KACO_LP_PID,
    lpSymbol: 'KAC',
    lpAddresses: {
      97: '0x0bA819e30016Cf682C7795b44859148C65e62292',
      56: '0xf96429A7aE52dA7d07E60BE95A3ece8B042016fB',
    },
    token: tokens.syrup,
    quoteToken: tokens.dot,
  },
  {
    pid: KACO_BNB_LP_PID,
    lpSymbol: 'KAC-DOT LP',
    lpAddresses: {
      97: '0x4d6F0B03AEbFa48E185Ec4d6f7118994F0EedCD0',
      56: '0x315f25cea80ac6c039b86e79ffc46ae6b2e30922',
    },
    token: tokens.kaco,
    quoteToken: tokens.dot,
  },
  {
    pid: BUSD_BNB_LP_PID,
    lpSymbol: 'DOT-BUSD LP',
    lpAddresses: {
      97: '0x756f158A2C02246Bf00bbdB051729804F2efd9c7',
      56: '0xa0f19146914e3C160897059ef8695BcD9fcf98b2',
    },
    token: tokens.dot,
    quoteToken: tokens.busd,
  },
  /**
   * V3 by order of release (some may be out of PID order due to multiplier boost)
   */
  {
    pid: 3,
    lpSymbol: 'KSM-KAC LP',
    lpAddresses: {
      97: '',
      56: '0x23e6c98F69515cAb75352a31fED9994A67312B10',
    },
    token: tokens.ksm,
    quoteToken: tokens.kaco,
  },
  {
    pid: 4,
    lpSymbol: 'KSM-DOT LP',
    lpAddresses: {
      97: '',
      56: '0xfb2cd96f40cac3e599c99b9da40ea8559a222c61',
    },
    token: tokens.ksm,
    quoteToken: tokens.dot,
  },
  {
    pid: 5,
    lpSymbol: 'KSM-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x69115f09010c1a21aaa839eec7e14f6748e1334e',
    },
    token: tokens.ksm,
    quoteToken: tokens.usdt,
  },
  {
    pid: 6,
    lpSymbol: 'WBNB-KSM LP',
    lpAddresses: {
      97: '',
      56: '0xe4cecfe8ed2c820e0d5a4815ee61f2848d77e762',
    },
    token: tokens.wbnb,
    quoteToken: tokens.ksm,
  },
  {
    pid: 7,
    lpSymbol: 'REEF-DOT LP',
    lpAddresses: {
      97: '',
      56: '0x0fab3accf421238f8c96592178df0a908996acf6',
    },
    token: tokens.reef,
    quoteToken: tokens.dot,
  },
  {
    pid: 8,
    lpSymbol: 'CLV-DOT LP',
    lpAddresses: {
      97: '',
      56: '0x344dc8d3d62d9f00f48d6514433214f8db7ce38e',
    },
    token: tokens.clv,
    quoteToken: tokens.dot,
  },
  {
    pid: 9,
    lpSymbol: 'LIT-DOT LP',
    lpAddresses: {
      97: '',
      56: '0x632121b39e86d52dc91c5f1f5517bc417e88f0df',
    },
    token: tokens.lit,
    quoteToken: tokens.dot,
  },
  {
    pid: 10,
    lpSymbol: 'NEAR-USDT LP',
    lpAddresses: {
      97: '',
      56: '0x18510be7f66bc5cefe78e66df8cad428b289e8ba',
    },
    token: tokens.near,
    quoteToken: tokens.usdt,
  },
  {
    pid: 11,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xd56414bdb4de22ced7698a5cb8e83741574ffe15',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 13,
    lpSymbol: 'POLS-DOT LP',
    lpAddresses: {
      97: '',
      56: '0x382cb2ee90cb4e717f12fe0091dfc22dee881470',
    },
    token: tokens.pols,
    quoteToken: tokens.dot,
  },
];

export default farms;

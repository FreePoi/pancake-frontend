# 🥞 Kaco Frontend

This project contains the main features of the kaco application.

If you want to contribute, please refer to the [contributing guidelines](./CONTRIBUTING.md) of this project.

https://testnet.bscscan.com/tx/0xbfb2ee69f60c4544656938d09e88cabb84122265d3eee8e29bdffc780dc5ea8b

```ts
addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline)
```

user= 0xfb83a67784f110dc658b19515308a7a95c2ba33a
router = 0x52b82fb107f293d0712d82b639127a9807c55458
liquidity pair= 0x48F57a3Ff61BBD1B4fED49ee0f9f43EdDD201fF4 接收 kaco 和 wbnb

factory 生成 liquidity pair
user => liquidity pair 打 100 kaco
factory =》 liquidity pair 打 0.1 wbnb
铸造 3.15 LP-token 给 user

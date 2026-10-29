# Devnet deployment (2026-10-29)

Devnet only. Nothing on mainnet.

| Item | Value |
|---|---|
| Program id | [8CM5WK2EXXY9goXaTRnmKvFAxiSfVAmmTWBVX7X5zvBc](https://explorer.solana.com/address/8CM5WK2EXXY9goXaTRnmKvFAxiSfVAmmTWBVX7X5zvBc?cluster=devnet) (executable, BPF upgradeable) |
| ProgramData | 41CrPA9UqTkpaFKPpjMwaJjwk2L5ntqv8ZtHntTRdjXi |
| Upgrade authority / deployer | GuChj1PTNjEt7DPVaRyriWm7LSzZ8RhhpEgPxWcGrPGu (devnet-only key, not in repo) |
| Deployed slot | 516509220 |
| Global config PDA | 2quodLtko7EPscL8wvR4xq8TR9h7QAz2DEoR9MHBz886 (fees 0, platform bps 0) |

## Transactions
- deploy: [3x7Shkf9…](https://explorer.solana.com/tx/3x7Shkf9LeWDu2faLHJZLuWfLPLnuEjLTwQnp8E5ruNhQ1m6vDSEw2vCpgx9Za8Henmeo5JGpkbcjJC12ri6V3jp?cluster=devnet)
- initialize: [52fChnCL…](https://explorer.solana.com/tx/52fChnCLTMHeSJsGV819rZvhdBNWkJbRs2F6b2AgDmuFUHFXMtpoBA9DvNXdcBgEmx7Jc51GjR9K3fPPg4WSAta5?cluster=devnet)
- register_asset (smoke): [BDQD4YPr…](https://explorer.solana.com/tx/BDQD4YPrqmEdMkBLbLo3CbMgGqXfLKA7fJmMaspUs17GuZvRvxA1Q7ad5uuxaqNDhQWsyhCzbnQDrEJf1Jj8NpF?cluster=devnet), asset 5nDcJjikJi3diPvwZ8A1icU2ABsCkCJUDnRQUs7CA4np (id FZDZoTkSgeg9sCvP99s72r1ivSYLmk3RHN7JXPpFD4aR)
- tokenize_asset (built by clawd-pump-hybrid `buildTokenizeAsset`, the handler behind POST /api/rwa/tokenize/build): [35QgtAy6…](https://explorer.solana.com/tx/35QgtAy6ia8kxrLA59W3ajtKztL5k4hjeVuMYerRYYQYYgMJErDFvUc9ysYdg4zfc74mLeY48c3jTaYNz7H4FCqx?cluster=devnet), mint 3SK4fLWzEF2DQ6dVgoN36Q94xRcw2n7HM6AtdWWnb9Us, supply 1,000,000; asset status Active, isTokenized true

Reproduce: `npx tsx scripts/devnet-smoke.ts` (DEPLOYER_KEYPAIR, SOLANA_DEVNET_RPC_URL optional).

// Devnet-only: initialize global config (if needed) and register one smoke-test asset.
// Usage: DEPLOYER_KEYPAIR=~/.config/solana/devnet-deployer.json npx tsx scripts/devnet-smoke.ts
import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import fs from "fs";
import os from "os";
const idl = JSON.parse(fs.readFileSync("target/idl/rwa_tokenization.json", "utf8"));
const RPC = process.env.SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com";
if (/mainnet/i.test(RPC)) throw new Error("devnet only");
const kpPath = (process.env.DEPLOYER_KEYPAIR || "~/.config/solana/devnet-deployer.json").replace("~", os.homedir());
const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(kpPath, "utf8"))));
const conn = new Connection(RPC, "confirmed");
const provider = new anchor.AnchorProvider(conn, new anchor.Wallet(payer), { commitment: "confirmed" });
const program = new anchor.Program(idl, provider) as any;
(async () => {
  const [globalConfig] = PublicKey.findProgramAddressSync([Buffer.from("rwa_global_config")], program.programId);
  const existing = await conn.getAccountInfo(globalConfig);
  if (!existing) {
    const sig = await program.methods.initialize({ registrationFee: new anchor.BN(0), tokenizationFee: new anchor.BN(0), platformFeeBps: 0 })
      .accounts({ globalConfig, authority: payer.publicKey, systemProgram: SystemProgram.programId }).rpc();
    console.log("initialize", sig);
  } else console.log("globalConfig already initialized", globalConfig.toBase58());
  const assetId = Keypair.generate();
  const [asset] = PublicKey.findProgramAddressSync([Buffer.from("rwa_asset"), assetId.publicKey.toBuffer()], program.programId);
  const sig = await program.methods.registerAsset({ assetType: { other: {} }, name: "Devnet Smoke Asset", symbol: "SMOKE",
      description: "Devnet smoke test", uri: "https://example.com/smoke.json", valuation: new anchor.BN(1_000_000_000) })
    .accounts({ globalConfig, assetId: assetId.publicKey, asset, owner: payer.publicKey, systemProgram: SystemProgram.programId }).rpc();
  const a = await program.account.rwaAsset.fetch(asset);
  console.log("register_asset", sig);
  console.log(JSON.stringify({ globalConfig: globalConfig.toBase58(), assetId: assetId.publicKey.toBase58(), asset: asset.toBase58(), name: a.name, isTokenized: a.isTokenized }));
})().catch((e) => { console.error(e.message || e); process.exit(1); });

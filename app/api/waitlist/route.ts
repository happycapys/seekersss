import { getStore } from "@netlify/blobs";

const WALLET_PATTERN = /^0x[a-fA-F0-9]{40}$/;
const X_HANDLE_PATTERN = /^[A-Za-z0-9_]{1,15}$/;
const X_PROOF_PATTERN = /^https:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/\d+(?:\?.*)?$/i;

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { walletAddress?: string; points?: number; xHandle?: string; xProofUrl?: string };
    const walletAddress = payload.walletAddress?.trim().toLowerCase() ?? "";
    const xHandle = (payload.xHandle?.trim() ?? "").replace(/^@/, "").toLowerCase();
    const xProofUrl = payload.xProofUrl?.trim() ?? "";

    if (!WALLET_PATTERN.test(walletAddress)) {
      return Response.json({ error: "Enter a valid EVM wallet address." }, { status: 400 });
    }

    if (payload.points !== 500) {
      return Response.json({ error: "Complete all quests before submitting." }, { status: 400 });
    }

    if (!X_HANDLE_PATTERN.test(xHandle)) return Response.json({ error: "Enter a valid X handle." }, { status: 400 });
    if (!X_PROOF_PATTERN.test(xProofUrl)) return Response.json({ error: "Paste a valid link to your public X reply or quote post." }, { status: 400 });
    const proofAuthor = new URL(xProofUrl).pathname.split("/")[1]?.toLowerCase();
    if (proofAuthor !== xHandle) return Response.json({ error: "The proof link must be posted by the X handle you entered." }, { status: 400 });

    const store = getStore("seeker-whitelist");
    const walletKey = `wallet:${walletAddress}`;
    const existing = await store.get(walletKey, { type: "json" });

    if (existing) {
      return Response.json({ submission: existing, alreadySubmitted: true });
    }

    const proofHash = await sha256(xProofUrl.toLowerCase());
    const identityKeys = [
      `x:${xHandle}`,
      `proof:${proofHash}`,
    ];
    const reusedIdentity = await Promise.all(
      identityKeys.map((key) => store.get(key)),
    );
    if (reusedIdentity.some(Boolean)) {
      return Response.json({ error: "That X identity or proof link has already been used for a whitelist submission." }, { status: 409 });
    }

    const submission = {
      walletAddress,
      xHandle,
      xProfileUrl: `https://x.com/${xHandle}`,
      xProofUrl,
      points: 500,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    await store.setJSON(walletKey, submission);
    await Promise.all(identityKeys.map((key) => store.set(key, walletAddress)));

    return Response.json({ submission, alreadySubmitted: false }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

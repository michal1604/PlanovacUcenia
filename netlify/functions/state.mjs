// Ukladá plán učenia online (Netlify Blobs) pod hashom synchronizačného kódu.
import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

const MAX_BYTES = 300_000;

const json = (status, body) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export default async (req) => {
  const code = (req.headers.get("x-sync-code") || "").trim();
  if (code.length < 8) return json(401, { error: "Chýba alebo je krátky kód." });

  const key = createHash("sha256").update("planovac:" + code).digest("hex");
  const store = getStore({ name: "planovac-ucenia", consistency: "strong" });

  if (req.method === "GET") {
    const data = await store.get(key, { type: "json" });
    return json(200, data || { empty: true });
  }

  if (req.method === "PUT") {
    const text = await req.text();
    if (text.length > MAX_BYTES) return json(413, { error: "Príliš veľa údajov." });
    let data;
    try { data = JSON.parse(text); } catch { return json(400, { error: "Neplatné údaje." }); }
    if (!data || data.v !== 1) return json(400, { error: "Neplatné údaje." });
    await store.setJSON(key, data);
    return json(200, { ok: true });
  }

  return json(405, { error: "Nepodporovaná metóda." });
};

export const config = { path: "/api/state" };

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

async function main() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;

  if (buckets.some((b) => b.name === "media")) {
    console.log("Bucket 'media' already exists.");
    return;
  }

  const { error } = await supabase.storage.createBucket("media", {
    public: true,
    fileSizeLimit: "20MB",
  });
  if (error) throw error;
  console.log("Bucket 'media' created (public).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

"use server";

import { createSupabaseReqRes } from "@/lib/supabase/supabase-server";

export const uploadFile = async (formData: FormData) => {
  let supabase = createSupabaseReqRes();

  const file: any = formData.get("cover");
  const bucket = "notes";

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload("filename", file);
  if (error) console.log(error.message);
  else
    console.log(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`
    );
};
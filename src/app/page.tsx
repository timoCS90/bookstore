import React from "react";
import Link from "next/link";
import { createSupabaseReqRes } from "@/lib/supabase/supabase-req-res";
import type { SupabaseClient } from "@supabase/supabase-js";

declare module "react" {
  interface JSX {
    IntrinsicElements: {
      [key: string]: any;
    };
  }
}

export default async function page() {
  const supabase = createSupabaseReqRes() as unknown as SupabaseClient<
    any,
    "public",
    any
  >;
  let { data: notes, error } = await supabase.from("notes").select("*");

  if (error) {
    console.error("Error fetching notes:", error);
    notes = [];
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <ul className="mt-12 space-y-4">
          {notes?.map((note: any) => (
            <div
              key={note.id}
              className="min-w-[300px] flex justify-between items-center"
            >
              <span>
                {note.title} - {note.status}
              </span>
              <Link href={`/notes/${note.id}`}>
                <button>open</button>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </main>
  );
}

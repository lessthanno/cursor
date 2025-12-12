"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return <div className="text-sm text-zinc-600">已订阅（演示）。</div>;
  }

  return (
    <form
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setDone(true);
      }}
    >
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        type="email"
        className="h-11 flex-1 rounded-full border border-black/10 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
        required
      />
      <Button type="submit" className="h-11">
        订阅
      </Button>
    </form>
  );
}


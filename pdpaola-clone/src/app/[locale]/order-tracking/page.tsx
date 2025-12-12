"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function OrderTrackingPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">订单查询</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
        演示查询页面。上线时可接入真实订单服务（Shopify Orders/自建 OMS）。
      </p>
      <form
        className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const v = id.trim();
          if (!v) return;
          setResult(`未找到订单 ${v}（演示）。如果你刚在本站下单，订单号格式类似 D-XXXXXXXX。`);
        }}
      >
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="输入订单号，例如 D-1234ABCD"
          className="h-11 flex-1 rounded-full border border-black/10 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
        <Button className="h-11" type="submit">
          查询
        </Button>
      </form>
      {result ? (
        <div className="mt-6 rounded-2xl border border-black/10 p-6 text-sm text-zinc-600">
          {result}
        </div>
      ) : null}
    </Container>
  );
}


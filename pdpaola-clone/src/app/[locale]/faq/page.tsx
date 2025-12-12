import { Container } from "@/components/ui/Container";

export default function FaqPage() {
  const faqs = [
    { q: "这是不是 PDPAOLA 官方站？", a: "不是。这是一个可上线的电商前端模板，使用原创占位素材。" },
    { q: "是否包含真实支付？", a: "当前结账为演示表单。你可以替换为 Stripe/Shopify 等真实支付方案。" },
    { q: "购物车是否持久化？", a: "是，使用 localStorage 持久化（可替换为服务端会话/用户账户）。" },
    { q: "如何接入真实商品/库存？", a: "建议对接 Shopify Storefront API 或自建后端（Products/Collections/Search）。" },
  ];

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">FAQ</h1>
      <div className="mt-10 space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-2xl border border-black/10 bg-white p-6">
            <summary className="cursor-pointer text-sm font-semibold text-zinc-900">{f.q}</summary>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{f.a}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}


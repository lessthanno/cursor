import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";

const content: Record<
  string,
  { title: string; sections: Array<{ h: string; p: string }> }
> = {
  privacy: {
    title: "隐私政策（示例）",
    sections: [
      { h: "我们收集什么", p: "演示：邮箱、收货信息、浏览行为（用于改进体验）。" },
      { h: "我们如何使用", p: "演示：订单处理、客服支持、营销订阅（可退订）。" },
      { h: "数据存储", p: "演示：你可以将此模板改为合规的后端存储与访问控制。" },
    ],
  },
  shipping: {
    title: "配送政策（示例）",
    sections: [
      { h: "配送时间", p: "演示：2–5 个工作日送达（视地区而定）。" },
      { h: "运费", p: "演示：结账计算或满额包邮。" },
      { h: "异常处理", p: "演示：包裹延误/丢失可联系支持渠道。" },
    ],
  },
  returns: {
    title: "退换政策（示例）",
    sections: [
      { h: "退换期限", p: "演示：自签收起 30 天内可申请退换。" },
      { h: "适用范围", p: "演示：未使用且保持原包装的商品。" },
      { h: "退款方式", p: "演示：原路退回（真实站点需对接支付）。" },
    ],
  },
  terms: {
    title: "条款与条件（示例）",
    sections: [
      { h: "服务说明", p: "演示：本站为模板示例，不提供真实交易保障。" },
      { h: "责任限制", p: "演示：上线前请替换为适用于你业务的法律条款。" },
      { h: "联系我们", p: "演示：support@example.com" },
    ],
  },
};

export default async function PolicyPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const p = await params;
  void p.locale;
  const doc = content[p.slug];
  if (!doc) notFound();

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{doc.title}</h1>
      <div className="mt-8 space-y-8">
        {doc.sections.map((s) => (
          <section key={s.h} className="rounded-2xl border border-black/10 p-6">
            <h2 className="text-sm font-semibold text-zinc-900">{s.h}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">{s.p}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}


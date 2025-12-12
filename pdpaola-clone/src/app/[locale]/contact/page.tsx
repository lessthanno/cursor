import { Container } from "@/components/ui/Container";

export default function ContactPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">联系我们</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
        这是演示内容页。上线时可替换为真实客服渠道（邮箱/表单/在线聊天）并接入工单系统。
      </p>
      <div className="mt-8 grid gap-4 rounded-2xl border border-black/10 p-6 text-sm text-zinc-600">
        <div>
          <span className="font-medium text-zinc-900">Email：</span>support@example.com
        </div>
        <div>
          <span className="font-medium text-zinc-900">工作时间：</span>周一至周五 9:00–18:00（示例）
        </div>
        <div>
          <span className="font-medium text-zinc-900">预计回复：</span>24–48 小时（示例）
        </div>
      </div>
    </Container>
  );
}


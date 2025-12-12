import Link from "next/link";
import { defaultLocale } from "@/lib/i18n";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">404</h1>
      <p className="mt-3 text-sm text-zinc-600">页面不存在。</p>
      <div className="mt-6">
        <Link className="underline" href={`/${defaultLocale}`}>
          返回首页
        </Link>
      </div>
    </div>
  );
}


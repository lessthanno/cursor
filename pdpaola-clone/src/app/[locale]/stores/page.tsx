import { Container } from "@/components/ui/Container";

export default function StoresPage() {
  const stores = [
    { city: "Barcelona", address: "Passeig de Gràcia 00, 08000", hours: "10:00–20:00" },
    { city: "Paris", address: "Rue Example 00, 75000", hours: "10:00–19:00" },
    { city: "Berlin", address: "Example Straße 00, 10100", hours: "11:00–19:00" },
  ];

  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">门店</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
        演示 Store locator。上线时可接入真实门店数据（地图/定位/营业时间/预约）。
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <div key={s.city} className="rounded-2xl border border-black/10 p-6">
            <div className="text-sm font-semibold text-zinc-900">{s.city}</div>
            <div className="mt-2 text-sm text-zinc-600">{s.address}</div>
            <div className="mt-2 text-sm text-zinc-600">营业时间：{s.hours}</div>
          </div>
        ))}
      </div>
    </Container>
  );
}


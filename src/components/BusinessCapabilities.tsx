import Link from "next/link";

type Props = { title: string; intro: string; items: { title: string; body: string }[]; action?: { href: string; label: string } };
export default function BusinessCapabilities({ title, intro, items, action }: Props) {
  return <section className="bg-[#F4F7FF] py-16"><div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">{intro}</p>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.title} className="rounded-2xl bg-white border border-[#002D72]/10 p-6">
      <h3 className="text-xl font-bold text-[#002D72]">{item.title}</h3><p className="mt-3 leading-relaxed text-gray-600">{item.body}</p>
    </article>)}</div>
    {action && <Link href={action.href} className="mt-8 inline-block rounded-xl bg-[#002D72] px-6 py-3 font-semibold text-white hover:bg-[#1e3a8a]">{action.label}</Link>}
  </div></section>;
}

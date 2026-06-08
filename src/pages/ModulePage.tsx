import type { LucideIcon } from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import SeoHead from '@/components/SeoHead';

type ModulePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  metrics: Array<{ label: string; value: string }>;
  bullets: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

export default function ModulePage({
  eyebrow,
  title,
  description,
  icon: Icon,
  metrics,
  bullets,
  ctaHref = '/blog',
  ctaLabel = 'Đọc blog liên quan',
}: ModulePageProps) {
  return (
    <>
      <SeoHead title={`${title} - Livestream Master`} description={description} />
      <section className="relative overflow-hidden px-5 pb-20 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.24),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-cyan-200">
                <Icon className="h-4 w-4" />
                {eyebrow}
              </div>
              <h1 className="mb-6 font-display text-5xl font-black leading-tight lg:text-7xl">{title}</h1>
              <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
              <Link to={ctaHref} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 to-emerald-300 px-6 py-4 font-black text-slate-950">
                {ctaLabel}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{metric.label}</p>
                    <p className="mt-3 font-display text-3xl font-black text-cyan-200">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-300" />
                <p className="leading-7 text-slate-300">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

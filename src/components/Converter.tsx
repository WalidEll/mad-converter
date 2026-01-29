'use client';

import {useMemo, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';

type Unit = 'MAD' | 'RYAL' | 'FRANC';

function roundSmart(n: number, decimals: number) {
  const p = Math.pow(10, decimals);
  return Math.round(n * p) / p;
}

function toMAD(value: number, unit: Unit): number {
  switch (unit) {
    case 'MAD':
      return value;
    case 'RYAL':
      return value / 20;
    case 'FRANC':
      return value / 100;
  }
}

function fromMAD(mad: number, unit: Unit): number {
  switch (unit) {
    case 'MAD':
      return mad;
    case 'RYAL':
      return mad * 20;
    case 'FRANC':
      return mad * 100;
  }
}

export default function Converter() {
  const t = useTranslations('app');
  const locale = useLocale();
  const [amount, setAmount] = useState<string>('');
  const [unit, setUnit] = useState<Unit>('MAD');
  const [copied, setCopied] = useState<string | null>(null);

  const numeric = useMemo(() => {
    const x = Number(String(amount).replace(',', '.'));
    return Number.isFinite(x) ? x : 0;
  }, [amount]);

  const mad = useMemo(() => toMAD(numeric, unit), [numeric, unit]);

  const results = useMemo(() => {
    const other: Unit[] = (['MAD', 'RYAL', 'FRANC'] as Unit[]).filter((u) => u !== unit);
    return other.map((u) => {
      const raw = fromMAD(mad, u);
      const decimals = u === 'MAD' ? 2 : 0;
      return {
        unit: u,
        raw: roundSmart(raw, decimals),
        decimals
      };
    });
  }, [mad, unit]);

  const unitLabel = (u: Unit) => {
    if (u === 'MAD') return t('mad');
    if (u === 'RYAL') return t('ryal');
    return t('franc');
  };

  const formatNumber = (n: number, decimals: number) =>
    new Intl.NumberFormat(locale, {
      useGrouping: true,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(n);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 900);
  };

  const quick = [5, 10, 20, 50, 100, 200, 500];

  return (
    <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/95 p-6 shadow-xl backdrop-blur">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('title')}</h1>
          <p className="mt-1 text-sm text-slate-600">{t('subtitle')}</p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl"
          title="Morocco"
          aria-label="Morocco flag"
        >
          🇲🇦
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="sm:col-span-2">
          <div className="mb-1 text-xs font-medium text-slate-600">{t('amount')}</div>
          <input
            inputMode="decimal"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none ring-0 focus:border-emerald-400"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </label>

        <label>
          <div className="mb-1 text-xs font-medium text-slate-600">{t('unit')}</div>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:border-emerald-400"
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
          >
            <option value="MAD">{unitLabel('MAD')}</option>
            <option value="RYAL">{unitLabel('RYAL')}</option>
            <option value="FRANC">{unitLabel('FRANC')}</option>
          </select>
        </label>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-xs font-medium text-slate-600">{t('results')}</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {results.map((r) => {
            const formatted = formatNumber(r.raw, r.decimals);
            const display = `${formatted} ${unitLabel(r.unit)}`;
            return (
              <div
                key={r.unit}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
              >
                <div>
                  <div className="text-xs text-slate-500">{unitLabel(r.unit)}</div>
                  <div className="text-lg font-semibold text-slate-900">{formatted}</div>
                </div>
                <button
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() => copy(display)}
                >
                  {copied === display ? t('copied') : t('copy')}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-xs font-medium text-slate-600">{t('quick')}</div>
        <div className="flex flex-wrap gap-2">
          {quick.map((q) => (
            <button
              key={q}
              className="rounded-full border border-white/20 bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
              onClick={() => {
                setUnit('MAD');
                setAmount(String(q));
              }}
            >
              {q} MAD
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-500">{t('disclaimer')}</p>
    </div>
  );
}

import React, { useMemo, useState } from 'react';
import { Cpu, Play, RotateCcw, Sliders } from 'lucide-react';

interface Props {
  lessonId: string;
}

// ---------- UNIT 1: Live Number Base, Code & Complement Lab ----------
const Unit1Lab: React.FC = () => {
  const [decInput, setDecInput] = useState('8620');
  const [hexInput, setHexInput] = useState('F3A7C2');

  const decParsed = useMemo(() => {
    const clean = decInput.replace(/\D/g, '').slice(0, 5);
    if (!clean) return null;
    const digits = clean.split('').map(Number);
    const num = Number(clean);
    const bcd = digits.map((d) => d.toString(2).padStart(4, '0')).join(' ');
    const ex3 = digits.map((d) => (d + 3).toString(2).padStart(4, '0')).join(' ');
    const bitWidth = Math.max(4, Math.min(16, num.toString(2).length + 1));
    const bin = num.toString(2).padStart(bitWidth, '0');
    const grayVal = num ^ (num >> 1);
    const gray = grayVal.toString(2).padStart(bitWidth, '0');
    const onesComp = bin
      .split('')
      .map((b) => (b === '0' ? '1' : '0'))
      .join('');
    const mask = (1 << bitWidth) - 1;
    const twosComp = (((~num & mask) + 1) & mask).toString(2).padStart(bitWidth, '0');
    return { clean, num, bcd, ex3, bin, gray, onesComp, twosComp, bitWidth };
  }, [decInput]);

  const hexParsed = useMemo(() => {
    const clean = hexInput.toUpperCase().replace(/[^0-9A-F]/g, '').slice(0, 6);
    if (!clean) return null;
    const binGroups = clean.split('').map((ch) => parseInt(ch, 16).toString(2).padStart(4, '0'));
    const fullBin = binGroups.join('');
    const padLen = Math.ceil(fullBin.length / 3) * 3;
    const padded = fullBin.padStart(padLen, '0');
    const octGroups: string[] = [];
    const octDigits: string[] = [];
    for (let i = 0; i < padded.length; i += 3) {
      const g = padded.slice(i, i + 3);
      octGroups.push(g);
      octDigits.push(parseInt(g, 2).toString(8));
    }
    return {
      clean,
      binSpaced: binGroups.join(' '),
      octGrouped: octGroups.join(' '),
      octal: octDigits.join('').replace(/^0+(?=\d)/, ''),
    };
  }, [hexInput]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Hex -> Bin -> Octal */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="lab-hex-input" className="text-xs font-semibold text-slate-800">
              Hex → Binary → Octal
            </label>
            <button
              type="button"
              onClick={() => setHexInput('F3A7C2')}
              className="text-[11px] font-medium text-teal-700 hover:underline cursor-pointer"
            >
              Exam Q.1(b)
            </button>
          </div>
          <input
            id="lab-hex-input"
            type="text"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            maxLength={6}
            placeholder="e.g. F3A7C2"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-mono text-sm uppercase text-slate-900"
          />
          {hexParsed ? (
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-slate-600">4-bit Binary: </span>
                <span className="font-mono font-semibold text-slate-900 break-all">
                  {hexParsed.binSpaced}
                </span>
              </div>
              <div>
                <span className="text-slate-600">3-bit Groups: </span>
                <span className="font-mono text-slate-700 break-all">{hexParsed.octGrouped}</span>
              </div>
              <div>
                <span className="text-slate-600">Octal: </span>
                <span className="font-mono font-semibold text-teal-800">({hexParsed.octal})₈</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Type hex digits 0–9 or A–F.</p>
          )}
        </div>

        {/* Decimal -> BCD, Excess-3, Gray, 1s & 2s Comp */}
        <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="lab-dec-input" className="text-xs font-semibold text-slate-800">
              Decimal → BCD, Excess-3, Gray &amp; 2’s Comp
            </label>
            <button
              type="button"
              onClick={() => setDecInput('8620')}
              className="text-[11px] font-medium text-teal-700 hover:underline cursor-pointer"
            >
              Exam Q.1(c)
            </button>
          </div>
          <input
            id="lab-dec-input"
            type="text"
            inputMode="numeric"
            value={decInput}
            onChange={(e) => setDecInput(e.target.value)}
            maxLength={5}
            placeholder="e.g. 8620 or 13"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-mono text-sm text-slate-900"
          />
          {decParsed ? (
            <div className="space-y-1 text-xs">
              <div>
                <span className="text-slate-600">BCD (8421): </span>
                <span className="font-mono font-semibold text-slate-900 break-all">
                  {decParsed.bcd}
                </span>
              </div>
              <div>
                <span className="text-slate-600">Excess-3: </span>
                <span className="font-mono font-semibold text-teal-800 break-all">
                  {decParsed.ex3}
                </span>
              </div>
              <div>
                <span className="text-slate-600">Gray ({decParsed.bitWidth}b): </span>
                <span className="font-mono text-slate-800">{decParsed.gray}</span>
              </div>
              <div>
                <span className="text-slate-600">2’s Comp (−{decParsed.num}): </span>
                <span className="font-mono text-indigo-800">{decParsed.twosComp}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Type any decimal digits 0–9.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- UNIT 2: Interactive Logic Gates, Full Adder & 1-Bit Comparator ----------
const Unit2Lab: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [cin, setCin] = useState(1);

  const sum = a ^ b ^ cin;
  const cout = (a & b) | (cin & (a ^ b));
  const gt = a & (b ^ 1);
  const eq = a === b ? 1 : 0;
  const lt = (a ^ 1) & b;

  const gates = [
    { name: 'AND', val: a & b },
    { name: 'OR', val: a | b },
    { name: 'NAND', val: (a & b) ^ 1 },
    { name: 'NOR', val: (a | b) ^ 1 },
    { name: 'XOR', val: a ^ b },
    { name: 'XNOR', val: (a ^ b) ^ 1 },
    { name: 'NOT A', val: a ^ 1 },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-700 mr-1">Toggle Inputs:</span>
        {[
          { label: 'A', val: a, toggle: () => setA((v) => (v ? 0 : 1)) },
          { label: 'B', val: b, toggle: () => setB((v) => (v ? 0 : 1)) },
          { label: 'Cin', val: cin, toggle: () => setCin((v) => (v ? 0 : 1)) },
        ].map((sw) => (
          <button
            key={sw.label}
            type="button"
            onClick={sw.toggle}
            aria-pressed={sw.val === 1}
            className={`rounded-xl border px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors cursor-pointer ${
              sw.val === 1
                ? 'border-teal-600 bg-teal-700 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {sw.label} = {sw.val}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
        {gates.map((g) => (
          <div
            key={g.name}
            className={`rounded-xl border p-2 text-center ${
              g.val === 1
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
          >
            <div className="text-[10px] font-semibold uppercase">{g.name}</div>
            <div className="font-mono text-base font-bold mt-0.5">{g.val}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="font-semibold text-slate-800">Full Adder (A + B + Cin)</div>
          <div className="mt-1.5 flex gap-4 font-mono text-sm">
            <span>
              Sum = <strong className="text-teal-800">{sum}</strong>
            </span>
            <span>
              Cout = <strong className="text-indigo-800">{cout}</strong>
            </span>
            <span className="text-slate-600">({a + b + cin}₁₀)</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="font-semibold text-slate-800">1-Bit Comparator (A vs B)</div>
          <div className="mt-1.5 flex gap-3 font-mono text-sm">
            <span className={gt ? 'font-bold text-emerald-700' : 'text-slate-500'}>A&gt;B: {gt}</span>
            <span className={eq ? 'font-bold text-emerald-700' : 'text-slate-500'}>A=B: {eq}</span>
            <span className={lt ? 'font-bold text-emerald-700' : 'text-slate-500'}>A&lt;B: {lt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- UNIT 3: Interactive Instruction Cycle (T0..T5) & Shift Visualizer ----------
const CYCLE_STEPS = [
  {
    t: 'Initial',
    phase: 'Ready',
    rtl: 'PC holds 300 (address of ADD 500 = 1500H); M[500] = 0025H; AC = 0010H',
    regs: { PC: '300', AR: '000', IR: '0000', DR: '0000', AC: '0010', SC: '0' },
  },
  {
    t: 'T0',
    phase: 'Fetch',
    rtl: 'T0: AR ← PC (copy instruction address 300 into Address Register)',
    regs: { PC: '300', AR: '300', IR: '0000', DR: '0000', AC: '0010', SC: '1' },
  },
  {
    t: 'T1',
    phase: 'Fetch',
    rtl: 'T1: IR ← M[AR], PC ← PC + 1 (load 1500H into IR; advance PC to 301)',
    regs: { PC: '301', AR: '300', IR: '1500', DR: '0000', AC: '0010', SC: '2' },
  },
  {
    t: 'T2',
    phase: 'Decode',
    rtl: 'T2: Decode IR(12–14) → D1=1 (ADD); AR ← IR(0–11) = 500; I ← IR(15) = 0',
    regs: { PC: '301', AR: '500', IR: '1500', DR: '0000', AC: '0010', SC: '3' },
  },
  {
    t: 'T3',
    phase: 'Direct (No-Op)',
    rtl: "D7'I'T3: Nothing to do because I = 0 (direct address 500 is already in AR!)",
    regs: { PC: '301', AR: '500', IR: '1500', DR: '0000', AC: '0010', SC: '4' },
  },
  {
    t: 'T4',
    phase: 'Execute (ADD)',
    rtl: 'D1T4: DR ← M[AR] (fetch operand M[500] = 0025H into Data Register)',
    regs: { PC: '301', AR: '500', IR: '1500', DR: '0025', AC: '0010', SC: '5' },
  },
  {
    t: 'T5',
    phase: 'Execute (ADD)',
    rtl: 'D1T5: AC ← AC + DR, E ← Cout, SC ← 0 (0010H + 0025H = 0035H; restart at T0)',
    regs: { PC: '301', AR: '500', IR: '1500', DR: '0025', AC: '0035', SC: '0' },
  },
];

const Unit3Lab: React.FC = () => {
  const [step, setStep] = useState(0);
  const [shiftBits, setShiftBits] = useState('1011');
  const [lastShiftNote, setLastShiftNote] = useState('Click any shift op on R = 1011');

  const cur = CYCLE_STEPS[step];
  const prev = step > 0 ? CYCLE_STEPS[step - 1] : null;

  const applyShift = (op: 'shl' | 'shr' | 'cil' | 'cir' | 'ashr') => {
    const b = shiftBits;
    let next = b;
    let note = '';
    if (op === 'shl') {
      next = b.slice(1) + '0';
      note = `shl(${b}) → ${next} (0 enters LSB)`;
    } else if (op === 'shr') {
      next = '0' + b.slice(0, 3);
      note = `shr(${b}) → ${next} (0 enters MSB)`;
    } else if (op === 'cil') {
      next = b.slice(1) + b[0];
      note = `cil(${b}) → ${next} (MSB wraps to LSB)`;
    } else if (op === 'cir') {
      next = b[3] + b.slice(0, 3);
      note = `cir(${b}) → ${next} (LSB wraps to MSB)`;
    } else {
      next = b[0] + b.slice(0, 3);
      note = `ashr(${b}) → ${next} (sign bit ${b[0]} preserved!)`;
    }
    setShiftBits(next);
    setLastShiftNote(note);
  };

  return (
    <div className="space-y-4">
      {/* Live Instruction Cycle Stepper */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-semibold text-slate-800">
            Live Instruction Cycle Stepper — <span className="font-mono">ADD 500 (Q.3d)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setStep((s) => (s < CYCLE_STEPS.length - 1 ? s + 1 : 0))}
              className="inline-flex items-center gap-1 rounded-lg bg-teal-700 px-3 py-1 text-xs font-medium text-white hover:bg-teal-800 cursor-pointer"
            >
              <Play className="h-3 w-3" />
              {step < CYCLE_STEPS.length - 1 ? `Next (${CYCLE_STEPS[step + 1].t})` : 'Restart'}
            </button>
            <button
              type="button"
              onClick={() => setStep(0)}
              aria-label="Reset instruction cycle simulator"
              className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-teal-200 bg-teal-50/70 px-3 py-2 text-xs font-mono text-teal-950">
          <strong>[{cur.t} · {cur.phase}]</strong> {cur.rtl}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {(Object.entries(cur.regs) as [keyof typeof cur.regs, string][]).map(([reg, val]) => {
            const changed = prev && prev.regs[reg] !== val;
            return (
              <div
                key={reg}
                className={`rounded-lg border p-2 text-center ${
                  changed
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-950'
                    : 'border-slate-200 bg-slate-50 text-slate-800'
                }`}
              >
                <div className="text-[10px] font-semibold uppercase text-slate-600">{reg}</div>
                <div className="font-mono text-sm font-bold mt-0.5">{val}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live 4-Bit Shift Micro-operation Toy */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-semibold text-slate-800">
            Shift Micro-op Playground: <span className="font-mono text-base text-teal-800 ml-1">{shiftBits}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setShiftBits('1011');
              setLastShiftNote('Reset to exam example R = 1011');
            }}
            className="text-[11px] font-medium text-teal-700 hover:underline cursor-pointer"
          >
            Reset 1011
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['shl', 'shr', 'cil', 'cir', 'ashr'] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => applyShift(op)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-800 hover:border-teal-400 cursor-pointer"
            >
              {op}
            </button>
          ))}
        </div>
        <p className="text-xs font-mono text-slate-600">{lastShiftNote}</p>
      </div>
    </div>
  );
};

// ---------- UNIT 4: Live 5-Bit Booth's Algorithm Simulator ----------
function to5BitTwos(n: number): string {
  return (n & 0x1f).toString(2).padStart(5, '0');
}

function generateBoothRows(m: number, q: number) {
  const mask = 0x1f;
  const br = m & mask;
  const negBr = ((~br & mask) + 1) & mask;
  let ac = 0;
  let qr = q & mask;
  let qn1 = 0;

  const rows: { pair: string; op: string; ac: string; qr: string; qn1: string; sc: number }[] = [
    { pair: '—', op: 'Initial', ac: to5BitTwos(ac), qr: to5BitTwos(qr), qn1: '0', sc: 5 },
  ];

  for (let sc = 4; sc >= 0; sc--) {
    const qn = qr & 1;
    const pair = `${qn}${qn1}`;
    let op = 'ashr only';
    if (pair === '10') {
      ac = (ac + negBr) & mask;
      op = 'AC ← AC − BR, ashr';
    } else if (pair === '01') {
      ac = (ac + br) & mask;
      op = 'AC ← AC + BR, ashr';
    }
    const nextQn1 = qr & 1;
    const acLsb = ac & 1;
    const acMsb = ac & 0x10;
    qr = (qr >> 1) | (acLsb << 4);
    ac = (ac >> 1) | acMsb;
    qn1 = nextQn1;

    rows.push({ pair, op, ac: to5BitTwos(ac), qr: to5BitTwos(qr), qn1: String(qn1), sc });
  }

  const raw10 = (ac << 5) | qr;
  const signedVal = raw10 & 0x200 ? raw10 - 1024 : raw10;
  return { brBin: to5BitTwos(br), negBrBin: to5BitTwos(negBr), qrBin: to5BitTwos(q), rows, signedVal, prodBin: `${to5BitTwos(ac)} ${to5BitTwos(qr)}` };
}

const Unit4Lab: React.FC = () => {
  const [m, setM] = useState(-9);
  const [q, setQ] = useState(13);
  const [visibleCount, setVisibleCount] = useState(2);

  const sim = useMemo(() => generateBoothRows(m, q), [m, q]);

  const loadPreset = (pm: number, pq: number) => {
    setM(pm);
    setQ(pq);
    setVisibleCount(2);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-semibold text-slate-800">
          Live 5-Bit Booth’s Trace Generator
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => loadPreset(-9, 13)}
            className="rounded-lg border border-teal-200 bg-teal-50 px-2 py-1 text-[11px] font-medium text-teal-800 cursor-pointer"
          >
            Exam Q.2(e): (−9)×(+13)
          </button>
          <button
            type="button"
            onClick={() => loadPreset(-9, -13)}
            className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-800 cursor-pointer"
          >
            Exam Q.3(b): (−9)×(−13)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <label className="block text-slate-700 font-medium">
          Multiplicand BR: <strong className="font-mono">{m} ({sim.brBin})</strong>
          <input
            type="range"
            min={-15}
            max={15}
            value={m}
            onChange={(e) => {
              setM(Number(e.target.value));
              setVisibleCount(6);
            }}
            className="mt-1 w-full accent-teal-600"
          />
        </label>
        <label className="block text-slate-700 font-medium">
          Multiplier QR: <strong className="font-mono">{q} ({sim.qrBin})</strong>
          <input
            type="range"
            min={-15}
            max={15}
            value={q}
            onChange={(e) => {
              setQ(Number(e.target.value));
              setVisibleCount(6);
            }}
            className="mt-1 w-full accent-indigo-600"
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[380px] border-collapse text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 font-sans">
              <th className="px-2.5 py-1.5 font-semibold text-slate-700">Qn Qn+1</th>
              <th className="px-2.5 py-1.5 font-semibold text-slate-700">Action</th>
              <th className="px-2.5 py-1.5 font-semibold text-slate-700">AC</th>
              <th className="px-2.5 py-1.5 font-semibold text-slate-700">QR</th>
              <th className="px-2.5 py-1.5 font-semibold text-slate-700">Qn+1</th>
              <th className="px-2.5 py-1.5 font-semibold text-slate-700">SC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sim.rows.slice(0, visibleCount).map((r, idx) => (
              <tr key={idx} className={idx === visibleCount - 1 ? 'bg-teal-50/60' : ''}>
                <td className="px-2.5 py-1.5 font-semibold text-indigo-800">{r.pair}</td>
                <td className="px-2.5 py-1.5 font-sans text-slate-700">{r.op}</td>
                <td className="px-2.5 py-1.5 text-slate-900">{r.ac}</td>
                <td className="px-2.5 py-1.5 text-slate-900">{r.qr}</td>
                <td className="px-2.5 py-1.5 text-slate-700">{r.qn1}</td>
                <td className="px-2.5 py-1.5 text-slate-600">{r.sc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {visibleCount < sim.rows.length ? (
            <button
              type="button"
              onClick={() => setVisibleCount((c) => Math.min(sim.rows.length, c + 1))}
              className="rounded-lg bg-teal-700 px-3 py-1.5 font-medium text-white hover:bg-teal-800 cursor-pointer"
            >
              Step Next Cycle ({visibleCount}/{sim.rows.length - 1})
            </button>
          ) : (
            <span className="font-mono font-semibold text-emerald-800">
              Product = {sim.prodBin} = {sim.signedVal} ✓ ({m} × {q} = {m * q})
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setVisibleCount(visibleCount < sim.rows.length ? sim.rows.length : 1)}
          className="text-xs font-medium text-slate-600 hover:underline cursor-pointer"
        >
          {visibleCount < sim.rows.length ? 'Show all 5 cycles' : 'Reset step view'}
        </button>
      </div>
    </div>
  );
};

// ---------- UNIT 5: Cache AMAT Comparison & Associative Memory (CAM) Matcher ----------
const CAM_WORDS = [
  { label: 'Word 1', bits: '100111' },
  { label: 'Word 2', bits: '101000' },
  { label: 'Word 3', bits: '101101' },
];

const Unit5Lab: React.FC = () => {
  const [hitPct, setHitPct] = useState(90);
  const [tc, setTc] = useState(10);
  const [tm, setTm] = useState(100);
  const [argBits, setArgBits] = useState('101111');
  const [keyBits, setKeyBits] = useState('111000');

  const h = hitPct / 100;
  const parallelAmat = (h * tc + (1 - h) * tm).toFixed(1);
  const sequentialAmat = (tc + (1 - h) * tm).toFixed(1);

  const toggleBit = (str: string, idx: number, setter: (v: string) => void) => {
    const arr = str.split('');
    arr[idx] = arr[idx] === '1' ? '0' : '1';
    setter(arr.join(''));
  };

  const checkMatch = (word: string) => {
    for (let i = 0; i < 6; i++) {
      if (keyBits[i] === '1' && word[i] !== argBits[i]) return false;
    }
    return true;
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {/* Cache AMAT */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5 text-xs">
        <div className="font-semibold text-slate-800">Cache AMAT Explorer (Exam Q.2d)</div>
        <label className="block text-slate-700">
          Hit Ratio h = <strong className="font-mono">{h.toFixed(2)} ({hitPct}%)</strong>
          <input
            type="range"
            min={50}
            max={99}
            value={hitPct}
            onChange={(e) => setHitPct(Number(e.target.value))}
            className="mt-1 w-full accent-teal-600"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-slate-700">
            tc (ns): <strong className="font-mono">{tc}</strong>
            <input
              type="range"
              min={2}
              max={30}
              value={tc}
              onChange={(e) => setTc(Number(e.target.value))}
              className="mt-1 w-full accent-teal-600"
            />
          </label>
          <label className="block text-slate-700">
            tm (ns): <strong className="font-mono">{tm}</strong>
            <input
              type="range"
              min={50}
              max={200}
              step={10}
              value={tm}
              onChange={(e) => setTm(Number(e.target.value))}
              className="mt-1 w-full accent-indigo-600"
            />
          </label>
        </div>
        <div className="rounded-lg border border-teal-200 bg-teal-50/70 p-2.5 space-y-1 font-mono">
          <div className="text-teal-950">
            Key formula h·tc+(1−h)·tm = <strong>{parallelAmat} ns</strong>
          </div>
          <div className="text-slate-600 text-[11px]">
            Sequential tc+(1−h)·tm = <strong>{sequentialAmat} ns</strong>
          </div>
        </div>
      </div>

      {/* Associative Memory CAM Matcher */}
      <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5 text-xs">
        <div className="font-semibold text-slate-800">Associative Memory (CAM) Live Mask</div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Argument A:</span>
            <div className="flex gap-1">
              {argBits.split('').map((b, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleBit(argBits, i, setArgBits)}
                  aria-label={`Toggle Argument bit ${i + 1}`}
                  className="h-6 w-6 rounded border border-slate-300 bg-slate-50 font-mono font-bold text-slate-900 cursor-pointer"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Key Mask K (1=check):</span>
            <div className="flex gap-1">
              {keyBits.split('').map((b, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleBit(keyBits, i, setKeyBits)}
                  aria-label={`Toggle Key mask bit ${i + 1}`}
                  className={`h-6 w-6 rounded border font-mono font-bold cursor-pointer ${
                    b === '1'
                      ? 'border-teal-600 bg-teal-700 text-white'
                      : 'border-slate-300 bg-white text-slate-500'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-1 pt-1">
          {CAM_WORDS.map((w) => {
            const matched = checkMatch(w.bits);
            return (
              <div
                key={w.label}
                className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 font-mono ${
                  matched
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <span>
                  {w.label}: {w.bits}
                </span>
                <span className="font-sans font-semibold">{matched ? 'M = 1 (Match)' : 'M = 0'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const InteractiveLab: React.FC<Props> = ({ lessonId }) => {
  const labConfig = useMemo(() => {
    if (lessonId === 'l1-2' || lessonId === 'l1-4') {
      return {
        title: 'Try It Live: Number Base, BCD, Excess-3 & 2’s Complement Lab',
        component: <Unit1Lab />,
      };
    }
    if (lessonId === 'l1-3' || lessonId === 'l2-1' || lessonId === 'l2-2') {
      return {
        title: 'Try It Live: Logic Gates, Full Adder & 1-Bit Comparator Board',
        component: <Unit2Lab />,
      };
    }
    if (lessonId === 'l3-2' || lessonId === 'l3-4') {
      return {
        title: 'Try It Live: CPU Instruction Cycle (T0–T5) & Bit-Shift Lab',
        component: <Unit3Lab />,
      };
    }
    if (lessonId === 'l4-4') {
      return {
        title: 'Try It Live: Interactive 5-Bit Booth’s Multiplication Simulator',
        component: <Unit4Lab />,
      };
    }
    if (lessonId === 'l5-4') {
      return {
        title: 'Try It Live: Cache AMAT & Associative Memory (CAM) Lab',
        component: <Unit5Lab />,
      };
    }
    return null;
  }, [lessonId]);

  if (!labConfig) return null;

  return (
    <section className="rounded-2xl border border-teal-200 bg-teal-50/40 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-900">
          {lessonId === 'l3-4' ? (
            <Cpu className="h-4 w-4 text-teal-600" />
          ) : (
            <Sliders className="h-4 w-4 text-teal-600" />
          )}
          {labConfig.title}
        </h2>
        <span className="rounded-full bg-white border border-teal-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-800">
          Interactive
        </span>
      </div>
      {labConfig.component}
    </section>
  );
};

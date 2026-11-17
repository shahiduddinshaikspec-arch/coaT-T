import type { GlossaryEntry } from '../types';

export const GLOSSARY: GlossaryEntry[] = [
  // Unit I
  {
    id: 'computer-architecture',
    term: 'Computer Architecture',
    aliases: ['Architecture'],
    unit: 1,
    shortExplanation: 'The programmer-visible blueprint of a computer — what instructions, data types, and addressing modes software can use.',
    example: 'Both an energy-saving laptop chip and a fast desktop chip can share the x86 architecture and run the same programs.',
  },
  {
    id: 'computer-organization',
    term: 'Computer Organization (Design)',
    aliases: ['Computer Design', 'Organization', 'Computer Design / Organization'],
    unit: 1,
    shortExplanation: 'How the hardware circuits, registers, buses, and control signals are physically built to realize an architecture.',
    example: 'Choosing whether to build a multiplier with fast parallel hardware or a smaller shift-and-add circuit is a design decision.',
  },
  {
    id: 'alu',
    term: 'ALU (Arithmetic & Logic Unit)',
    aliases: ['ALU'],
    unit: 1,
    shortExplanation: 'The CPU’s calculator circuit that performs math (+, −, ×, ÷) and bit-wise logic (AND, OR, NOT, compare).',
    example: 'When the CPU runs ADD, the ALU adds the contents of AC and DR and outputs the sum plus a carry bit E.',
  },
  {
    id: 'control-unit',
    term: 'Control Unit (CU)',
    aliases: ['Control Unit', 'CU'],
    unit: 1,
    shortExplanation: 'The coordinator inside the CPU that fetches instructions, decodes them, and sends timing/control signals to every other unit.',
    example: 'During fetch at T0, the Control Unit tells PC to put its address on the bus and tells AR to load it.',
  },
  {
    id: 'bcd',
    term: 'BCD (Binary Coded Decimal)',
    aliases: ['BCD', 'BCD (8421)'],
    unit: 1,
    shortExplanation: 'A weighted 4-bit code (8-4-2-1) where each decimal digit 0–9 is encoded individually as 4 binary bits.',
    example: 'Decimal 59 becomes 0101 (5) followed by 1001 (9) → 0101 1001 in BCD.',
  },
  {
    id: 'excess-3',
    term: 'Excess-3 Code',
    aliases: ['Excess-3'],
    unit: 1,
    shortExplanation: 'A non-weighted, self-complementing decimal code made by adding 3 (0011) to each BCD digit.',
    example: 'Digit 6 in BCD is 0110; add 3 to get 9 → 1001 in Excess-3. Flipping its bits gives 0110 (= Excess-3 of 3, the 9’s complement of 6!).',
  },
  {
    id: 'gray-code',
    term: 'Gray Code',
    aliases: ['Gray'],
    unit: 1,
    shortExplanation: 'A binary sequence where two consecutive numbers differ in only a single bit, preventing transition errors.',
    example: 'Moving from 3 (0010) to 4 (0110) flips only one bit, unlike pure binary 0011 → 0100 where three bits flip at once.',
  },
  {
    id: 'ascii',
    term: 'ASCII',
    unit: 1,
    shortExplanation: 'A 7-bit standard code representing 128 characters: English letters, digits 0–9, punctuation, and control symbols.',
    example: 'Uppercase "A" is 65 (1000001₂ or 41H), and digit "0" is 48 (0110000₂ or 30H).',
  },
  {
    id: 'radix-complement',
    term: "2's Complement (Radix Complement)",
    aliases: ["2's complement", "r's complement", "10's complement", "2's / 10's Complement"],
    unit: 1,
    shortExplanation: 'Flip every bit of a binary number and add 1. It represents negative integers and turns subtraction into addition.',
    example: "For 0110 (+6), invert to 1001 and add 1 → 1010 (−6 in 4-bit 2's complement).",
  },
  {
    id: 'ones-complement',
    term: "1's Complement (Diminished Radix)",
    aliases: ["1's complement", "9's complement", "1's / 9's Complement"],
    unit: 1,
    shortExplanation: 'Obtained by inverting every binary bit (0 ↔ 1), or subtracting every decimal digit from 9.',
    example: "1's complement of 1011001 is 0100110; 9's complement of 546700 is 453299.",
  },
  {
    id: 'fixed-point',
    term: 'Fixed-Point Representation',
    aliases: ['Fixed-point', 'Fixed-Point'],
    unit: 1,
    shortExplanation: 'Stores fractional numbers with the binary point permanently fixed at an implied bit position.',
    example: 'With 4 integer + 4 fraction bits, 0110.1010 represents 6 + 0.5 + 0.125 = 6.625.',
  },
  {
    id: 'floating-point',
    term: 'Floating-Point (IEEE-754)',
    aliases: ['Floating-point', 'IEEE-754', 'Floating-Point (IEEE-754)', 'Mantissa'],
    unit: 1,
    shortExplanation: 'Binary scientific notation (±mantissa × 2^exponent) storing a sign bit, biased exponent (bias 127 in 32-bit), and fraction.',
    example: '10.5 = 1010.1₂ = 1.0101 × 2³ → sign 0, exponent 3+127=130 (10000010), fraction 0101000…0.',
  },
  {
    id: 'nand-gate',
    term: 'NAND Gate',
    aliases: ['NAND', 'NAND Gate'],
    unit: 1,
    shortExplanation: 'An AND gate followed by NOT: its output is 0 ONLY when all inputs are 1. Called a universal gate.',
    example: 'A=1, B=1 → Y=0; for all other input pairs (00, 01, 10) → Y=1.',
  },
  {
    id: 'xor-xnor',
    term: 'XOR & XNOR Gates',
    aliases: ['XOR', 'XNOR', 'XOR / XNOR'],
    unit: 1,
    shortExplanation: 'XOR outputs 1 when inputs are DIFFERENT; XNOR outputs 1 when inputs are EQUAL (bit-equality check).',
    example: 'In a 1-bit comparator, E (A = B) is built directly with an XNOR gate.',
  },

  // Unit II
  {
    id: 'combinational-circuit',
    term: 'Combinational Circuit',
    aliases: ['Combinational'],
    unit: 2,
    shortExplanation: 'A logic circuit with no memory or clock whose outputs depend ONLY on the current input values.',
    example: 'Full adders, multiplexers, decoders, encoders, and magnitude comparators.',
  },
  {
    id: 'sequential-circuit',
    term: 'Sequential Circuit',
    aliases: ['Sequential'],
    unit: 2,
    shortExplanation: 'A logic circuit containing memory (flip-flops) and feedback, so outputs depend on both present inputs and past states.',
    example: 'Registers, shift registers, binary counters, and CPU control units.',
  },
  {
    id: 'latch-vs-ff',
    term: 'Latch vs Flip-Flop',
    aliases: ['Latch', 'Flip-flop', 'Flip-Flop', 'Binary Cell (Flip-Flop)'],
    unit: 2,
    shortExplanation: 'A latch is level-sensitive (changes anytime enable is high); a flip-flop is edge-triggered (snaps only on a clock edge).',
    example: 'An S-R NOR latch reacts immediately when S=1, while a clocked flip-flop updates cleanly only at the clock tick.',
  },
  {
    id: 'multiplexer',
    term: 'Multiplexer (MUX)',
    aliases: ['MUX', 'Multiplexer', '4:1 Multiplexer'],
    unit: 2,
    shortExplanation: 'A "many-to-one" data selector: uses n select lines to connect 1 of 2ⁿ data inputs to a single output.',
    example: 'A 4:1 MUX uses select bits S1S0 = 10 to route input I2 straight to output Y.',
  },
  {
    id: 'decoder',
    term: 'Decoder',
    aliases: ['Decoder (n → 2ⁿ)'],
    unit: 2,
    shortExplanation: 'Converts an n-bit binary code into 2ⁿ output lines where exactly ONE line is active (1) at a time.',
    example: 'A 3-to-8 decoder inside the CPU decodes a 3-bit opcode into control signals D0–D7.',
  },
  {
    id: 'encoder',
    term: 'Encoder / Priority Encoder',
    aliases: ['Encoder', 'Priority encoder', 'Encoder (2ⁿ → n)'],
    unit: 2,
    shortExplanation: 'Inverse of a decoder: takes 2ⁿ inputs and outputs the n-bit binary code of the active input. Priority encoders break ties.',
    example: 'In a 4-to-2 encoder, if D3 is active (1), the output is A1A0 = 11.',
  },
  {
    id: 'magnitude-comparator',
    term: 'Magnitude Comparator',
    aliases: ['Comparator', '2-Bit Comparator'],
    unit: 2,
    shortExplanation: 'A combinational circuit that compares two binary numbers A and B and activates one of three outputs: A>B, A=B, or A<B.',
    example: 'For 1-bit inputs: G = A·B’, E = (A ⊕ B)’, and L = A’·B.',
  },
  {
    id: 'shift-register',
    term: 'Shift Register',
    aliases: ['Shift register', 'SISO', 'SIPO', 'PISO', 'PIPO', 'SISO / SIPO / PISO / PIPO'],
    unit: 2,
    shortExplanation: 'A chain of flip-flops that slides stored bits one position sideways on every clock pulse (SISO, SIPO, PISO, PIPO).',
    example: 'Shifting serial bits 1, 0, 1, 1 into a 4-bit SIPO register loads all 4 bits in parallel after 4 clocks.',
  },
  {
    id: 'ripple-counter',
    term: 'Ripple (Asynchronous) Counter',
    aliases: ['Ripple counter', 'Ripple (Async) Counter'],
    unit: 2,
    shortExplanation: 'A counter where only the first flip-flop gets the external clock and each next flip-flop is clocked by the previous output.',
    example: 'Simple hardware, but delays ripple from FF0 → FF1 → FF2, limiting maximum speed.',
  },
  {
    id: 'synchronous-counter',
    term: 'Synchronous Counter',
    aliases: ['Synchronous counter'],
    unit: 2,
    shortExplanation: 'A counter where ALL flip-flops receive the exact same clock pulse simultaneously, eliminating ripple delay.',
    example: 'In a 3-bit synchronous up counter, FF2 toggles when J2 = K2 = Q0·Q1 = 1.',
  },

  // Unit III
  {
    id: 'rtl',
    term: 'Register Transfer Language (RTL)',
    aliases: ['RTL', 'RTL (←)', 'Register Transfer (R2 ← R1)'],
    unit: 3,
    shortExplanation: 'Compact symbolic notation for describing data transfers and micro-operations between CPU registers.',
    example: 'P: R2 ← R1 means "if control signal P is 1, copy R1 into R2 on the next clock pulse."',
  },
  {
    id: 'common-bus',
    term: 'Common Bus',
    aliases: ['Common bus', 'Bus'],
    unit: 3,
    shortExplanation: 'A shared set of wires (using multiplexers or tri-state buffers) allowing registers and memory to exchange data without individual point-to-point wiring.',
    example: 'To perform R2 ← R1, select lines put R1 on the bus and LD2 loads R2 from the bus.',
  },
  {
    id: 'micro-operation',
    term: 'Micro-operation',
    aliases: ['Micro-operations', 'Arithmetic Micro-op'],
    unit: 3,
    shortExplanation: 'One elementary hardware action (arithmetic, logic, shift, or register transfer) completed in a single clock pulse.',
    example: 'R1 ← R1 + 1 (increment), F ← A ∧ B (AND), or R ← ashr R (arithmetic shift right).',
  },
  {
    id: 'opcode',
    term: 'Opcode (Operation Code)',
    aliases: ['Opcode'],
    unit: 3,
    shortExplanation: 'The bit field inside a machine instruction that tells the CPU WHICH action to execute (e.g., ADD, LDA, STA, BUN).',
    example: 'In Mano’s Basic Computer, bits 12–14 hold the 3-bit opcode: 001 means ADD, 010 means LDA.',
  },
  {
    id: 'instruction-cycle',
    term: 'Instruction Cycle',
    aliases: ['Fetch', 'Decode', 'Execute', 'Fetch (T0, T1)', 'Decode (T2)'],
    unit: 3,
    shortExplanation: 'The repeating loop that runs every instruction: Fetch (T0–T1) → Decode (T2) → Indirect EA if I=1 (T3) → Execute → Reset SC to 0.',
    example: 'T0: AR ← PC; T1: IR ← M[AR], PC ← PC + 1 fetches the next instruction into IR.',
  },
  {
    id: 'hardwired-control',
    term: 'Hardwired Control',
    aliases: ['Hardwired', 'Hardwired vs Microprogrammed'],
    unit: 3,
    shortExplanation: 'A control unit built from fixed logic gates, decoders, and flip-flops. Very fast (suits RISC), but hard to modify.',
    example: 'AR’s load signal is wired directly as LD(AR) = R’T0 + R’T2 + D7’IT3.',
  },
  {
    id: 'microprogrammed-control',
    term: 'Microprogrammed Control',
    aliases: ['Microprogrammed', 'Microprogram', 'Control memory'],
    unit: 3,
    shortExplanation: 'A control unit that stores sequences of control words (microprograms) inside a fast ROM called Control Memory. Flexible and great for CISC.',
    example: 'Changing how an instruction executes only requires updating its microprogram in control ROM.',
  },

  // Unit IV
  {
    id: 'car-sbr',
    term: 'CAR & SBR (Address Sequencing)',
    aliases: ['CAR', 'SBR', 'Address sequencing', 'CAR & SBR'],
    unit: 4,
    shortExplanation: 'CAR (Control Address Register) points to the active microinstruction in Control Memory; SBR saves the return address (CAR+1) for micro-subroutines.',
    example: 'A CALL microinstruction saves CAR+1 in SBR and jumps; RET copies SBR back into CAR.',
  },
  {
    id: 'effective-address',
    term: 'Effective Address (EA) & Addressing Modes',
    aliases: ['Addressing mode', 'Effective Address (EA)', 'Immediate', 'Indexed', 'Relative', 'Direct', 'Indirect'],
    unit: 4,
    shortExplanation: 'An addressing mode is the rule for turning an instruction’s address field into the Effective Address (EA) where the operand lives.',
    example: 'In Indexed mode with XR = 100 and instruction LOAD 500, EA = 100 + 500 = 600, so AC loads M[600].',
  },
  {
    id: 'program-control',
    term: 'Program Control Instructions',
    aliases: ['Program control', 'Status bits', 'Status Bits (C, S, Z, V)'],
    unit: 4,
    shortExplanation: 'Instructions (BR, JMP, CALL, RET, SKP, BNZ) that change the Program Counter (PC) to steer execution, often checking status bits C, S, Z, V.',
    example: 'DEC R1 sets Z=1 when R1 reaches 0; BNZ LOOP branches back while Z=0.',
  },
  {
    id: 'signed-magnitude',
    term: 'Signed-Magnitude Arithmetic',
    aliases: ['Signed-magnitude', 'AVF'],
    unit: 4,
    shortExplanation: 'Stores the sign bit (0=+, 1=−) separately from the magnitude. Same signs add magnitudes; different signs subtract via EA ← A + B’ + 1.',
    example: '(+14) − (+15): flip Bs → subtract → E=0 means |A|<|B|, so negate A to 00001 and flip As to 1 → −1.',
  },
  {
    id: 'booths-algorithm',
    term: "Booth's Multiplication Algorithm",
    aliases: ["Booth's algorithm", 'ashr', 'ashr (AC, QR, Qn+1)'],
    unit: 4,
    shortExplanation: "Multiplies signed 2's-complement numbers directly by checking bit pairs (Qn, Qn+1): 10 → AC−BR, 01 → AC+BR, 00/11 → no op, followed by arithmetic shift right (ashr).",
    example: 'BR = 10111 (−9) × QR = 01101 (+13) produces 11100 01011 = −117 in 5 shift cycles.',
  },

  // Unit V
  {
    id: 'strobe-vs-handshaking',
    term: 'Strobe vs Handshaking',
    aliases: ['Strobe', 'Handshaking', 'Asynchronous Transfer', 'Strobe Control'],
    unit: 5,
    shortExplanation: 'Both coordinate asynchronous transfers without a shared clock. Strobe uses 1 control pulse (no confirmation); Handshaking uses 2 lines (request + acknowledgement).',
    example: 'Source-initiated handshaking uses Data Valid (source→dest) and Data Accepted (dest→source).',
  },
  {
    id: 'dma',
    term: 'DMA (Direct Memory Access)',
    aliases: ['DMA', 'Bus Request', 'Bus Grant', 'Cycle stealing', 'BR & BG'],
    unit: 5,
    shortExplanation: 'Lets a dedicated DMA controller transfer blocks directly between an I/O device and RAM while the CPU stays free.',
    example: 'DMA requests the bus (BR), receives Bus Grant (BG), moves words directly, and interrupts the CPU once Word Count hits 0.',
  },
  {
    id: 'priority-interrupt',
    term: 'Priority Interrupt',
    aliases: ['Priority interrupt', 'Interrupt I/O', 'Programmed I/O'],
    unit: 5,
    shortExplanation: 'Ranks interrupting devices so urgent hardware (like power-fail or high-speed disks) gets serviced before slower devices.',
    example: 'Implemented in hardware using daisy-chaining or parallel priority logic, or in software via polling.',
  },
  {
    id: 'memory-hierarchy',
    term: 'Memory Hierarchy',
    aliases: ['Memory hierarchy', 'Main memory', 'Auxiliary memory', 'Volatility'],
    unit: 5,
    shortExplanation: 'Layers of memory (Registers → Cache → Main RAM → SSD/HDD → Tape) balancing nanosecond speed at the top with cheap terabyte storage at the bottom.',
    example: 'Main RAM is fast, volatile, and CPU-direct; Auxiliary disk is slow, non-volatile, and accessed via I/O or DMA.',
  },
  {
    id: 'cache-locality',
    term: 'Cache & Locality of Reference',
    aliases: ['Cache', 'Locality of reference', 'Hit ratio', 'Hit Ratio (h) & AMAT'],
    unit: 5,
    shortExplanation: 'A small fast SRAM memory next to the CPU that speeds up access because programs reuse recent data (temporal locality) and nearby addresses (spatial locality).',
    example: 'With hit ratio h = 0.9, tc = 10 ns, tm = 100 ns, cache drops average access from 100 ns down to 19 ns (or 20 ns sequentially).',
  },
  {
    id: 'associative-memory',
    term: 'Associative Memory (CAM)',
    aliases: ['Associative memory', 'CAM', 'Argument (A), Key (K), Match (M)'],
    unit: 5,
    shortExplanation: 'Content-Addressable Memory that searches EVERY word in parallel by its stored content rather than address, using Argument (A), Key mask (K), and Match (M).',
    example: 'With A = 101 111100 and Key K = 111 000000, any word starting with 101 sets its match bit Mi = 1 immediately.',
  },
];

export function findGlossaryEntry(rawTerm: string): GlossaryEntry | undefined {
  const norm = rawTerm.trim().toLowerCase();
  if (!norm) return undefined;

  // Exact term or alias match first
  const exact = GLOSSARY.find(
    (g) =>
      g.term.toLowerCase() === norm ||
      (g.aliases && g.aliases.some((a) => a.toLowerCase() === norm))
  );
  if (exact) return exact;

  // Partial contains match
  return GLOSSARY.find(
    (g) =>
      g.term.toLowerCase().includes(norm) ||
      norm.includes(g.term.toLowerCase().split('(')[0].trim()) ||
      (g.aliases && g.aliases.some((a) => norm.includes(a.toLowerCase()) || a.toLowerCase().includes(norm)))
  );
}

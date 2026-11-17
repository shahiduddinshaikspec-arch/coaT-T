import type { BeginnerLesson } from '../types';

export const LESSONS: BeginnerLesson[] = [
  // ==================== UNIT I ====================
  {
    id: 'l1-1',
    unit: 1,
    order: 1,
    title: 'How a Digital Computer Works: Architecture vs Design',
    estimatedMinutes: 6,
    prerequisiteIds: [],
    bigIdea:
      'Architecture is WHAT a programmer can command the computer to do; Design (Organization) is HOW engineers wire the chips inside to actually do it.',
    plainEnglish: [
      'If you are starting COA from zero, start with one simple picture: a computer is a fast office clerk with a tiny desk (Registers), a calculator (ALU), a boss reading instructions one by one (Control Unit), a filing cabinet (Main Memory), and an inbox/outbox (Input & Output).',
      'Computer Architecture describes the rules visible to software—which instructions exist, what data types they accept, and how memory is addressed. Computer Design (or Organization) is the physical hardware implementation—logic gates, wires, control signals, and memory chips.',
      'Two laptops can share the exact same architecture (so they run the exact same programs) while using totally different internal designs (one optimized for battery life, another for raw speed).',
    ],
    analogy: {
      title: 'Car Dashboard vs Engine',
      body: 'Every automatic car has the same "architecture" for the driver: steering wheel, brake, gas pedal, PRND shifter. Under the hood, one car might be electric and another petrol—different "design/organization", same driver interface.',
    },
    terms: [
      { term: 'Computer Architecture', meaning: 'Programmer-visible attributes: instruction set, addressing modes, data types, I/O ("the what").' },
      { term: 'Computer Design / Organization', meaning: 'Hardware realization: circuits, registers, control signals, memory tech ("the how").' },
      { term: 'CPU', meaning: 'Central Processing Unit = ALU + Control Unit + Registers.' },
      { term: 'ALU', meaning: 'Arithmetic & Logic Unit: performs +, −, ×, ÷ and AND/OR/NOT/compare.' },
      { term: 'Control Unit (CU)', meaning: 'Fetches each instruction, decodes it, and sends timing/control signals to every unit.' },
    ],
    workedExample: {
      title: 'Trace one simple step: Adding two numbers',
      steps: [
        '1. Input unit converts your keypresses into binary and stores the program + data in Main Memory.',
        '2. Control Unit fetches the ADD instruction from Memory into the Instruction Register (IR) and decodes it.',
        '3. Operands are pulled into CPU Registers, and the CU tells the ALU to add them.',
        '4. The ALU puts the sum back into a register (Accumulator) or Memory, then sends it to the Output unit.',
      ],
      takeaway: 'Remember: data flows between Memory, Registers, ALU, and I/O—while dashed CONTROL arrows go outward from the Control Unit to coordinate everyone.',
    },
    diagram: {
      src: '/diagrams/image2.png',
      caption: 'Functional block diagram of a digital computer (CPU = CU + Registers + ALU)',
    },
    linkedQuestionIds: ['u1_2m_1e', 'u1_5m_2b'],
  },
  {
    id: 'l1-2',
    unit: 1,
    order: 2,
    title: 'Number Systems & Binary Codes (Hex, BCD, Excess-3, Gray, ASCII)',
    estimatedMinutes: 8,
    prerequisiteIds: ['l1-1'],
    bigIdea:
      'Hardware only understands 0 (OFF) and 1 (ON). Number bases (Hex, Octal) are human shortcuts for long bit strings, while codes (BCD, Excess-3, Gray, ASCII) pack digits and letters for specific jobs.',
    plainEnglish: [
      'A single 0 or 1 is a bit. With n bits you can represent 2ⁿ unique patterns (4 bits = 16 patterns, 7 bits = 128 patterns). Writing 24 bits like 111100111010011111000010 is painful for humans, so we group bits into 4s for Hexadecimal (0–9, A–F) or 3s for Octal (0–7).',
      'Binary Codes map everyday things onto bits: BCD (8421) encodes each decimal digit separately in 4 bits so billing displays never round pennies; Excess-3 adds 3 to every BCD digit so flipping its bits gives the 9’s complement automatically!',
      'Gray code changes only ONE bit between consecutive numbers (great for mechanical sensors so you never misread mid-transition). ASCII uses 7 bits to encode letters and digits (like A = 65 = 1000001).',
    ],
    analogy: {
      title: 'Zip Codes vs Measuring Tape',
      body: 'Pure binary is like a measuring tape (the whole number 59 = 111011₂). BCD is like a postal code where each digit gets its own separate 4-bit box (5 → 0101, 9 → 1001, so 59 → 0101 1001).',
    },
    terms: [
      { term: 'Hexadecimal (Base 16)', meaning: 'Each hex digit 0–9, A–F maps cleanly to exactly 4 binary bits.' },
      { term: 'BCD (8421)', meaning: 'Binary Coded Decimal: each decimal digit (0–9) gets its own 4-bit binary code; 1010–1111 are unused.' },
      { term: 'Excess-3', meaning: 'Non-weighted, self-complementing code equal to BCD + 3 (0011).' },
      { term: 'Gray Code', meaning: 'Reflected binary where adjacent numbers differ by only 1 bit (used in shaft encoders & K-maps).' },
      { term: 'ASCII', meaning: '7-bit alphanumeric code (128 characters): A = 41H (1000001), a = 61H, 0 = 30H.' },
    ],
    workedExample: {
      title: 'Convert Binary 1011 to Gray Code (and back)',
      steps: [
        'Binary → Gray: Keep MSB (1). Then XOR each bit with the bit to its left: 1⊕0=1, 0⊕1=1, 1⊕1=0 → Gray = 1110.',
        'Gray → Binary: Keep MSB (1). Then XOR each Gray bit with the PREVIOUS binary bit: 1⊕1=0, 0⊕1=1, 1⊕0=1 → Binary = 1011.',
      ],
      takeaway: 'For Hex ↔ Octal, NEVER convert through decimal! Always expand Hex to 4-bit Binary, then regroup in 3s from the right for Octal.',
    },
    visualTable: {
      caption: 'Quick Reference: Decimal 0–9 in BCD, Excess-3, and Gray Code',
      headers: ['Decimal', 'BCD (8421)', 'Excess-3 (+3)', 'Gray Code'],
      rows: [
        ['0', '0000', '0011', '0000'],
        ['1', '0001', '0100', '0001'],
        ['2', '0010', '0101', '0011'],
        ['3', '0011', '0110', '0010'],
        ['4', '0100', '0111', '0110'],
        ['5', '0101', '1000', '0111'],
        ['6', '0110', '1001', '0101'],
        ['7', '0111', '1010', '0100'],
        ['8', '1000', '1011', '1100'],
        ['9', '1001', '1100', '1101'],
      ],
    },
    linkedQuestionIds: ['u1_2m_1a', 'u1_2m_1b', 'u1_2m_1c', 'u1_5m_2e', 'u1_10m_3c'],
    linkedNumericalIds: ['num-hex-convert', 'num-bcd-ex3'],
  },
  {
    id: 'l1-3',
    unit: 1,
    order: 3,
    title: 'Binary Logic Gates & How Registers Store Bits',
    estimatedMinutes: 6,
    prerequisiteIds: ['l1-2'],
    bigIdea:
      'Logic gates make instant decisions on 0s and 1s, while flip-flops remember a bit—and lining up n flip-flops creates an n-bit CPU register.',
    plainEnglish: [
      'Digital circuits combine just three core ideas: AND (all inputs must be 1), OR (at least one input is 1), and NOT (flip 0 ↔ 1). Adding a NOT bubble to AND or OR gives NAND and NOR—called universal gates because you can build ANY computer circuit out of NANDs alone!',
      'XOR outputs 1 when inputs are DIFFERENT (essential for adders and comparators). XNOR outputs 1 when inputs are EQUAL.',
      'Gates alone forget their inputs the moment electricity changes. To remember 1 bit, hardware uses a binary cell (flip-flop). Grouping 4, 16, or 64 flip-flops side-by-side makes a Register. On a clock pulse with Load enabled, new bits snapshot into the register; otherwise it holds its value.',
    ],
    analogy: {
      title: 'Light Switches vs Camera Shutter',
      body: 'A logic gate is like two light switches wired in series (AND): turn either off and the bulb goes out immediately. A register is like a camera shutter: it holds the last photo until you press the shutter button (Clock + Load).',
    },
    terms: [
      { term: 'NAND Gate', meaning: 'Output is 0 ONLY when both inputs are 1. A universal gate.' },
      { term: 'XOR / XNOR', meaning: 'XOR = 1 if inputs differ (A ⊕ B); XNOR = 1 if inputs match.' },
      { term: 'Binary Cell (Flip-Flop)', meaning: 'A 1-bit storage circuit that holds 0 or 1 while powered.' },
      { term: 'Register Transfer (R2 ← R1)', meaning: 'Copies bits from R1 into R2 on a clock edge; R1 stays unchanged.' },
    ],
    workedExample: {
      title: 'Reading a Register Transfer: R2 ← R1',
      steps: [
        'Suppose R1 holds 1010 and R2 holds 0000.',
        'When the control unit enables Load on R2 and the clock ticks, R1’s bits are copied into R2.',
        'After the clock edge: R1 is STILL 1010, and R2 is now 1010.',
      ],
      takeaway: 'Transfers are COPIES, not moves! The source register never loses its bits.',
    },
    diagram: {
      src: '/diagrams/image4.png',
      caption: 'Standard symbols of basic, universal, and exclusive logic gates',
    },
    linkedQuestionIds: ['u1_2m_1d', 'u1_5m_2c', 'u1_5m_2f'],
  },
  {
    id: 'l1-4',
    unit: 1,
    order: 4,
    title: 'Complements, Data Types & Fixed vs Floating-Point Numbers',
    estimatedMinutes: 10,
    prerequisiteIds: ['l1-2'],
    bigIdea:
      'Computers hate building separate subtractor circuits—so they use 2’s complement to turn subtraction into addition. And every binary pattern needs a Data Type label so the CPU knows if it is an integer, fraction, text, or address.',
    plainEnglish: [
      'How do you subtract A − B using only an adder? Add the r’s complement of B! In binary (base 2): flip every bit to get the 1’s complement, then add 1 to get the 2’s complement. Add A + (2’s complement of B). If an extra carry pops out the left side, throw the carry away—your answer is positive! If NO carry pops out, the answer is negative (take the 2’s complement of the sum to read its size).',
      'For fractions like 10.625, Fixed-point locks the binary point in one permanent spot (fast and exact for simple controllers, small range). Floating-point works like scientific notation (±m × 2ᵉ): IEEE-754 single precision uses 1 sign bit, 8-bit biased exponent (bias 127), and 23 fraction bits to store huge or tiny numbers.',
      'Data types—Integers, Fixed-point, Floating-point, BCD, Characters (ASCII/Unicode), Booleans, and Addresses—each trade off range, exactness, memory size, and hardware speed.',
    ],
    analogy: {
      title: 'Car Odometer Wrapping Around',
      body: 'Think of 2’s complement like a 4-digit odometer: starting at 0000 and going backward 1 mile shows 9999. Adding 9999 + 0005 gives 10004—drop the leading 1 and you get 0004 (= 5 − 1)!',
    },
    terms: [
      { term: "1's / 9's Complement", meaning: "Diminished radix complement (r−1)'s: flip every binary bit (or subtract each decimal digit from 9)." },
      { term: "2's / 10's Complement", meaning: "Radix complement r's = diminished complement + 1. Standard way CPUs represent signed integers." },
      { term: 'Fixed-Point', meaning: 'Implied binary point at a fixed position; simple, fast, constant precision, small range.' },
      { term: 'Floating-Point (IEEE-754)', meaning: '1 sign bit + 8-bit biased exponent (e+127) + 23-bit mantissa; huge range, slight rounding error.' },
    ],
    workedExample: {
      title: 'Binary Subtraction via 2’s Complement: 13 − 6 (1101 − 0110)',
      steps: [
        '1. Find 1’s complement of subtrahend 0110 → flip bits → 1001.',
        '2. Add 1 to get 2’s complement → 1001 + 1 = 1010.',
        '3. Add to minuend: 1101 + 1010 = 1 0111.',
        '4. End-carry is 1 → discard it! Answer is positive: 0111 = +7.',
      ],
      takeaway: 'Memorize the golden carry rule: End-carry = 1 → Positive (drop carry). End-carry = 0 → Negative (take 2’s complement to get magnitude).',
    },
    visualTable: {
      caption: 'Fixed-Point vs Floating-Point at a Glance',
      headers: ['Feature', 'Fixed-Point', 'Floating-Point'],
      rows: [
        ['Binary point', 'Fixed implied position', 'Moves via exponent'],
        ['Range', 'Small', 'Very large (≈10⁻³⁸ to 10³⁸)'],
        ['Hardware / speed', 'Simple, fast (ALU)', 'Complex, slower (needs FPU)'],
        ['Best used for', 'Embedded, DSP, audio', 'Scientific computing, graphics, ML'],
      ],
    },
    linkedQuestionIds: ['u1_2m_1f', 'u1_5m_2a', 'u1_5m_2d', 'u1_5m_2g', 'u1_5m_2h', 'u1_10m_3a', 'u1_10m_3b', 'u1_10m_3d'],
    linkedNumericalIds: ['num-bin-sub-2s', 'num-fixed-point', 'num-18bit-2s-sub'],
  },

  // ==================== UNIT II ====================
  {
    id: 'l2-1',
    unit: 2,
    order: 1,
    title: 'Combinational Circuit Design & Binary Adder-Subtractor',
    estimatedMinutes: 7,
    prerequisiteIds: ['l1-3', 'l1-4'],
    bigIdea:
      'In a combinational circuit, outputs depend ONLY on the inputs right now (no memory). Follow one 6-step recipe to design any circuit—and use XOR gates + mode bit M to make one adder do both A+B and A−B!',
    plainEnglish: [
      'Every combinational circuit design question in Unit II asks for the same 6 steps: (1) State the problem, (2) Count inputs & outputs, (3) Assign letter names, (4) Build the truth table, (5) Simplify with K-maps / Boolean algebra, (6) Draw the logic diagram.',
      'A Full Adder adds three 1-bit inputs (A, B, Cin) to produce Sum = A ⊕ B ⊕ Cin and Cout = AB + Cin(A ⊕ B). Chain four Full Adders together and you get a 4-bit adder.',
      'To turn it into an Adder-Subtractor, pass each B bit through an XOR gate controlled by a Mode bit M, and also connect M to C0! When M = 0, B ⊕ 0 = B and C0 = 0, so it adds A + B. When M = 1, B ⊕ 1 = B’ and C0 = 1, so it computes A + B’ + 1 = A − B!',
    ],
    analogy: {
      title: 'Controllable Light-Flipper (XOR)',
      body: 'An XOR gate with control wire M is a programmable inverter: M = 0 acts like a straight wire (let B pass untouched); M = 1 acts like a NOT gate (flip B into its 1’s complement).',
    },
    terms: [
      { term: 'Combinational Circuit', meaning: 'Outputs depend ONLY on present inputs; no memory, no feedback, no clock.' },
      { term: 'Full Adder', meaning: 'Adds A, B, Cin → Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B).' },
      { term: 'Mode Control Bit (M)', meaning: 'M=0 selects addition (A+B); M=1 selects subtraction (A+B’+1 = A−B).' },
      { term: 'Overflow Flag (V)', meaning: 'V = C4 ⊕ C3 (carry into sign bit XOR carry out of sign bit).' },
    ],
    workedExample: {
      title: '4-bit Adder-Subtractor with M = 1: Compute 6 − 3',
      steps: [
        'Inputs: A = 0110 (6), B = 0011 (3), Mode M = 1 (so C0 = 1).',
        'XOR gates invert B: B ⊕ 1 = 1100 (1’s complement of 3).',
        'Full Adders compute: 0110 + 1100 + 1 = 1 0011.',
        'Drop end-carry 1 → Sum = 0011 = +3!',
      ],
      takeaway: 'Memorize the 6 design steps—they earn easy guaranteed marks in Q.2(c), Q.2(e), AND 10-mark Q.3(d)!',
    },
    diagram: {
      src: '/diagrams/image6.png',
      caption: '4-bit binary adder-subtractor controlled by mode bit M',
    },
    linkedQuestionIds: ['u2_5m_2a', 'u2_5m_2e'],
  },
  {
    id: 'l2-2',
    unit: 2,
    order: 2,
    title: 'Core Building Blocks: MUX, Decoders, Encoders & Comparators',
    estimatedMinutes: 8,
    prerequisiteIds: ['l2-1'],
    bigIdea:
      'CPUs route and check data using four combinational workhorses: Multiplexers (choose 1 of many), Decoders (activate 1 line from a code), Encoders (turn 1 active line into a code), and Comparators (check >, =, <).',
    plainEnglish: [
      'A Multiplexer (MUX) is a digital railway switch: 2ⁿ data inputs come in, n select lines pick ONE winner, and it goes to the single output Y. A 4:1 MUX uses 2 select lines (S1, S0), 4 AND gates, and 1 OR gate.',
      'A Decoder takes an n-bit binary number and lights up exactly ONE of 2ⁿ output lines (great for selecting one memory chip or decoding an instruction opcode). An Encoder is the exact mirror opposite: 2ⁿ input lines go in, and it outputs the n-bit binary code of whichever line is active (a Priority Encoder handles ties).',
      'A Magnitude Comparator compares A and B to tell if A>B, A=B, or A<B. For 1 bit: G = A·B’, L = A’·B, E = (A ⊕ B)’ (XNOR). For 2 bits (A1A0 vs B1B0), compare the top bits (A1, B1) first; only if they are equal (x1 = 1) do you check the bottom bits (A0, B0)!',
    ],
    analogy: {
      title: 'TV Remote, Hotel Keycard & Elevator Panel',
      body: 'MUX = TV remote choosing 1 of 4 HDMI inputs to send to your screen. Decoder = hotel room number lighting up 1 specific door. Encoder = pressing floor button #3 on an elevator turning it into binary "11".',
    },
    terms: [
      { term: '4:1 Multiplexer', meaning: 'Y = S1’S0’I0 + S1’S0I1 + S1S0’I2 + S1S0I3.' },
      { term: 'Decoder (n → 2ⁿ)', meaning: 'Minterm generator: only 1 output is 1 for each input code (e.g. 2-to-4).' },
      { term: 'Encoder (2ⁿ → n)', meaning: 'Inverse of decoder: outputs binary code of active input (A1 = D2+D3, A0 = D1+D3).' },
      { term: '2-Bit Comparator', meaning: 'x1=A1⊙B1, x0=A0⊙B0 → (A=B)=x1x0, (A>B)=A1B1’+x1A0B0’, (A<B)=A1’B1+x1A0’B0.' },
    ],
    workedExample: {
      title: 'Why 2-Bit Comparator checks MSB first',
      steps: [
        'Compare A = 10 (2) and B = 01 (1).',
        'Top bits: A1 = 1, B1 = 0 → A1·B1’ = 1 → IMMEDIATELY A > B without even caring that A0 < B0!',
        'Compare A = 11 (3) and B = 10 (2): A1 = B1 = 1 (so x1 = 1), then check A0·B0’ = 1 → A > B!',
      ],
      takeaway: 'Never memorize all 16 rows of the 2-bit comparator table blindly—just compare the 2-bit numbers A and B in your head for each row!',
    },
    diagram: {
      src: '/diagrams/image9.png',
      caption: '4:1 Multiplexer built from four AND gates and one OR gate',
    },
    linkedQuestionIds: ['u2_2m_1b', 'u2_2m_1c', 'u2_2m_1d', 'u2_5m_2c', 'u2_5m_2d', 'u2_10m_3c', 'u2_10m_3d'],
  },
  {
    id: 'l2-3',
    unit: 2,
    order: 3,
    title: 'Sequential Circuits: S-R Latch vs S-R Flip-Flop & State Design',
    estimatedMinutes: 8,
    prerequisiteIds: ['l2-1'],
    bigIdea:
      'Sequential circuits add MEMORY (feedback loops) and a CLOCK so outputs depend on both present inputs AND past history. Latches respond anytime enable is high; flip-flops snap cleanly only at a clock edge.',
    plainEnglish: [
      'Cross-couple two NOR gates so each output feeds back into the other gate—boom, you just built an S-R Latch that remembers 1 bit! S = 1 Sets Q to 1; R = 1 Resets Q to 0; S = R = 0 Holds the stored bit; S = R = 1 is INVALID (both Q and Q’ become 0).',
      'To keep an entire CPU synchronized, we put two clocked NAND gates in front to make a Clocked S-R Flip-Flop: when CLK = 0, inputs are ignored and state is held; when CLK = 1 (or at a clock edge in master-slave/edge-triggered flip-flops), S and R update Q. Characteristic equation: Q(t+1) = S + R’Q(t) with S·R = 0.',
      'Designing a sequential circuit also has 6 steps: Spec → State Diagram (circles = states, arrows = input/output) → State Table → Assign binary state codes → Excitation table & K-maps for flip-flop inputs → Logic diagram.',
    ],
    analogy: {
      title: 'Two-Button Wall Switch vs Synchronized Orchestra',
      body: 'An S-R Latch is a switch with a SET button and a RESET button (don’t press both at once!). A Flip-Flop adds a conductor’s baton (Clock): musicians only change notes on the exact beat.',
    },
    terms: [
      { term: 'Latch vs Flip-Flop', meaning: 'Latch = level-sensitive, asynchronous. Flip-flop = edge-triggered, clocked.' },
      { term: 'S-R Invalid State', meaning: 'S = 1, R = 1 is forbidden because Q and Q’ stop being complements.' },
      { term: 'Characteristic Equation', meaning: 'Q(t+1) = S + R’Q(t), constraint S·R = 0.' },
      { term: 'Mealy State Diagram', meaning: 'Arrows are labeled input/output (output depends on state AND current input).' },
    ],
    workedExample: {
      title: 'Mealy Detector for Two Consecutive 1s (Q.2g)',
      steps: [
        'State S0 (code 0): have not just seen a 1. Input 0 → stay S0 (out 0). Input 1 → go to S1 (out 0).',
        'State S1 (code 1): just saw a 1! Input 0 → reset to S0 (out 0). Input 1 → stay S1 and output z = 1!',
        'With a D flip-flop: Next state D = x, Output z = x·Q (just 1 flip-flop + 1 AND gate!).',
      ],
      takeaway: 'S-R Latch & Flip-Flop appears in BOTH 5M Q.2(f) and 10M Q.3(b)—know both diagrams, both tables, and Q(t+1) = S + R’Q!',
    },
    diagram: {
      src: '/diagrams/image10.png',
      caption: 'S-R Latch built from two cross-coupled NOR gates',
    },
    linkedQuestionIds: ['u2_2m_1a', 'u2_2m_1e', 'u2_5m_2f', 'u2_5m_2g', 'u2_10m_3b'],
  },
  {
    id: 'l2-4',
    unit: 2,
    order: 4,
    title: 'Shift Registers & Counters (Ripple vs Synchronous)',
    estimatedMinutes: 8,
    prerequisiteIds: ['l2-3'],
    bigIdea:
      'Chain flip-flops together to slide bits sideways (Shift Registers) or count clock pulses (Counters). Ripple counters are simple but slow; Synchronous counters clock every flip-flop together for high speed.',
    plainEnglish: [
      'A Shift Register connects the output Q of one flip-flop to the input D of the next. Every clock tick shifts all bits one step right (or left). Depending on whether data enters/exits one bit at a time (Serial) or all at once (Parallel), you get 4 modes: SISO, SIPO, PISO, and PIPO.',
      'A Binary Counter uses JK flip-flops set to toggle (J = K = 1). In a Ripple (Asynchronous) Counter, the external clock goes ONLY to FF0; Q0 clocks FF1, and Q1 clocks FF2. Easy wiring, but delays ripple down the chain and cause glitches at high speeds!',
      'In a Synchronous Counter, ALL flip-flops share the SAME clock line, so every bit flips at the exact same instant! Logic gates decide when each bit should toggle: FF0 always toggles (J0=K0=1), FF1 toggles when Q0=1 (J1=K1=Q0), and FF2 toggles when Q0 AND Q1 are both 1 (J2=K2=Q0·Q1).',
    ],
    analogy: {
      title: 'Dominoes vs Marching Band',
      body: 'A Ripple Counter is like falling dominoes—each waits for the previous one to tip (cumulative delay). A Synchronous Counter is a marching band stepping on the exact same drumbeat!',
    },
    terms: [
      { term: 'SISO / SIPO / PISO / PIPO', meaning: 'Serial/Parallel In and Serial/Parallel Out shift register modes.' },
      { term: 'Ripple (Async) Counter', meaning: 'Clock only to FF0; previous output clocks next FF. Simple, slower, glitches likely.' },
      { term: 'Synchronous Counter', meaning: 'Common clock to all FFs; uses AND gates (J2=K2=Q0·Q1). Fast, glitch-free.' },
      { term: 'Mod-8 Counter', meaning: '3 flip-flops count 000 → 111 (8 states) then wrap to 000; Q2 frequency = f/8.' },
    ],
    workedExample: {
      title: 'Why FF2 toggles when Q0·Q1 = 1 in a 3-bit Synchronous Counter',
      steps: [
        'Look at binary counting: 000 → 001 → 010 → 011 → 100.',
        'Notice Q2 ONLY flips right after 011 (when Q1=1 AND Q0=1) and right after 111 (again Q1=1 AND Q0=1)!',
        'That is why J2 = K2 = Q0 · Q1 works cleanly every single cycle.',
      ],
      takeaway: 'Counters appear in 2M Q.1(f), 5M Q.2(h), AND 10M Q.3(a)! Always include the 4-row Ripple vs Synchronous comparison table.',
    },
    diagram: {
      src: '/diagrams/image15.png',
      caption: '3-bit synchronous binary up counter with common clock and AND gate',
    },
    linkedQuestionIds: ['u2_2m_1f', 'u2_5m_2b', 'u2_5m_2h', 'u2_10m_3a'],
  },

  // ==================== UNIT III ====================
  {
    id: 'l3-1',
    unit: 3,
    order: 1,
    title: 'Register Transfer Language (RTL) & Common Bus System',
    estimatedMinutes: 7,
    prerequisiteIds: ['l2-2', 'l2-4'],
    bigIdea:
      'RTL is shorthand for describing data moving between CPU registers on a clock edge. Instead of tangled point-to-point wires between every pair of registers, CPUs use ONE shared highway called a Common Bus.',
    plainEnglish: [
      'Writing full English sentences for hardware steps gets messy fast, so COA uses Register Transfer Language (RTL). R2 ← R1 means "copy R1 into R2 on the next clock pulse." Adding a condition P: R2 ← R1 means "ONLY copy if control signal P = 1" (built by ANDing P with the Clock to drive R2’s Load pin).',
      'Commas mean simultaneous operations on the SAME clock edge: T1: IR ← M[AR], PC ← PC + 1. Memory reads and writes always use the Address Register AR: Read is DR ← M[AR]; Write is M[AR] ← R1.',
      'To connect 4 registers without 12 separate highways, all register outputs feed into a bank of 4×1 Multiplexers. Select lines S1S0 pick which register gets onto the Common Bus, and enabling LD on the destination register pulls the data off the bus!',
    ],
    analogy: {
      title: 'City Bus with Pick-Up & Drop-Off Rules',
      body: 'Think of the Common Bus as a single highway lane: the MUX select lines (S1S0) open the on-ramp for ONE source register, while the Load (LD) signal opens the off-ramp for the destination register.',
    },
    terms: [
      { term: 'RTL (←)', meaning: 'Register Transfer Language: symbolic notation for micro-operations (e.g. P: R2 ← R1).' },
      { term: 'Common Bus', meaning: 'Shared lines using MUXes or tri-state buffers so any register can talk to any other.' },
      { term: 'Memory Read / Write', meaning: 'Read: DR ← M[AR]; Write: M[AR] ← R1.' },
      { term: 'Simultaneous Transfer', meaning: 'Comma-separated ops happen on the same clock tick: BUS ← R1, R2 ← BUS.' },
    ],
    workedExample: {
      title: 'How R2 ← R1 actually happens on a Common Bus',
      steps: [
        '1. Control unit sets MUX select lines S1S0 = 01 to route R1 onto the Common Bus.',
        '2. Control unit sets destination load input LD2 = 1 (all other LD pins stay 0).',
        '3. On the next rising clock edge, R2 latches whatever is on the bus: BUS ← R1, R2 ← BUS.',
      ],
      takeaway: 'Anytime a question mentions Register Transfer or Bus Memory, always write both the RTL symbol (←) and mention MUX select + Load (LD)!',
    },
    diagram: {
      src: '/diagrams/image21.png',
      caption: 'Common bus connecting four registers via 4×1 multiplexers',
    },
    linkedQuestionIds: ['u3_2m_1b', 'u3_2m_1c', 'u3_5m_2a', 'u3_5m_2c'],
  },
  {
    id: 'l3-2',
    unit: 3,
    order: 2,
    title: 'Arithmetic, Logic & Shift Micro-operations',
    estimatedMinutes: 7,
    prerequisiteIds: ['l3-1', 'l1-4'],
    bigIdea:
      'A micro-operation is one tiny 1-clock-cycle action on bits inside registers. Every CPU instruction is just a recipe made of Arithmetic, Logic, and Shift micro-operations.',
    plainEnglish: [
      'Arithmetic micro-operations do math on numeric register values: Add (R3 ← R1 + R2), Subtract via 2’s complement (R3 ← R1 + R2’ + 1), Complement (R2 ← R2’), Negate (R2 ← R2’ + 1), Increment (+1), and Decrement (−1).',
      'Logic micro-operations treat every bit separately using Boolean gates: AND (∧), OR (∨), XOR (⊕), Complement (’). They power super-useful bit tricks: Selective-Set (OR with 1s), Selective-Complement (XOR with 1s), Selective-Clear (A ∧ B’), Mask (AND to keep only wanted bits), and Insert (Mask then OR).',
      'Shift micro-operations slide bits left or right: Logical shift (shl/shr) fills the empty spot with 0; Circular shift (cil/cir) wraps the bit that falls off around to the other end; Arithmetic shift right (ashr) keeps the leftmost sign bit intact so dividing negative numbers by 2 stays negative!',
    ],
    analogy: {
      title: 'Stencil Masking & Conveyor Belt',
      body: 'Logic AND masking is like laying a cardboard stencil over a register—only the holes with 1s show through; 0s wipe the rest clean. Circular shift is a carousel where bits leaving one side ride right back onto the other.',
    },
    terms: [
      { term: 'Arithmetic Micro-op', meaning: 'Add, subtract (R1 + R2’ + 1), increment, decrement, complement, negate.' },
      { term: 'Selective-Set / Clear / Comp', meaning: 'OR sets 1-positions; A ∧ B’ clears 1-positions; XOR toggles 1-positions.' },
      { term: 'shl / shr', meaning: 'Logical shift left/right: shifts in 0 at the vacated end.' },
      { term: 'cil / cir / ashr', meaning: 'Circular shift wraps bit around; arithmetic shift right (ashr) preserves sign bit.' },
    ],
    workedExample: {
      title: 'All 5 Shifts on R = 1011',
      steps: [
        'shl 1011 → 0110 (0 enters on right)',
        'shr 1011 → 0101 (0 enters on left)',
        'cil 1011 → 0111 (leftmost 1 wraps to right)',
        'cir 1011 → 1101 (rightmost 1 wraps to left)',
        'ashr 1011 → 1101 (sign bit 1 stays copied at left!)',
      ],
      takeaway: 'Notice the difference between shr (0101) and ashr (1101) on 1011—exams LOVE testing whether you preserved the sign bit!',
    },
    visualTable: {
      caption: 'Logic Micro-operations on A = 1100 and B = 1010',
      headers: ['Operation', 'RTL', 'Result'],
      rows: [
        ['AND (Mask)', 'F ← A ∧ B', '1000'],
        ['OR (Selective-Set)', 'F ← A ∨ B', '1110'],
        ['XOR (Selective-Comp)', 'F ← A ⊕ B', '0110'],
        ['Complement', "F ← A'", '0011'],
        ['Clear / Set', 'F ← 0 / F ← 1111', '0000 / 1111'],
      ],
    },
    linkedQuestionIds: ['u3_2m_1a', 'u3_5m_2b', 'u3_5m_2f'],
  },
  {
    id: 'l3-3',
    unit: 3,
    order: 3,
    title: 'Basic Computer Registers, Instruction Formats & Memory-Reference Instructions',
    estimatedMinutes: 9,
    prerequisiteIds: ['l3-1'],
    bigIdea:
      'Mano’s Basic Computer uses 8 named registers and 16-bit instructions. Just 4 bits (Mode bit I + 3-bit Opcode) instantly classify every instruction into Memory-Reference, Register-Reference, or I/O!',
    plainEnglish: [
      'Memorize the 8 Basic Computer registers by bit-width: 12-bit addresses → AR (Address Register) and PC (Program Counter, points to next instruction); 16-bit data/words → DR (Data Register), AC (Accumulator—the main math workspace), IR (Instruction Register), TR (Temporary); 8-bit characters → INPR and OUTR.',
      'A 16-bit instruction is split into: Bit 15 = Mode bit I (0 = direct address, 1 = indirect address), Bits 12–14 = 3-bit Opcode (decoded into D0–D7), Bits 0–11 = 12-bit Address (covers 2¹² = 4096 memory words).',
      'How does the CPU recognize the 3 instruction types? If Opcode ≠ 111 (D7 = 0), it is one of the 7 Memory-Reference instructions (AND, ADD, LDA, STA, BUN, BSA, ISZ). If Opcode = 111 (D7 = 1): I = 0 means one of 12 Register-Reference instructions (like CLA, INC, HLT), while I = 1 means one of 6 I/O instructions (INP, OUT, ION)!',
    ],
    analogy: {
      title: 'Direct vs Indirect Treasure Map',
      body: 'Direct addressing (I = 0) says: "The gold is inside locker 500." Indirect addressing (I = 1) says: "Open locker 500—inside is a sticky note telling you the REAL locker number!"',
    },
    terms: [
      { term: 'AR & PC (12-bit)', meaning: 'AR holds memory address; PC holds address of the NEXT instruction to fetch.' },
      { term: 'AC, DR, IR, TR (16-bit)', meaning: 'Accumulator (math), Data Reg (memory word), Instruction Reg (current command), Temp Reg.' },
      { term: 'D7 = 0 vs D7 = 1', meaning: 'D7=0 → Memory-Ref (0xxx–6xxx direct, 8xxx–Exxx indirect); D7I’ → Reg-Ref (7xxx); D7I → I/O (Fxxx).' },
      { term: 'BSA & ISZ', meaning: 'BSA = Branch & Save Return Address (subroutines); ISZ = Increment & Skip if Zero (loops).' },
    ],
    workedExample: {
      title: 'Decode 16-bit Instruction: 1 010 0000 0000 0101 (A005H)',
      steps: [
        'Bit 15 (I) = 1 → Indirect addressing.',
        'Bits 12–14 (Opcode) = 010 → D2 = LDA (Load AC from memory).',
        'Bits 0–11 (Address) = 005H.',
        'Meaning: Go to M[005] to find the effective address, then load AC ← M[M[005]]!',
      ],
      takeaway: 'Learn the 7 Memory-Reference opcodes in order 0–6: AND, ADD, LDA, STA, BUN, BSA, ISZ ("All Apples Look Sweet But Bring Indigestion" or group as Logic/Math: AND,ADD | Move: LDA,STA | Flow: BUN,BSA,ISZ).',
    },
    diagram: {
      src: '/diagrams/image25.png',
      caption: 'The three 16-bit instruction formats of the Basic Computer',
    },
    linkedQuestionIds: ['u3_2m_1d', 'u3_2m_1e', 'u3_2m_1f', 'u3_5m_2d', 'u3_5m_2h', 'u3_10m_3c'],
  },
  {
    id: 'l3-4',
    unit: 3,
    order: 4,
    title: 'Instruction Cycle (Fetch-Decode-Execute) & Hardwired vs Microprogrammed Control',
    estimatedMinutes: 9,
    prerequisiteIds: ['l3-3'],
    bigIdea:
      'Every program runs as one endless heartbeat controlled by timing pulses T0, T1, T2…: Fetch → Decode → Indirect (if I=1) → Execute → Clear SC to 0. Two ways exist to build the brain (Control Unit): fixed logic gates (Hardwired) or a mini ROM program (Microprogrammed).',
    plainEnglish: [
      'A 4-bit Sequence Counter (SC) + 4×16 decoder ticks off timing signals T0, T1, T2, T3… At T0: AR ← PC (put instruction address into AR). At T1: IR ← M[AR], PC ← PC + 1 (grab instruction and move PC to next line). At T2: Decode opcode IR(12–14) into D0–D7, load AR ← IR(0–11), and load I ← IR(15).',
      'At T3, the path forks! If D7 = 1 (Reg-ref or I/O), it executes right at T3 and clears SC ← 0. If D7 = 0 (Memory-ref) and I = 1, T3 fetches the indirect address (AR ← M[AR]); if I = 0, T3 does nothing (direct address is already in AR). Then T4–T6 execute the instruction (e.g. ADD: T4 DR ← M[AR]; T5 AC ← AC + DR, SC ← 0)!',
      'How do we generate those control signals? Hardwired Control uses fixed logic gates, decoders, and flip-flops—blazing fast (great for RISC), but painful to modify. Microprogrammed Control stores control words as "microprograms" inside a small ROM (Control Memory)—slightly slower, but easy to update and ideal for complex CISC instruction sets.',
    ],
    analogy: {
      title: 'Music Box vs Programmable Keyboard',
      body: 'Hardwired control is a metal music box with fixed pins—plays super fast, but to change the song you must rebuild the cylinder. Microprogrammed control is a digital keyboard reading MIDI files from ROM—just swap the file to change behavior!',
    },
    terms: [
      { term: 'Fetch (T0, T1)', meaning: 'T0: AR ← PC; T1: IR ← M[AR], PC ← PC + 1.' },
      { term: 'Decode (T2)', meaning: 'D0–D7 ← decode IR(12–14); AR ← IR(0–11); I ← IR(15).' },
      { term: 'Indirect Cycle (D7’IT3)', meaning: 'AR ← M[AR] fetches the true effective address when I = 1.' },
      { term: 'Hardwired vs Microprogrammed', meaning: 'Gates/decoders (fast, rigid, RISC) vs Control Memory ROM (slower, flexible, CISC).' },
    ],
    workedExample: {
      title: 'Trace ADD 500 (IR = 1500H) stored at Address 300',
      steps: [
        'T0: AR ← PC → AR becomes 300.',
        'T1: IR ← M[300], PC ← PC + 1 → IR = 1500H, PC = 301.',
        'T2: Decode → D1 = 1 (ADD), AR = 500, I = 0 (direct).',
        'T3: No-op because D7’I’T3 (direct address already in AR!).',
        'T4: DR ← M[500]. T5: AC ← AC + DR, E ← Cout, SC ← 0 (restart at T0!).',
      ],
      takeaway: 'The Instruction Cycle is the #1 repeated topic in Unit III (5M Q.2e, 10M Q.3b, AND 10M Q.3d)! Memorize T0, T1, T2, and D7’IT3 cold.',
    },
    diagram: {
      src: '/diagrams/image23.png',
      caption: 'Flowchart of the Basic Computer instruction cycle (Fetch → Decode → Indirect/Execute)',
    },
    linkedQuestionIds: ['u3_5m_2e', 'u3_5m_2g', 'u3_10m_3a', 'u3_10m_3b', 'u3_10m_3d'],
  },

  // ==================== UNIT IV ====================
  {
    id: 'l4-1',
    unit: 4,
    order: 1,
    title: 'Microprogrammed Control & Address Sequencing',
    estimatedMinutes: 8,
    prerequisiteIds: ['l3-4'],
    bigIdea:
      'Inside a microprogrammed CPU, every machine instruction triggers a tiny mini-program in Control Memory (ROM). Address Sequencing is the smart MUX circuit that chooses which microinstruction runs next.',
    plainEnglish: [
      'A Microprogram is a sequence of microinstructions stored in Control Memory (ROM). The Control Address Register (CAR) points to the current microinstruction, and the Control Data Register (CDR) holds the control word being executed.',
      'How does the sequencer pick the NEXT address for CAR? It supports 6 paths: (1) Increment CAR + 1 for the next line, (2) Unconditional Jump (AD field), (3) Conditional Branch testing status flags (U, I, S, Z selected by CD field), (4) Opcode Mapping—turning the machine opcode directly into a starting ROM address like 0 xxxx 00, (5) Micro-subroutine CALL/RET using the Subroutine Register (SBR), and (6) Initial power-on address (Fetch).',
      'Look at the Address Selection block diagram: MUX 1 chooses between CAR+1, Branch AD, SBR (return), and Opcode Mapping; MUX 2 selects which status condition bit to test!',
    ],
    analogy: {
      title: 'Choose-Your-Own-Adventure Recipe Book',
      body: 'Control Memory is a recipe book, CAR is your bookmark. Usually you turn to the next page (CAR+1), sometimes you flip to a specific page (JMP), sometimes you jump to an index tab matching the dish name (Opcode Mapping), and sometimes you stick a second bookmark (SBR) while checking the sauce recipe (CALL/RET).',
    },
    terms: [
      { term: 'Microprogram', meaning: 'Sequence of microinstructions in Control Memory (ROM) executing one machine instruction.' },
      { term: 'CAR & SBR', meaning: 'Control Address Register (current ROM line) and Subroutine Register (saves CAR+1 on CALL).' },
      { term: 'Opcode Mapping', meaning: 'Translates IR opcode bits into starting ROM address (e.g. 0 xxxx 00, giving 4 lines per routine).' },
      { term: 'Microinstruction Fields', meaning: 'F1, F2, F3 (micro-ops), CD (condition), BR (branch type: JMP/CALL/RET/MAP), AD (address).' },
    ],
    workedExample: {
      title: 'How Mapping works for a 4-bit Opcode',
      steps: [
        'Suppose Control Memory has 128 words (7-bit address) and machine opcode is 4 bits (say 1011).',
        'Mapping hardware puts a 0 in front and two 0s at the back: 0 1011 00 (= address 44).',
        'That gives every machine instruction its own 4-word slot (44, 45, 46, 47) before jumping back to Fetch!',
      ],
      takeaway: 'For 10M Q.3(a), list all 6 sequencing capabilities, draw the MUX1/MUX2/CAR/SBR block diagram, and name the microinstruction fields (F1–F3, CD, BR, AD).',
    },
    diagram: {
      src: '/diagrams/image31.png',
      caption: 'Selection of the next address for control memory (Address Sequencing)',
    },
    linkedQuestionIds: ['u4_2m_1a', 'u4_2m_1e', 'u4_5m_2g', 'u4_10m_3a'],
  },
  {
    id: 'l4-2',
    unit: 4,
    order: 2,
    title: 'CPU Organization: Addressing Modes, Instruction Types & Program Control',
    estimatedMinutes: 9,
    prerequisiteIds: ['l3-3'],
    bigIdea:
      'General-purpose registers keep data close to the ALU. Addressing Modes are the flexible ways an instruction finds its data (Effective Address), while Program Control instructions steer the PC for loops, ifs, and function calls.',
    plainEnglish: [
      'CPUs vary in how many addresses each instruction holds: 3-address (ADD R1, A, B — shortest program, longest bits), 2-address (ADD R1, B — overwrites first operand, most common), 1-address (uses an implied Accumulator AC), and 0-address (stack PUSH/POP).',
      'Addressing Modes tell the CPU how to turn the instruction’s address field into the Effective Address (EA): Immediate (the number IS the operand—no memory lookup!), Direct (EA = address field), Indirect (EA = M[address]), Register (operand is in R1), Register Indirect (EA = R1), Autoincrement/decrement (step R1 after/before access), Relative (EA = PC + address), and Indexed (EA = XR + address, great for arrays!).',
      'Program Control instructions change the Program Counter (PC) to break sequential flow: unconditional BR/JMP, subroutine CALL (pushes PC onto stack) & RET (pops PC back), CMP/TST (set status flags C, S, Z, V without saving a result), and conditional branches (BZ, BNZ, BC, BGT, BLT).',
    ],
    analogy: {
      title: 'Finding a Friend’s Phone Number (Addressing Modes)',
      body: 'Immediate = number is written right on the note. Direct = "look on page 500." Indirect = "page 500 tells you what page it’s REALLY on." Indexed = "start at page 500 and go forward by array index XR."',
    },
    terms: [
      { term: 'Effective Address (EA)', meaning: 'Final memory location where the actual operand lives.' },
      { term: 'Immediate Mode', meaning: 'Operand is embedded directly inside the instruction itself (zero extra memory reads).' },
      { term: 'Relative / Indexed', meaning: 'Relative: EA = PC + offset; Indexed: EA = XR + offset.' },
      { term: 'Status Bits (C, S, Z, V)', meaning: 'Carry, Sign, Zero, Overflow flags tested by conditional branches.' },
    ],
    workedExample: {
      title: 'Quick Mental Check: 3-Address vs 1-Address for X = (A+B)×(C+D)',
      steps: [
        '3-Address (3 instructions): ADD R1,A,B → ADD R2,C,D → MUL X,R1,R2.',
        '1-Address Accumulator (7 instructions): LOAD A → ADD B → STORE T → LOAD C → ADD D → MUL T → STORE X.',
        'Trade-off: Fewer addresses per instruction = shorter instruction width, but MORE instructions needed!',
      ],
      takeaway: 'Practice the 9-mode LOAD 500 table in our Numerical Trainer—it is one of the easiest 5-mark scoring tables on the exam!',
    },
    visualTable: {
      caption: 'Quick Formula Cheat Sheet for Addressing Modes',
      headers: ['Mode', 'How Operand Is Found', 'Typical Use'],
      rows: [
        ['Immediate', 'Operand = Address field itself', 'Constants (e.g. #5)'],
        ['Direct', 'EA = Address field', 'Global variables'],
        ['Indirect', 'EA = M[Address field]', 'Pointers'],
        ['Relative', 'EA = PC + Address field', 'Branches, relocatable code'],
        ['Indexed', 'EA = XR + Address field', 'Arrays & tables'],
        ['Autoinc / Autodec', 'EA = R1 (R1++ after / --R1 before)', 'Stepping through buffers/stacks'],
      ],
    },
    linkedQuestionIds: ['u4_2m_1b', 'u4_2m_1c', 'u4_2m_1d', 'u4_2m_1f', 'u4_5m_2a', 'u4_5m_2c', 'u4_5m_2f', 'u4_10m_3c'],
    linkedNumericalIds: ['num-addressing-modes'],
  },
  {
    id: 'l4-3',
    unit: 4,
    order: 3,
    title: 'Signed-Magnitude Addition & Subtraction Algorithm',
    estimatedMinutes: 8,
    prerequisiteIds: ['l1-4'],
    bigIdea:
      'In signed-magnitude format, signs (As, Bs) and magnitudes (A, B) live separately. Compare signs using XOR: same sign → ADD magnitudes; different signs → SUBTRACT magnitudes (EA ← A + B’ + 1) and let carry E tell you which number was bigger!',
    plainEnglish: [
      'A signed-magnitude number stores a separate sign bit (0 = +, 1 = −) beside its positive binary magnitude. For example, +14 is 0 01110 and −12 is 1 01100.',
      'To do ADDITION (A + B), check As ⊕ Bs: if 0 (same signs), simply add magnitudes EA ← A + B and keep As (E becomes overflow AVF). If 1 (different signs), subtract magnitudes using 2’s complement: EA ← A + B’ + 1.',
      'Now check carry E: If E = 1, that means |A| ≥ |B|, so A already holds the positive difference and keeps As (if A = 0, force As = 0 so we don’t get −0). If E = 0, that means |A| < |B|, so take the 2’s complement of A (A ← A’ + 1) and FLIP As ← As’!',
      'What about SUBTRACTION (A − B)? Super clever trick: just flip B’s sign bit (Bs ← Bs’) and run the EXACT same addition rules!',
    ],
    analogy: {
      title: 'Tug-of-War Teams',
      body: 'Same sign? Both people pull the same way—add their strengths! Opposite signs? They pull against each other—subtract strengths, and the stronger person’s team wins the final sign (E = 1 means A won; E = 0 means B won, so flip the sign!).',
    },
    terms: [
      { term: 'As ⊕ Bs', meaning: '0 means signs match (add magnitudes); 1 means signs differ (subtract magnitudes).' },
      { term: 'EA ← A + B’ + 1', meaning: 'Hardware magnitude subtraction; E is the end-carry bit.' },
      { term: 'E = 1 vs E = 0', meaning: 'E=1 → |A| ≥ |B| (done, keep As). E=0 → |A| < |B| (do A←A’+1 and As←As’).' },
      { term: 'AVF', meaning: 'Add-Overflow Flip-Flop: receives E when adding same-sign magnitudes.' },
    ],
    workedExample: {
      title: 'Step-by-Step: (+11) + (−12)',
      steps: [
        'A = 0 01011 (+11), B = 1 01100 (−12).',
        'Signs differ (As ⊕ Bs = 0 ⊕ 1 = 1) → subtract magnitudes: B’ = 10011.',
        'EA ← 01011 + 10011 + 1 = 11111 → E = 0, A = 11111.',
        'Since E = 0 (|A| < |B|): A ← A’ + 1 = 00000 + 1 = 00001; flip As ← 1 → Result = 1 00001 = −1!',
      ],
      takeaway: 'Signed-magnitude add/sub shows up THREE times in Unit IV (Q.2b, Q.2d, and 10M Q.3d)! Master the E=0 vs E=1 rule in the Numerical Trainer.',
    },
    diagram: {
      src: '/diagrams/image28.png',
      caption: 'Flowchart for signed-magnitude addition and subtraction',
    },
    linkedQuestionIds: ['u4_5m_2b', 'u4_5m_2d', 'u4_10m_3d'],
    linkedNumericalIds: ['num-sm-sub-14-15', 'num-sm-add-15-14', 'num-sm-add-11-12'],
  },
  {
    id: 'l4-4',
    unit: 4,
    order: 4,
    title: 'Binary Multiplication: Sign-Magnitude Hardware & Booth’s Algorithm',
    estimatedMinutes: 10,
    prerequisiteIds: ['l4-3'],
    bigIdea:
      'Normal multiplication adds-and-shifts on every 1 bit. Booth’s Algorithm multiplies signed 2’s-complement numbers directly—no sign stripping needed!—by peeking at pairs of bits (Qn, Qn+1) and doing Arithmetic Shift Right.',
    plainEnglish: [
      'In Sign-Magnitude Hardware Multiplication, handle the sign separately (As ← Qs ⊕ Bs), initialize E = 0, A = 0, put multiplicand in B and multiplier in Q. Repeat for every magnitude bit: if LSB Q0 = 1, add EA ← A + B; then logical shift right (E, A, Q) by 1 bit and decrement SC.',
      'Booth’s Algorithm works directly on 2’s-complement signed integers (even negative × negative!). Put Multiplicand in BR, Multiplier in QR, clear AC = 00000, add one extra helper bit Qn+1 = 0 on the right, and set SC = n (number of bits).',
      'In each cycle, look at the rightmost bit of QR (Qn) and Qn+1: 10 → AC ← AC − BR (add 2’s comp of BR); 01 → AC ← AC + BR; 00 or 11 → do nothing! Then ALWAYS do an Arithmetic Shift Right (ashr) across AC, QR, Qn+1 (keeping AC’s sign bit!) and decrement SC until SC = 0. Final signed answer sits in AC QR!',
    ],
    analogy: {
      title: 'Why Booth’s Checks Pairs (10 and 01)',
      body: 'Multiplying by 01110 (= 14) normally needs three additions (8+4+2). Booth’s notices 14 = 16 − 2: it subtracts at the START of a run of 1s (pair 10), skips all middle 1s (pair 11), and adds at the END of the run (pair 01)!',
    },
    terms: [
      { term: 'Pair 10', meaning: 'Start of a string of 1s → AC ← AC − BR (add −BR), then ashr.' },
      { term: 'Pair 01', meaning: 'End of a string of 1s → AC ← AC + BR, then ashr.' },
      { term: 'Pair 00 or 11', meaning: 'Middle of 0s or 1s → No add/sub, just ashr!' },
      { term: 'ashr (AC, QR, Qn+1)', meaning: 'Arithmetic shift right: AC’s leftmost sign bit stays duplicated, AC LSB enters QR MSB, QR LSB moves to Qn+1.' },
    ],
    workedExample: {
      title: 'The #1 Mistake to Avoid in Booth’s Algorithm',
      steps: [
        'Write down BOTH BR and (−BR) at the top of your exam page before starting! For BR = −9 = 10111, (−BR) = +9 = 01001.',
        'Remember: AC ← AC − BR means adding (−BR), and ALWAYS discard any carry out of the 5th bit of AC!',
        'During ashr, NEVER shift a 0 into AC if AC starts with 1—copy AC’s leftmost bit!',
      ],
      takeaway: 'Booth’s Algorithm appears in BOTH 5M Q.2(e) AND 10M Q.3(b)! Practice both full tables step-by-step in our Numerical Trainer until you get every row right.',
    },
    diagram: {
      src: '/diagrams/image32.png',
      caption: 'Flowchart of Booth’s signed 2’s-complement multiplication algorithm',
    },
    linkedQuestionIds: ['u4_5m_2e', 'u4_5m_2h', 'u4_10m_3b'],
    linkedNumericalIds: ['num-booth-neg9-pos13', 'num-sm-mult-23-19', 'num-booth-neg9-neg13'],
  },

  // ==================== UNIT V ====================
  {
    id: 'l5-1',
    unit: 5,
    order: 1,
    title: 'I/O Interfaces & Asynchronous Transfer (Strobe vs Handshaking)',
    estimatedMinutes: 8,
    prerequisiteIds: ['l3-1'],
    bigIdea:
      'External devices run at totally different speeds and clocks from the CPU. An I/O Interface bridges the gap, and Asynchronous Handshaking uses two-way request/acknowledge signals so no data is ever dropped.',
    plainEnglish: [
      'Keyboards, printers, and disks cannot plug directly into the CPU bus—they use different speeds, voltages, and serial/parallel formats. An I/O Interface solves this by: decoding device addresses, converting formats, buffering speed differences, sending timing signals, reporting status, and raising interrupts.',
      'When two units do NOT share a common clock, they use Asynchronous Data Transfer. Method 1 is Strobe Control: ONE control pulse says "here is data" (source-initiated) or "send me data" (destination-initiated). Problem: there is NO confirmation that the other side actually received it!',
      'Method 2 is Handshaking: TWO control lines create a 4-step polite conversation. In Source-Initiated Handshaking, the lines are Data Valid (source→dest) and Data Accepted (dest→source). In Destination-Initiated Handshaking, the lines are Ready for Data (dest→source) and Data Valid (source→dest). Both sides wait for each other, making it 100% reliable across different speeds!',
    ],
    analogy: {
      title: 'Tossing a Parcel vs Signed Delivery',
      body: 'Strobe is dropping a package on a porch and ringing the bell once without waiting (hope they heard it!). Handshaking is handing it over and getting a signature before walking away.',
    },
    terms: [
      { term: 'Asynchronous Transfer', meaning: 'Data transfer between units with independent clocks using control signals.' },
      { term: 'Strobe Control', meaning: 'Single control line; fast & simple, but NO acknowledgement of receipt.' },
      { term: 'Source-Initiated Handshake', meaning: 'Lines: Data Valid (S→D) & Data Accepted (D→S).' },
      { term: 'Destination-Initiated Handshake', meaning: 'Lines: Ready for Data (D→S) & Data Valid (S→D).' },
    ],
    workedExample: {
      title: 'Memorize the 4-Step Source-Initiated Handshake Loop',
      steps: [
        '1. Source places data on bus + raises Data Valid.',
        '2. Destination reads data + raises Data Accepted.',
        '3. Source sees Accepted → drops Data Valid & removes data.',
        '4. Destination sees Valid dropped → drops Data Accepted (ready for next word!).',
      ],
      takeaway: 'Notice the rhythm: Up → Up → Down → Down! That exact 4-step loop covers FOUR 5-mark questions (Q.2b, Q.2c, Q.2f, Q.2g)!',
    },
    diagram: {
      src: '/diagrams/image34.png',
      caption: 'Source-initiated asynchronous data transfer using handshaking',
    },
    linkedQuestionIds: ['u5_2m_1a', 'u5_2m_1d', 'u5_2m_1e', 'u5_5m_2b', 'u5_5m_2c', 'u5_5m_2f', 'u5_5m_2g'],
  },
  {
    id: 'l5-2',
    unit: 5,
    order: 2,
    title: 'I/O Modes: Programmed I/O, Priority Interrupts & DMA Controller',
    estimatedMinutes: 8,
    prerequisiteIds: ['l5-1'],
    bigIdea:
      'Don’t waste a fast CPU babysitting a slow disk! Progress from Programmed I/O (CPU polls nonstop) → Interrupt I/O (device taps CPU per word) → Direct Memory Access / DMA (dedicated controller moves whole blocks straight to RAM).',
    plainEnglish: [
      'In Programmed I/O, the CPU loops endlessly checking ("polling") a device’s ready flag and copies every word itself—terrible CPU utilization. In Interrupt-Initiated I/O, the CPU runs other programs until the device rings an interrupt bell; a Priority Interrupt system (daisy-chain, parallel hardware, or software polling) ensures urgent devices like power-fail get served first. Still, the CPU handles every single word.',
      'For fast bulk transfers (like disks), Direct Memory Access (DMA) removes the CPU from the data path! The DMA Controller has 3 internal registers programmed by the CPU: Address Register (where in RAM), Word-Count Register (how many words), and Control Register (Read/Write).',
      'When the device is ready, DMA sends Bus Request (BR) to the CPU. The CPU finishes its bus cycle, tri-states its buses, and replies Bus Grant (BG). DMA then moves words directly between Device and Memory (via Cycle Stealing or Burst Mode), incrementing Address and decrementing Word Count until 0—then fires ONE completion Interrupt to the CPU!',
    ],
    analogy: {
      title: 'Boiling Water vs Kitchen Timer vs Hiring Movers',
      body: 'Programmed I/O = staring at a pot waiting for it to boil. Interrupt I/O = setting a timer and working until it beeps for each cup. DMA = telling movers the address and box count, then getting one call when the whole truck is unloaded!',
    },
    terms: [
      { term: 'Priority Interrupt', meaning: 'Services highest-priority simultaneous request first (daisy-chain, parallel, or polling).' },
      { term: 'DMA Controller Registers', meaning: 'Address Register (increments), Word-Count Register (decrements), Control Register (R/W).' },
      { term: 'BR & BG', meaning: 'Bus Request (DMA → CPU) and Bus Grant (CPU → DMA, CPU puts buses in high-impedance).' },
      { term: 'Cycle Stealing vs Burst', meaning: 'Cycle stealing takes 1 bus cycle per word; burst mode transfers the whole block continuously.' },
    ],
    workedExample: {
      title: 'The 6-Step DMA Operation Checklist (for 10M Q.3c)',
      steps: [
        '1. CPU initializes Address, Word Count, and Control registers (via DS & RS).',
        '2. Device requests DMA → Controller asserts Bus Request (BR) to CPU.',
        '3. CPU tri-states buses and replies Bus Grant (BG).',
        '4. DMA drives memory bus directly (Device ↔ RAM).',
        '5. After each word: Address++, Word Count−−.',
        '6. When Word Count = 0: drop BR, return bus to CPU, send Interrupt!',
      ],
      takeaway: 'DMA is the #1 superstar of Unit V—it appears in 5M Q.2(a), 10M Q.3(b), AND 10M Q.3(c)! Know the diagram and all 6 steps.',
    },
    diagram: {
      src: '/diagrams/image33.png',
      caption: 'Block diagram of a Direct Memory Access (DMA) controller',
    },
    linkedQuestionIds: ['u5_2m_1b', 'u5_5m_2a', 'u5_10m_3b', 'u5_10m_3c'],
  },
  {
    id: 'l5-3',
    unit: 5,
    order: 3,
    title: 'Memory Hierarchy, Main Memory & Auxiliary Memory',
    estimatedMinutes: 7,
    prerequisiteIds: ['l1-1'],
    bigIdea:
      'Fast memory is expensive and tiny; huge memory is cheap and slow. Computers stack memories in a 5-level Pyramid so you get the illusion of huge, fast, affordable memory all at once!',
    plainEnglish: [
      'Moving UP the Memory Hierarchy (toward the CPU: Tertiary Tape → Secondary HDD/SSD → Main RAM → Cache SRAM → CPU Registers), memory gets faster, smaller, and costlier per bit. Moving DOWN, it gets slower, larger, and cheaper per bit.',
      'Main Memory (RAM & ROM) sits directly on the CPU bus for nanosecond random access—RAM is volatile (loses data on power-off) and holds active programs; ROM is non-volatile (holds bootstrap loader). Larger RAM is built by combining 2ᵐ × n chips using a decoder on high address bits for Chip Select (CS).',
      'Auxiliary (Secondary) Memory (HDD, SSD, Magnetic Tape) connects via I/O or DMA, is non-volatile, holds terabytes cheaply, and stores files long-term. On a magnetic disk, Access Time = Seek Time (move head to track) + Rotational Latency (spin sector under head) + Transfer Time.',
    ],
    analogy: {
      title: 'Hands, Desk, Bookshelf & Basement Archive',
      body: 'Registers = notes in your hand. Cache = open notebook on your desk. Main Memory = books stacked beside you. Auxiliary Disk = huge library down the hall. Tape = basement archive boxes!',
    },
    terms: [
      { term: 'Memory Hierarchy', meaning: 'Registers → Cache → Main Memory (DRAM) → Secondary (SSD/HDD) → Tertiary (Tape).' },
      { term: 'Chip Select (CS)', meaning: 'High-order address bits pass through a decoder to enable one specific RAM/ROM chip.' },
      { term: 'Disk Access Time', meaning: 'Seek time (track) + Rotational latency (sector) + Transfer time. Aligned tracks = Cylinder.' },
      { term: 'Volatility', meaning: 'RAM is volatile (loses data without power); ROM and Auxiliary memory are non-volatile.' },
    ],
    workedExample: {
      title: 'Compare Main vs Auxiliary on the 5 Exam Parameters',
      steps: [
        'Speed: ns (Main) vs ms HDD / µs SSD (Auxiliary).',
        'Capacity: GBs vs TBs. Cost/bit: High vs Low.',
        'Access: Random & CPU-direct vs Sequential/block via I/O or DMA.',
        'Retention: RAM volatile (ROM non-volatile) vs Always non-volatile.',
      ],
      takeaway: 'Main vs Auxiliary memory appears in 2M Q.1(c), 5M Q.2(h), AND 10M Q.3(a)—that 5-parameter table is guaranteed exam gold!',
    },
    diagram: {
      src: '/diagrams/image37.png',
      caption: 'The 5-level Memory Hierarchy pyramid',
    },
    linkedQuestionIds: ['u5_2m_1c', 'u5_5m_2e', 'u5_5m_2h', 'u5_10m_3a'],
  },
  {
    id: 'l5-4',
    unit: 5,
    order: 4,
    title: 'Cache Memory Organization & Associative Memory (CAM)',
    estimatedMinutes: 8,
    prerequisiteIds: ['l5-3'],
    bigIdea:
      'Cache puts a tiny ultra-fast SRAM shortcut right next to the CPU by exploiting Locality of Reference. Associative Memory (CAM) searches EVERY word in parallel by CONTENT rather than address—making tag lookups instant!',
    plainEnglish: [
      'Programs don’t jump randomly through memory—they show Locality of Reference: Temporal locality (you reuse the same variable/loop again soon) and Spatial locality (you access nearby array items next). Cache keeps copies of active blocks + address Tags in fast SRAM.',
      'Three Cache Mapping methods decide where a RAM block can sit: Direct (1 fixed cache line: block mod lines), Fully Associative (any line, tags searched in parallel), and Set-Associative (maps to a small set, any line inside it). When full, Replacement policies (LRU, FIFO, Random) evict a block, and Write policies (Write-Through vs Write-Back) keep RAM updated.',
      'Associative Memory (Content-Addressable Memory, CAM) looks up data by WHAT IT CONTAINS, not its address! It uses three registers: Argument Register A (what you search for), Key Register K (mask: only bits where K=1 are compared!), and Match Register M (sets Mi = 1 if word i matches). Every cell has an XNOR match circuit: xj = Aj·Fij + Aj’·Fij’, and Mi = ∏(xj + Kj’).',
    ],
    analogy: {
      title: 'Phone Contacts Search vs Index Number',
      body: 'Normal RAM is asking "Who is entry #47?" Associative Memory (CAM) is shouting "Everyone whose first 3 digits are 101, raise your hand RIGHT NOW!"—and all matching rows raise their M flag simultaneously!',
    },
    terms: [
      { term: 'Locality of Reference', meaning: 'Temporal (reuse recent items) and Spatial (use nearby addresses) — why caches work!' },
      { term: 'Hit Ratio (h) & AMAT', meaning: 'Fraction of accesses found in cache; key uses T_avg = h·tc + (1 − h)·tm.' },
      { term: 'Argument (A), Key (K), Match (M)', meaning: 'A = search pattern, K = bit mask (1=compare, 0=ignore), M = 1-bit flag per word.' },
      { term: 'Match Equation', meaning: 'xj = XNOR(Aj, Fij); word matches if Mi = ∏(xj + Kj’) = 1.' },
    ],
    workedExample: {
      title: 'Associative Memory Mask Check (Q.3d)',
      steps: [
        'Argument A = 101 111100, Key mask K = 111 000000 → ONLY compare the first 3 bits (ignore last 6)!',
        'Word 1 = 100 111100 → first 3 bits are 100 ≠ 101 → M1 = 0 (No match).',
        'Word 2 = 101 000001 → first 3 bits are 101 == 101 → M2 = 1 (MATCH, even though last 6 bits differ!).',
      ],
      takeaway: 'Remember: wherever Key bit Kj = 0, Kj’ = 1, so (xj + Kj’) is automatically 1—that is the exact Boolean trick that masks out ignored bits!',
    },
    diagram: {
      src: '/diagrams/image40.png',
      caption: 'Block diagram of Associative Memory (Content-Addressable Memory)',
    },
    linkedQuestionIds: ['u5_2m_1f', 'u5_5m_2d', 'u5_10m_3d'],
    linkedNumericalIds: ['num-cache-amat'],
  },
];

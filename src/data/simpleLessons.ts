import type { SimpleLessonGuide } from '../types';

export const SIMPLE_LESSONS: Record<string, SimpleLessonGuide> = {
  'l1-1': {
    lessonId: 'l1-1',
    plainSummary: [
      'A computer only does four basic jobs: take info IN, remember it in MEMORY, process it in the CPU, and send answers OUT.',
      'Think of "Architecture" as the menu of commands a programmer sees. Think of "Design (Organization)" as the kitchen wiring hidden behind the wall that actually cooks those commands.',
    ],
    unfamiliarTerms: [
      { term: 'Instruction Set', plain: 'The list of basic commands (like ADD, LOAD, JUMP) that a CPU understands.' },
      { term: 'Registers', plain: 'Tiny, ultra-fast scratchpad boxes sitting right inside the CPU.' },
      { term: 'Control Signals', plain: 'Tiny electrical "go" or "wait" pulses sent from the Control Unit to coordinate parts.' },
    ],
    everydayAnalogy:
      'A smartphone screen (Architecture) lets you tap "Call" or "Camera" the same way on two different models, even though the battery and chips inside (Design) are completely different.',
  },
  'l1-2': {
    lessonId: 'l1-2',
    plainSummary: [
      'Inside a chip, wires only know OFF (0) and ON (1). Long rows of 0s and 1s are hard for humans to read, so we pack 4 bits into 1 Hex digit or 3 bits into 1 Octal digit.',
      'Special codes just change the rules for specific jobs: BCD keeps each decimal digit separate (easy for displays), Excess-3 adds 3 to each digit (handy for subtraction), Gray flips only 1 bit per step (fewer sensor mistakes), and ASCII assigns a number to every keyboard letter.',
    ],
    unfamiliarTerms: [
      { term: 'Weighted Code', plain: 'Each bit spot has a fixed value (like 8, 4, 2, 1 in BCD) that you add up.' },
      { term: 'Self-Complementing', plain: 'Flipping all 0s and 1s automatically gives the 9’s complement (like Excess-3).' },
      { term: 'Parity Bit', plain: 'One extra bit tacked on to make the count of 1s even (or odd) so transmission errors get caught.' },
    ],
    everydayAnalogy:
      'Hex is like counting eggs by the dozen instead of saying "1, 1, 1, 1..." — same eggs, much shorter label!',
    calcWalkthrough: {
      title: 'Quick 3-step trick: Hex F3 to Octal',
      steps: [
        'Step 1: Expand each hex digit into 4 bits → F = 1111, 3 = 0011 → 11110011.',
        'Step 2: Group the EXACT same bits in 3s starting from the right → 011 | 110 | 011.',
        'Step 3: Read each 3-bit group as an octal digit (0–7) → 3, 6, 3 → (363)₈!',
      ],
    },
  },
  'l1-3': {
    lessonId: 'l1-3',
    plainSummary: [
      'Logic gates are tiny electronic decision-makers: AND says "both must be ON", OR says "at least one ON", NOT says "do the opposite".',
      'A Flip-Flop is a tiny 1-bit memory switch that remembers a 0 or 1 until a clock tick tells it to update. Put 16 flip-flops in a row and you have a 16-bit Register.',
    ],
    unfamiliarTerms: [
      { term: 'Universal Gate', plain: 'A gate (NAND or NOR) so versatile you can build every other logic gate out of it.' },
      { term: 'Clock Edge', plain: 'The exact beat when the system’s heartbeat pulse switches from 0 to 1, telling registers to save new data.' },
      { term: 'Load Enable', plain: 'A permission switch: if OFF, the register ignores incoming data and keeps what it already has.' },
    ],
    everydayAnalogy:
      'A logic gate is like a motion-sensor hallway light (reacts right now). A flip-flop is like a clicky wall switch (stays ON even after you take your finger away).',
  },
  'l1-4': {
    lessonId: 'l1-4',
    plainSummary: [
      'Instead of building both an Adder and a Subtractor, computers turn subtraction into addition using 2’s complement: flip all bits of the second number, add 1, then add it to the first number!',
      'For decimal points: Fixed-point pins the dot in one spot (fast and simple, small range). Floating-point moves the dot using an exponent just like scientific notation (huge range, tiny rounding errors).',
    ],
    unfamiliarTerms: [
      { term: 'Radix (Base r)', plain: 'How many digits a number system uses (base 2 for binary, base 10 for decimal).' },
      { term: 'Mantissa / Fraction', plain: 'The significant digits part of a floating-point number (like 1.0101 in 1.0101 × 2³).' },
      { term: 'Biased Exponent', plain: 'We add +127 to the real exponent in 32-bit floats so even negative exponents look like positive binary numbers.' },
    ],
    everydayAnalogy:
      'Fixed-point is writing money strictly as dollars and cents ($12.50). Floating-point is writing astronomy distances like 1.5 × 10⁸ km so you don’t write twenty zeros.',
    calcWalkthrough: {
      title: "One-step-at-a-time: 2's Complement of 0110",
      steps: [
        'Step 1: Start with the 4-bit binary number 0110 (decimal 6).',
        "Step 2: Flip every bit (0→1, 1→0) to get 1's complement → 1001.",
        "Step 3: Add 1 to the rightmost bit → 1001 + 1 = 1010 (that's −6 in 4-bit 2's complement!).",
        'Step 4: To compute 13 − 6 (1101 − 0110), add 1101 + 1010 = 1 0111. Drop the extra carry 1 → 0111 = +7!',
      ],
    },
  },
  'l2-1': {
    lessonId: 'l2-1',
    plainSummary: [
      'A combinational circuit has ZERO memory: give it the same inputs, and it always gives the same output immediately.',
      'To make one 4-bit circuit do BOTH addition and subtraction, put an XOR gate on every B wire controlled by one switch M. M = 0 passes B straight through (A + B); M = 1 flips B and feeds +1 into carry-in (A + B’ + 1 = A − B)!',
    ],
    unfamiliarTerms: [
      { term: 'Truth Table', plain: 'A complete list of every possible 0/1 input combo and the output you want.' },
      { term: 'K-Map (Karnaugh Map)', plain: 'A visual grid shortcut for shrinking a big Boolean equation so you need fewer gates.' },
      { term: 'Ripple-Carry', plain: 'Each Full Adder passes its carry-out into the carry-in of the next adder down the line.' },
    ],
    everydayAnalogy:
      'Think of a vending machine that gives you the exact snack for the button you press right now—it doesn’t care what the person before you bought (combinational!).',
    calcWalkthrough: {
      title: 'Step-by-step: Adder-Subtractor doing 6 − 3 (M = 1)',
      steps: [
        'Step 1: Inputs are A = 0110 (6), B = 0011 (3), and Mode M = 1 (subtract).',
        'Step 2: Because M = 1, the XOR gates flip every bit of B → B’ = 1100.',
        'Step 3: Mode M = 1 also feeds C0 = 1 into the first Full Adder, so the circuit computes 0110 + 1100 + 1.',
        'Step 4: Sum = 1 0011. Discard the carry-out 1 → Result = 0011 (+3)!',
      ],
    },
  },
  'l2-2': {
    lessonId: 'l2-2',
    plainSummary: [
      'Four handy LEGO bricks show up everywhere in CPUs: a MUX picks 1 of several inputs to pass forward; a Decoder lights up 1 specific wire from a binary number; an Encoder converts 1 lit button back into a binary number; a Comparator checks if A is bigger, equal, or smaller than B.',
      'When comparing 2-bit numbers (A1A0 vs B1B0), always look at the bigger (left) digits first—just like checking the tens digit of 42 vs 39!',
    ],
    unfamiliarTerms: [
      { term: 'Select Lines', plain: 'The control bits on a MUX that act like a channel number telling it which input to pick.' },
      { term: 'Minterm', plain: 'A single AND term that equals 1 for exactly ONE specific row of the truth table.' },
      { term: 'Priority Encoder', plain: 'An encoder that picks the highest-priority input if two buttons are pressed at the same moment.' },
    ],
    everydayAnalogy:
      'Comparing two 2-bit numbers is like comparing ₹21 and ₹13: you look at the left digit (2 vs 1) first—you only peek at the right digit if the left digits tie!',
  },
  'l2-3': {
    lessonId: 'l2-3',
    plainSummary: [
      'Looping two NOR gates back into each other traps a bit so the circuit can remember—that is an S-R Latch! S sets Q to 1, R resets Q to 0, 00 holds memory, and 11 is forbidden.',
      'Adding a Clock turns it into a Clocked S-R Flip-Flop so every bit in the computer changes in lockstep instead of racing unpredictably.',
    ],
    unfamiliarTerms: [
      { term: 'Level-Sensitive vs Edge-Triggered', plain: 'Level-sensitive reacts the whole time the enable is ON; edge-triggered updates only at the crisp instant the clock ticks.' },
      { term: 'Indeterminate / Invalid State', plain: 'S = 1 and R = 1 at the same time forces both Q and Q’ to 0, breaking the rule that they must be opposites.' },
      { term: 'State Diagram', plain: 'A map of circles (remembered states) and arrows (what happens when a 0 or 1 input arrives).' },
    ],
    everydayAnalogy:
      'An S-R Latch is like a seesaw with a "Push Left" (Set) and "Push Right" (Reset) button—don’t push both sides down at once!',
  },
  'l2-4': {
    lessonId: 'l2-4',
    plainSummary: [
      'A Shift Register is a line of flip-flops passing bits from neighbor to neighbor on every clock tick (like a bucket brigade).',
      'A Counter counts clock ticks in binary (000 → 001 → 010 → … → 111). In a Ripple Counter, each flip-flop pokes the next one (simple, but lags). In a Synchronous Counter, every flip-flop shares the same clock wire so all bits flip together cleanly.',
    ],
    unfamiliarTerms: [
      { term: 'Toggle (J = K = 1)', plain: 'Flip the stored bit to its opposite (0→1 or 1→0) on the clock tick.' },
      { term: 'Modulo-N (Mod-8)', plain: 'How many unique numbers a counter cycles through before wrapping back to 0 (3 bits = 2³ = 8).' },
      { term: 'Glitch', plain: 'A tiny brief wrong output flicker that happens in ripple counters while bits are still catching up.' },
    ],
    everydayAnalogy:
      'A shift register is a sushi conveyor belt—every clock tick moves every plate one seat to the right.',
  },
  'l3-1': {
    lessonId: 'l3-1',
    plainSummary: [
      'Register Transfer Language (RTL) is just clean math-style shorthand: R2 ← R1 means "copy R1 into R2." Put P: in front and it means "only do it when signal P is 1."',
      'Because wiring every register to every other register would create a nightmare tangle, CPUs connect all registers to ONE shared Common Bus using multiplexers.',
    ],
    unfamiliarTerms: [
      { term: 'Tri-State Buffer', plain: 'An electronic gate that can output 0, 1, or "disconnected" (high-impedance) so only one device talks on a shared wire at a time.' },
      { term: 'M[AR]', plain: 'Shorthand for "the memory word sitting at the address currently stored inside register AR."' },
    ],
    everydayAnalogy:
      'A Common Bus is like a walkie-talkie channel: everyone listens, select lines pick ONE speaker at a time, and LD picks which listener writes the message down.',
  },
  'l3-2': {
    lessonId: 'l3-2',
    plainSummary: [
      'Every big CPU command is built out of tiny 1-clock actions called micro-operations: Arithmetic (add/sub/inc), Logic (bit-by-bit AND/OR/XOR), and Shifts (slide bits left or right).',
      'Logic operations are great for editing specific bits without touching the rest (masking with AND, turning bits ON with OR, flipping bits with XOR).',
    ],
    unfamiliarTerms: [
      { term: 'Masking (AND)', plain: 'Using a pattern of 1s (keep) and 0s (erase) with AND to filter out unwanted bits.' },
      { term: 'ashr (Arithmetic Shift Right)', plain: 'Shifts bits right while copying the leftmost sign bit so negative numbers stay negative when divided by 2.' },
      { term: 'cil / cir', plain: 'Circular shift: the bit pushed off one end wraps around and enters the other end.' },
    ],
    everydayAnalogy:
      'Selective-Clear is like using correction tape on only the exact letters you mark with a 1, leaving every other letter untouched.',
  },
  'l3-3': {
    lessonId: 'l3-3',
    plainSummary: [
      'In the Basic Computer, every instruction is 16 bits long: 1 mode bit (I), 3 opcode bits (the command), and 12 address bits (pointing to 1 of 4096 memory slots).',
      'Just check the 3-bit opcode: 000–110 means it talks to Memory (AND, ADD, LDA, STA, BUN, BSA, ISZ). If the opcode is 111, check bit I: I = 0 means a Register command (like Clear AC), and I = 1 means Input/Output!',
    ],
    unfamiliarTerms: [
      { term: 'Accumulator (AC)', plain: 'The CPU’s main working register where math answers collect.' },
      { term: 'Program Counter (PC)', plain: 'A bookmark holding the memory address of the NEXT instruction to fetch.' },
      { term: 'Indirect Address (I = 1)', plain: 'The address in the instruction doesn’t hold the data itself—it holds the address where the real data is hiding.' },
    ],
    everydayAnalogy:
      'Think of a 16-bit instruction like a postal label: 3 bits say "what to do" (Deliver/Pick up), 1 bit says "direct or forwarded?", and 12 bits give the street address.',
  },
  'l3-4': {
    lessonId: 'l3-4',
    plainSummary: [
      'The CPU repeats one calm rhythm for every instruction using clock steps T0, T1, T2…: Fetch the instruction from memory (T0–T1), Decode what it asks (T2), Grab the real address if indirect (T3), Execute it, then reset the counter to 0.',
      'Hardwired Control builds this rhythm out of fixed logic gates (super fast, hard to change). Microprogrammed Control stores the rhythm like a small script in ROM (easy to update, slightly slower).',
    ],
    unfamiliarTerms: [
      { term: 'Sequence Counter (SC)', plain: 'A small counter ticking T0, T1, T2, T3… so the CPU knows which step of the instruction it is on.' },
      { term: 'RISC vs CISC', plain: 'RISC = small, simple, fast instructions (fits Hardwired); CISC = large, rich instructions (fits Microprogrammed).' },
    ],
    everydayAnalogy:
      'Fetch–Decode–Execute is cooking from a recipe card: pick up the card (Fetch), read what it says (Decode), do the step (Execute), then move your finger to the next line!',
  },
  'l4-1': {
    lessonId: 'l4-1',
    plainSummary: [
      'In a microprogrammed CPU, every normal instruction runs a tiny hidden script (microprogram) stored inside a fast ROM called Control Memory.',
      'Address Sequencing is simply how the CPU decides which line of that hidden ROM script to run next: go to the next line (CAR + 1), jump to a branch address, map a new opcode to its starting line, or call/return from a reusable helper routine.',
    ],
    unfamiliarTerms: [
      { term: 'Control Address Register (CAR)', plain: 'Like a tiny Program Counter specifically for the hidden ROM control memory.' },
      { term: 'Subroutine Register (SBR)', plain: 'Remembers the ROM line to return to after finishing a shared mini-routine (like indirect address fetch).' },
      { term: 'Mapping', plain: 'A quick hardware wiring trick that turns an instruction’s opcode bits directly into its ROM starting address (0 xxxx 00).' },
    ],
    everydayAnalogy:
      'Address sequencing is your finger moving down a checklist: normally move down 1 line, sometimes skip to line 12 if a box is checked, or flip to the appendix and come back using a sticky note (SBR).',
  },
  'l4-2': {
    lessonId: 'l4-2',
    plainSummary: [
      'Addressing Modes are simply the different shortcuts an instruction uses to locate its number (the Effective Address): right inside the instruction (Immediate), at a fixed RAM spot (Direct), via a pointer (Indirect), relative to PC (Relative), or offset by an array index (Indexed).',
      'Program Control instructions (Branch, Jump, Call, Return) let programs make decisions and repeat loops by changing the Program Counter based on status flags (Zero, Carry, Sign, Overflow).',
    ],
    unfamiliarTerms: [
      { term: 'Effective Address (EA)', plain: 'The final calculated RAM location where the CPU actually fetches or stores the data.' },
      { term: 'Status Flags (C, S, Z, V)', plain: 'Four 1-bit indicator lights (Carry, Sign, Zero, Overflow) updated after math or CMP instructions.' },
      { term: 'Stack Linkage (CALL/RET)', plain: 'CALL saves the return PC on the stack before jumping to a function; RET pops it back when done.' },
    ],
    everydayAnalogy:
      'Immediate mode is carrying ₹500 cash in your pocket. Direct mode is knowing it’s in drawer #500. Indexed mode is counting "drawer #500 plus 100 drawers down" to reach an array element.',
    calcWalkthrough: {
      title: 'Quick step-by-step: LOAD 500 (PC = 202, XR = 100, M[500]=800, M[800]=300)',
      steps: [
        'Immediate: No memory lookup! AC gets 500 straight from the instruction.',
        'Direct: EA = 500 → read M[500] → AC gets 800.',
        'Indirect: Read pointer M[500] = 800 → then read M[800] → AC gets 300.',
        'Relative: EA = PC + 500 = 202 + 500 = 702 → AC gets M[702].',
        'Indexed: EA = XR + 500 = 100 + 500 = 600 → AC gets M[600].',
      ],
    },
  },
  'l4-3': {
    lessonId: 'l4-3',
    plainSummary: [
      'In signed-magnitude format, we keep the +/− sign separate from the positive size. If two numbers have the SAME sign, just add their sizes. If they have DIFFERENT signs, subtract their sizes using EA ← A + B’ + 1.',
      'The carry bit E tells us who was bigger: E = 1 means A was bigger (keep A and its sign!). E = 0 means B was bigger (flip A using 2’s complement and flip A’s sign!). For subtraction A − B, just flip B’s sign first and reuse the exact same steps!',
    ],
    unfamiliarTerms: [
      { term: 'As ⊕ Bs', plain: 'XOR of the two sign bits: gives 0 if signs match (add), or 1 if signs differ (subtract).' },
      { term: 'End-Carry E', plain: 'The extra carry bit popping out of the magnitude adder—tells us whether |A| ≥ |B| (E=1) or |A| < |B| (E=0).' },
    ],
    everydayAnalogy:
      'Think of bank credits (+) and debits (−): two credits add together; a credit and a debit cancel out, and whichever was larger decides if your balance is positive or negative!',
    calcWalkthrough: {
      title: 'Step-by-step: (+14) − (+15)',
      steps: [
        'Step 1: Subtraction flips B’s sign (+15 becomes −15). Now signs differ (As=0, Bs=1) → subtract magnitudes.',
        'Step 2: B = 01111 → B’ = 10000. Compute EA = 01110 + 10000 + 1 = 11111 (no carry, so E = 0).',
        'Step 3: Because E = 0 (|14| < |15|), take 2’s complement of 11111 → 00001, and flip sign As → 1 (−).',
        'Step 4: Final answer = 1 00001 = −1!',
      ],
    },
  },
  'l4-4': {
    lessonId: 'l4-4',
    plainSummary: [
      'Booth’s Algorithm multiplies positive AND negative 2’s-complement numbers using ONE clean loop without stripping signs! Line up AC (starts at 00000), QR (multiplier), and one helper bit Qn+1 (starts at 0).',
      'Look at the two rightmost bits (Qn, Qn+1): 10 → subtract BR from AC; 01 → add BR to AC; 00 or 11 → do nothing! Then ALWAYS do an Arithmetic Shift Right (keeping AC’s leftmost sign bit!) and repeat n times.',
    ],
    unfamiliarTerms: [
      { term: 'Multiplicand (BR) & Multiplier (QR)', plain: 'The two numbers being multiplied (BR × QR). Write down −BR before you begin!' },
      { term: 'Helper Bit Qn+1', plain: 'One extra bit sitting to the right of QR (starts at 0) so Booth’s can spot the start (10) and end (01) of runs of 1s.' },
      { term: 'ashr (Arithmetic Shift Right)', plain: 'Shifts AC, QR, Qn+1 right by 1 bit while copying AC’s leftmost sign bit so the sign is preserved.' },
    ],
    everydayAnalogy:
      'Multiplying by 99 is faster as (×100 − ×1) than adding 99 times. Booth’s does the exact same binary shortcut on strings of 1s!',
    calcWalkthrough: {
      title: "First 2 cycles of Booth's (−9) × (+13)",
      steps: [
        'Setup: BR = 10111 (−9), −BR = 01001 (+9), QR = 01101 (+13), AC = 00000, Qn+1 = 0, SC = 5.',
        'Cycle 1: Last bits (Qn Qn+1) = 10 → AC ← 00000 + 01001 = 01001 → ashr gives AC=00100, QR=10110, Qn+1=1 (SC=4).',
        'Cycle 2: Last bits = 01 → AC ← 00100 + 10111 = 11011 → ashr (keep leading 1!) gives AC=11101, QR=11011, Qn+1=0 (SC=3).',
        'Continue 3 more cycles until SC = 0 → final AC QR = 11100 01011 = −117!',
      ],
    },
  },
  'l5-1': {
    lessonId: 'l5-1',
    plainSummary: [
      'A CPU and a printer don’t share a clock, so they use control wires to time data transfers. Strobe uses just 1 wire ("take this now!"), so the sender never truly knows if the receiver got it.',
      'Handshaking adds a 2nd reply wire so both sides confirm every word: Up (send) → Up (got it!) → Down (done sending) → Down (ready for next). Slow and fast devices can safely talk without dropping a single byte.',
    ],
    unfamiliarTerms: [
      { term: 'Asynchronous', plain: 'Running on independent clocks instead of marching to one shared clock pulse.' },
      { term: 'Data Valid / Data Accepted', plain: 'The two handshake wires when the sender (source) starts the transfer.' },
      { term: 'Ready for Data / Data Valid', plain: 'The two handshake wires when the receiver (destination) asks for data first.' },
    ],
    everydayAnalogy:
      'Strobe is yelling across a noisy room hoping your friend heard you. Handshaking is saying "Catch!" and waiting until they shout back "Got it!" before throwing the next ball.',
  },
  'l5-2': {
    lessonId: 'l5-2',
    plainSummary: [
      'There are three ways to move data between an I/O device and RAM: Programmed I/O makes the CPU stare at the device nonstop; Interrupt I/O lets the CPU work until the device taps it for each word; DMA hires a helper chip (DMA Controller) to move whole blocks directly into RAM while the CPU works undisturbed!',
      'The CPU only tells the DMA Controller three things—starting RAM address, word count, and read/write—then gets one notification interrupt when the entire job is done.',
    ],
    unfamiliarTerms: [
      { term: 'Polling', plain: 'The CPU repeatedly checking a device’s status bit in a loop ("Are you ready yet?").' },
      { term: 'High-Impedance State', plain: 'The CPU electrically detaches from the bus wires so the DMA controller can drive them safely.' },
      { term: 'Cycle Stealing', plain: 'DMA borrows just 1 memory bus cycle at a time to transfer a word, barely slowing the CPU.' },
    ],
    everydayAnalogy:
      'DMA is setting up an automatic bank transfer instead of walking to the bank counter one rupee at a time.',
  },
  'l5-3': {
    lessonId: 'l5-3',
    plainSummary: [
      'Super-fast memory is expensive and small; giant memory is cheap and slow. So computers build a 5-layer pyramid: tiny blazing-fast Registers & Cache at the top, medium Main Memory (RAM) in the middle, and massive permanent Secondary/Tertiary storage (SSD/HDD/Tape) at the bottom.',
      'Main memory talks straight to the CPU (fast, volatile RAM). Auxiliary memory talks through I/O or DMA (slower, permanent non-volatile storage).',
    ],
    unfamiliarTerms: [
      { term: 'Volatile vs Non-Volatile', plain: 'Volatile (RAM) forgets everything when power turns off; Non-volatile (ROM, SSD, HDD) remembers without power.' },
      { term: 'Random Access', plain: 'Jumping directly to any memory address takes the exact same time, unlike rewinding a tape.' },
      { term: 'Seek Time & Latency', plain: 'On a spinning disk: Seek = moving the arm to the right ring (track); Latency = waiting for the slice (sector) to spin underneath.' },
    ],
    everydayAnalogy:
      'Your jacket pocket (Cache) holds your keys for instant reach; your backpack (RAM) holds today’s textbooks; your home closet (Disk) holds everything else permanently.',
  },
  'l5-4': {
    lessonId: 'l5-4',
    plainSummary: [
      'Cache works because programs are predictable: if you used a piece of data just now, you’ll probably use it again soon (temporal locality) along with its neighbors (spatial locality). Keeping those blocks in fast SRAM next to the CPU slashes wait time!',
      'Associative Memory (CAM) skips addresses altogether: you give it a search pattern (A) and a mask (K) saying which bits matter, and every stored row checks itself in parallel in one single step!',
    ],
    unfamiliarTerms: [
      { term: 'Hit Ratio (h)', plain: 'The fraction of memory lookups found right inside the fast cache (e.g. 0.9 = 90% hits!).' },
      { term: 'Tag', plain: 'A tiny address label stored beside each cache block so the CPU knows which RAM block is sitting there.' },
      { term: 'Key Register (K)', plain: 'A bit-mask in Associative Memory: 1 means "must match this bit", 0 means "don’t care, ignore this bit".' },
    ],
    everydayAnalogy:
      'Cache is keeping your 5 most-used spices right next to the stove instead of walking to the pantry every minute. Associative memory is shouting a name in a room and having the right person immediately stand up!',
    calcWalkthrough: {
      title: 'Step-by-step: Cache Average Access Time (h = 0.9, tc = 10 ns, tm = 100 ns)',
      steps: [
        'Step 1: 90% of lookups hit the cache → 0.9 × 10 ns = 9 ns.',
        'Step 2: Remaining 10% (1 − 0.9 = 0.1) miss and go to main memory → 0.1 × 100 ns = 10 ns.',
        'Step 3: Add them (using the answer-key formula h·tc + (1−h)·tm) → 9 + 10 = 19 ns (compared to 100 ns with no cache!).',
        'Step 4: Quick exam check — if sequential lookup tc + (1−h)·tm is assumed, you pay 10 ns first on every lookup, giving 10 + 10 = 20 ns.',
      ],
    },
  },
};

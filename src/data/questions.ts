import type { StudyQuestion, UnitMeta } from '../types';

export const UNITS: UnitMeta[] = [
  {
    unit: 1,
    roman: 'I',
    title: 'Digital Computers, Number Systems and Codes',
    shortTitle: 'Number Systems & Codes',
    tagline: 'Binary, Hex, BCD, Excess-3, Gray, Complements, Logic Gates & Data Types',
    colorClass: 'teal',
  },
  {
    unit: 2,
    roman: 'II',
    title: 'Combinational and Sequential Circuits',
    shortTitle: 'Combinational & Sequential',
    tagline: 'Adders, MUX, Decoders, Comparators, Latches, Flip-Flops, Shift Registers & Counters',
    colorClass: 'indigo',
  },
  {
    unit: 3,
    roman: 'III',
    title: 'Register Transfer, Micro-operations and Basic Computer Organization',
    shortTitle: 'RTL & Basic Computer',
    tagline: 'Common Bus, RTL, Micro-operations, Instruction Cycle & Hardwired vs Microprogrammed Control',
    colorClass: 'sky',
  },
  {
    unit: 4,
    roman: 'IV',
    title: 'Microprogrammed Control, CPU Organization and Computer Arithmetic',
    shortTitle: 'CPU & Arithmetic',
    tagline: 'Address Sequencing, Addressing Modes, Signed-Magnitude Add/Sub & Booth’s Multiplication',
    colorClass: 'violet',
  },
  {
    unit: 5,
    roman: 'V',
    title: 'Input-Output Organization and Memory Organization',
    shortTitle: 'I/O & Memory Systems',
    tagline: 'Strobe vs Handshaking, DMA, Interrupts, Memory Hierarchy, Cache & Associative Memory',
    colorClass: 'emerald',
  },
];

export const QUESTIONS: StudyQuestion[] = [
  {
    "id": "u1_2m_1a",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 2,
    "qNum": "Q.1(a)",
    "question": "Identify the type of binary code used to represent decimal digits and give one example.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Binary Coded Decimal (BCD) is the code used to represent decimal digits. Each decimal digit (0–9) is replaced by its own 4-bit binary equivalent (weights 8-4-2-1). Example: decimal 59 → 0101 1001 in BCD."
      }
    ],
    "hint": "Think of the 4-bit weighted code (8-4-2-1) where every decimal digit 0–9 gets its own 4 bits.",
    "outlinePoints": [
      "Name the code (BCD)",
      "Explain 4 bits per digit (weights 8-4-2-1)",
      "Give a quick 2-digit example like 59"
    ],
    "keywords": [
      "BCD"
    ],
    "isHighYield": false,
    "lessonId": "l1-2"
  },
  {
    "id": "u1_2m_1b",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 2,
    "qNum": "Q.1(b)",
    "question": "Convert the Hexadecimal number F3A7C2 to binary and octal.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Binary: replace each hex digit by 4 bits → F=1111, 3=0011, A=1010, 7=0111, C=1100, 2=0010 → 1111 0011 1010 0111 1100 0010."
      },
      {
        "type": "paragraph",
        "text": "Octal: regroup the same bits in 3s from the right → 111 100 111 010 011 111 000 010 = (74723702)₈."
      }
    ],
    "hint": "Each hex digit = 4 binary bits; then regroup those exact same bits in groups of 3 from the right for octal.",
    "outlinePoints": [
      "Convert each hex digit F, 3, A, 7, C, 2 into 4 bits",
      "Regroup the 24 bits into eight 3-bit octal groups from right to left",
      "Write the final octal digits"
    ],
    "keywords": [],
    "isHighYield": false,
    "lessonId": "l1-2",
    "numericalId": "num-hex-convert"
  },
  {
    "id": "u1_2m_1c",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 2,
    "qNum": "Q.1(c)",
    "question": "Represent Decimal number 8620 in BCD and excess-3 code.",
    "blocks": [
      {
        "type": "table",
        "headers": [
          "Digit",
          "8",
          "6",
          "2",
          "0"
        ],
        "rows": [
          [
            "BCD (8421)",
            "1000",
            "0110",
            "0010",
            "0000"
          ],
          [
            "Excess-3 (digit + 3)",
            "1011",
            "1001",
            "0101",
            "0011"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "BCD of 8620 = 1000 0110 0010 0000;   Excess-3 of 8620 = 1011 1001 0101 0011."
      }
    ],
    "hint": "BCD converts each digit 8, 6, 2, 0 to 4-bit binary; Excess-3 adds +3 to each digit first (11, 9, 5, 3).",
    "outlinePoints": [
      "Make a small 3-row table: Digit, BCD, Excess-3",
      "Convert 8, 6, 2, 0 to 4-bit BCD",
      "Add 3 to each digit and convert for Excess-3"
    ],
    "keywords": [
      "BCD",
      "Excess-3"
    ],
    "isHighYield": false,
    "lessonId": "l1-2",
    "numericalId": "num-bcd-ex3"
  },
  {
    "id": "u1_2m_1d",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 2,
    "qNum": "Q.1(d)",
    "question": "Draw the logic Diagram and state truth table of NAND gate.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image1.png",
        "caption": "Fig. NAND gate (AND followed by NOT)"
      },
      {
        "type": "table",
        "headers": [
          "A",
          "B",
          "Y = (A·B)'"
        ],
        "rows": [
          [
            "0",
            "0",
            "1"
          ],
          [
            "0",
            "1",
            "1"
          ],
          [
            "1",
            "0",
            "1"
          ],
          [
            "1",
            "1",
            "0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "The output is 0 only when both inputs are 1. NAND is a universal gate."
      }
    ],
    "hint": "NAND is an AND gate with a bubble (NOT) on the output. Output is 0 ONLY when both inputs are 1.",
    "outlinePoints": [
      "Draw the AND symbol with inversion bubble at output",
      "Write the 4-row truth table for A, B, and Y = (A·B)'",
      "Mention NAND is a universal gate"
    ],
    "keywords": [
      "NAND"
    ],
    "isHighYield": false,
    "lessonId": "l1-3"
  },
  {
    "id": "u1_2m_1e",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 2,
    "qNum": "Q.1(e)",
    "question": "Differentiate between Computer Design and Computer Architecture and explain how they are related in developing a computer system.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Computer architecture defines the attributes visible to the programmer – instruction set, addressing modes, data types and I/O mechanisms (the \"what\"). Computer design (organization) deals with the hardware implementation of that architecture – logic circuits, registers, control signals, memory technology (the \"how\")."
      },
      {
        "type": "paragraph",
        "text": "Relation: architecture is specified first; design then realises it in hardware. Many different designs (cost/speed trade-offs) can implement the same architecture."
      }
    ],
    "hint": "Architecture = 'what' the programmer sees (ISA, registers, addressing). Design/Organization = 'how' hardware builds it (circuits, control signals).",
    "outlinePoints": [
      "Define Computer Architecture (programmer-visible 'what')",
      "Define Computer Design/Organization (hardware 'how')",
      "Explain their relation (architecture first, multiple designs possible)"
    ],
    "keywords": [
      "Registers",
      "Addressing mode"
    ],
    "isHighYield": false,
    "lessonId": "l1-1"
  },
  {
    "id": "u1_2m_1f",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 2,
    "qNum": "Q.1(f)",
    "question": "How to perform subtraction operation in binary system explain with one example.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Binary subtraction is done either by the borrow method (0−0=0, 1−0=1, 1−1=0, 0−1=1 with borrow 1) or by adding the 2's complement of the subtrahend."
      },
      {
        "type": "paragraph",
        "text": "Example: 1101 − 0110 (13 − 6). 2's complement of 0110 = 1010. Then 1101 + 1010 = 1 0111; the end-carry is discarded, so the result is 0111 = 7."
      }
    ],
    "hint": "Two ways: direct borrow rules or add the 2's complement of the number being subtracted (discard end-carry).",
    "outlinePoints": [
      "State the two methods (borrow vs 2's complement addition)",
      "Work a short 4-bit example like 1101 − 0110 (13 − 6)",
      "Explain discarding the end-carry gives +7 (0111)"
    ],
    "keywords": [
      "2's complement",
      "CAR"
    ],
    "isHighYield": false,
    "lessonId": "l1-4",
    "numericalId": "num-bin-sub-2s"
  },
  {
    "id": "u1_5m_2a",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(a)",
    "question": "Explain the different types of complements used in Computer Organization and Architecture with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Complements are used to simplify subtraction (A − B becomes A + complement of B) and to represent negative numbers. For a number system of base r there are two types:"
      },
      {
        "type": "bullet",
        "text": "(r−1)'s complement (diminished radix complement): (r−1)'s complement of an n-digit number N = (rⁿ − 1) − N. For decimal it is the 9's complement; for binary it is the 1's complement (simply invert every bit)."
      },
      {
        "type": "bullet",
        "text": "r's complement (radix complement): r's complement of N = rⁿ − N = (r−1)'s complement + 1. For decimal it is the 10's complement; for binary it is the 2's complement."
      },
      {
        "type": "table",
        "headers": [
          "Number",
          "Complement",
          "Result"
        ],
        "rows": [
          [
            "546700 (decimal)",
            "9's complement",
            "453299"
          ],
          [
            "546700 (decimal)",
            "10's complement",
            "453300"
          ],
          [
            "1011001 (binary)",
            "1's complement",
            "0100110"
          ],
          [
            "1011001 (binary)",
            "2's complement",
            "0100111"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Subtraction M − N with r's complement: (i) add M to the r's complement of N; (ii) if an end-carry occurs, discard it – the result is positive; (iii) if no end-carry, the result is negative and equals the r's complement of the sum.  Example: 1010100 − 1000011 → 1010100 + 0111101 = 1 0010001 → discard carry → 0010001 (+17)."
      }
    ],
    "hint": "Remember base r has two complements: (r−1)'s (diminished radix: 9's/1's) and r's (radix: 10's/2's = diminished + 1).",
    "outlinePoints": [
      "Explain why complements are used (turn subtraction into addition)",
      "Define (r−1)'s and r's complements with formulas",
      "Show a table with decimal (9's/10's) and binary (1's/2's) examples",
      "State the 3-step subtraction rule (carry = positive, no carry = negative complement) + example"
    ],
    "keywords": [
      "2's complement",
      "1's complement",
      "9's complement",
      "10's complement",
      "CAR"
    ],
    "isHighYield": true,
    "lessonId": "l1-4",
    "highYieldGroup": "u1-complements"
  },
  {
    "id": "u1_5m_2b",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(b)",
    "question": "Analyze the functional block diagram of a digital computer and explain the role and interrelationship of its major functional units in processing data.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image2.png",
        "caption": "Fig. Functional block diagram of a digital computer"
      },
      {
        "type": "bullet",
        "text": "Input unit – accepts data and instructions from the user (keyboard, mouse) and converts them to binary."
      },
      {
        "type": "bullet",
        "text": "Memory unit – stores programs and data; main memory holds what is currently being executed, secondary storage keeps it permanently."
      },
      {
        "type": "bullet",
        "text": "ALU – performs arithmetic (+, −, ×, ÷) and logic (AND, OR, NOT, compare) operations."
      },
      {
        "type": "bullet",
        "text": "Control unit – fetches each instruction, decodes it and issues timing/control signals to all other units."
      },
      {
        "type": "bullet",
        "text": "Registers – small, fast storage inside the CPU (PC, IR, AC, AR) that hold operands, addresses and results."
      },
      {
        "type": "bullet",
        "text": "Output unit – converts binary results into a human-readable form (display, printer)."
      },
      {
        "type": "paragraph",
        "text": "Interrelationship: the control unit fetches an instruction from memory into the instruction register, decodes it, and directs the ALU to operate on operands brought from memory/registers; the result is stored back in a register or memory and finally sent to the output unit. The CPU = ALU + CU + registers."
      }
    ],
    "hint": "Six blocks: Input, Memory, ALU, Control Unit, Registers, Output. CPU = ALU + CU + Registers.",
    "outlinePoints": [
      "Draw the block diagram showing data paths vs control paths",
      "Give 1-line roles for Input, Memory, ALU, CU, Registers, Output",
      "Explain how they work together during fetch-decode-execute"
    ],
    "keywords": [
      "ALU",
      "Control Unit",
      "Registers",
      "Direct",
      "Fetch"
    ],
    "isHighYield": false,
    "lessonId": "l1-1"
  },
  {
    "id": "u1_5m_2c",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(c)",
    "question": "Explain the concept of binary storage and registers in a digital computer. Discuss their role in storing and transferring binary information with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Binary storage: a binary cell (one flip-flop) stores one bit, 0 or 1, and keeps it as long as power is applied. A register is a group of n flip-flops that stores an n-bit word; e.g. a 16-bit register holds 16 bits such as 1011 0001 1100 0110."
      },
      {
        "type": "image",
        "src": "/diagrams/image3.png",
        "caption": "Fig. A 4-bit register built from four D flip-flops"
      },
      {
        "type": "bullet",
        "text": "Storing: on a clock edge with the load input enabled, the parallel inputs I₃…I₀ are copied into the flip-flops; otherwise the contents are retained."
      },
      {
        "type": "bullet",
        "text": "Transferring: information moves between registers by register transfer, e.g. R2 ← R1 copies the contents of R1 into R2 (R1 is unchanged). Transfers can be parallel (all bits at once) or serial (shift registers)."
      },
      {
        "type": "bullet",
        "text": "Role: registers hold operands for the ALU, the address of the next instruction (PC), the current instruction (IR), intermediate results (AC) and I/O data."
      },
      {
        "type": "paragraph",
        "text": "Example: if R1 = 1010 and R2 = 0000, after the transfer R2 ← R1 on the clock pulse both registers contain 1010."
      }
    ],
    "hint": "One flip-flop stores 1 bit; a group of n flip-flops makes an n-bit register. Mention load, retain, and register transfer R2 ← R1.",
    "outlinePoints": [
      "Define binary cell (1 flip-flop = 1 bit) and register (n flip-flops)",
      "Draw a 4-bit register made of D flip-flops with Load & Clock",
      "Explain Storing vs Transferring (parallel/serial, R2 ← R1)",
      "List key CPU register roles (PC, IR, AC, AR) + quick example"
    ],
    "keywords": [
      "ALU",
      "Registers",
      "Flip-flop",
      "Shift register"
    ],
    "isHighYield": false,
    "lessonId": "l1-3"
  },
  {
    "id": "u1_5m_2d",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(d)",
    "question": "How are fractional numbers represented in fixed-point and floating-point formats? Explain both methods with suitable examples and highlight their differences.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Fixed-point: the binary point is at a fixed, implied position. A word has a sign bit, integer bits and fraction bits. Example: with 4 integer and 4 fraction bits, 0110.1010 = 4+2+0.5+0.125 = 6.625. Negative numbers use sign-magnitude, 1's or 2's complement."
      },
      {
        "type": "paragraph",
        "text": "Floating-point: a number is stored as ±m × rᵉ with a sign, a mantissa (fraction) and an exponent. In IEEE-754 single precision (32 bits): 1 sign bit, 8-bit biased exponent (bias 127), 23-bit fraction; value = (−1)ˢ × 1.f × 2^(e−127). Example: 10.5 = 1010.1₂ = 1.0101 × 2³ → s = 0, exponent = 3+127 = 130 = 10000010, fraction = 0101000…0."
      },
      {
        "type": "table",
        "headers": [
          "Point",
          "Fixed-point",
          "Floating-point"
        ],
        "rows": [
          [
            "Binary point",
            "Fixed position",
            "Moves (given by exponent)"
          ],
          [
            "Range",
            "Small",
            "Very large"
          ],
          [
            "Precision",
            "Constant",
            "Varies with magnitude"
          ],
          [
            "Hardware / speed",
            "Simple, fast",
            "Complex, slower"
          ],
          [
            "Typical use",
            "Embedded, DSP, banking",
            "Scientific computing"
          ]
        ]
      }
    ],
    "hint": "Fixed-point keeps the binary point at a fixed spot (simple, small range); floating-point uses sign + mantissa + exponent like scientific notation.",
    "outlinePoints": [
      "Explain fixed-point with an example like 0110.1010 = 6.625",
      "Explain floating-point (±m × r^e) and IEEE-754 single precision (1+8+23 bits) with 10.5",
      "Add a 5-row comparison table (point, range, precision, hardware, use)"
    ],
    "keywords": [
      "2's complement",
      "Fixed-point",
      "Floating-point",
      "IEEE-754",
      "ALU"
    ],
    "isHighYield": false,
    "lessonId": "l1-4"
  },
  {
    "id": "u1_5m_2e",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(e)",
    "question": "Explain the concept of binary codes and discuss different types of binary codes.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A binary code represents discrete information (decimal digits, letters, symbols) by groups of bits; n bits can represent up to 2ⁿ distinct elements. Common types:"
      },
      {
        "type": "bullet",
        "text": "BCD (8421): each decimal digit in 4 bits, e.g. 7 = 0111; weighted code."
      },
      {
        "type": "bullet",
        "text": "Excess-3: BCD + 3 (0011); self-complementing, non-weighted, e.g. 7 = 1010."
      },
      {
        "type": "bullet",
        "text": "Gray code: successive values differ in only one bit – used in shaft encoders, K-maps; e.g. 3 = 0010, 4 = 0110."
      },
      {
        "type": "bullet",
        "text": "ASCII: 7-bit alphanumeric code (128 characters); A = 1000001, a = 1100001, 0 = 0110000."
      },
      {
        "type": "bullet",
        "text": "Error-detecting codes: a parity bit is added so the number of 1s is even/odd, e.g. even parity for 1011 is 11011."
      },
      {
        "type": "table",
        "headers": [
          "Decimal",
          "BCD",
          "Excess-3",
          "Gray"
        ],
        "rows": [
          [
            "0",
            "0000",
            "0011",
            "0000"
          ],
          [
            "1",
            "0001",
            "0100",
            "0001"
          ],
          [
            "2",
            "0010",
            "0101",
            "0011"
          ],
          [
            "3",
            "0011",
            "0110",
            "0010"
          ],
          [
            "4",
            "0100",
            "0111",
            "0110"
          ],
          [
            "5",
            "0101",
            "1000",
            "0111"
          ]
        ]
      }
    ],
    "hint": "Cover 5 major codes: BCD (8421), Excess-3 (+3, self-complementing), Gray (1-bit change), ASCII (7-bit text), Parity (error detection).",
    "outlinePoints": [
      "Define binary code (n bits → 2^n symbols)",
      "Briefly explain BCD, Excess-3, Gray, ASCII, and Parity with 1 example each",
      "Include a clean comparison table for decimals 0–5"
    ],
    "keywords": [
      "BCD",
      "Excess-3",
      "Gray code",
      "ASCII",
      "ALU"
    ],
    "isHighYield": true,
    "lessonId": "l1-2",
    "highYieldGroup": "u1-codes"
  },
  {
    "id": "u1_5m_2f",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(f)",
    "question": "Explain binary logic and digital logic gates. Draw the symbols and truth tables of basic logic gates.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Binary logic deals with variables that take only two values (1/0, true/false, high/low) and three basic operations – AND, OR and NOT. A logic gate is an electronic circuit that implements a binary-logic operation on one or more inputs and produces a single output."
      },
      {
        "type": "image",
        "src": "/diagrams/image4.png",
        "caption": "Fig. Symbols of the logic gates"
      },
      {
        "type": "table",
        "headers": [
          "A",
          "B",
          "AND",
          "OR",
          "NAND",
          "NOR",
          "XOR",
          "XNOR",
          "NOT A"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "0",
            "1",
            "1",
            "0",
            "1",
            "1"
          ],
          [
            "0",
            "1",
            "0",
            "1",
            "1",
            "0",
            "1",
            "0",
            "1"
          ],
          [
            "1",
            "0",
            "0",
            "1",
            "1",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "1",
            "1",
            "0",
            "0",
            "0",
            "1",
            "0"
          ]
        ]
      }
    ],
    "hint": "Binary logic has 0/1 values and AND/OR/NOT operations. Draw symbols for all 7 gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) and their combined truth table.",
    "outlinePoints": [
      "Define binary logic and logic gate",
      "Draw clear gate symbols for basic + universal + XOR/XNOR gates",
      "Write the 4-row combined truth table for A and B"
    ],
    "keywords": [
      "NAND",
      "ALU"
    ],
    "isHighYield": false,
    "lessonId": "l1-3"
  },
  {
    "id": "u1_5m_2g",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(g)",
    "question": "Analyze the different data types used in computer systems.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A data type defines how information is represented in binary and which operations are valid on it. The main data types are:"
      },
      {
        "type": "bullet",
        "text": "Numeric data: integers (unsigned, signed – sign-magnitude / 1's / 2's complement), real numbers (fixed-point, floating-point) and decimal data (BCD)."
      },
      {
        "type": "bullet",
        "text": "Non-numeric data: characters and strings coded in ASCII, EBCDIC or Unicode (e.g. \"A\" = 41H)."
      },
      {
        "type": "bullet",
        "text": "Logical / Boolean data: single bits or bit strings used as flags and masks (AND, OR, XOR operations)."
      },
      {
        "type": "bullet",
        "text": "Address / pointer data: unsigned binary values used to refer to memory locations."
      },
      {
        "type": "paragraph",
        "text": "The choice of data type affects storage size, range, accuracy and speed. Numbers are stored in binary, octal or hexadecimal (hex is a compact form of binary), and the hardware needs different instructions for each type (e.g. integer ADD vs floating-point FADD)."
      }
    ],
    "hint": "Group into 4 buckets: Numeric (integers, fixed/float, BCD), Non-numeric (ASCII/Unicode), Logical/Boolean (flags/masks), and Addresses/Pointers.",
    "outlinePoints": [
      "Define what a data type tells the computer",
      "Outline the 4 main categories with examples",
      "Note how data types affect storage size, range, accuracy, and hardware instructions"
    ],
    "keywords": [
      "BCD",
      "ASCII",
      "2's complement",
      "Fixed-point",
      "Floating-point"
    ],
    "isHighYield": true,
    "lessonId": "l1-4",
    "highYieldGroup": "u1-datatypes"
  },
  {
    "id": "u1_5m_2h",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 5,
    "qNum": "Q.2(h)",
    "question": "Show the how decimal numbers are represented using fixed point representation?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Step 1 – convert the decimal number to binary: integer part by repeated division by 2; fractional part by repeated multiplication by 2."
      },
      {
        "type": "paragraph",
        "text": "Example: 10.625 → integer 10 = 1010; fraction 0.625×2 = 1.25 (1), 0.25×2 = 0.5 (0), 0.5×2 = 1.0 (1) → .101. So 10.625 = 1010.101₂."
      },
      {
        "type": "paragraph",
        "text": "Step 2 – store it in a word with a fixed number of integer and fraction bits; the binary point is implied. With 1 sign bit, 4 integer and 3 fraction bits: +10.625 = 0 1010 101."
      },
      {
        "type": "paragraph",
        "text": "Negative numbers: −10.625 in sign-magnitude = 1 1010 101; in 1's complement = 1 0101 010; in 2's complement = 1 0101 011 (invert and add 1 at the last position). Decimal integers can also be stored as BCD, e.g. +25 = 0 0010 0101."
      }
    ],
    "hint": "Two steps: (1) Convert integer by ÷2 and fraction by ×2 (e.g. 10.625 = 1010.101₂); (2) Pack into sign + integer + fraction bits, and show negative forms.",
    "outlinePoints": [
      "Show integer (÷2) and fraction (×2) conversion for 10.625",
      "Show fixed-point layout (1 sign + 4 int + 3 frac bits)",
      "Show −10.625 in sign-magnitude, 1's complement, and 2's complement",
      "Briefly mention BCD for decimal integers"
    ],
    "keywords": [
      "BCD",
      "2's complement",
      "1's complement"
    ],
    "isHighYield": false,
    "lessonId": "l1-4",
    "numericalId": "num-fixed-point"
  },
  {
    "id": "u1_10m_3a",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 10,
    "qNum": "Q.3(a)",
    "question": "Classify and examine the various data types used in computer systems with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Data in a computer is stored as binary patterns; the data type tells the machine how to interpret a pattern. Data types are classified as follows."
      },
      {
        "type": "paragraph",
        "text": "1. Numeric data types"
      },
      {
        "type": "bullet",
        "text": "Unsigned integers: all bits give magnitude; n bits → 0 … 2ⁿ−1. Example: 8-bit 11001010 = 202."
      },
      {
        "type": "bullet",
        "text": "Signed integers: the MSB is the sign (0 = +, 1 = −). Representations: sign-magnitude (+5 = 0101, −5 = 1101), 1's complement (−5 = 1010), 2's complement (−5 = 1011; range −2ⁿ⁻¹ … 2ⁿ⁻¹−1). 2's complement is the most used because it has one zero and simple addition/subtraction hardware."
      },
      {
        "type": "bullet",
        "text": "Fixed-point numbers: integers with an implied binary point, e.g. 0110.1010 = 6.625."
      },
      {
        "type": "bullet",
        "text": "Floating-point numbers: sign, exponent and mantissa (IEEE-754): 10.5 = 1.0101 × 2³ for very large or very small values."
      },
      {
        "type": "bullet",
        "text": "Decimal (BCD) numbers: every decimal digit in 4 bits, e.g. 93 = 1001 0011; used where exact decimal results matter (billing)."
      },
      {
        "type": "paragraph",
        "text": "2. Non-numeric data types"
      },
      {
        "type": "bullet",
        "text": "Characters: ASCII (7/8 bits), EBCDIC, Unicode (16/32 bits); e.g. \"A\" = 1000001. A sequence of characters forms a string."
      },
      {
        "type": "bullet",
        "text": "Logical (Boolean) data: a bit or bit-string used for flags, masks and conditions; operated on by AND, OR, XOR, NOT."
      },
      {
        "type": "bullet",
        "text": "Addresses / pointers: unsigned values that identify memory locations."
      },
      {
        "type": "bullet",
        "text": "Other discrete symbols: status codes, opcodes, colour codes etc."
      },
      {
        "type": "table",
        "headers": [
          "Data type",
          "Representation",
          "Example"
        ],
        "rows": [
          [
            "Unsigned integer",
            "Pure binary",
            "1101 = 13"
          ],
          [
            "Signed integer",
            "2's complement",
            "1101 = −3 (4-bit)"
          ],
          [
            "Fixed point",
            "Binary + implied point",
            "0110.1010 = 6.625"
          ],
          [
            "Floating point",
            "S",
            "Exp"
          ],
          [
            "Decimal",
            "BCD",
            "25 → 0010 0101"
          ],
          [
            "Character",
            "ASCII",
            "A → 1000001"
          ],
          [
            "Boolean",
            "Single bit",
            "1 = true"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Examination: each type trades range, precision, storage and speed. Integers are exact and fast; floating-point gives huge range but with rounding error; BCD is exact for decimals but wastes bit combinations (6 of 16 unused) and is slower; characters need conversion tables. The processor's instruction set provides separate operations for the common types."
      }
    ],
    "hint": "Expand the 5-mark data types answer into two clear headings (Numeric vs Non-numeric), a 7-row summary table, and an 'Examination' paragraph on trade-offs.",
    "outlinePoints": [
      "Classify 1. Numeric (unsigned, signed 2's comp, fixed, float, BCD)",
      "Classify 2. Non-numeric (characters/strings, Boolean, addresses, discrete symbols)",
      "Include a 7-row table: Data type | Representation | Example",
      "Write an analysis comparing exactness, range, hardware speed, and wasted codes"
    ],
    "keywords": [
      "BCD",
      "ASCII",
      "2's complement",
      "1's complement",
      "Fixed-point"
    ],
    "isHighYield": true,
    "lessonId": "l1-4",
    "highYieldGroup": "u1-datatypes"
  },
  {
    "id": "u1_10m_3b",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 10,
    "qNum": "Q.3(b)",
    "question": "Given A = (72532)10, B = (13250)10, C = (1010100)2 and D = (1000011)2. Find A-B, B-A, C-D, D-A using the method that uses 2's complements.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Rule: X − Y = X + (2's complement of Y). If an end-carry is produced it is discarded and the answer is positive. If there is no carry, the answer is negative and is in 2's-complement form (take the 2's complement of the sum to get its magnitude). Decimal numbers are first converted to binary and handled in an 18-bit word."
      },
      {
        "type": "paragraph",
        "text": "A = 72532 = 010001101101010100;  B = 13250 = 000011001111000010."
      },
      {
        "type": "paragraph",
        "text": "(i) A − B:  2's complement of B = 111100110000111110"
      },
      {
        "type": "code",
        "lines": [
          "A    = 010001101101010100",
          "+ (−B) = 111100110000111110",
          "-----------------------------",
          "1 001110011110010010   → carry discarded"
        ]
      },
      {
        "type": "paragraph",
        "text": "Result = 001110011110010010 = +59282"
      },
      {
        "type": "paragraph",
        "text": "(ii) B − A:  2's complement of A = 101110010010101100"
      },
      {
        "type": "code",
        "lines": [
          "B    = 000011001111000010",
          "+ (−A) = 101110010010101100",
          "-----------------------------",
          "0 110001100001101110   → no carry → negative"
        ]
      },
      {
        "type": "paragraph",
        "text": "Result = −(2's compl.) = −001110011110010010 = −59282"
      },
      {
        "type": "paragraph",
        "text": "(iii) C − D:  C = 1010100 (84), D = 1000011 (67); 2's complement of D = 0111101"
      },
      {
        "type": "code",
        "lines": [
          "C    = 1010100",
          "+ (−D) = 0111101",
          "----------------",
          "1 0010001   → carry discarded"
        ]
      },
      {
        "type": "paragraph",
        "text": "Result = 0010001 = +17"
      },
      {
        "type": "paragraph",
        "text": "(iv) D − A:  D = 67 = 000000000001000011; (−A) = 101110010010101100"
      },
      {
        "type": "code",
        "lines": [
          "D    = 000000000001000011",
          "+ (−A) = 101110010010101100",
          "-----------------------------",
          "0 101110010011101111   → no carry → negative"
        ]
      },
      {
        "type": "paragraph",
        "text": "Magnitude = 2's compl. = 010001101100010001 = 72465"
      },
      {
        "type": "paragraph",
        "text": "Result = −72465"
      },
      {
        "type": "paragraph",
        "text": "Check (decimal 10's complement method): A − B = 72532 + 86750 = 1 59282 → 59282 ✓; B − A = 13250 + 27468 = 40718 (no carry) → −(100000 − 40718) = −59282 ✓."
      }
    ],
    "hint": "Convert A=72532 and B=13250 to 18-bit binary first! Then apply X − Y = X + (2's comp of Y): end-carry = positive (discard), no carry = negative (take 2's comp).",
    "outlinePoints": [
      "State the 2's complement subtraction rule clearly",
      "Convert A (72532) and B (13250) into 18-bit binary",
      "Solve (i) A − B (+59282) and (ii) B − A (−59282)",
      "Solve (iii) C − D (+17 in 7-bit) and (iv) D − A (−72465 in 18-bit)",
      "Include a quick decimal check to prove accuracy"
    ],
    "keywords": [
      "2's complement",
      "10's complement",
      "CAR"
    ],
    "isHighYield": true,
    "lessonId": "l1-4",
    "highYieldGroup": "u1-complements",
    "numericalId": "num-18bit-2s-sub"
  },
  {
    "id": "u1_10m_3c",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 10,
    "qNum": "Q.3(c)",
    "question": "Explain the concept of binary codes and discuss different types of binary codes such as BCD, Gray Code, Excess-3, and ASCII with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Concept: A computer can handle only 0s and 1s, so every decimal digit, letter or symbol must be mapped to a unique group of bits – this mapping is a binary code. With n bits we get 2ⁿ code words (4 bits → 16, 7 bits → 128). Codes are chosen for ease of arithmetic, error detection or reliability."
      },
      {
        "type": "paragraph",
        "text": "1. BCD (Binary Coded Decimal, 8421 code) – each decimal digit is encoded in 4 bits using weights 8-4-2-1; codes 1010–1111 are unused. Easy to convert to/from decimal but wasteful. Example: 3862 = 0011 1000 0110 0010. BCD addition needs a correction of +0110 when a digit sum exceeds 9."
      },
      {
        "type": "paragraph",
        "text": "2. Excess-3 – each digit is its BCD value plus 3. It is a non-weighted, self-complementing code (the 9's complement is obtained by inverting the bits), which makes decimal subtraction easy. Example: 4 → 0111, 9 → 1100; 3862 = 0110 1011 1001 0101."
      },
      {
        "type": "paragraph",
        "text": "3. Gray code (reflected binary code) – only one bit changes between successive numbers, so errors during transitions are avoided (shaft-position encoders, K-maps). Binary → Gray: keep the MSB, then XOR each bit with the bit to its left: 1011 → 1110. Gray → binary: keep MSB, XOR each Gray bit with the previous binary bit: 1110 → 1011."
      },
      {
        "type": "paragraph",
        "text": "4. ASCII (American Standard Code for Information Interchange) – a 7-bit alphanumeric code (128 characters, 8th bit often used as parity): control characters, digits, upper/lower case letters and symbols. Examples: \"A\" = 100 0001 (41H), \"a\" = 110 0001 (61H), \"0\" = 011 0000 (30H), space = 010 0000 (20H). Word \"CAT\" = 1000011 1000001 1010100."
      },
      {
        "type": "table",
        "headers": [
          "Dec",
          "BCD",
          "Excess-3",
          "Gray",
          "Dec",
          "BCD",
          "Excess-3",
          "Gray"
        ],
        "rows": [
          [
            "0",
            "0000",
            "0011",
            "0000",
            "5",
            "0101",
            "1000",
            "0111"
          ],
          [
            "1",
            "0001",
            "0100",
            "0001",
            "6",
            "0110",
            "1001",
            "0101"
          ],
          [
            "2",
            "0010",
            "0101",
            "0011",
            "7",
            "0111",
            "1010",
            "0100"
          ],
          [
            "3",
            "0011",
            "0110",
            "0010",
            "8",
            "1000",
            "1011",
            "1100"
          ],
          [
            "4",
            "0100",
            "0111",
            "0110",
            "9",
            "1001",
            "1100",
            "1101"
          ]
        ]
      }
    ],
    "hint": "Deep dive on 4 named codes: BCD (with +6 addition correction), Excess-3 (self-complementing), Gray (Binary↔Gray XOR rules), and ASCII (7-bit + 'CAT' example), plus 0–9 table.",
    "outlinePoints": [
      "Explain the concept of binary coding (2^n code words)",
      "Detail 1. BCD (8421), 2. Excess-3, 3. Gray Code (include conversion rules), 4. ASCII",
      "Provide concrete worked examples for every code",
      "Draw the full 0–9 comparison table (Dec, BCD, Excess-3, Gray)"
    ],
    "keywords": [
      "BCD",
      "Excess-3",
      "Gray code",
      "ASCII",
      "9's complement"
    ],
    "isHighYield": true,
    "lessonId": "l1-2",
    "highYieldGroup": "u1-codes"
  },
  {
    "id": "u1_10m_3d",
    "unit": 1,
    "unitRoman": "I",
    "unitTitle": "Digital Computers, Number Systems and Codes",
    "marks": 10,
    "qNum": "Q.3(d)",
    "question": "Analyze the different data types used in computer systems and explain how their characteristics influence their selection for various applications, with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Data types: unsigned/signed integers, fixed-point and floating-point reals, BCD (decimal), characters/strings (ASCII, Unicode), Boolean (logical) data and addresses. Each has different characteristics, which decide where it is used."
      },
      {
        "type": "table",
        "headers": [
          "Data type",
          "Characteristics",
          "Best suited for (example)"
        ],
        "rows": [
          [
            "Integer (2's compl.)",
            "Exact, small, fastest ALU operations; limited range (8-bit: −128…127); overflow possible",
            "Loop counters, array indices, addresses, pixel values"
          ],
          [
            "Fixed-point",
            "Exact fractions to fixed resolution, fast without FPU, limited range",
            "Embedded controllers, digital signal processing, audio"
          ],
          [
            "Floating-point",
            "Huge range (≈10⁻³⁸…10³⁸ single), 6–7 digit precision, rounding errors, slower/needs FPU",
            "Scientific simulation, graphics, machine learning"
          ],
          [
            "BCD / decimal",
            "Exact decimal results, 6 of 16 codes unused, slower arithmetic",
            "Financial and billing systems, calculators, digital displays"
          ],
          [
            "Character (ASCII/Unicode)",
            "Fixed-width codes, ordering for sorting; Unicode needs 16–32 bits",
            "Text processing, file names, databases"
          ],
          [
            "Boolean",
            "1 bit of information; bit-wise operations are very fast",
            "Flags, masks, status registers, conditions"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "How characteristics influence selection:"
      },
      {
        "type": "bullet",
        "text": "Range and precision: a bank balance must be exact (BCD or integer cents), whereas a weather model needs a wide range (floating-point)."
      },
      {
        "type": "bullet",
        "text": "Storage size: an 8-bit integer saves memory in image arrays; 64-bit double is used when accuracy matters."
      },
      {
        "type": "bullet",
        "text": "Speed and hardware support: integer and fixed-point operations run on the ALU in one cycle; floating-point needs an FPU; BCD needs extra correction logic."
      },
      {
        "type": "bullet",
        "text": "Error behaviour: floating-point may round (0.1 cannot be stored exactly), so equality tests on floats are avoided; integers may overflow, so range must be checked."
      },
      {
        "type": "bullet",
        "text": "Cost and power: low-cost microcontrollers without an FPU use fixed-point."
      },
      {
        "type": "paragraph",
        "text": "Conclusion: the programmer/designer picks the smallest and simplest type that meets the required range, accuracy and speed."
      }
    ],
    "hint": "Focus on *why engineers pick each type*: start with a rich comparison table (characteristics + best applications), then explain 5 selection factors (range, size, speed, errors, cost/power).",
    "outlinePoints": [
      "List the main data types briefly",
      "Draw a 6-row table: Data type | Characteristics | Best suited for",
      "Analyze 5 selection drivers: Range/precision, Storage size, Speed/FPU, Error behavior (0.1 rounding & overflow), Cost/power",
      "Finish with a 1-sentence engineering conclusion"
    ],
    "keywords": [
      "BCD",
      "ASCII",
      "Fixed-point",
      "Floating-point",
      "ALU"
    ],
    "isHighYield": true,
    "lessonId": "l1-4",
    "highYieldGroup": "u1-datatypes"
  },
  {
    "id": "u2_2m_1a",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 2,
    "qNum": "Q.1(a)",
    "question": "Differentiate between a latch and a flip-flop.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A latch is a level-sensitive, asynchronous storage element – its output follows the inputs the whole time the enable is active. A flip-flop is edge-triggered and clocked – it changes state only at the clock edge (rising/falling). A flip-flop is usually built from two latches (master–slave)."
      }
    ],
    "hint": "Latch = level-sensitive (asynchronous, reacts whenever enable is active). Flip-flop = edge-triggered (clocked, changes only on rising/falling edge).",
    "outlinePoints": [
      "Contrast triggering: level-sensitive vs edge-triggered",
      "Contrast clock usage: asynchronous vs clocked",
      "Note flip-flops are typically built from two latches (master-slave)"
    ],
    "keywords": [
      "Flip-flop",
      "Latch"
    ],
    "isHighYield": false,
    "lessonId": "l2-3"
  },
  {
    "id": "u2_2m_1b",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 2,
    "qNum": "Q.1(b)",
    "question": "What is a multiplexer? State any one application of a multiplexer.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A multiplexer (MUX) is a combinational circuit that selects one of 2ⁿ data inputs and passes it to a single output, the choice being made by n select lines (data selector). Application: parallel-to-serial conversion / routing data from several registers onto a common bus."
      }
    ],
    "hint": "MUX = 'many-to-one data selector' (2^n inputs, n select lines, 1 output). Application: parallel-to-serial conversion or shared bus routing.",
    "outlinePoints": [
      "Define Multiplexer (2^n inputs, n select lines, 1 output)",
      "Give one clear application (bus routing or parallel-to-serial)"
    ],
    "keywords": [
      "Registers",
      "Multiplexer",
      "MUX",
      "Common bus"
    ],
    "isHighYield": false,
    "lessonId": "l2-2"
  },
  {
    "id": "u2_2m_1c",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 2,
    "qNum": "Q.1(c)",
    "question": "Draw the logic Diagram for 1 bit comparator.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image5.png",
        "caption": "Fig. 1-bit magnitude comparator (outputs G: A>B, E: A=B, L: A<B)"
      }
    ],
    "hint": "Inputs A and B; three outputs: G (A>B = A·B'), E (A=B = A XNOR B), L (A<B = A'·B).",
    "outlinePoints": [
      "Draw inverters for A' and B'",
      "Connect AND gates for G = A·B' and L = A'·B",
      "Connect XNOR gate for E = (A ⊕ B)'"
    ],
    "keywords": [
      "Comparator"
    ],
    "isHighYield": false,
    "lessonId": "l2-2"
  },
  {
    "id": "u2_2m_1d",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 2,
    "qNum": "Q.1(d)",
    "question": "What is a Decoder and Encoder?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A decoder converts an n-bit binary input into 2ⁿ unique outputs, only one of which is active at a time (e.g. 2-to-4 decoder). An encoder does the reverse: it has 2ⁿ input lines and produces the n-bit binary code of the active input (e.g. 4-to-2 encoder)."
      }
    ],
    "hint": "Decoder expands n inputs → 2^n outputs (1 active). Encoder does the reverse: 2^n inputs → n-bit binary code.",
    "outlinePoints": [
      "Define Decoder (n → 2^n, one active output) + example (2-to-4)",
      "Define Encoder (2^n → n binary code) + example (4-to-2)"
    ],
    "keywords": [
      "Decoder",
      "Encoder",
      "Decode"
    ],
    "isHighYield": true,
    "lessonId": "l2-2",
    "highYieldGroup": "u2-decoders-encoders"
  },
  {
    "id": "u2_2m_1e",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 2,
    "qNum": "Q.1(e)",
    "question": "Explain the differences between Combinational Circuit and Sequential Circuits with examples.",
    "blocks": [
      {
        "type": "table",
        "headers": [
          "Combinational circuit",
          "Sequential circuit"
        ],
        "rows": [
          [
            "Output depends only on present inputs",
            "Output depends on present inputs and past states"
          ],
          [
            "No memory, no feedback, no clock",
            "Has memory elements (flip-flops) and feedback; usually clocked"
          ],
          [
            "Examples: adder, MUX, decoder",
            "Examples: registers, counters, shift registers"
          ]
        ]
      }
    ],
    "hint": "Combinational = outputs depend ONLY on present inputs (no memory/clock). Sequential = present inputs + past state (has flip-flops/clock).",
    "outlinePoints": [
      "Make a crisp 3-row table: Output dependency, Memory/Clock, Examples",
      "Examples: Adder/MUX/Decoder vs Registers/Counters"
    ],
    "keywords": [
      "Registers",
      "Flip-flop",
      "MUX",
      "Decoder",
      "Shift register"
    ],
    "isHighYield": false,
    "lessonId": "l2-3"
  },
  {
    "id": "u2_2m_1f",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 2,
    "qNum": "Q.1(f)",
    "question": "Define a synchronous counter. How does it differ from a ripple counter?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A synchronous counter is a counter in which all flip-flops receive the same clock pulse simultaneously, so all outputs change together. In a ripple (asynchronous) counter the clock is applied only to the first flip-flop and each next flip-flop is clocked by the previous output, so delays add up (slower, but needs less hardware)."
      }
    ],
    "hint": "Synchronous = all flip-flops share one common clock (fast, simultaneous). Ripple = clock only hits first FF, each output clocks the next (cumulative delay).",
    "outlinePoints": [
      "Define synchronous counter (common clock, simultaneous change)",
      "Contrast with ripple counter (cascaded clock, slower due to ripple delay, simpler hardware)"
    ],
    "keywords": [
      "Flip-flop",
      "Ripple counter",
      "Synchronous counter"
    ],
    "isHighYield": false,
    "lessonId": "l2-4"
  },
  {
    "id": "u2_5m_2a",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(a)",
    "question": "Explain the working of a binary adder-subtractor circuit and analyze the role of the mode control bit in selecting addition and subtraction operations.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image6.png",
        "caption": "Fig. 4-bit binary adder-subtractor"
      },
      {
        "type": "paragraph",
        "text": "The circuit uses four full adders (FA0–FA3) in a ripple-carry chain. Each B input passes through an XOR gate whose second input is the mode control M; M is also connected to the carry-in C₀ of the first adder."
      },
      {
        "type": "bullet",
        "text": "M = 0 (addition): B ⊕ 0 = B and C₀ = 0 → S = A + B."
      },
      {
        "type": "bullet",
        "text": "M = 1 (subtraction): B ⊕ 1 = B' (1's complement) and C₀ = 1 → S = A + B' + 1 = A + 2's complement of B = A − B."
      },
      {
        "type": "paragraph",
        "text": "So M simply selects whether B is passed unchanged or complemented, and supplies the \"+1\" needed for 2's complement. Example (M = 1): A = 0110 (6), B = 0011 (3): B' = 1100; 0110 + 1100 + 1 = 1 0011 → carry dropped → 0011 = 3. Overflow is detected by V = C₄ ⊕ C₃ (carry into and out of the sign bit)."
      }
    ],
    "hint": "4 full adders + 4 XOR gates on B inputs controlled by mode bit M (also fed to C0). M=0 adds A+B; M=1 complements B and adds +1 for A−B!",
    "outlinePoints": [
      "Draw the 4-bit adder-subtractor diagram (FA0–FA3, XOR gates, M → C0)",
      "Explain M = 0 (B ⊕ 0 = B, C0 = 0 → A + B)",
      "Explain M = 1 (B ⊕ 1 = B', C0 = 1 → A + B' + 1 = A − B)",
      "Give a 4-bit subtraction example (6 − 3) and overflow formula V = C4 ⊕ C3"
    ],
    "keywords": [
      "2's complement",
      "1's complement",
      "Full Adder",
      "Adder-Subtractor",
      "CAR"
    ],
    "isHighYield": false,
    "lessonId": "l2-1"
  },
  {
    "id": "u2_5m_2b",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(b)",
    "question": "Analyze the working of different types of shift registers in digital systems with circuits.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A shift register is a chain of flip-flops in which the stored bits move one position on every clock pulse. Types: SISO (serial-in serial-out), SIPO (serial-in parallel-out), PISO (parallel-in serial-out), PIPO (parallel-in parallel-out) and bidirectional / universal registers."
      },
      {
        "type": "image",
        "src": "/diagrams/image7.png",
        "caption": "Fig. 4-bit serial-in shift register (SISO – take Q3; SIPO – take Q0…Q3)"
      },
      {
        "type": "paragraph",
        "text": "SISO/SIPO: the input bit enters FF0 and moves one stage per clock. Serial data 1,0,1,1 (first bit first):"
      },
      {
        "type": "table",
        "headers": [
          "Clock",
          "Serial in",
          "Q0",
          "Q1",
          "Q2",
          "Q3"
        ],
        "rows": [
          [
            "0",
            "–",
            "0",
            "0",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "1",
            "0",
            "0",
            "0"
          ],
          [
            "2",
            "0",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "3",
            "1",
            "1",
            "0",
            "1",
            "0"
          ],
          [
            "4",
            "1",
            "1",
            "1",
            "0",
            "1"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "After 4 clocks all four bits are available in parallel (SIPO), or they can be sent out one by one at Q3 (SISO)."
      },
      {
        "type": "image",
        "src": "/diagrams/image8.png",
        "caption": "Fig. PISO / PIPO register with Shift/Load control (a 2:1 MUX at each D input)"
      },
      {
        "type": "paragraph",
        "text": "PISO/PIPO: when Shift/Load = 1 the parallel inputs P₀–P₃ are loaded at once (PIPO); when 0 the register shifts and data leaves serially (PISO). Uses: serial↔parallel conversion in communication, delay lines, multiplication/division by 2."
      }
    ],
    "hint": "Four types: SISO, SIPO, PISO, PIPO. Show a 4-bit serial-in shift register with a 4-clock trace table (1,0,1,1), plus PISO/PIPO with Shift/Load MUX.",
    "outlinePoints": [
      "Define shift register and list SISO, SIPO, PISO, PIPO",
      "Draw serial-in diagram and trace 4 clock cycles for 1,0,1,1",
      "Draw/explain Shift/Load MUX for PISO/PIPO",
      "List 2–3 uses (serial↔parallel conversion, delay lines, ×2/÷2)"
    ],
    "keywords": [
      "Registers",
      "Flip-flop",
      "MUX",
      "Shift register",
      "SISO"
    ],
    "isHighYield": false,
    "lessonId": "l2-4"
  },
  {
    "id": "u2_5m_2c",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(c)",
    "question": "Apply the design procedure to develop a suitable 1 bit magnitude comparator circuit and write the 6 steps to design Combinational Circuit.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Six steps: (1) state the problem; (2) determine the number of input and output variables; (3) assign letter symbols; (4) derive the truth table; (5) obtain simplified Boolean functions (K-map); (6) draw the logic diagram."
      },
      {
        "type": "paragraph",
        "text": "Design: inputs A, B; outputs G (A>B), E (A=B), L (A<B)."
      },
      {
        "type": "table",
        "headers": [
          "A",
          "B",
          "G",
          "E",
          "L"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "1",
            "0"
          ],
          [
            "0",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "1",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "0",
            "1",
            "0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "From the truth table:  G = A·B',  L = A'·B,  E = A'B' + AB = (A ⊕ B)' (XNOR)."
      },
      {
        "type": "image",
        "src": "/diagrams/image5.png",
        "caption": "Fig. Logic diagram of the 1-bit magnitude comparator"
      }
    ],
    "hint": "Recite the 6 combinational design steps, then apply them to 1-bit comparator: 4-row truth table → G=A·B', E=XNOR, L=A'·B → diagram.",
    "outlinePoints": [
      "List all 6 combinational circuit design steps",
      "Write the 4-row truth table for inputs A, B and outputs G, E, L",
      "Write simplified expressions (G, E, L) and draw the logic diagram"
    ],
    "keywords": [
      "Comparator"
    ],
    "isHighYield": true,
    "lessonId": "l2-2",
    "highYieldGroup": "u2-comparators"
  },
  {
    "id": "u2_5m_2d",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(d)",
    "question": "What is multiplexer? Explain about 4:1 Multiplexer with circuit.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A multiplexer is a combinational circuit with 2ⁿ data inputs, n select lines and one output; it connects one selected input to the output."
      },
      {
        "type": "image",
        "src": "/diagrams/image9.png",
        "caption": "Fig. 4:1 multiplexer – four AND gates and one OR gate"
      },
      {
        "type": "table",
        "headers": [
          "S1",
          "S0",
          "Y"
        ],
        "rows": [
          [
            "0",
            "0",
            "I0"
          ],
          [
            "0",
            "1",
            "I1"
          ],
          [
            "1",
            "0",
            "I2"
          ],
          [
            "1",
            "1",
            "I3"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Output equation: Y = S1'S0' I0 + S1'S0 I1 + S1S0' I2 + S1S0 I3. The select lines enable exactly one AND gate (the others give 0), and the OR gate passes that data to Y. Uses: data routing, parallel-to-serial conversion, implementing Boolean functions."
      }
    ],
    "hint": "4:1 MUX has 4 data inputs (I0–I3), 2 select lines (S1, S0), 4 AND gates, and 1 OR gate. Write the select table and Y equation.",
    "outlinePoints": [
      "Define multiplexer",
      "Draw the 4:1 MUX circuit (inverters, 4 AND gates, 1 OR gate)",
      "Write the 4-row select table and Boolean output equation Y",
      "Mention applications (routing, Boolean function implementation)"
    ],
    "keywords": [
      "Multiplexer"
    ],
    "isHighYield": false,
    "lessonId": "l2-2"
  },
  {
    "id": "u2_5m_2e",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(e)",
    "question": "Explain the steps involved in designing a combinational logic circuit with a suitable example.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Steps: (1) state the problem and understand the specification; (2) find the number of inputs and outputs; (3) assign symbols to them; (4) construct the truth table; (5) simplify the output functions using K-maps / Boolean algebra; (6) draw the logic diagram and verify it."
      },
      {
        "type": "paragraph",
        "text": "Example – full adder (adds A, B and carry-in Cin, giving Sum and Cout):"
      },
      {
        "type": "table",
        "headers": [
          "A",
          "B",
          "Cin",
          "Sum",
          "Cout"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "0",
            "0"
          ],
          [
            "0",
            "0",
            "1",
            "1",
            "0"
          ],
          [
            "0",
            "1",
            "0",
            "1",
            "0"
          ],
          [
            "0",
            "1",
            "1",
            "0",
            "1"
          ],
          [
            "1",
            "0",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "0",
            "1",
            "0",
            "1"
          ],
          [
            "1",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "1",
            "1",
            "1",
            "1",
            "1"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "K-map simplification gives Sum = A ⊕ B ⊕ Cin and Cout = AB + Cin(A ⊕ B). The circuit is two XOR gates for Sum, and two AND gates plus one OR gate for Cout (two half adders and an OR gate)."
      }
    ],
    "hint": "State the 6 design steps cleanly, then demonstrate them using a Full Adder (A, B, Cin → Sum, Cout): 8-row truth table → Sum = A⊕B⊕Cin, Cout = AB + Cin(A⊕B).",
    "outlinePoints": [
      "List the 6 combinational design steps",
      "Write the 8-row truth table for a Full Adder",
      "Give simplified equations for Sum and Cout and describe the gates"
    ],
    "keywords": [
      "Full Adder",
      "CAR"
    ],
    "isHighYield": true,
    "lessonId": "l2-1",
    "highYieldGroup": "u2-comparators"
  },
  {
    "id": "u2_5m_2f",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(f)",
    "question": "Explain the working of the S-R latch and S-R flip-flop with suitable circuit diagrams.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image10.png",
        "caption": "Fig. (a) S-R latch with NOR gates"
      },
      {
        "type": "paragraph",
        "text": "S-R latch: two cross-coupled NOR gates. S = 1, R = 0 → Q = 1 (set); S = 0, R = 1 → Q = 0 (reset); S = R = 0 → no change (memory); S = R = 1 → both outputs 0, the invalid state (not allowed)."
      },
      {
        "type": "table",
        "headers": [
          "S",
          "R",
          "Q(next)",
          "Action"
        ],
        "rows": [
          [
            "0",
            "0",
            "Q",
            "No change"
          ],
          [
            "0",
            "1",
            "0",
            "Reset"
          ],
          [
            "1",
            "0",
            "1",
            "Set"
          ],
          [
            "1",
            "1",
            "?",
            "Invalid"
          ]
        ]
      },
      {
        "type": "image",
        "src": "/diagrams/image11.png",
        "caption": "Fig. (b) Clocked S-R flip-flop with NAND gates"
      },
      {
        "type": "paragraph",
        "text": "S-R flip-flop: two NAND gates controlled by the clock are added in front of a NAND latch. When CLK = 0 the latch holds its state; when CLK = 1 S and R are passed and the latch sets/resets as per the table above, so the state changes only in step with the clock. S = R = 1 is still forbidden."
      }
    ],
    "hint": "NOR S-R latch has 2 cross-coupled NOR gates (00 hold, 01 reset, 10 set, 11 invalid). Clocked S-R flip-flop adds 2 clocked NAND gates in front.",
    "outlinePoints": [
      "Draw NOR S-R latch and explain all 4 input states (including S=R=1 invalid)",
      "Write the S-R truth table",
      "Draw Clocked S-R flip-flop (NAND) and explain CLK=0 hold vs CLK=1 active"
    ],
    "keywords": [
      "NAND",
      "Flip-flop",
      "Latch"
    ],
    "isHighYield": true,
    "lessonId": "l2-3",
    "highYieldGroup": "u2-sr-latch-ff"
  },
  {
    "id": "u2_5m_2g",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(g)",
    "question": "Explain the design procedure for sequential circuits with a suitable state diagram.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Steps: (1) obtain a word description/specification; (2) draw the state diagram; (3) form the state table; (4) reduce the states and assign binary codes; (5) choose the flip-flop type and use its excitation table to derive flip-flop input equations and output equations (K-maps); (6) draw the logic diagram."
      },
      {
        "type": "paragraph",
        "text": "Example – detect two consecutive 1s on input x (Mealy machine):"
      },
      {
        "type": "image",
        "src": "/diagrams/image12.png",
        "caption": "Fig. State diagram (label = input / output)"
      },
      {
        "type": "table",
        "headers": [
          "Present state",
          "Input x",
          "Next state",
          "Output z"
        ],
        "rows": [
          [
            "S0",
            "0",
            "S0",
            "0"
          ],
          [
            "S0",
            "1",
            "S1",
            "0"
          ],
          [
            "S1",
            "0",
            "S0",
            "0"
          ],
          [
            "S1",
            "1",
            "S1",
            "1"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "With state code S0 = 0, S1 = 1 and a D flip-flop: D = x and z = x·Q. The logic diagram needs one flip-flop and one AND gate."
      }
    ],
    "hint": "6 sequential design steps: Spec → State diagram → State table → Reduce/assign codes → Excitation table/K-maps → Circuit. Example: detect two consecutive 1s (Mealy).",
    "outlinePoints": [
      "List the 6 sequential circuit design steps",
      "Draw the 2-state Mealy diagram (S0, S1) to detect '11'",
      "Write the 4-row state table",
      "Derive D = x and z = x·Q using state codes S0=0, S1=1"
    ],
    "keywords": [
      "Flip-flop",
      "State diagram",
      "Mealy"
    ],
    "isHighYield": false,
    "lessonId": "l2-3"
  },
  {
    "id": "u2_5m_2h",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 5,
    "qNum": "Q.2(h)",
    "question": "Describe the working principle of a ripple counter with a neat circuit diagram and timing diagram.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image13.png",
        "caption": "Fig. 3-bit ripple (asynchronous) up counter using JK flip-flops"
      },
      {
        "type": "paragraph",
        "text": "Each JK flip-flop has J = K = 1, so it toggles on every active clock edge. The external clock drives only FF0; the output Q0 clocks FF1 and Q1 clocks FF2. Thus Q0 toggles every clock pulse, Q1 every 2 pulses and Q2 every 4 pulses, giving a 3-bit binary count 000 → 111 (modulo-8) and then back to 000."
      },
      {
        "type": "image",
        "src": "/diagrams/image14.png",
        "caption": "Fig. Timing diagram (count sequence Q2Q1Q0)"
      },
      {
        "type": "paragraph",
        "text": "Note: since each stage is triggered by the previous one, the delays accumulate (ripple) – the counter is simple but slow, and glitches may occur at high speed. Frequency at Q2 = f/8."
      }
    ],
    "hint": "3-bit ripple up counter: 3 JK flip-flops with J=K=1. External clock only to FF0; Q0 clocks FF1; Q1 clocks FF2. Mention ripple delay & f/8 frequency.",
    "outlinePoints": [
      "Draw the 3-bit JK ripple counter circuit",
      "Explain toggle behavior (J=K=1) and cascaded clocking",
      "Draw the timing diagram (000 to 111, mod-8)",
      "Note propagation delay accumulation, glitches, and Q2 = f/8"
    ],
    "keywords": [
      "Flip-flop",
      "Ripple counter"
    ],
    "isHighYield": true,
    "lessonId": "l2-4",
    "highYieldGroup": "u2-counters"
  },
  {
    "id": "u2_10m_3a",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 10,
    "qNum": "Q.3(a)",
    "question": "Explain synchronous counters with a neat circuit diagram and timing diagram.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A synchronous counter is a counter in which the same clock pulse is applied to all flip-flops simultaneously. All flip-flops change state at the same instant, so there is no ripple delay. The count sequence is controlled by the logic gates at the J-K (or T) inputs."
      },
      {
        "type": "image",
        "src": "/diagrams/image15.png",
        "caption": "Fig. 3-bit synchronous binary up counter"
      },
      {
        "type": "paragraph",
        "text": "Working (3-bit up counter, JK flip-flops): a flip-flop must toggle only when all lower-order bits are 1:"
      },
      {
        "type": "bullet",
        "text": "FF0: J0 = K0 = 1 → toggles on every clock."
      },
      {
        "type": "bullet",
        "text": "FF1: J1 = K1 = Q0 → toggles when Q0 = 1."
      },
      {
        "type": "bullet",
        "text": "FF2: J2 = K2 = Q0·Q1 → toggles when Q0 = Q1 = 1 (an AND gate)."
      },
      {
        "type": "table",
        "headers": [
          "Clock pulse",
          "Q2",
          "Q1",
          "Q0",
          "Decimal"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "0",
            "0"
          ],
          [
            "1",
            "0",
            "0",
            "1",
            "1"
          ],
          [
            "2",
            "0",
            "1",
            "0",
            "2"
          ],
          [
            "3",
            "0",
            "1",
            "1",
            "3"
          ],
          [
            "4",
            "1",
            "0",
            "0",
            "4"
          ],
          [
            "5",
            "1",
            "0",
            "1",
            "5"
          ],
          [
            "6",
            "1",
            "1",
            "0",
            "6"
          ],
          [
            "7",
            "1",
            "1",
            "1",
            "7"
          ],
          [
            "8",
            "0",
            "0",
            "0",
            "0"
          ]
        ]
      },
      {
        "type": "image",
        "src": "/diagrams/image14.png",
        "caption": "Fig. Timing diagram of the 3-bit counter – all outputs change on the same clock edge"
      },
      {
        "type": "paragraph",
        "text": "Features: no cumulative propagation delay (delay = one flip-flop + one AND gate), higher maximum clock frequency and no decoding glitches; requires more gates than the ripple counter (n-bit counter needs AND gates with up to n−1 inputs). A mod-N counter is obtained by resetting/feeding back at count N−1. Down counters use Q' outputs; up/down counters use a mode control."
      },
      {
        "type": "table",
        "headers": [
          "Property",
          "Ripple counter",
          "Synchronous counter"
        ],
        "rows": [
          [
            "Clock",
            "Only to FF0",
            "Common to all FFs"
          ],
          [
            "Speed",
            "Slow (delays add)",
            "Fast"
          ],
          [
            "Hardware",
            "Simple",
            "More gates"
          ],
          [
            "Glitches",
            "Likely",
            "Rare"
          ]
        ]
      }
    ],
    "hint": "Common clock to ALL flip-flops! For 3-bit up counter: J0=K0=1, J1=K1=Q0, J2=K2=Q0·Q1. Include circuit, 0–8 count table, timing diagram, and Ripple vs Synchronous table.",
    "outlinePoints": [
      "Define synchronous counter and draw the 3-bit JK circuit",
      "Explain flip-flop toggle conditions (FF0, FF1, FF2)",
      "Write the 0–8 state table and draw the timing diagram",
      "Discuss speed/hardware/mod-N features + Ripple vs Synchronous comparison table"
    ],
    "keywords": [
      "Flip-flop",
      "Ripple counter",
      "Synchronous counter"
    ],
    "isHighYield": true,
    "lessonId": "l2-4",
    "highYieldGroup": "u2-counters"
  },
  {
    "id": "u2_10m_3b",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 10,
    "qNum": "Q.3(b)",
    "question": "Explain the working of the S-R latch and S-R flip-flop with suitable circuit diagrams and truth tables. Discuss their role in sequential logic circuits.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "1. S-R latch (NOR type). It consists of two cross-coupled NOR gates; the output of each gate is fed to an input of the other, giving positive feedback that stores one bit. Inputs: S (set) and R (reset); outputs: Q and Q'."
      },
      {
        "type": "image",
        "src": "/diagrams/image10.png",
        "caption": "Fig. S-R latch using NOR gates"
      },
      {
        "type": "table",
        "headers": [
          "S",
          "R",
          "Q(t+1)",
          "Operation"
        ],
        "rows": [
          [
            "0",
            "0",
            "Q(t)",
            "Hold (memory)"
          ],
          [
            "0",
            "1",
            "0",
            "Reset"
          ],
          [
            "1",
            "0",
            "1",
            "Set"
          ],
          [
            "1",
            "1",
            "Indeterminate",
            "Not allowed (Q = Q' = 0)"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "When S = 1, R = 0 the upper/lower NOR drives Q = 1, which keeps the other gate at 0 even after S returns to 0 – the latch \"remembers\". A NAND-based latch works with active-low inputs (S'R')."
      },
      {
        "type": "paragraph",
        "text": "2. Clocked S-R flip-flop. Two NAND gates and a clock input are added, so that S and R are effective only when CLK = 1:"
      },
      {
        "type": "image",
        "src": "/diagrams/image11.png",
        "caption": "Fig. Clocked S-R flip-flop"
      },
      {
        "type": "table",
        "headers": [
          "CLK",
          "S",
          "R",
          "Q(t+1)"
        ],
        "rows": [
          [
            "0",
            "x",
            "x",
            "Q(t)"
          ],
          [
            "1",
            "0",
            "0",
            "Q(t)"
          ],
          [
            "1",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "1",
            "0",
            "1"
          ],
          [
            "1",
            "1",
            "1",
            "Invalid"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Characteristic equation: Q(t+1) = S + R'Q(t), with the constraint S·R = 0."
      },
      {
        "type": "paragraph",
        "text": "3. Role in sequential circuits:"
      },
      {
        "type": "bullet",
        "text": "They are the basic 1-bit memory elements; the \"state\" of a sequential circuit is stored in them."
      },
      {
        "type": "bullet",
        "text": "The clocked flip-flop makes all state changes happen at defined instants, preventing races and making synchronous design possible."
      },
      {
        "type": "bullet",
        "text": "They are the basis of other flip-flops (JK removes the invalid state, D and T are derived from it) and of registers, shift registers, counters and memory cells."
      },
      {
        "type": "bullet",
        "text": "Limitation: the S = R = 1 condition is forbidden and the latch is level sensitive, which is why JK / D edge-triggered flip-flops are preferred in practice."
      }
    ],
    "hint": "Three full sections: (1) NOR S-R Latch + truth table, (2) Clocked S-R Flip-Flop + truth table + characteristic equation Q(t+1)=S+R'Q, (3) Role & limitations in sequential circuits.",
    "outlinePoints": [
      "Section 1: NOR S-R latch diagram, feedback working, and 4-row truth table",
      "Section 2: Clocked S-R FF diagram, 5-row CLK table, and Q(t+1) = S + R'Q (SR=0)",
      "Section 3: Role in sequential systems (1-bit memory, sync timing, basis of JK/D/T, limitations)"
    ],
    "keywords": [
      "NAND",
      "Registers",
      "Flip-flop",
      "Latch",
      "Shift register"
    ],
    "isHighYield": true,
    "lessonId": "l2-3",
    "highYieldGroup": "u2-sr-latch-ff"
  },
  {
    "id": "u2_10m_3c",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 10,
    "qNum": "Q.3(c)",
    "question": "Explain the working of Decoders and Encoders with suitable logic diagrams and truth tables.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Decoder. A decoder is a combinational circuit that converts n input lines into a maximum of 2ⁿ unique output lines; for each input combination exactly one output is 1 (a minterm generator). Shown below is a 2-to-4 decoder: each output is an AND gate of the inputs or their complements."
      },
      {
        "type": "image",
        "src": "/diagrams/image16.png",
        "caption": "Fig. 2-to-4 line decoder"
      },
      {
        "type": "table",
        "headers": [
          "A",
          "B",
          "D0",
          "D1",
          "D2",
          "D3"
        ],
        "rows": [
          [
            "0",
            "0",
            "1",
            "0",
            "0",
            "0"
          ],
          [
            "0",
            "1",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "0",
            "0",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "1",
            "0",
            "0",
            "0",
            "1"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Decoders often have an enable input (E = 0 → all outputs 0). Applications: memory address decoding/chip select, instruction (opcode) decoding, demultiplexing, implementing Boolean functions (OR the required minterms), 7-segment drivers. A 3-to-8 decoder uses 8 three-input AND gates; larger decoders are built from smaller ones."
      },
      {
        "type": "paragraph",
        "text": "Encoder. An encoder performs the inverse operation – it has 2ⁿ input lines (only one active) and n output lines that give the binary code of the active input. A 4-to-2 encoder:"
      },
      {
        "type": "image",
        "src": "/diagrams/image17.png",
        "caption": "Fig. 4-to-2 line encoder (OR gates)"
      },
      {
        "type": "table",
        "headers": [
          "D3",
          "D2",
          "D1",
          "D0",
          "A1",
          "A0"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "0",
            "0",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "0",
            "1",
            "0",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "0",
            "0",
            "0",
            "1",
            "1"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Equations: A1 = D2 + D3, A0 = D1 + D3. A simple encoder fails if two inputs are active together (or if all are 0), so a priority encoder is used, which gives the code of the highest-priority active input and a valid output V. Applications: keyboard encoding, interrupt priority systems, octal-to-binary conversion."
      }
    ],
    "hint": "Half Decoder (2-to-4 with 4 AND gates, truth table, applications), half Encoder (4-to-2 with 2 OR gates, A1=D2+D3, A0=D1+D3, priority encoder note, applications).",
    "outlinePoints": [
      "Define Decoder, draw 2-to-4 diagram & truth table, list applications",
      "Define Encoder, draw 4-to-2 diagram & truth table + Boolean equations",
      "Explain priority encoder fix for simultaneous inputs + applications"
    ],
    "keywords": [
      "Decoder",
      "Encoder",
      "Priority encoder",
      "Opcode",
      "Decode"
    ],
    "isHighYield": true,
    "lessonId": "l2-2",
    "highYieldGroup": "u2-decoders-encoders"
  },
  {
    "id": "u2_10m_3d",
    "unit": 2,
    "unitRoman": "II",
    "unitTitle": "Combinational and Sequential Circuits",
    "marks": 10,
    "qNum": "Q.3(d)",
    "question": "Apply the design procedure to develop a suitable 2 bit magnitude comparator circuit and write the 6 steps to design Combinational Circuit.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Six design steps: (1) state the problem; (2) determine the number of inputs (4) and outputs (3); (3) assign symbols: A = A1A0, B = B1B0; outputs (A>B), (A=B), (A<B); (4) write the truth table (16 combinations); (5) simplify the output functions with K-maps; (6) draw the logic diagram."
      },
      {
        "type": "table",
        "headers": [
          "A1",
          "A0",
          "B1",
          "B0",
          "A>B",
          "A=B",
          "A<B"
        ],
        "rows": [
          [
            "0",
            "0",
            "0",
            "0",
            "0",
            "1",
            "0"
          ],
          [
            "0",
            "0",
            "0",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "0",
            "0",
            "1",
            "0",
            "0",
            "0",
            "1"
          ],
          [
            "0",
            "0",
            "1",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "0",
            "1",
            "0",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "0",
            "1",
            "0",
            "1",
            "0",
            "1",
            "0"
          ],
          [
            "0",
            "1",
            "1",
            "0",
            "0",
            "0",
            "1"
          ],
          [
            "0",
            "1",
            "1",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "1",
            "0",
            "0",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "0",
            "0",
            "1",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "0",
            "1",
            "0",
            "0",
            "1",
            "0"
          ],
          [
            "1",
            "0",
            "1",
            "1",
            "0",
            "0",
            "1"
          ],
          [
            "1",
            "1",
            "0",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "0",
            "1",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "1",
            "0",
            "1",
            "0",
            "0"
          ],
          [
            "1",
            "1",
            "1",
            "1",
            "0",
            "1",
            "0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Simplification: define x1 = A1 ⊙ B1 = A1B1 + A1'B1' and x0 = A0 ⊙ B0 (bit-wise equality, XNOR). Then:"
      },
      {
        "type": "bullet",
        "text": "(A = B) = x1 · x0"
      },
      {
        "type": "bullet",
        "text": "(A > B) = A1·B1' + x1·A0·B0'   (A1 larger, or A1 = B1 and A0 larger)"
      },
      {
        "type": "bullet",
        "text": "(A < B) = A1'·B1 + x1·A0'·B0"
      },
      {
        "type": "image",
        "src": "/diagrams/image18.png",
        "caption": "Fig. 2-bit magnitude comparator (logic diagram)"
      },
      {
        "type": "paragraph",
        "text": "The most significant bits are compared first; only if they are equal does the result depend on the least significant bits. The circuit needs two XNOR gates, six AND gates, two OR gates and four inverters; it can be cascaded for wider words."
      }
    ],
    "hint": "6 steps → 16-row truth table for A1A0 vs B1B0 → define x1=(A1⊙B1), x0=(A0⊙B0) → equations for A=B, A>B, A<B → logic diagram. (Note our Check This Answer flag on AND gate count!)",
    "outlinePoints": [
      "List the 6 combinational design steps (4 inputs, 3 outputs)",
      "Write the 16-row truth table for A1A0 vs B1B0",
      "Define bit-equality x1, x0 and derive (A=B), (A>B), (A<B)",
      "Draw the logic diagram and note MSB-first comparison"
    ],
    "keywords": [
      "Comparator"
    ],
    "isHighYield": true,
    "lessonId": "l2-2",
    "highYieldGroup": "u2-comparators",
    "checkNote": {
      "label": "Check this answer",
      "reason": "The answer-key text states 'six AND gates', but both the Boolean equations ((A=B)=x1·x0, (A>B)=A1·B1'+x1·A0·B0', (A<B)=A1'·B1+x1·A0'·B0) and the accompanying logic diagram use five AND gates (2 two-input, 2 three-input, plus 1 two-input for A=B). Verify whether your examiner expects 5 AND gates."
    }
  },
  {
    "id": "u3_2m_1a",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 2,
    "qNum": "Q.1(a)",
    "question": "What are arithmetic micro-operations? Give any two examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Arithmetic micro-operations are elementary operations performed on numeric data stored in registers – add, subtract, increment, decrement, complement/negate. Examples: R3 ← R1 + R2 (addition) and R1 ← R1 + 1 (increment)."
      }
    ],
    "hint": "Elementary math operations on register contents: add, subtract, increment, decrement, complement/negate. Give two RTL examples.",
    "outlinePoints": [
      "Define arithmetic micro-operations",
      "Give two RTL examples like R3 ← R1 + R2 and R1 ← R1 + 1"
    ],
    "keywords": [
      "Registers",
      "Micro-operations"
    ],
    "isHighYield": false,
    "lessonId": "l3-2"
  },
  {
    "id": "u3_2m_1b",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 2,
    "qNum": "Q.1(b)",
    "question": "What is Bus Memory explain.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A bus is a common set of lines (data, address, control) through which registers and the memory unit communicate; any register can send data to any other register via the bus (using multiplexers or three-state buffers). Memory transfer: read → DR ← M[AR]; write → M[AR] ← R1, where the address register AR selects the memory word."
      }
    ],
    "hint": "Bus = shared set of lines (data, address, control) connecting registers & memory. Show memory read (DR ← M[AR]) and write (M[AR] ← R1).",
    "outlinePoints": [
      "Explain what a common bus is (MUX / tri-state buffers)",
      "Write memory read and write RTL transfers using AR"
    ],
    "keywords": [
      "Registers",
      "Multiplexer"
    ],
    "isHighYield": false,
    "lessonId": "l3-1"
  },
  {
    "id": "u3_2m_1c",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 2,
    "qNum": "Q.1(c)",
    "question": "What is Register Transfer Language (RTL)? Give one example of a register transfer operation.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "RTL is a symbolic notation used to describe the micro-operations (data movement and processing among registers) of a digital system. Registers are written in capital letters and ← denotes transfer. Example: R2 ← R1 copies R1 into R2; with a control condition: P: R2 ← R1 (executed only when P = 1)."
      }
    ],
    "hint": "Symbolic notation for register micro-operations: uppercase registers, ← for transfer, and P: for conditional control.",
    "outlinePoints": [
      "Define RTL",
      "Give basic transfer (R2 ← R1) and conditional transfer (P: R2 ← R1)"
    ],
    "keywords": [
      "Registers",
      "RTL",
      "Micro-operations",
      "Execute"
    ],
    "isHighYield": false,
    "lessonId": "l3-1"
  },
  {
    "id": "u3_2m_1d",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 2,
    "qNum": "Q.1(d)",
    "question": "What are the main parts of an instruction code? And explain it.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "An instruction code has two main parts: the operation code (opcode), which specifies the operation (add, load, jump…), and the operand/address field, which gives the memory address (or the operand itself). In the basic computer, a 16-bit instruction = 1 mode bit I (direct/indirect) + 3-bit opcode + 12-bit address."
      }
    ],
    "hint": "Two main parts: Opcode (what to do) and Address/Operand (where the data is). Basic computer 16-bit layout: 1 bit I + 3-bit opcode + 12-bit address.",
    "outlinePoints": [
      "Name and explain Opcode and Operand/Address",
      "Mention the 16-bit basic computer breakdown (I, 3-bit opcode, 12-bit address)"
    ],
    "keywords": [
      "Opcode",
      "Indirect",
      "Direct"
    ],
    "isHighYield": false,
    "lessonId": "l3-3"
  },
  {
    "id": "u3_2m_1e",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 2,
    "qNum": "Q.1(e)",
    "question": "What are the types of computer registers?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Registers of the basic computer: AR (address register, 12 bits), PC (program counter, 12), DR (data register, 16), AC (accumulator, 16), IR (instruction register, 16), TR (temporary register, 16), INPR (input register, 8) and OUTR (output register, 8)."
      }
    ],
    "hint": "List the 8 registers of Mano's Basic Computer with bit widths: AR(12), PC(12), DR(16), AC(16), IR(16), TR(16), INPR(8), OUTR(8).",
    "outlinePoints": [
      "List all 8 basic computer registers",
      "State each register's full name and bit width (12, 16, or 8 bits)"
    ],
    "keywords": [
      "Registers"
    ],
    "isHighYield": false,
    "lessonId": "l3-3"
  },
  {
    "id": "u3_2m_1f",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 2,
    "qNum": "Q.1(f)",
    "question": "How the computer identifies the memory reference instruction.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The control unit decodes bits 12–14 (opcode) of the IR. If the opcode is not 111 (D7 = 0), the instruction is a memory-reference instruction (opcodes 000–110). If the opcode is 111, bit 15 decides: I = 0 → register-reference, I = 1 → input-output instruction. For memory-reference, bit 15 (I) tells whether the address is direct (0) or indirect (1)."
      }
    ],
    "hint": "Decode opcode bits 12–14: if NOT 111 (D7 = 0), it's memory-reference (and bit 15 I picks direct/indirect). If D7 = 1, I=0 is register-ref and I=1 is I/O.",
    "outlinePoints": [
      "Explain decoding IR(12–14) → D7 = 0 means memory-reference",
      "Explain D7 = 1 split (I=0 register-ref, I=1 I/O)",
      "Mention bit 15 (I) selects direct vs indirect for memory-reference"
    ],
    "keywords": [
      "Control Unit",
      "Opcode",
      "Indirect",
      "Direct",
      "Decode"
    ],
    "isHighYield": false,
    "lessonId": "l3-3"
  },
  {
    "id": "u3_5m_2a",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(a)",
    "question": "Represent the transfer of data between two registers using Register Transfer Language (RTL).",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Transfer of the contents of register R1 into register R2 is written R2 ← R1. The source R1 keeps its contents; R2 is overwritten. The transfer takes place during the next clock pulse."
      },
      {
        "type": "paragraph",
        "text": "A transfer that must happen only under a control condition is written with a control function:  P: R2 ← R1, meaning \"if P = 1 then R2 ← R1\". Hardware realisation: P is ANDed with the clock to generate the Load pulse for R2."
      },
      {
        "type": "image",
        "src": "/diagrams/image19.png",
        "caption": "Fig. Hardware for P: R2 ← R1"
      },
      {
        "type": "image",
        "src": "/diagrams/image20.png",
        "caption": "Fig. Timing: P is set at t; the transfer occurs at the next clock edge"
      },
      {
        "type": "paragraph",
        "text": "Other notations: R1 ← R1 + R2 (arithmetic), R3 ← R1 ∧ R2 (logic), AR ← PC, M[AR] ← R1 (memory write), DR ← M[AR] (memory read); several micro-operations can be done simultaneously, separated by commas: T1: IR ← M[AR], PC ← PC + 1."
      }
    ],
    "hint": "Show R2 ← R1, then conditional P: R2 ← R1 with hardware diagram (P AND Clock → Load of R2) and timing diagram, plus simultaneous ops separated by commas.",
    "outlinePoints": [
      "Explain R2 ← R1 (source unchanged, happens on clock edge)",
      "Explain conditional transfer P: R2 ← R1 + draw hardware & timing diagrams",
      "Give examples of arithmetic, logic, memory, and comma-separated simultaneous transfers"
    ],
    "keywords": [
      "Registers",
      "RTL",
      "Micro-operations"
    ],
    "isHighYield": false,
    "lessonId": "l3-1"
  },
  {
    "id": "u3_5m_2b",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(b)",
    "question": "Explain arithmetic, logic and shift micro-operations with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "1. Arithmetic micro-operations"
      },
      {
        "type": "table",
        "headers": [
          "Symbolic",
          "Description"
        ],
        "rows": [
          [
            "R3 ← R1 + R2",
            "Add"
          ],
          [
            "R3 ← R1 − R2  (R1 + R2' + 1)",
            "Subtract using 2's complement"
          ],
          [
            "R2 ← R2'",
            "Complement"
          ],
          [
            "R2 ← R2' + 1",
            "Negate (2's complement)"
          ],
          [
            "R1 ← R1 + 1 / R1 ← R1 − 1",
            "Increment / decrement"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "2. Logic micro-operations (bit by bit): R3 ← R1 ∧ R2 (AND), R3 ← R1 ∨ R2 (OR), R3 ← R1 ⊕ R2 (XOR), R1 ← R1' (complement). Example: R1 = 1100, R2 = 1010 → AND = 1000, OR = 1110, XOR = 0110."
      },
      {
        "type": "paragraph",
        "text": "3. Shift micro-operations"
      },
      {
        "type": "table",
        "headers": [
          "Operation",
          "Symbol",
          "Example (R = 1011)"
        ],
        "rows": [
          [
            "Logical shift left",
            "R ← shl R",
            "0110 (0 enters at LSB)"
          ],
          [
            "Logical shift right",
            "R ← shr R",
            "0101 (0 enters at MSB)"
          ],
          [
            "Circular shift left",
            "R ← cil R",
            "0111"
          ],
          [
            "Circular shift right",
            "R ← cir R",
            "1101"
          ],
          [
            "Arithmetic shift right",
            "R ← ashr R",
            "1101 (sign bit kept)"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Shifts multiply or divide by 2 (shl ≈ ×2, ashr ≈ ÷2)."
      }
    ],
    "hint": "Three clean groups: (1) Arithmetic table (add/sub/comp/neg/inc/dec), (2) Logic bit-by-bit (AND/OR/XOR/NOT with 1100 & 1010), (3) Shift table (shl/shr/cil/cir/ashr on 1011).",
    "outlinePoints": [
      "Table of Arithmetic micro-operations",
      "Logic micro-operations with 4-bit example (1100, 1010)",
      "Table of 5 Shift micro-operations (logical, circular, arithmetic) on 1011"
    ],
    "keywords": [
      "2's complement",
      "Micro-operations",
      "ashr"
    ],
    "isHighYield": false,
    "lessonId": "l3-2"
  },
  {
    "id": "u3_5m_2c",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(c)",
    "question": "Explain how data can be transferred between the registers with suitable diagram.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image21.png",
        "caption": "Fig. Register transfer through a common bus (multiplexer-based)"
      },
      {
        "type": "paragraph",
        "text": "Connecting every register to every other one with separate lines is impractical, so a common bus is used. The outputs of all registers go to a bank of 4 × 1 multiplexers whose select lines (S1S0) pick the source register; the multiplexer output drives the common bus, which is connected to the inputs of all registers. The destination register is chosen by enabling its load (LD) input."
      },
      {
        "type": "paragraph",
        "text": "Example, R2 ← R1: (1) set S1S0 = 01 so that R1 is placed on the bus; (2) enable LD2 = 1; (3) at the next clock pulse the bus contents are loaded into R2. In symbols: BUS ← R1, R2 ← BUS. Three-state (tri-state) buffers can replace the multiplexers, and memory is connected to the bus through the address register (read: DR ← M[AR])."
      }
    ],
    "hint": "Explain why a common bus beats point-to-point wiring. Draw 4-register MUX-based bus (S1S0 select source, LD picks destination), trace R2 ← R1, mention tri-state buffers.",
    "outlinePoints": [
      "Draw the 4-register multiplexer-based common bus",
      "Explain how S1S0 selects source and LD enables destination",
      "Trace R2 ← R1 step-by-step (BUS ← R1, R2 ← BUS)",
      "Mention tri-state buffer alternative and memory read"
    ],
    "keywords": [
      "Registers",
      "Multiplexer",
      "Common bus"
    ],
    "isHighYield": false,
    "lessonId": "l3-1"
  },
  {
    "id": "u3_5m_2d",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(d)",
    "question": "Explain the instruction format and its different fields with a neat diagram.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "An instruction format defines the layout of the bits of an instruction. In the basic computer, the 16-bit instruction is divided into three fields:"
      },
      {
        "type": "image",
        "src": "/diagrams/image22.png",
        "caption": "Fig. Instruction format of the basic computer (memory-reference)"
      },
      {
        "type": "bullet",
        "text": "Mode bit I (bit 15): I = 0 → direct address; I = 1 → indirect address (the address field points to a memory word containing the effective address)."
      },
      {
        "type": "bullet",
        "text": "Opcode (bits 12–14): 3 bits → 8 operations. Opcode 000–110 are memory-reference instructions (AND, ADD, LDA, STA, BUN, BSA, ISZ); 111 means register-reference (I = 0) or I/O instruction (I = 1)."
      },
      {
        "type": "bullet",
        "text": "Address (bits 0–11): 12 bits → 4096 memory words; it gives the operand address (or, for register/I/O instructions, selects the particular operation)."
      },
      {
        "type": "paragraph",
        "text": "Example: 1 010 0000 0000 0101 → I = 1, opcode 010 (LDA), address 005 (indirect) → AC ← M[M[005]]."
      }
    ],
    "hint": "Draw the 16-bit Basic Computer format: Bit 15 (I), Bits 12–14 (Opcode), Bits 0–11 (Address). Explain each field and work an indirect LDA example.",
    "outlinePoints": [
      "Draw the 16-bit instruction format diagram",
      "Explain Mode bit I (direct/indirect), 3-bit Opcode, and 12-bit Address (4096 words)",
      "Show a concrete binary example like 1 010 000000000101 (indirect LDA 005)"
    ],
    "keywords": [
      "Opcode",
      "Indirect",
      "Direct"
    ],
    "isHighYield": true,
    "lessonId": "l3-3",
    "highYieldGroup": "u3-instructions"
  },
  {
    "id": "u3_5m_2e",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(e)",
    "question": "Explain the instruction cycle of a basic computer with suitable steps and timing/control operations.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The CPU repeats the instruction cycle for every instruction: (1) fetch, (2) decode, (3) read the effective address if indirect, (4) execute. The sequence counter SC supplies timing signals T0, T1, T2…"
      },
      {
        "type": "table",
        "headers": [
          "Timing",
          "Micro-operation",
          "Phase"
        ],
        "rows": [
          [
            "T0",
            "AR ← PC",
            "Fetch"
          ],
          [
            "T1",
            "IR ← M[AR], PC ← PC + 1",
            "Fetch"
          ],
          [
            "T2",
            "D0…D7 ← decode IR(12–14); AR ← IR(0–11); I ← IR(15)",
            "Decode"
          ],
          [
            "D7'IT3",
            "AR ← M[AR]",
            "Indirect address"
          ],
          [
            "D7'I'T3",
            "No operation",
            "–"
          ],
          [
            "D7I'T3",
            "Execute register-reference",
            "Execute"
          ],
          [
            "D7IT3",
            "Execute input-output",
            "Execute"
          ],
          [
            "D7'T4 …",
            "Execute memory-reference (T4–T6)",
            "Execute"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "At the end of the execute phase SC is cleared (SC ← 0) so the next instruction starts again with T0. If the interrupt flip-flop R = 1, an interrupt cycle is performed instead of a fetch."
      },
      {
        "type": "image",
        "src": "/diagrams/image23.png",
        "caption": "Fig. Flowchart of the instruction cycle"
      }
    ],
    "hint": "4 phases driven by T0, T1, T2...: Fetch (T0–T1), Decode (T2), Indirect EA (D7'IT3), Execute (T3 or T4–T6), then SC ← 0. Draw table + flowchart.",
    "outlinePoints": [
      "Write the timing/micro-operation table from T0 through Execute",
      "Draw the instruction cycle flowchart",
      "Mention SC ← 0 reset and interrupt flip-flop R check"
    ],
    "keywords": [
      "Flip-flop",
      "Indirect",
      "Direct",
      "Instruction cycle",
      "Fetch"
    ],
    "isHighYield": true,
    "lessonId": "l3-4",
    "highYieldGroup": "u3-instruction-cycle"
  },
  {
    "id": "u3_5m_2f",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(f)",
    "question": "Analyze the different logic micro-operations performed on the contents of registers.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Logic micro-operations treat each bit of a register as a binary variable and perform a Boolean operation bit by bit. With two variables there are 16 possible functions; the common ones are listed (A = 1100, B = 1010):"
      },
      {
        "type": "table",
        "headers": [
          "Micro-operation",
          "Boolean",
          "Result"
        ],
        "rows": [
          [
            "Clear  F ← 0",
            "F = 0",
            "0000"
          ],
          [
            "AND  F ← A ∧ B",
            "AB",
            "1000"
          ],
          [
            "OR  F ← A ∨ B",
            "A + B",
            "1110"
          ],
          [
            "XOR  F ← A ⊕ B",
            "A ⊕ B",
            "0110"
          ],
          [
            "NAND  F ← (A ∧ B)'",
            "(AB)'",
            "0111"
          ],
          [
            "NOR  F ← (A ∨ B)'",
            "(A + B)'",
            "0001"
          ],
          [
            "Complement  F ← A'",
            "A'",
            "0011"
          ],
          [
            "Transfer  F ← A",
            "A",
            "1100"
          ],
          [
            "Set  F ← all 1s",
            "F = 1",
            "1111"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Applications: Selective-set (OR) forces chosen bits to 1; selective-complement (XOR) toggles chosen bits; selective-clear (A ∧ B') clears chosen bits; mask (AND) clears unwanted bits; clear uses XOR of a register with itself; insert = mask followed by OR. Example: A = 1010, B (mask) = 0011: selective-set A ∨ B = 1011."
      }
    ],
    "hint": "Show bit-by-bit operations on A=1100, B=1010 (Clear, AND, OR, XOR, NAND, NOR, Comp, Transfer, Set) + 5 practical applications (selective-set, -complement, -clear, mask, insert).",
    "outlinePoints": [
      "Define bit-wise logic micro-operations (16 total functions)",
      "Write the result table for A=1100 and B=1010",
      "Explain selective-set, selective-complement, selective-clear, mask, and insert with example"
    ],
    "keywords": [
      "NAND",
      "Registers",
      "Micro-operations"
    ],
    "isHighYield": false,
    "lessonId": "l3-2"
  },
  {
    "id": "u3_5m_2g",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(g)",
    "question": "Explain timing and control in computer organization with a neat diagram.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image24.png",
        "caption": "Fig. Control unit of the basic computer (hardwired)"
      },
      {
        "type": "paragraph",
        "text": "All operations in the computer are synchronised by a master clock. The control unit generates the timing and control signals:"
      },
      {
        "type": "bullet",
        "text": "A 4-bit sequence counter (SC) counts the clock pulses; a 4 × 16 decoder converts it into the timing signals T0 – T15. SC is cleared (CLR) at the end of each instruction."
      },
      {
        "type": "bullet",
        "text": "The instruction register supplies the opcode (bits 12–14), which a 3 × 8 decoder converts into D0 – D7, and bit 15 gives I."
      },
      {
        "type": "bullet",
        "text": "The control logic gates combine T, D, I (and other flags like R and the register bits) to produce the control signals – register load/increment/clear, bus select, ALU operation and memory read/write."
      },
      {
        "type": "paragraph",
        "text": "Example: the signal that loads AR is LD(AR) = R'T0 + R'T2 + D7'IT3, i.e. AR ← PC at T0, AR ← IR(0–11) at T2 and AR ← M[AR] at T3 for indirect addressing. This design is called hardwired control."
      }
    ],
    "hint": "Draw the hardwired control unit: 4-bit Sequence Counter (SC) → 4×16 decoder (T0–T15), IR opcode → 3×8 decoder (D0–D7), bit 15 → I, all feeding Control Logic Gates.",
    "outlinePoints": [
      "Draw the hardwired control unit block diagram",
      "Explain SC + 4×16 decoder (T0–T15) and IR + 3×8 decoder (D0–D7)",
      "Explain how control logic gates generate LD/INR/CLR/ALU/bus signals",
      "Give the example equation LD(AR) = R'T0 + R'T2 + D7'IT3"
    ],
    "keywords": [
      "ALU",
      "Control Unit",
      "Decoder",
      "Opcode",
      "Indirect"
    ],
    "isHighYield": true,
    "lessonId": "l3-4",
    "highYieldGroup": "u3-control-unit"
  },
  {
    "id": "u3_5m_2h",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 5,
    "qNum": "Q.2(h)",
    "question": "What are computer instructions? Explain the different types of computer instructions with instruction formats.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Computer instructions are binary-coded commands that tell the computer which operation to perform and on which data; a program is a sequence of instructions stored in memory. The basic computer has three instruction types (distinguished by opcode and I bit):"
      },
      {
        "type": "image",
        "src": "/diagrams/image25.png",
        "caption": "Fig. Instruction formats of the basic computer"
      },
      {
        "type": "bullet",
        "text": "Memory-reference (opcode 000–110): 7 instructions – AND, ADD, LDA, STA, BUN, BSA, ISZ; address field gives the operand address; I selects direct/indirect."
      },
      {
        "type": "bullet",
        "text": "Register-reference (0111 + 12-bit code): 12 instructions that operate on AC and E without memory – CLA, CLE, CMA, CME, CIR, CIL, INC, SPA, SNA, SZA, SZE, HLT."
      },
      {
        "type": "bullet",
        "text": "Input-output (1111 + 12-bit code): 6 instructions – INP, OUT, SKI, SKO, ION, IOF – for transferring data between AC and I/O registers and controlling interrupts."
      }
    ],
    "hint": "Basic Computer has 3 types based on opcode & I bit: Memory-reference (7 instructions), Register-reference (12 instructions, 0111), and I/O (6 instructions, 1111).",
    "outlinePoints": [
      "Define computer instruction and program",
      "Draw the three 16-bit instruction formats",
      "List and summarize Memory-reference (7), Register-reference (12), and I/O (6) instructions"
    ],
    "keywords": [
      "Registers",
      "Opcode",
      "Indirect",
      "Direct"
    ],
    "isHighYield": true,
    "lessonId": "l3-3",
    "highYieldGroup": "u3-instructions"
  },
  {
    "id": "u3_10m_3a",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 10,
    "qNum": "Q.3(a)",
    "question": "Differentiate between the following: a. Hardwired Control b. Microprogrammed Control",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The control unit generates the control signals that sequence the micro-operations. It can be implemented in two ways."
      },
      {
        "type": "paragraph",
        "text": "(a) Hardwired control: the control signals are produced by a fixed network of logic gates, decoders and flip-flops. Changing the instruction set needs redesign of the circuit."
      },
      {
        "type": "image",
        "src": "/diagrams/image26.png",
        "caption": "Fig. Hardwired control unit"
      },
      {
        "type": "paragraph",
        "text": "(b) Microprogrammed control: each machine instruction is carried out by a sequence of microinstructions (a microprogram) stored in a control memory (ROM); the control address register (CAR) selects the next microinstruction and the control data register holds the one being executed."
      },
      {
        "type": "image",
        "src": "/diagrams/image27.png",
        "caption": "Fig. Microprogrammed control unit"
      },
      {
        "type": "table",
        "headers": [
          "Basis",
          "Hardwired control",
          "Microprogrammed control"
        ],
        "rows": [
          [
            "Implementation",
            "Gates, decoders, flip-flops (sequential circuit)",
            "Control memory with microprograms"
          ],
          [
            "Speed",
            "Fast (no memory access)",
            "Slower (control-memory fetch)"
          ],
          [
            "Flexibility",
            "Difficult to modify – redesign needed",
            "Easy – change/add microprogram"
          ],
          [
            "Design effort / cost",
            "Complex for large instruction sets",
            "Systematic, cheaper to design; extra ROM cost"
          ],
          [
            "Error correction",
            "Hard",
            "Easy (change microcode)"
          ],
          [
            "Instruction set",
            "Suits simple sets (RISC)",
            "Suits complex sets (CISC)"
          ],
          [
            "Examples",
            "MIPS, most RISC CPUs",
            "IBM 360, Intel x86 (partly)"
          ]
        ]
      }
    ],
    "hint": "Explain both control designs with their two block diagrams, then give a crisp 7-row comparison table (implementation, speed, flexibility, cost, error fix, ISA, examples).",
    "outlinePoints": [
      "Define & draw (a) Hardwired Control Unit",
      "Define & draw (b) Microprogrammed Control Unit (CAR, control memory, CDR)",
      "Write a 7-row comparison table contrasting speed, flexibility, RISC vs CISC, and examples"
    ],
    "keywords": [
      "Control Unit",
      "Flip-flop",
      "Decoder",
      "RTL",
      "Micro-operations"
    ],
    "isHighYield": true,
    "lessonId": "l3-4",
    "highYieldGroup": "u3-control-unit"
  },
  {
    "id": "u3_10m_3b",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 10,
    "qNum": "Q.3(b)",
    "question": "Analyze the different steps involved in the instruction cycle.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The instruction cycle is the complete process by which the CPU fetches an instruction from memory, decodes it and executes it. It is repeated continuously from the start of the program until HLT."
      },
      {
        "type": "image",
        "src": "/diagrams/image23.png",
        "caption": "Fig. Flowchart of the instruction cycle"
      },
      {
        "type": "paragraph",
        "text": "Step 1 – Fetch: T0: AR ← PC (address of next instruction to AR). T1: IR ← M[AR], PC ← PC + 1 (instruction read into IR; PC points to the next instruction)."
      },
      {
        "type": "paragraph",
        "text": "Step 2 – Decode: T2: the opcode IR(12–14) is decoded into D0–D7, AR ← IR(0–11), I ← IR(15). The decoded values tell whether it is memory-reference (D7 = 0), register-reference (D7 = 1, I = 0) or I/O (D7 = 1, I = 1)."
      },
      {
        "type": "paragraph",
        "text": "Step 3 – Read the effective address (indirect): if D7 = 0 and I = 1, then at T3: AR ← M[AR]; if I = 0 nothing is done (direct address)."
      },
      {
        "type": "paragraph",
        "text": "Step 4 – Execute: memory-reference instructions execute in T4–T6 (e.g. ADD: T4 DR ← M[AR]; T5 AC ← AC + DR, E ← Cout, SC ← 0). Register-reference (D7I'T3) and I/O (D7IT3) are executed in T3 with the bits B0–B11 selecting the operation; SC ← 0 at the end."
      },
      {
        "type": "paragraph",
        "text": "Step 5 – Next instruction / interrupt: SC is cleared, and control returns to T0 for the next instruction. If an interrupt request is pending (R = 1) and interrupts are enabled, the interrupt cycle stores the return address (M[0] ← PC), sets PC to 1 and clears IEN and R."
      },
      {
        "type": "paragraph",
        "text": "Analysis: the fetch and decode phases are common to all instructions (3 clock pulses), whereas execute time depends on the instruction type, so the instruction time varies between 4 and 7 clock periods."
      }
    ],
    "hint": "Full 5-step walkthrough with flowchart: Step 1 Fetch (T0–T1), Step 2 Decode (T2), Step 3 Indirect EA (T3), Step 4 Execute (T3 or T4–T6 with ADD example), Step 5 Next/Interrupt + timing analysis.",
    "outlinePoints": [
      "Draw the complete instruction cycle flowchart",
      "Detail Fetch (T0, T1), Decode (T2), and Indirect (D7'IT3) with exact RTL",
      "Detail Execute for memory-ref (ADD), register-ref, and I/O + SC ← 0",
      "Explain interrupt handling (R=1) and why instructions take 4–7 clock cycles"
    ],
    "keywords": [
      "ALU",
      "Opcode",
      "Indirect",
      "Direct",
      "Instruction cycle"
    ],
    "isHighYield": true,
    "lessonId": "l3-4",
    "highYieldGroup": "u3-instruction-cycle"
  },
  {
    "id": "u3_10m_3c",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 10,
    "qNum": "Q.3(c)",
    "question": "Explain the memory-reference instructions of a basic computer with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Memory-reference instructions have opcode 000–110 (D0–D6 = 1). The effective address is in AR (after the indirect cycle if I = 1). The hexadecimal code is 0xxx–6xxx for direct and 8xxx–Exxx for indirect addressing."
      },
      {
        "type": "table",
        "headers": [
          "Symbol",
          "Opcode (I=0)",
          "Operation",
          "Execution (RTL)"
        ],
        "rows": [
          [
            "AND",
            "0xxx",
            "AND memory word to AC",
            "D0T4: DR ← M[AR];  D0T5: AC ← AC ∧ DR, SC ← 0"
          ],
          [
            "ADD",
            "1xxx",
            "Add memory word to AC",
            "D1T4: DR ← M[AR];  D1T5: AC ← AC + DR, E ← Cout, SC ← 0"
          ],
          [
            "LDA",
            "2xxx",
            "Load memory word to AC",
            "D2T4: DR ← M[AR];  D2T5: AC ← DR, SC ← 0"
          ],
          [
            "STA",
            "3xxx",
            "Store AC in memory",
            "D3T4: M[AR] ← AC, SC ← 0"
          ],
          [
            "BUN",
            "4xxx",
            "Branch unconditionally",
            "D4T4: PC ← AR, SC ← 0"
          ],
          [
            "BSA",
            "5xxx",
            "Branch and save return address",
            "D5T4: M[AR] ← PC, AR ← AR + 1;  D5T5: PC ← AR, SC ← 0"
          ],
          [
            "ISZ",
            "6xxx",
            "Increment and skip if zero",
            "D6T4: DR ← M[AR];  D6T5: DR ← DR + 1;  D6T6: M[AR] ← DR, if (DR = 0) then PC ← PC + 1, SC ← 0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Examples:"
      },
      {
        "type": "bullet",
        "text": "LDA 500 (code 2500H): AC ← M[500]. If M[500] = 1234H, AC becomes 1234H."
      },
      {
        "type": "bullet",
        "text": "ADD 501 (1501H): if AC = 00FFH and M[501] = 0001H, AC becomes 0100H."
      },
      {
        "type": "bullet",
        "text": "STA 502 (3502H): stores the AC in location 502; AC is not changed."
      },
      {
        "type": "bullet",
        "text": "BUN 200 (4200H): next instruction is fetched from address 200 (jump)."
      },
      {
        "type": "bullet",
        "text": "BSA 300 (5300H): M[300] ← PC (return address), PC ← 301 – used for subroutine calls; return is done by BUN 300 with indirect mode (C300H)."
      },
      {
        "type": "bullet",
        "text": "ISZ 600 (6600H): M[600] is incremented; if it becomes 0 the next instruction is skipped – used for loop counters."
      }
    ],
    "hint": "Cover all 7 memory-reference instructions: AND (0), ADD (1), LDA (2), STA (3), BUN (4), BSA (5), ISZ (6) — table of opcodes & RTL + concrete hex examples for each!",
    "outlinePoints": [
      "Explain opcode 000–110 (0xxx–6xxx direct, 8xxx–Exxx indirect)",
      "Draw the 7-row table with Symbol, Opcode, Operation, and exact RTL (T4–T6)",
      "Give concrete worked examples for LDA, ADD, STA, BUN, BSA (subroutine call/return), and ISZ (loops)"
    ],
    "keywords": [
      "RTL",
      "Opcode",
      "Indirect",
      "Direct",
      "Fetch"
    ],
    "isHighYield": true,
    "lessonId": "l3-3",
    "highYieldGroup": "u3-instructions"
  },
  {
    "id": "u3_10m_3d",
    "unit": 3,
    "unitRoman": "III",
    "unitTitle": "Register Transfer, Micro-operations and Basic Computer Organization",
    "marks": 10,
    "qNum": "Q.3(d)",
    "question": "Explain the fetch, decode, and execute cycles of computer instruction.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Every instruction is processed in three main cycles. Timing signals T0, T1, T2… from the sequence counter control each step."
      },
      {
        "type": "image",
        "src": "/diagrams/image23.png",
        "caption": "Fig. Fetch – decode – execute flowchart"
      },
      {
        "type": "paragraph",
        "text": "1. Fetch cycle (T0, T1): the PC holds the address of the instruction. T0: AR ← PC. T1: IR ← M[AR], PC ← PC + 1. After T1 the instruction is in IR and PC points to the next one."
      },
      {
        "type": "paragraph",
        "text": "2. Decode cycle (T2): the 3-bit opcode in IR(12–14) is decoded by the 3 × 8 decoder (D0–D7); the mode bit is copied to I and the address field to AR: D0…D7 ← decode IR(12–14), AR ← IR(0–11), I ← IR(15). If D7I = 1 an I/O instruction follows; if D7I' = 1 a register-reference; if D7' = 1 a memory-reference (with an extra T3: AR ← M[AR] when I = 1)."
      },
      {
        "type": "paragraph",
        "text": "3. Execute cycle (T3 onwards): the micro-operations specific to the instruction are executed, and finally SC ← 0 to restart the cycle."
      },
      {
        "type": "paragraph",
        "text": "Example – ADD 500 (IR = 1500H) at address 300:"
      },
      {
        "type": "table",
        "headers": [
          "Timing",
          "Operation",
          "Register values"
        ],
        "rows": [
          [
            "T0",
            "AR ← PC",
            "AR = 300"
          ],
          [
            "T1",
            "IR ← M[300], PC ← PC + 1",
            "IR = 1500, PC = 301"
          ],
          [
            "T2",
            "Decode; AR ← IR(0–11); I ← IR(15)",
            "D1 = 1, AR = 500, I = 0"
          ],
          [
            "T4",
            "DR ← M[AR]",
            "DR = M[500]"
          ],
          [
            "T5",
            "AC ← AC + DR, E ← Cout, SC ← 0",
            "AC = AC + M[500]"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "For a register-reference instruction such as CLA (7800H), execution is in T3: AC ← 0, SC ← 0. For an indirect instruction, T3 reads the effective address (AR ← M[AR]) before the execute steps. The cycle is repeated until the HLT instruction clears the start flip-flop."
      }
    ],
    "hint": "Break down Fetch (T0–T1), Decode (T2), and Execute (T3+) with flowchart, then trace ADD 500 (1500H) at address 300 in a timing table (remember T3 is skipped for direct mode!).",
    "outlinePoints": [
      "Draw the fetch-decode-execute flowchart",
      "Explain Fetch (T0–T1), Decode (T2), and Execute (T3+) phases",
      "Trace ADD 500 (IR=1500H) step-by-step in a T0–T5 register table",
      "Briefly mention register-ref (CLA at T3), indirect T3, and HLT"
    ],
    "keywords": [
      "ALU",
      "Flip-flop",
      "Decoder",
      "Micro-operations",
      "Opcode"
    ],
    "isHighYield": true,
    "lessonId": "l3-4",
    "highYieldGroup": "u3-instruction-cycle"
  },
  {
    "id": "u4_2m_1a",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 2,
    "qNum": "Q.1(a)",
    "question": "Define microprogram.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A microprogram is a sequence of microinstructions stored in the control memory (ROM) that generates the control signals needed to execute one machine instruction. Each microinstruction specifies one or more micro-operations."
      }
    ],
    "hint": "A microprogram is a sequence of microinstructions stored in control memory (ROM) that generates the control signals for one machine instruction.",
    "outlinePoints": [
      "Define microprogram (stored in control memory / ROM)",
      "Explain each microinstruction specifies one or more micro-operations"
    ],
    "keywords": [
      "Micro-operations",
      "Execute",
      "Control memory"
    ],
    "isHighYield": false,
    "lessonId": "l4-1"
  },
  {
    "id": "u4_2m_1b",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 2,
    "qNum": "Q.1(b)",
    "question": "What is program control?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Program control refers to the instructions (branch, jump, call, return, skip, compare, test) that change the normal sequential flow of execution by loading a new address into the program counter, usually depending on status-bit conditions."
      }
    ],
    "hint": "Instructions (branch, jump, call, return, skip, compare, test) that alter normal sequential execution by changing PC based on status flags.",
    "outlinePoints": [
      "Define program control (modifying PC flow)",
      "Name examples (branch, jump, call, return, compare) and mention status bits"
    ],
    "keywords": [
      "Program control"
    ],
    "isHighYield": false,
    "lessonId": "l4-2"
  },
  {
    "id": "u4_2m_1c",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 2,
    "qNum": "Q.1(c)",
    "question": "What are general-purpose registers?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "General-purpose registers (R0, R1 … Rn) are CPU registers that can hold either data or addresses and can be used by any instruction (as accumulators, index or pointer registers). They reduce memory accesses and speed up programs."
      }
    ],
    "hint": "CPU registers (R0…Rn) usable by any instruction for data or addresses (accumulator, index, pointer) to minimize slow memory accesses.",
    "outlinePoints": [
      "Define general-purpose registers",
      "Give roles (data, address, index) and main benefit (fewer memory accesses, faster)"
    ],
    "keywords": [
      "Registers"
    ],
    "isHighYield": false,
    "lessonId": "l4-2"
  },
  {
    "id": "u4_2m_1d",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 2,
    "qNum": "Q.1(d)",
    "question": "Define addressing mode. Give two examples",
    "blocks": [
      {
        "type": "paragraph",
        "text": "An addressing mode is the rule by which the address field of an instruction is interpreted to obtain the effective address of the operand. Examples: Immediate mode (the operand is in the instruction itself, e.g. LDA #5) and Direct mode (the address field is the operand's address, e.g. LDA 500). Others: indirect, register, indexed, relative."
      }
    ],
    "hint": "Rule for interpreting an instruction's address field to compute the operand's Effective Address (EA). Give Immediate and Direct examples.",
    "outlinePoints": [
      "Define addressing mode and Effective Address (EA)",
      "Give two clear examples (Immediate like LDA #5, Direct like LDA 500)"
    ],
    "keywords": [
      "Indirect",
      "Direct",
      "Addressing mode",
      "Immediate",
      "Indexed"
    ],
    "isHighYield": false,
    "lessonId": "l4-2"
  },
  {
    "id": "u4_2m_1e",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 2,
    "qNum": "Q.1(e)",
    "question": "Draw the block diagram of microprogrammed control organization.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image27.png",
        "caption": "Fig. Microprogrammed control organization"
      }
    ],
    "hint": "Draw the microprogrammed control loop: External/Status → Next-Address Generator (Sequencer) → CAR → Control Memory (ROM) → Control Data Register → Control Word + next address info.",
    "outlinePoints": [
      "Draw the 4-block loop: Next-Address Generator, CAR, Control Memory, CDR",
      "Label control word output and next-address feedback path"
    ],
    "keywords": [
      "Microprogrammed"
    ],
    "isHighYield": false,
    "lessonId": "l4-1"
  },
  {
    "id": "u4_2m_1f",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 2,
    "qNum": "Q.1(f)",
    "question": "Identify the addressing mode used when the operand is specified directly in the instruction.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The immediate addressing mode – the operand itself is a part of the instruction (the address field contains the operand), so no memory access is needed to fetch it."
      }
    ],
    "hint": "Immediate addressing mode — the operand itself sits right inside the instruction's address field, requiring zero extra memory fetches.",
    "outlinePoints": [
      "Name Immediate addressing mode",
      "Explain the operand is inside the instruction (no memory access needed)"
    ],
    "keywords": [
      "Direct",
      "Fetch",
      "Addressing mode",
      "Immediate"
    ],
    "isHighYield": false,
    "lessonId": "l4-2"
  },
  {
    "id": "u4_5m_2a",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(a)",
    "question": "Explain the different types of addressing modes used in computer organization with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The effective address (EA) is the address of the operand. The common modes are:"
      },
      {
        "type": "bullet",
        "text": "Implied: operand is implicit in the opcode (e.g. CMA complements AC)."
      },
      {
        "type": "bullet",
        "text": "Immediate: operand is in the instruction (address field = operand)."
      },
      {
        "type": "bullet",
        "text": "Register: operand is in a CPU register named in the instruction."
      },
      {
        "type": "bullet",
        "text": "Register indirect: the register holds the memory address of the operand."
      },
      {
        "type": "bullet",
        "text": "Autoincrement / autodecrement: like register indirect, but the register is incremented after (decremented before) the access."
      },
      {
        "type": "bullet",
        "text": "Direct: the address field is the EA."
      },
      {
        "type": "bullet",
        "text": "Indirect: the address field gives the location that holds the EA."
      },
      {
        "type": "bullet",
        "text": "Relative: EA = PC + address field (position-independent code, branches)."
      },
      {
        "type": "bullet",
        "text": "Indexed: EA = index register + address field (arrays).  Base register: EA = base register + address field (relocation)."
      },
      {
        "type": "paragraph",
        "text": "Example: instruction LOAD 500 at address 200 (next instruction address PC = 202); R1 = 400, XR = 100; memory: M[399] = 450, M[400] = 700, M[500] = 800, M[600] = 900, M[702] = 325, M[800] = 300."
      },
      {
        "type": "table",
        "headers": [
          "Mode",
          "EA",
          "AC loaded with"
        ],
        "rows": [
          [
            "Direct",
            "500",
            "800"
          ],
          [
            "Immediate",
            "–",
            "500"
          ],
          [
            "Indirect",
            "800",
            "300"
          ],
          [
            "Relative",
            "202 + 500 = 702",
            "325"
          ],
          [
            "Indexed",
            "100 + 500 = 600",
            "900"
          ],
          [
            "Register",
            "–",
            "400 (R1)"
          ],
          [
            "Register indirect",
            "400",
            "700"
          ],
          [
            "Autoincrement",
            "400 (R1 → 401)",
            "700"
          ],
          [
            "Autodecrement",
            "399 (R1 decremented first)",
            "450"
          ]
        ]
      }
    ],
    "hint": "List 9 modes (Implied, Immediate, Register, Reg-Indirect, Autoinc/dec, Direct, Indirect, Relative, Indexed/Base) + work the classic LOAD 500 (at 200, PC=202) table!",
    "outlinePoints": [
      "Define EA and summarize all 9 addressing modes cleanly",
      "Set up the LOAD 500 memory/register snapshot (PC=202, R1=400, XR=100)",
      "Compute EA and loaded AC value in a 9-row table"
    ],
    "keywords": [
      "Opcode",
      "Indirect",
      "Direct",
      "Addressing mode",
      "Immediate"
    ],
    "isHighYield": true,
    "lessonId": "l4-2",
    "highYieldGroup": "u4-addressing-program-ctrl",
    "numericalId": "num-addressing-modes"
  },
  {
    "id": "u4_5m_2b",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(b)",
    "question": "Using the algorithm for signed-magnitude subtraction, perform ((+14)-(+15)\\) and draw the corresponding flowchart.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image28.png",
        "caption": "Fig. Flowchart for signed-magnitude addition and subtraction"
      },
      {
        "type": "paragraph",
        "text": "Algorithm: for subtraction the sign of B is complemented (Bs ← Bs') and then the addition procedure is followed: if signs of A and B are equal, add magnitudes; if different, subtract magnitudes (EA ← A + B' + 1) and if E = 0 (A < B) take the 2's complement of A and complement As."
      },
      {
        "type": "paragraph",
        "text": "Given: A = +14 = 0 01110 (As = 0), B = +15 = 0 01111 (Bs = 0); operation A − B."
      },
      {
        "type": "bullet",
        "text": "Complement sign of B: Bs = 0 → 1. Now As ⊕ Bs = 1 (signs differ) → subtract magnitudes."
      },
      {
        "type": "bullet",
        "text": "EA ← A + B' + 1 = 01110 + 10000 + 1 = 11111, so E = 0 (no carry) → A < B."
      },
      {
        "type": "bullet",
        "text": "A ← A' + 1 = 00000 + 1 = 00001; As ← As' = 1."
      },
      {
        "type": "paragraph",
        "text": "Result = 1 00001 = −1, i.e. (+14) − (+15) = −1 ✓."
      }
    ],
    "hint": "Signed-magnitude subtraction flips B's sign (Bs ← Bs') then uses addition! Here +14 − (+15) becomes signs different → A + B' + 1 = 11111 (E=0 → A<B) → negate & flip As → −1.",
    "outlinePoints": [
      "Draw the signed-magnitude add/sub flowchart",
      "Write A = 0 01110 and B = 0 01111; flip Bs → 1 (signs differ)",
      "Compute EA = A + B' + 1 = 01110 + 10000 + 1 = 11111 (E = 0)",
      "Since E = 0, take 2's comp of A (00001) and flip As → 1 00001 (−1)"
    ],
    "keywords": [
      "2's complement",
      "CAR",
      "Signed-magnitude"
    ],
    "isHighYield": true,
    "lessonId": "l4-3",
    "highYieldGroup": "u4-signed-mag-addsub",
    "numericalId": "num-sm-sub-14-15"
  },
  {
    "id": "u4_5m_2c",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(c)",
    "question": "Draw and explain the block diagram showing the data flow between registers.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image29.png",
        "caption": "Fig. Data flow between registers of the basic computer through the common bus"
      },
      {
        "type": "paragraph",
        "text": "The registers and the memory are connected to a 16-bit common bus; the control unit selects (through bus-select lines S2S1S0) which register places its contents on the bus, and the LD, INR and CLR inputs of the destination register decide which register is loaded."
      },
      {
        "type": "bullet",
        "text": "AR (address register) supplies the address to memory; PC holds the address of the next instruction and can load/increment."
      },
      {
        "type": "bullet",
        "text": "DR receives memory words and operands; IR receives the fetched instruction; TR holds temporary data."
      },
      {
        "type": "bullet",
        "text": "AC holds operands/results: the ALU gets inputs from AC and DR (and INPR) and its output goes to AC (and bus)."
      },
      {
        "type": "bullet",
        "text": "INPR / OUTR transfer data between the AC and the input/output devices."
      },
      {
        "type": "paragraph",
        "text": "Example – fetch: T0: AR ← PC (PC puts its value on the bus, AR is loaded); T1: IR ← M[AR] (memory output on bus, IR loaded), PC ← PC + 1."
      }
    ],
    "hint": "Draw the Basic Computer common bus diagram (AR, PC, DR, AC, IR, TR, INPR/OUTR, ALU, Memory), explain bus select S2S1S0 + LD/INR/CLR, and trace Fetch (T0, T1).",
    "outlinePoints": [
      "Draw the common-bus register data-flow block diagram",
      "Explain S2S1S0 bus selection and LD/INR/CLR control lines",
      "Summarize roles of AR, PC, DR, IR, TR, AC/ALU, INPR/OUTR",
      "Give the Fetch cycle trace (T0: AR←PC; T1: IR←M[AR], PC←PC+1)"
    ],
    "keywords": [
      "ALU",
      "Control Unit",
      "Registers",
      "Common bus",
      "Fetch"
    ],
    "isHighYield": false,
    "lessonId": "l4-2"
  },
  {
    "id": "u4_5m_2d",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(d)",
    "question": "Using the algorithm for signed-magnitude addition, perform     (+15) +      (-14).",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Algorithm: compare the signs. Equal signs → add the magnitudes (EA ← A + B; the sign of A is retained; E is the overflow). Different signs → subtract magnitudes by EA ← A + B' + 1: if E = 1, A ≥ B and the sign of A is kept (set As = 0 if A = 0); if E = 0, A < B, so A ← A' + 1 and As ← As'."
      },
      {
        "type": "paragraph",
        "text": "Given: A = +15 = 0 01111; B = −14 = 1 01110."
      },
      {
        "type": "bullet",
        "text": "As ⊕ Bs = 0 ⊕ 1 = 1 → signs differ → subtract magnitudes."
      },
      {
        "type": "bullet",
        "text": "B' = 10001; EA ← 01111 + 10001 + 1 = 1 00001 → E = 1, A = 00001."
      },
      {
        "type": "bullet",
        "text": "E = 1 → A ≥ B, the sign of A remains +; A ≠ 0 so As stays 0."
      },
      {
        "type": "paragraph",
        "text": "Result = 0 00001 = +1, i.e. (+15) + (−14) = +1 ✓."
      }
    ],
    "hint": "(+15) + (−14): signs differ (As⊕Bs=1) → subtract magnitudes: EA = 01111 + 10001 + 1 = 1 00001 (E=1 → A≥B) → keep As=0 → result +1!",
    "outlinePoints": [
      "State equal-sign vs different-sign addition rules",
      "Write A = 0 01111 (+15), B = 1 01110 (−14)",
      "Compute EA = A + B' + 1 = 1 00001 (E = 1)",
      "Since E = 1, keep A = 00001 and sign As = 0 → +1"
    ],
    "keywords": [
      "Signed-magnitude"
    ],
    "isHighYield": true,
    "lessonId": "l4-3",
    "highYieldGroup": "u4-signed-mag-addsub",
    "numericalId": "num-sm-add-15-14"
  },
  {
    "id": "u4_5m_2e",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(e)",
    "question": "Using Booth's multiplication algorithm, evaluate (-9) x (+13).",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Use 5-bit registers: multiplicand BR = −9 = 10111, multiplier QR = +13 = 01101; AC = 00000, Qn+1 = 0, SC = 5. For each step examine Qn Qn+1: 10 → AC ← AC − BR; 01 → AC ← AC + BR; 00/11 → no operation; then arithmetic shift right (ashr) of AC, QR, Qn+1; SC ← SC − 1."
      },
      {
        "type": "table",
        "headers": [
          "Qn Qn+1",
          "Operation",
          "AC",
          "QR",
          "Qn+1",
          "SC"
        ],
        "rows": [
          [
            "",
            "Initial",
            "00000",
            "01101",
            "0",
            "5"
          ],
          [
            "10",
            "AC ← AC − BR",
            "01001",
            "01101",
            "0",
            ""
          ],
          [
            "",
            "ashr  (AC, QR, Qn+1)",
            "00100",
            "10110",
            "1",
            "4"
          ],
          [
            "01",
            "AC ← AC + BR",
            "11011",
            "10110",
            "1",
            ""
          ],
          [
            "",
            "ashr  (AC, QR, Qn+1)",
            "11101",
            "11011",
            "0",
            "3"
          ],
          [
            "10",
            "AC ← AC − BR",
            "00110",
            "11011",
            "0",
            ""
          ],
          [
            "",
            "ashr  (AC, QR, Qn+1)",
            "00011",
            "01101",
            "1",
            "2"
          ],
          [
            "11",
            "ashr  (AC, QR, Qn+1)",
            "00001",
            "10110",
            "1",
            "1"
          ],
          [
            "01",
            "AC ← AC + BR",
            "11000",
            "10110",
            "1",
            ""
          ],
          [
            "",
            "ashr  (AC, QR, Qn+1)",
            "11100",
            "01011",
            "0",
            "0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Product = AC QR = 11100 01011 = −117 in 2's complement (1110001011 = −512 + 256 + 128 + 8 + 2 + 1 = −117). Hence (−9) × (+13) = −117 ✓."
      }
    ],
    "hint": "5-bit Booth's: BR = −9 = 10111 (−BR = 01001), QR = +13 = 01101, AC = 00000, Qn+1 = 0, SC = 5. Check Qn Qn+1 (10: −BR, 01: +BR, 00/11: shift only) then ashr!",
    "outlinePoints": [
      "Set up 5-bit BR=10111, −BR=01001, QR=01101, AC=00000, Qn+1=0, SC=5",
      "State the 4-case Booth rule (10, 01, 00, 11) + ashr",
      "Complete all 5 cycles in the register table down to SC = 0",
      "Read AC QR = 11100 01011 and verify = −117"
    ],
    "keywords": [
      "2's complement",
      "ALU",
      "Registers",
      "ashr"
    ],
    "isHighYield": true,
    "lessonId": "l4-4",
    "highYieldGroup": "u4-booth",
    "numericalId": "num-booth-neg9-pos13"
  },
  {
    "id": "u4_5m_2f",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(f)",
    "question": "Describe three-address, two-address, and one-address instructions with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "The number of address fields in an instruction decides its type. Consider evaluating X = (A + B) × (C + D)."
      },
      {
        "type": "paragraph",
        "text": "Three-address instructions – each instruction specifies two source operands and the destination: ADD R1, A, B  (R1 ← M[A] + M[B]);  ADD R2, C, D;  MUL X, R1, R2. Programs are short (3 instructions) but each instruction is long."
      },
      {
        "type": "paragraph",
        "text": "Two-address instructions – the first operand is both a source and the destination: MOV R1, A;  ADD R1, B;  MOV R2, C;  ADD R2, D;  MUL R1, R2;  MOV X, R1  (6 instructions). Commonly used in commercial computers."
      },
      {
        "type": "paragraph",
        "text": "One-address instructions – use an implied accumulator (AC) for the other operand and the result: LOAD A;  ADD B;  STORE T;  LOAD C;  ADD D;  MUL T;  STORE X  (7 instructions). Instruction length is short, but more instructions are needed."
      },
      {
        "type": "paragraph",
        "text": "(A zero-address / stack machine uses PUSH and POP with ADD, MUL operating on the stack top.)"
      }
    ],
    "hint": "Evaluate X = (A + B) × (C + D) in 3-address (3 instructions), 2-address (6 instructions), and 1-address/AC (7 instructions), noting instruction length vs program length trade-off.",
    "outlinePoints": [
      "Show 3-address code (3 instructions: ADD, ADD, MUL)",
      "Show 2-address code (6 instructions using MOV/ADD/MUL)",
      "Show 1-address accumulator code (7 instructions using LOAD/ADD/STORE/MUL)",
      "Note trade-off (program length vs instruction width) and briefly mention 0-address stack"
    ],
    "keywords": [
      "ALU"
    ],
    "isHighYield": false,
    "lessonId": "l4-2"
  },
  {
    "id": "u4_5m_2g",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(g)",
    "question": "Describe the procedure for designing a control unit in a computer system, highlighting its major steps.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Control-unit design (hardwired) is the process of deriving the logic that produces control signals for each micro-operation. Major steps:"
      },
      {
        "type": "bullet",
        "text": "Step 1 – Specify the system: define the instruction set, formats, registers and the datapath (bus, ALU, memory)."
      },
      {
        "type": "bullet",
        "text": "Step 2 – Write the register-transfer (micro-operation) sequence for the fetch, decode, indirect and execute phases of every instruction, with timing T0, T1…"
      },
      {
        "type": "bullet",
        "text": "Step 3 – Design timing and decoding: a sequence counter with a decoder gives T0…T15; an opcode decoder gives D0…D7; I and other flags are available."
      },
      {
        "type": "bullet",
        "text": "Step 4 – Derive control functions: for each register control input (LD, INR, CLR) and for bus select, ALU and memory signals, collect all micro-operations that use it and OR their conditions, e.g. LD(AR) = R'T0 + R'T2 + D7'IT3."
      },
      {
        "type": "bullet",
        "text": "Step 5 – Implement the Boolean expressions with gates and clear SC (SC ← 0) at the end of each instruction."
      },
      {
        "type": "bullet",
        "text": "Step 6 – Test/verify with timing simulation. (Alternative: microprogrammed control stores these steps as microinstructions in ROM.)"
      }
    ],
    "hint": "6 steps of hardwired control unit design: Specify datapath → Write RTL sequence → Build SC & opcode decoders → Derive Boolean control functions (e.g. LD(AR)) → Implement gates → Verify.",
    "outlinePoints": [
      "List all 6 control-unit design steps in logical order",
      "Give a concrete control equation example: LD(AR) = R'T0 + R'T2 + D7'IT3",
      "Mention microprogrammed ROM as the systematic alternative"
    ],
    "keywords": [
      "ALU",
      "Control Unit",
      "Registers",
      "Decoder",
      "Micro-operations"
    ],
    "isHighYield": true,
    "lessonId": "l4-1",
    "highYieldGroup": "u4-microprogrammed"
  },
  {
    "id": "u4_5m_2h",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 5,
    "qNum": "Q.2(h)",
    "question": "Explain the Hardware implementation of sign-magnitude multiplication.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image30.png",
        "caption": "Fig. Hardware for signed-magnitude multiplication"
      },
      {
        "type": "paragraph",
        "text": "Registers: B = multiplicand, Q = multiplier, A = accumulator (partial product) with the extension flip-flop E (carry), a parallel adder and a sequence counter SC (= number of multiplier bits). Signs Bs, Qs, As are kept separately."
      },
      {
        "type": "paragraph",
        "text": "Algorithm: (1) As ← Qs ⊕ Bs (product sign); (2) A ← 0, E ← 0, SC ← n − 1; (3) examine Q0 (the LSB of Q): if Q0 = 1 then EA ← A + B; (4) shift right E, A, Q (shr EAQ), so the next multiplier bit comes to Q0; (5) SC ← SC − 1; repeat from (3) until SC = 0. The product is in A and Q, with sign As."
      },
      {
        "type": "paragraph",
        "text": "Example: B = 10111 (23), Q = 10011 (19), 5-bit magnitudes:"
      },
      {
        "type": "table",
        "headers": [
          "Q0",
          "Operation",
          "E",
          "A",
          "Q",
          "SC"
        ],
        "rows": [
          [
            "",
            "Initial",
            "0",
            "00000",
            "10011",
            "5"
          ],
          [
            "Q0 = 1",
            "EA ← A + B",
            "0",
            "10111",
            "10011",
            ""
          ],
          [
            "",
            "shr  (E, A, Q)",
            "0",
            "01011",
            "11001",
            "4"
          ],
          [
            "Q0 = 1",
            "EA ← A + B",
            "1",
            "00010",
            "11001",
            ""
          ],
          [
            "",
            "shr  (E, A, Q)",
            "0",
            "10001",
            "01100",
            "3"
          ],
          [
            "Q0 = 0",
            "no add",
            "0",
            "10001",
            "01100",
            ""
          ],
          [
            "",
            "shr  (E, A, Q)",
            "0",
            "01000",
            "10110",
            "2"
          ],
          [
            "Q0 = 0",
            "no add",
            "0",
            "01000",
            "10110",
            ""
          ],
          [
            "",
            "shr  (E, A, Q)",
            "0",
            "00100",
            "01011",
            "1"
          ],
          [
            "Q0 = 1",
            "EA ← A + B",
            "0",
            "11011",
            "01011",
            ""
          ],
          [
            "",
            "shr  (E, A, Q)",
            "0",
            "01101",
            "10101",
            "0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Product = A Q = 01101 10101 = 437 = 23 × 19 ✓."
      }
    ],
    "hint": "Hardware uses B, Q, A, E, parallel adder, SC, and separate sign flip-flops (As ← Qs⊕Bs). Loop: if Q0=1 add EA←A+B; shr(E,A,Q); SC←SC−1. Trace 23 × 19 = 437. (Note our Check This Answer flag!)",
    "outlinePoints": [
      "Draw the sign-magnitude multiplier hardware diagram",
      "Explain the algorithm steps (sign XOR, add if Q0=1, shr EAQ, decrement SC)",
      "Complete the 5-cycle trace for B=10111 (23), Q=10011 (19) → 01101 10101 = 437"
    ],
    "keywords": [
      "Registers",
      "Flip-flop",
      "Sequence Counter",
      "CAR",
      "Signed-magnitude"
    ],
    "isHighYield": false,
    "lessonId": "l4-4",
    "numericalId": "num-sm-mult-23-19",
    "checkNote": {
      "label": "Check this answer",
      "reason": "Step (2) of the algorithm writes 'SC ← n − 1', while the worked 5-bit table (23 × 19 = 437) starts at SC = 5 and runs 5 cycles down to 0. In Mano's textbook, n is the total bits including 1 sign bit (so n − 1 magnitude bits); when working directly with 5-bit magnitudes, initialize SC = 5."
    }
  },
  {
    "id": "u4_10m_3a",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 10,
    "qNum": "Q.3(a)",
    "question": "Explain Address Sequencing in Micro-programmed Control.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Address sequencing is the method of determining the address of the next microinstruction in the control memory. Microinstructions are stored in consecutive locations; the control address register (CAR) supplies the address. The sequencer (next-address generator) must handle:"
      },
      {
        "type": "bullet",
        "text": "Incrementing the CAR – normal execution of microinstructions in sequence (CAR ← CAR + 1)."
      },
      {
        "type": "bullet",
        "text": "Unconditional branch – CAR ← address field of the microinstruction (JMP)."
      },
      {
        "type": "bullet",
        "text": "Conditional branch – the address field is loaded into CAR if a tested status bit (carry, sign, zero, overflow – selected by the CD field) is 1; otherwise CAR is incremented."
      },
      {
        "type": "bullet",
        "text": "Mapping – on instruction fetch completion the opcode of IR is mapped to the starting address of its microroutine, e.g. opcode bits placed in CAR as 0 xxxx 00 (each routine gets 4 locations)."
      },
      {
        "type": "bullet",
        "text": "Subroutine call and return – CALL saves CAR + 1 in the subroutine register SBR and branches; RET loads CAR from SBR. Common microroutines (e.g. indirect-address) are shared."
      },
      {
        "type": "bullet",
        "text": "Initial address – on power-on/reset CAR is loaded with the address of the first microinstruction (fetch routine)."
      },
      {
        "type": "image",
        "src": "/diagrams/image31.png",
        "caption": "Fig. Selection of the address for the control memory"
      },
      {
        "type": "paragraph",
        "text": "Microinstruction fields: F1, F2, F3 (micro-operations), CD (condition select: U, I, S, Z), BR (branch type: JMP, CALL, RET, MAP) and AD (address). The BR and CD fields drive the multiplexers, which select among: CAR + 1, the branch address AD, SBR (return), or the mapped address of the opcode. After the selected address is loaded into CAR the control memory outputs the next microinstruction into the control data register."
      }
    ],
    "hint": "Explain all 6 next-address capabilities (Increment CAR, Unconditional JMP, Conditional branch via CD, Opcode Mapping 0xxxx00, Subroutine CALL/RET via SBR, Initial reset) + full sequencer block diagram!",
    "outlinePoints": [
      "Define address sequencing and CAR",
      "Explain all 6 sequencing mechanisms (Increment, JMP, Conditional, Mapping, CALL/RET with SBR, Initial)",
      "Draw the control-memory address selection block diagram (MUX1, MUX2, SBR, Mapping, Incrementer)",
      "Explain microinstruction fields (F1–F3, CD, BR, AD) and how MUXes pick the next CAR value"
    ],
    "keywords": [
      "Multiplexer",
      "Micro-operations",
      "Opcode",
      "Indirect",
      "Direct"
    ],
    "isHighYield": true,
    "lessonId": "l4-1",
    "highYieldGroup": "u4-microprogrammed"
  },
  {
    "id": "u4_10m_3b",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 10,
    "qNum": "Q.3(b)",
    "question": "Using Booth's multiplication algorithm, evaluate Multiplicand B = 10111, Multiplier A = 10011 and draw the corresponding flowchart.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Booth's algorithm multiplies signed numbers in 2's-complement form by examining pairs of multiplier bits (Qn, Qn+1); strings of 1s are handled by one subtraction at the start and one addition at the end."
      },
      {
        "type": "image",
        "src": "/diagrams/image32.png",
        "caption": "Fig. Flowchart of Booth's multiplication algorithm"
      },
      {
        "type": "paragraph",
        "text": "Given: multiplicand BR = 10111 (= −9), multiplier QR = 10011 (= −13), n = 5. Initially AC = 00000, Qn+1 = 0, SC = 5."
      },
      {
        "type": "table",
        "headers": [
          "Qn Qn+1",
          "Operation",
          "AC",
          "QR",
          "Qn+1",
          "SC"
        ],
        "rows": [
          [
            "",
            "Initial",
            "00000",
            "10011",
            "0",
            "5"
          ],
          [
            "10",
            "AC ← AC − BR",
            "01001",
            "10011",
            "0",
            ""
          ],
          [
            "",
            "ashr  (AC, QR, Qn+1)",
            "00100",
            "11001",
            "1",
            "4"
          ],
          [
            "11",
            "ashr  (AC, QR, Qn+1)",
            "00010",
            "01100",
            "1",
            "3"
          ],
          [
            "01",
            "AC ← AC + BR",
            "11001",
            "01100",
            "1",
            ""
          ],
          [
            "",
            "ashr  (AC, QR, Qn+1)",
            "11100",
            "10110",
            "0",
            "2"
          ],
          [
            "00",
            "ashr  (AC, QR, Qn+1)",
            "11110",
            "01011",
            "0",
            "1"
          ],
          [
            "10",
            "AC ← AC − BR",
            "00111",
            "01011",
            "0",
            ""
          ],
          [
            "",
            "ashr  (AC, QR, Qn+1)",
            "00011",
            "10101",
            "1",
            "0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Product = AC QR = 00011 10101 = 0001110101 = +117. Check: (−9) × (−13) = +117 ✓. (If the operands were treated as unsigned, 23 × 19 = 437 – Booth's algorithm assumes signed 2's-complement numbers.)"
      }
    ],
    "hint": "Draw Booth's flowchart, note 10111 = −9 and 10011 = −13 in 5-bit 2's complement, run all 5 cycles (10, 11, 01, 00, 10) to get 00011 10101 = +117! (Note our Check This Answer flag on signed vs unsigned.)",
    "outlinePoints": [
      "Explain Booth's idea (handling strings of 1s) and draw the flowchart",
      "Identify BR = 10111 (−9), −BR = 01001, QR = 10011 (−13), SC = 5",
      "Build the full 5-cycle table (AC, QR, Qn+1, SC)",
      "Verify AC QR = 00011 10101 = +117 and note signed 2's-complement assumption"
    ],
    "keywords": [
      "ALU",
      "Booth's algorithm",
      "ashr"
    ],
    "isHighYield": true,
    "lessonId": "l4-4",
    "highYieldGroup": "u4-booth",
    "numericalId": "num-booth-neg9-neg13",
    "checkNote": {
      "label": "Check this answer",
      "reason": "The question gives B = 10111 and Multiplier A = 10011 without explicitly stating signed vs unsigned. Booth's algorithm assumes 2's-complement signed numbers, so the key evaluates (−9) × (−13) = +117 (00011 10101). If positive values 23 × 19 = 437 were intended, you would need an extra leading 0 sign bit (6-bit operands 010111 and 010011)."
    }
  },
  {
    "id": "u4_10m_3c",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 10,
    "qNum": "Q.3(c)",
    "question": "Analyze the various program control instructions and explain their functions with suitable examples.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Program control instructions change the content of the program counter (PC) and thereby the order of execution. After fetching an instruction PC is incremented; a program control instruction replaces it with a new address (the branch/jump address). The decision is based on the status register bits: C (carry), S (sign), Z (zero), V (overflow), set by arithmetic/logic/compare instructions."
      },
      {
        "type": "table",
        "headers": [
          "Instruction",
          "Mnemonic",
          "Function / example"
        ],
        "rows": [
          [
            "Branch",
            "BR",
            "Unconditional: PC ← EA, e.g. BR LOOP"
          ],
          [
            "Jump",
            "JMP",
            "Unconditional transfer to address, same effect as branch"
          ],
          [
            "Skip",
            "SKP",
            "PC ← PC + 1 (or +2) if condition true; ISZ skips when the incremented value = 0"
          ],
          [
            "Call",
            "CALL",
            "Subroutine call: SP ← SP − 1, M[SP] ← PC, PC ← EA"
          ],
          [
            "Return",
            "RET",
            "Return from subroutine: PC ← M[SP], SP ← SP + 1"
          ],
          [
            "Compare",
            "CMP",
            "Subtracts operands (A − B) only to set status bits; no result stored"
          ],
          [
            "Test",
            "TST",
            "ANDs operands only to set status bits (Z, S)"
          ],
          [
            "Branch if zero / not zero",
            "BZ / BNZ",
            "Z = 1 / Z = 0 → branch"
          ],
          [
            "Branch if carry / no carry",
            "BC / BNC",
            "C = 1 / C = 0"
          ],
          [
            "Branch if plus / minus",
            "BP / BM",
            "S = 0 / S = 1"
          ],
          [
            "Branch if overflow / no overflow",
            "BV / BNV",
            "V = 1 / V = 0"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Conditional branches after comparing two numbers: for unsigned numbers – BHI (A > B), BHE (≥), BLO (<), BLOE (≤), BE (=), BNE (≠); for signed numbers – BGT, BGE, BLT, BLE, BE, BNE."
      },
      {
        "type": "paragraph",
        "text": "Example (loop):"
      },
      {
        "type": "code",
        "lines": [
          "LD   R1, #5        ; counter = 5",
          "LOOP: ...                ; loop body",
          "DEC  R1            ; R1 ← R1 − 1 (sets Z flag)",
          "BNZ  LOOP          ; if Z = 0, PC ← LOOP",
          "CALL SUB           ; push return address, PC ← SUB",
          "HLT"
        ]
      },
      {
        "type": "paragraph",
        "text": "Subroutine linkage: CALL saves the return address (the PC) on the stack/in memory and RET restores it, allowing nested calls. Interrupt handling (software interrupt) also uses program control by saving the PC and status word."
      }
    ],
    "hint": "Explain how status flags (C, S, Z, V) guide PC changes, present a table of 11 program control instructions (BR, JMP, SKP, CALL, RET, CMP, TST, BZ/BNZ, BC/BNC, BP/BM, BV/BNV), unsigned vs signed branches, and a loop + subroutine example.",
    "outlinePoints": [
      "Explain PC modification and status bits (C, S, Z, V)",
      "Write the instruction table (BR, JMP, SKP, CALL, RET, CMP, TST, conditional branches)",
      "Contrast unsigned (BHI/BLO) vs signed (BGT/BLT) branch mnemonics",
      "Write a small assembly loop + CALL/RET example and explain stack linkage"
    ],
    "keywords": [
      "ALU",
      "Fetch",
      "CAR",
      "Program control",
      "Status bits"
    ],
    "isHighYield": true,
    "lessonId": "l4-2",
    "highYieldGroup": "u4-addressing-program-ctrl"
  },
  {
    "id": "u4_10m_3d",
    "unit": 4,
    "unitRoman": "IV",
    "unitTitle": "Microprogrammed Control, CPU Organization and Computer Arithmetic",
    "marks": 10,
    "qNum": "Q.3(d)",
    "question": "Using the algorithm for signed-magnitude addition, perform     (+11) +      (-12) and draw the corresponding flowchart.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image28.png",
        "caption": "Fig. Flowchart for signed-magnitude addition / subtraction"
      },
      {
        "type": "paragraph",
        "text": "Hardware: registers A (with sign As), B (with sign Bs), the parallel adder with overflow flip-flop AVF and end-carry E. The signs are examined with the XOR of As and Bs; the magnitudes are added or subtracted accordingly."
      },
      {
        "type": "paragraph",
        "text": "Given: A = +11 = 0 01011; B = −12 = 1 01100 (5-bit magnitudes)."
      },
      {
        "type": "bullet",
        "text": "Step 1 – compare signs: As ⊕ Bs = 0 ⊕ 1 = 1 → the signs are different, so the magnitudes are subtracted."
      },
      {
        "type": "bullet",
        "text": "Step 2 – subtract: B' = 10011; EA ← A + B' + 1 = 01011 + 10011 + 1 = 11111. The result is E = 0, A = 11111."
      },
      {
        "type": "bullet",
        "text": "Step 3 – check E: E = 0 means A < B (|11| < |12|), so the result must be negated: A ← A' + 1 = 00000 + 1 = 00001."
      },
      {
        "type": "bullet",
        "text": "Step 4 – sign: As ← As' = 1 (the sign of the larger magnitude B). A ≠ 0, so the sign is kept."
      },
      {
        "type": "paragraph",
        "text": "Result = 1 00001 = −1. Verification: (+11) + (−12) = −1 ✓."
      }
    ],
    "hint": "Draw the signed-magnitude add/sub flowchart, name hardware registers (A, B, As, Bs, E, AVF), then step through (+11) + (−12): 01011 + 10011 + 1 = 11111 (E=0) → negate to 00001, As=1 → −1.",
    "outlinePoints": [
      "Draw the signed-magnitude addition/subtraction flowchart",
      "Describe hardware registers (A, B, As, Bs, adder, E, AVF)",
      "Step 1–4 calculation for A = 0 01011 (+11) and B = 1 01100 (−12)",
      "Verify final answer 1 00001 = −1"
    ],
    "keywords": [
      "Registers",
      "Flip-flop",
      "CAR",
      "Signed-magnitude"
    ],
    "isHighYield": true,
    "lessonId": "l4-3",
    "highYieldGroup": "u4-signed-mag-addsub",
    "numericalId": "num-sm-add-11-12"
  },
  {
    "id": "u5_2m_1a",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 2,
    "qNum": "Q.1(a)",
    "question": "Define asynchronous data transfer and mention its methods.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Asynchronous data transfer is the transfer of data between two independent units that do not share a common clock; control signals are used to indicate the time of transfer. Methods: (1) strobe control (a single control line) and (2) handshaking (two control lines – request and acknowledge)."
      }
    ],
    "hint": "Data transfer between two units with independent clocks using control signals. Two methods: Strobe control (1 line) and Handshaking (2 lines).",
    "outlinePoints": [
      "Define asynchronous data transfer (no shared clock)",
      "Name the two methods: Strobe control and Handshaking"
    ],
    "keywords": [
      "Strobe",
      "Handshaking"
    ],
    "isHighYield": false,
    "lessonId": "l5-1"
  },
  {
    "id": "u5_2m_1b",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 2,
    "qNum": "Q.1(b)",
    "question": "What is a priority interrupt? Why is it used in a computer system?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "A priority interrupt is a system that assigns a priority to each interrupting device and services the highest-priority request first when several devices interrupt simultaneously (hardware: daisy chain, parallel priority; software: polling). It is used to decide the order of service and to ensure that urgent devices (e.g. a power-failure signal) are served before slow devices."
      }
    ],
    "hint": "System that ranks devices by urgency and serves the highest-priority interrupting device first (hardware: daisy-chain/parallel; software: polling).",
    "outlinePoints": [
      "Define priority interrupt and mention hardware/software methods",
      "Explain why it's needed (resolve simultaneous requests, urgent devices first)"
    ],
    "keywords": [
      "Priority interrupt"
    ],
    "isHighYield": false,
    "lessonId": "l5-2"
  },
  {
    "id": "u5_2m_1c",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 2,
    "qNum": "Q.1(c)",
    "question": "Differentiate between main memory and auxiliary memory",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Main memory (RAM/ROM) is directly accessed by the CPU – it is fast, small in capacity, costly per bit and (RAM) volatile. Auxiliary memory (disk, tape, SSD) is accessed via I/O – it is slower, very large, cheap per bit and non-volatile; it stores programs and data not currently in use."
      }
    ],
    "hint": "Main memory (RAM/ROM): CPU-direct, fast, small, costly, volatile (RAM). Auxiliary (HDD/SSD/tape): via I/O, slow, huge, cheap, non-volatile.",
    "outlinePoints": [
      "Describe Main memory (speed, size, cost, volatility, direct CPU access)",
      "Describe Auxiliary memory (speed, size, cost, non-volatile, via I/O)"
    ],
    "keywords": [
      "Direct",
      "Main memory",
      "Auxiliary memory"
    ],
    "isHighYield": false,
    "lessonId": "l5-3"
  },
  {
    "id": "u5_2m_1d",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 2,
    "qNum": "Q.1(d)",
    "question": "Why is handshaking data transfer preferred over strobe data transfer?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "In handshaking, a two-way exchange of signals (data valid ↔ data accepted/ready) assures that the source knows the data has been received and the destination knows the data is valid, so units of different speeds work reliably. With strobe, there is no acknowledgement – the source cannot know whether the destination actually received the data."
      }
    ],
    "hint": "Handshaking uses two-way acknowledgement (request ↔ reply), so units of different speeds never lose data; strobe has zero confirmation.",
    "outlinePoints": [
      "Explain handshaking's two-way confirmation (data valid ↔ accepted/ready)",
      "Contrast with strobe's lack of feedback/acknowledgement"
    ],
    "keywords": [
      "Strobe",
      "Handshaking"
    ],
    "isHighYield": false,
    "lessonId": "l5-1"
  },
  {
    "id": "u5_2m_1e",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 2,
    "qNum": "Q.1(e)",
    "question": "What are the functions of typical I/O interface?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "An I/O interface (a) selects the device by decoding the address, (b) converts data format (serial ↔ parallel, voltage levels), (c) synchronises speed differences by buffering data, (d) provides control and timing signals, (e) reports device status (ready/busy/error) and (f) generates interrupts."
      }
    ],
    "hint": "Remember 6 functions: address decoding, format conversion (serial↔parallel/voltage), speed buffering, control/timing, status reporting, interrupt generation.",
    "outlinePoints": [
      "List 4–6 core functions of an I/O interface cleanly"
    ],
    "keywords": [],
    "isHighYield": false,
    "lessonId": "l5-1"
  },
  {
    "id": "u5_2m_1f",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 2,
    "qNum": "Q.1(f)",
    "question": "What is the purpose of associative memory?",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Associative memory (content-addressable memory) is used to locate data by its content instead of by address; all words are searched in parallel, so lookup is very fast. Applications: cache tag directories, virtual-memory page tables (TLB) and database searching."
      }
    ],
    "hint": "Content-Addressable Memory (CAM) searches all words in parallel by *content* instead of address — super fast for cache tag directories and TLBs.",
    "outlinePoints": [
      "Define associative memory / CAM (search by content in parallel)",
      "Give 2 applications (cache tag directories, virtual-memory TLBs)"
    ],
    "keywords": [
      "Direct",
      "Cache",
      "Associative memory"
    ],
    "isHighYield": true,
    "lessonId": "l5-4",
    "highYieldGroup": "u5-associative-cache"
  },
  {
    "id": "u5_5m_2a",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(a)",
    "question": "Draw the block diagram of a Direct Memory Access (DMA) controller",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image33.png",
        "caption": "Fig. Block diagram of a DMA controller"
      },
      {
        "type": "paragraph",
        "text": "The DMA controller has an address register (starting memory address, incremented after each word), a word-count register (number of words left, decremented), a control register (transfer direction – read/write – and mode) and control logic. The CPU communicates through the data bus buffers using the DS (DMA select) and RS (register select) lines with RD/WR. For a transfer the controller sends a bus request (BR), receives the bus grant (BG), then drives the address bus and read/write lines to move data directly between the I/O device and memory; an interrupt is raised when the word count reaches zero."
      }
    ],
    "hint": "Draw DMA controller: Address Register, Word-Count Register, Control Register, Control Logic (BR, BG, INT, DMA req/ack), Data Bus Buffers (DS, RS, RD, WR).",
    "outlinePoints": [
      "Draw the DMA controller block diagram",
      "Explain the 3 internal registers (Address, Word Count, Control)",
      "Explain DS/RS CPU setup and BR/BG direct bus takeover + completion interrupt"
    ],
    "keywords": [
      "Direct",
      "DMA",
      "Bus Request",
      "Bus Grant"
    ],
    "isHighYield": true,
    "lessonId": "l5-2",
    "highYieldGroup": "u5-dma"
  },
  {
    "id": "u5_5m_2b",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(b)",
    "question": "Describe source-initiated data transfer using the handshaking method with a neat block diagram and timing diagram.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image34.png",
        "caption": "Fig. Source-initiated transfer using handshaking – block diagram and timing"
      },
      {
        "type": "paragraph",
        "text": "In source-initiated handshaking the source unit begins the transfer. Two control lines are used: data valid (source → destination) and data accepted (destination → source). Sequence:"
      },
      {
        "type": "bullet",
        "text": "1. The source places data on the data bus and enables data valid."
      },
      {
        "type": "bullet",
        "text": "2. The destination accepts the data from the bus and enables data accepted."
      },
      {
        "type": "bullet",
        "text": "3. The source, on seeing data accepted, disables data valid and removes the data from the bus."
      },
      {
        "type": "bullet",
        "text": "4. The destination disables data accepted; the system is ready for the next transfer."
      },
      {
        "type": "paragraph",
        "text": "Because the source waits for the acknowledgement, it knows the destination has received the data – a reliable transfer even when the speeds of the two units differ."
      }
    ],
    "hint": "Source starts! Two lines: Data Valid (source→dest) and Data Accepted (dest→source). Draw block + 4-step timing diagram.",
    "outlinePoints": [
      "Draw source-initiated handshaking block & timing diagrams",
      "List the 4 sequential handshake steps (Data+Valid → Accept → Drop Valid → Drop Accept)",
      "Explain why it works reliably across mismatched speeds"
    ],
    "keywords": [
      "Handshaking"
    ],
    "isHighYield": true,
    "lessonId": "l5-1",
    "highYieldGroup": "u5-handshaking-strobe"
  },
  {
    "id": "u5_5m_2c",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(c)",
    "question": "Describe destination-initiated data transfer using the handshaking method with a neat timing diagram.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image35.png",
        "caption": "Fig. Destination-initiated transfer using handshaking – block diagram and timing"
      },
      {
        "type": "paragraph",
        "text": "Here the destination starts the transfer by requesting data. Control lines: ready for data (destination → source) and data valid (source → destination)."
      },
      {
        "type": "bullet",
        "text": "1. The destination enables ready for data, indicating it can accept a word."
      },
      {
        "type": "bullet",
        "text": "2. The source places data on the bus and enables data valid."
      },
      {
        "type": "bullet",
        "text": "3. The destination accepts the data and disables ready for data."
      },
      {
        "type": "bullet",
        "text": "4. The source disables data valid and removes the data; the destination can enable ready for data again for the next word."
      },
      {
        "type": "paragraph",
        "text": "The handshake guarantees that the source sends data only when the destination is ready and that the destination reads data only when it is valid."
      }
    ],
    "hint": "Destination starts! Two lines: Ready for Data (dest→source) and Data Valid (source→dest). Draw block + 4-step timing diagram.",
    "outlinePoints": [
      "Draw destination-initiated handshaking block & timing diagrams",
      "List the 4 sequential steps (Ready → Data+Valid → Drop Ready → Drop Valid)",
      "Explain the mutual safety guarantee"
    ],
    "keywords": [
      "Handshaking"
    ],
    "isHighYield": true,
    "lessonId": "l5-1",
    "highYieldGroup": "u5-handshaking-strobe"
  },
  {
    "id": "u5_5m_2d",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(d)",
    "question": "Analyze cache memory organization and explain how cache improves computer performance.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image36.png",
        "caption": "Fig. Cache between CPU and main memory"
      },
      {
        "type": "paragraph",
        "text": "Organization: the cache is a small, very fast memory (SRAM) between the CPU and main memory. It stores copies of frequently used blocks of main memory along with their tags (address information). Mapping: direct (each block maps to one line, index = block mod lines), fully associative (a block can go anywhere; tags searched associatively) or set-associative (a block maps to a set, any line within the set). Replacement (LRU, FIFO, random) and write policy (write-through / write-back) are also part of the organization."
      },
      {
        "type": "paragraph",
        "text": "Improvement of performance: programs show locality of reference – temporal (recently used items are used again) and spatial (nearby addresses are used next). A request is a hit if the word is in the cache (served in one cache cycle) or a miss (block fetched from main memory). Average access time = h·tc + (1 − h)·tm. Example: hit ratio h = 0.9, tc = 10 ns, tm = 100 ns → 0.9 × 10 + 0.1 × 100 = 19 ns, against 100 ns without a cache."
      }
    ],
    "hint": "Small fast SRAM between CPU & RAM. Cover mapping (direct, fully associative, set-associative), replacement/write policies, locality of reference, and AMAT example (19 ns). (Note Check This Answer flag!)",
    "outlinePoints": [
      "Draw CPU–Cache–Main Memory block diagram",
      "Explain organization: tags, 3 mapping schemes, replacement (LRU/FIFO), write policies",
      "Explain temporal & spatial locality + hit/miss",
      "Compute AMAT example (h=0.9, tc=10ns, tm=100ns → 19 ns)"
    ],
    "keywords": [
      "Direct",
      "Fetch",
      "Cache",
      "Locality of reference",
      "Hit ratio"
    ],
    "isHighYield": true,
    "lessonId": "l5-4",
    "highYieldGroup": "u5-associative-cache",
    "numericalId": "num-cache-amat",
    "checkNote": {
      "label": "Check this answer",
      "reason": "The key uses T_avg = h·tc + (1 − h)·tm = 0.9×10 + 0.1×100 = 19 ns, which assumes simultaneous lookup (or that tm already includes cache lookup time). Under the sequential/hierarchical model T_avg = tc + (1 − h)·tm, the same numbers give 10 + 0.1×100 = 20 ns. The arithmetic (19 ns) is right for the written formula—just note which convention you use."
    }
  },
  {
    "id": "u5_5m_2e",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(e)",
    "question": "Explain the memory hierarchy with a suitable diagram.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image37.png",
        "caption": "Fig. Memory hierarchy"
      },
      {
        "type": "paragraph",
        "text": "A computer uses several kinds of memory arranged in a hierarchy to give a large memory with an access time close to that of the fastest level at a low cost. Moving up the hierarchy (toward the CPU) memory is faster, smaller and costlier per bit; moving down it is slower, larger and cheaper."
      },
      {
        "type": "bullet",
        "text": "Registers – inside the CPU, a few bytes, access in less than a ns."
      },
      {
        "type": "bullet",
        "text": "Cache memory – KB to MB of SRAM, a few ns; holds currently active blocks."
      },
      {
        "type": "bullet",
        "text": "Main memory – GB of DRAM, tens of ns; holds the programs being run."
      },
      {
        "type": "bullet",
        "text": "Secondary (auxiliary) storage – SSD/HDD, TB, ms-level access; permanent storage."
      },
      {
        "type": "bullet",
        "text": "Tertiary storage – tape/optical, archival."
      },
      {
        "type": "paragraph",
        "text": "Programs and data move between levels automatically (cache ↔ main by hardware, main ↔ disk by the operating system / virtual memory), and locality of reference makes the hierarchy effective."
      }
    ],
    "hint": "Draw the classic pyramid: Registers → Cache → Main Memory → Secondary (SSD/HDD) → Tertiary (Tape). Up = faster/smaller/costlier; Down = slower/larger/cheaper.",
    "outlinePoints": [
      "Draw the 5-level memory hierarchy pyramid",
      "Explain the speed/capacity/cost trade-off top-to-bottom",
      "Give typical size & speed for each level and note locality of reference"
    ],
    "keywords": [
      "Registers",
      "Cache",
      "Locality of reference",
      "Memory hierarchy",
      "Main memory"
    ],
    "isHighYield": false,
    "lessonId": "l5-3"
  },
  {
    "id": "u5_5m_2f",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(f)",
    "question": "Describe asynchronous data transfer, source-initiated strobe and destination-initiated strobe.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Asynchronous data transfer: the two units (source and destination) have their own independent clocks, so the timing of transfer is indicated by control signals. The simplest scheme is strobe control, which uses a single control line (strobe) to time each transfer."
      },
      {
        "type": "image",
        "src": "/diagrams/image38.png",
        "caption": "Fig. (a) Source-initiated and (b) destination-initiated strobe"
      },
      {
        "type": "paragraph",
        "text": "(a) Source-initiated strobe: the source places the data on the bus and, after a short delay to let the data settle, activates the strobe pulse. The destination uses the strobe to latch the data. The source then removes the data (a short time after the strobe is disabled)."
      },
      {
        "type": "paragraph",
        "text": "(b) Destination-initiated strobe: the destination activates the strobe to request data; the source responds by placing the data on the bus; the destination latches the data on the strobe's trailing edge, after which the source removes the data."
      },
      {
        "type": "paragraph",
        "text": "Drawback: in (a) the source cannot know that the data was received; in (b) the destination cannot know whether the source actually put valid data on the bus – handshaking removes this problem."
      }
    ],
    "hint": "Explain asynchronous transfer + single-line strobe, draw both (a) source-initiated and (b) destination-initiated strobe timing, and state the main drawback (no acknowledgement).",
    "outlinePoints": [
      "Define asynchronous transfer & strobe control",
      "Draw source-initiated and destination-initiated strobe diagrams",
      "Explain both sequences step-by-step",
      "State the key drawback (no confirmation of receipt)"
    ],
    "keywords": [
      "Latch",
      "Strobe",
      "Handshaking"
    ],
    "isHighYield": true,
    "lessonId": "l5-1",
    "highYieldGroup": "u5-handshaking-strobe"
  },
  {
    "id": "u5_5m_2g",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(g)",
    "question": "What is meant by handshaking? Explain with neat diagram.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Handshaking is an asynchronous data-transfer technique that uses two control lines (a request and a reply) so that each step of the transfer is acknowledged by the other unit. It avoids the weakness of the strobe method, where there is no confirmation of receipt."
      },
      {
        "type": "image",
        "src": "/diagrams/image34.png",
        "caption": "Fig. Handshaking (source-initiated) – block diagram and timing"
      },
      {
        "type": "bullet",
        "text": "The source puts the data on the bus and activates data valid."
      },
      {
        "type": "bullet",
        "text": "The destination reads the data and activates data accepted (acknowledge)."
      },
      {
        "type": "bullet",
        "text": "The source removes the data and deactivates data valid."
      },
      {
        "type": "bullet",
        "text": "The destination deactivates data accepted – ready for the next item."
      },
      {
        "type": "paragraph",
        "text": "In the destination-initiated version the lines are ready for data and data valid. Handshaking is used in parallel printer ports and serial interfaces; transfers are reliable between units of different speeds, at the cost of an extra control line."
      }
    ],
    "hint": "Define 2-line request/acknowledge handshaking, draw the block & timing diagram, trace the 4 steps, mention destination-initiated lines, and give uses + trade-off.",
    "outlinePoints": [
      "Define handshaking and contrast with strobe",
      "Draw the source-initiated block & timing diagram",
      "Walk through the 4 handshake steps",
      "Mention destination-initiated version, applications, and extra-line cost"
    ],
    "keywords": [
      "Strobe",
      "Handshaking"
    ],
    "isHighYield": true,
    "lessonId": "l5-1",
    "highYieldGroup": "u5-handshaking-strobe"
  },
  {
    "id": "u5_5m_2h",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 5,
    "qNum": "Q.2(h)",
    "question": "Differentiate between main memory and auxiliary memory with respect to speed, capacity, cost, access method, and data retention.",
    "blocks": [
      {
        "type": "table",
        "headers": [
          "Parameter",
          "Main memory",
          "Auxiliary memory"
        ],
        "rows": [
          [
            "Speed",
            "Fast (nanoseconds)",
            "Slow (milliseconds for HDD, ≈100 µs for SSD)"
          ],
          [
            "Capacity",
            "Small (GBs)",
            "Very large (hundreds of GB to TBs)"
          ],
          [
            "Cost per bit",
            "High",
            "Low"
          ],
          [
            "Access method",
            "Random access, directly by CPU using addresses",
            "Sequential (tape) / semi-random (disk) – via I/O controller or DMA"
          ],
          [
            "Data retention",
            "RAM volatile; ROM non-volatile",
            "Non-volatile (data kept without power)"
          ],
          [
            "Role",
            "Holds programs and data currently executing",
            "Stores programs and data for long-term use"
          ],
          [
            "Examples",
            "DRAM, SRAM, ROM",
            "Hard disk, SSD, magnetic tape, optical disc"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Main memory is therefore used for working storage while auxiliary memory provides backup and bulk storage; the operating system moves information between them as needed."
      }
    ],
    "hint": "Build a crisp 7-row comparison table: Speed, Capacity, Cost/bit, Access Method, Data Retention, Role, and Examples.",
    "outlinePoints": [
      "Create a structured comparison table covering all 5 required parameters + Role & Examples",
      "Add a 1-sentence conclusion explaining how the OS coordinates both"
    ],
    "keywords": [
      "Direct",
      "DMA",
      "Main memory",
      "Auxiliary memory"
    ],
    "isHighYield": true,
    "lessonId": "l5-3",
    "highYieldGroup": "u5-main-aux-memory"
  },
  {
    "id": "u5_10m_3a",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 10,
    "qNum": "Q.3(a)",
    "question": "Explain the organization of main memory and auxiliary memory, and compare their characteristics, access methods, and applications.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image37.png",
        "caption": "Fig. Position of main and auxiliary memory in the memory hierarchy"
      },
      {
        "type": "paragraph",
        "text": "1. Organization of main memory. Main memory consists of RAM chips (static or dynamic) for read/write data and ROM chips for permanent programs such as the bootstrap loader. A memory chip of 2ᵐ words × n bits has m address lines, n data lines, chip-select (CS) and read/write (RD/WR) controls. Bigger memories are built from several chips; the high-order address bits go to a decoder that enables one chip (chip select) and the low-order bits address a word within the chip. The CPU gives the address through the address bus and the data moves on the data bus. RAM is volatile and randomly accessible – every location takes the same time."
      },
      {
        "type": "paragraph",
        "text": "2. Organization of auxiliary memory. The principal devices are magnetic disks, magnetic tapes and flash/SSD."
      },
      {
        "type": "bullet",
        "text": "Magnetic disk: circular platters coated with magnetic material, divided into concentric tracks and sectors; read/write heads move to the track (seek time), wait for the sector to rotate under the head (rotational latency) and then transfer the data. Access time = seek + latency + transfer time. A set of vertically aligned tracks is a cylinder."
      },
      {
        "type": "bullet",
        "text": "Magnetic tape: records are stored sequentially along the tape, so access is serial and slow; used for backup and archive."
      },
      {
        "type": "bullet",
        "text": "SSD / flash: semiconductor storage with no moving parts; fast, non-volatile."
      },
      {
        "type": "table",
        "headers": [
          "Characteristic",
          "Main memory",
          "Auxiliary memory"
        ],
        "rows": [
          [
            "Technology",
            "Semiconductor (DRAM/SRAM/ROM)",
            "Magnetic / optical / flash"
          ],
          [
            "Speed",
            "ns",
            "ms (HDD), µs (SSD)"
          ],
          [
            "Capacity",
            "GBs",
            "TBs"
          ],
          [
            "Access method",
            "Random, by address",
            "Sequential (tape), direct/semi-random (disk), block-wise"
          ],
          [
            "Volatility",
            "RAM volatile, ROM non-volatile",
            "Non-volatile"
          ],
          [
            "Connection",
            "Directly on CPU bus",
            "Through I/O interface / DMA"
          ],
          [
            "Cost per bit",
            "High",
            "Low"
          ],
          [
            "Applications",
            "Running programs, data, OS kernel, bootstrapping (ROM)",
            "Files, database, backup, virtual-memory swap space, archives"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Conclusion: main memory offers speed but little capacity; auxiliary memory offers large and permanent storage but is slow. A balanced system uses both (and cache), with information moved between them according to need."
      }
    ],
    "hint": "Three parts: (1) Main Memory organization (RAM/ROM chips, decoder chip-select, address/data buses), (2) Auxiliary Memory (disk tracks/sectors/seek+latency, tape, SSD), (3) Full 8-row comparison table.",
    "outlinePoints": [
      "Draw memory hierarchy placement diagram",
      "Detail Main Memory organization (2^m × n chips, chip-select decoder, random access)",
      "Detail Auxiliary Memory organization (magnetic disk seek/latency/cylinder, tape, SSD)",
      "Include an 8-row comparison table + balanced system conclusion"
    ],
    "keywords": [
      "Decoder",
      "Direct",
      "Decode",
      "DMA",
      "Cache"
    ],
    "isHighYield": true,
    "lessonId": "l5-3",
    "highYieldGroup": "u5-main-aux-memory"
  },
  {
    "id": "u5_10m_3b",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 10,
    "qNum": "Q.3(b)",
    "question": "Compare Programmed I/O, Interrupt-Initiated I/O, and Direct Memory Access (DMA) with suitable block diagrams.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image39.png",
        "caption": "Fig. (a) Programmed I/O, (b) Interrupt-initiated I/O, (c) DMA"
      },
      {
        "type": "paragraph",
        "text": "(a) Programmed I/O: the CPU executes an I/O program, repeatedly polling (testing) the status flag of the interface until the device is ready, and then transfers each word via the CPU register (device → CPU → memory). The CPU is tied up (busy-waiting) for the whole transfer."
      },
      {
        "type": "paragraph",
        "text": "(b) Interrupt-initiated I/O: the interface sends an interrupt request when the device is ready; the CPU stops its current program (saving PC and status), runs the interrupt-service routine to transfer one word, and then resumes. The CPU does useful work while the device is not ready, but still handles every word."
      },
      {
        "type": "paragraph",
        "text": "(c) DMA: the DMA controller transfers a block of data directly between the I/O device and memory without CPU involvement. The CPU only initialises the controller (address, word count, direction) and is interrupted when the whole block is transferred. The controller takes control of the buses by cycle stealing or burst mode."
      },
      {
        "type": "table",
        "headers": [
          "Feature",
          "Programmed I/O",
          "Interrupt-initiated I/O",
          "DMA"
        ],
        "rows": [
          [
            "Transfer path",
            "Device → CPU → memory",
            "Device → CPU → memory",
            "Device ↔ memory directly"
          ],
          [
            "CPU involvement",
            "Continuous (polling)",
            "Per word (ISR)",
            "Only start and end"
          ],
          [
            "CPU utilisation",
            "Very poor",
            "Better",
            "Best"
          ],
          [
            "Speed",
            "Slowest",
            "Medium",
            "Fastest (block transfer)"
          ],
          [
            "Hardware",
            "Simplest",
            "Interrupt logic",
            "DMA controller needed"
          ],
          [
            "Best for",
            "Simple, slow devices",
            "Moderate-speed, unpredictable devices",
            "Disks, high-speed bulk transfers"
          ]
        ]
      }
    ],
    "hint": "Draw the 3 block diagrams side-by-side, explain (a) Programmed I/O (polling), (b) Interrupt I/O (per-word ISR), (c) DMA (cycle-stealing/burst), then give a 6-row comparison table.",
    "outlinePoints": [
      "Draw block diagrams for Programmed I/O, Interrupt I/O, and DMA",
      "Explain each mode's data path and CPU role",
      "Include a 6-row comparison table (Path, CPU involvement, Utilization, Speed, Hardware, Best for)"
    ],
    "keywords": [
      "Direct",
      "Execute",
      "DMA",
      "Cycle stealing",
      "Programmed I/O"
    ],
    "isHighYield": true,
    "lessonId": "l5-2",
    "highYieldGroup": "u5-dma"
  },
  {
    "id": "u5_10m_3c",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 10,
    "qNum": "Q.3(c)",
    "question": "Draw the block diagram of a Direct Memory Access (DMA) controller and explain its organization and operation in steps wise.",
    "blocks": [
      {
        "type": "image",
        "src": "/diagrams/image33.png",
        "caption": "Fig. Block diagram of the DMA controller"
      },
      {
        "type": "paragraph",
        "text": "Organization: the DMA controller contains: (i) address register – holds the memory address of the next word, incremented after every transfer; (ii) word-count register – holds the number of words to transfer, decremented after each word; (iii) control register – specifies the mode (read or write); (iv) control logic with bus request (BR), bus grant (BG), interrupt and DMA-request/acknowledge lines; (v) data-bus buffers, with DS and RS to select the controller and a register. The CPU can write/read these registers when DS = 1."
      },
      {
        "type": "paragraph",
        "text": "Operation – step by step:"
      },
      {
        "type": "bullet",
        "text": "1. Initialisation: the CPU programs the controller – it loads the starting address into the address register, the number of words into the word-count register and the transfer direction into the control register, and then starts the device."
      },
      {
        "type": "bullet",
        "text": "2. DMA request: when the device is ready, it requests a DMA transfer; the controller sends a bus request (BR) to the CPU."
      },
      {
        "type": "bullet",
        "text": "3. Bus grant: the CPU finishes its current bus cycle, places its buses in the high-impedance state and replies with bus grant (BG)."
      },
      {
        "type": "bullet",
        "text": "4. Data transfer: the DMA controller puts the memory address on the address bus, activates the read/write signal and the data moves directly between the device and memory (one word per cycle in cycle-stealing, or the whole block in burst mode)."
      },
      {
        "type": "bullet",
        "text": "5. Update: the address register is incremented and the word count decremented after each word."
      },
      {
        "type": "bullet",
        "text": "6. Termination: when the word count becomes zero, the controller removes BR, returns control of the bus to the CPU and generates an interrupt to tell the CPU that the transfer is complete."
      },
      {
        "type": "paragraph",
        "text": "Advantage: the CPU is free during the transfer, and the data rate is limited only by memory speed."
      }
    ],
    "hint": "Draw the DMA controller diagram, detail its 5 internal blocks (AR, WC, Control reg, Logic, Buffers), then walk through all 6 operational steps from CPU Initialization to Interrupt Termination.",
    "outlinePoints": [
      "Draw the DMA controller block diagram",
      "Explain the 5 organizational components",
      "Write the 6-step operation sequence (Init → DMA Req/BR → BG → Transfer → Update → Terminate/INT)",
      "State key advantage (CPU free, memory-limited speed)"
    ],
    "keywords": [
      "Registers",
      "Direct",
      "DMA",
      "Bus Request",
      "Bus Grant"
    ],
    "isHighYield": true,
    "lessonId": "l5-2",
    "highYieldGroup": "u5-dma"
  },
  {
    "id": "u5_10m_3d",
    "unit": 5,
    "unitRoman": "V",
    "unitTitle": "Input-Output Organization and Memory Organization",
    "marks": 10,
    "qNum": "Q.3(d)",
    "question": "Explain the organization and operation of associative memory with a suitable block diagram.",
    "blocks": [
      {
        "type": "paragraph",
        "text": "Associative memory (content-addressable memory, CAM) is a memory in which a word is searched by its content, not by address. All the words are compared simultaneously (in parallel) with the argument, which gives very fast search – it is used in cache directories and page tables (TLB)."
      },
      {
        "type": "image",
        "src": "/diagrams/image40.png",
        "caption": "Fig. Block diagram of associative memory"
      },
      {
        "type": "paragraph",
        "text": "Organization: it consists of a memory array of m words × n bits with logic for comparison, plus three registers:"
      },
      {
        "type": "bullet",
        "text": "Argument register (A): n bits; holds the word (item) to be searched."
      },
      {
        "type": "bullet",
        "text": "Key register (K): n bits; a mask – only the bit positions where K = 1 are compared; positions where K = 0 are ignored (so a part of the word can be searched)."
      },
      {
        "type": "bullet",
        "text": "Match register (M): m bits, one per memory word; Mᵢ = 1 if word i matches the unmasked part of A."
      },
      {
        "type": "paragraph",
        "text": "Operation: (1) the word to be searched is placed in A and the mask in K; (2) every word in the array is compared with A bit by bit in parallel – for bit j of word i, xⱼ = Aⱼ·Fᵢⱼ + Aⱼ'·Fᵢⱼ' (equality, XNOR); (3) the word matches if all the unmasked bits are equal: Mᵢ = ∏ⱼ (xⱼ + Kⱼ'); (4) M indicates the matching word(s); a read operation then outputs the matching word(s) in sequence; a write stores a word in a free location (identified by a tag register)."
      },
      {
        "type": "paragraph",
        "text": "Example: A = 101 111100, K = 111 000000 (only the first 3 bits are compared)."
      },
      {
        "type": "table",
        "headers": [
          "Word",
          "Content",
          "Match?"
        ],
        "rows": [
          [
            "Word 1",
            "100 111100",
            "No (first 3 bits 100 ≠ 101)"
          ],
          [
            "Word 2",
            "101 000001",
            "Yes (first 3 bits 101)"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Advantages: very fast parallel search, no need to scan addresses. Disadvantage: high cost (each cell has comparison logic), so only small associative memories are used."
      }
    ],
    "hint": "Draw the CAM block diagram (Argument A, Key mask K, Match M, m×n array), explain bit-equality xj & match equation Mi = ∏(xj + Kj'), work the 2-word mask example, and give pros/cons.",
    "outlinePoints": [
      "Define Associative Memory (CAM) & applications",
      "Draw the CAM block diagram (A, K, M registers + memory array)",
      "Explain parallel match logic (XNOR xj and mask Kj' formula)",
      "Work the A=101 111100, K=111 000000 example table + pros/cons"
    ],
    "keywords": [
      "Registers",
      "Direct",
      "Cache",
      "Associative memory",
      "CAM"
    ],
    "isHighYield": true,
    "lessonId": "l5-4",
    "highYieldGroup": "u5-associative-cache"
  }
];

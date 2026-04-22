# Measuring Cryptographic Agility in Deployed Systems

**Author:** Tin Erispe (ETHPH) · April 2026

This repository contains the research paper and an accompanying interactive diagnostic tool for the **Cryptographic Agility Score (CAS)** framework.

---

## The Paper

**[Measuring_Cryptographic_Agility_Erispe.pdf](./Measuring_Cryptographic_Agility_Erispe.pdf)**

The paper proposes CAS: a nine-dimension semi-formal framework for evaluating how structurally capable a deployed system is of migrating its cryptographic primitives.

**Central thesis:** Cryptographic agility is an architectural property determined by the system layer at which the primitive is anchored. Systems that anchor primitives at negotiation layers achieve agility structurally. Systems that anchor them at execution layers do not.

**Case studies:** TLS 1.3 (20/27 — High Agility) vs. ZK rollup proof system migration (8/27 — Critical Constraint).

**Key finding:** ZK rollups score critically low not due to poor engineering, but because ZK circuits exist *inside* a specific algebraic universe — a finite field, curve, and hash function that saturate every constraint. This is mathematical rigidity, distinct from architectural rigidity, and requires different remediation strategies.

**Dimensions scored (each 0–3):**

| ID | Dimension |
|----|-----------|
| D1 | Substitutability |
| D2 | Migration Cost |
| D3 | State & Interface Continuity |
| D4 | Trust Surface Delta |
| D5 | Downgrade Resistance |
| D6 | Automation Depth |
| D7 | Negotiation Mechanism |
| D8 | Cryptographic Isolation |
| D9 | Identity Coupling |

D9 (Identity Coupling) is a novel contribution: it captures the Ethereum address derivation problem (`address = keccak256(pubkey)[12:]`), where migrating the signature scheme destroys historical identity associations — a migration barrier absent from prior agility frameworks.

---

## CAS Diagnostic Tool

An interactive web application that guides engineers through the nine CAS dimensions and produces a scored diagnostic report for any deployed system.

**Source:** [`cas-diagnostic/`](./cas-diagnostic/)

### Running locally

```bash
cd cas-diagnostic
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Features

- 9 structured questions, one per CAS dimension
- Scores 0–27 with band classification (High / Moderate / Critical Constraint)
- Dimension breakdown with per-score explanations grounded in the framework
- Rule-based system diagnosis (primary constraint, migration difficulty, dimension-specific risk flags)
- Keyboard shortcuts (1–4 to select, Enter to advance)
- Copy results as plain text for reports and issue trackers
- No backend, no data collection

---

## Repository Structure

```
.
├── Measuring_Cryptographic_Agility_Erispe.pdf   # The paper
└── cas-diagnostic/                               # Diagnostic tool (React + Vite + TypeScript)
    ├── src/
    │   ├── data/          # Dimension definitions and scoring bands
    │   ├── types/         # TypeScript interfaces
    │   ├── lib/           # Scoring and diagnosis logic
    │   └── components/    # UI components
    ├── package.json
    └── ...
```

---

## Citation

```
Erispe, T. (2026). A Framework for Evaluating Cryptographic Agility in Deployed Systems.
ETHPH. April 2026.
```

---

## License

| Component | License |
|-----------|---------|
| Diagnostic tool (`cas-diagnostic/`) | [MIT](./LICENSE) |
| Paper (`Measuring_Cryptographic_Agility_Erispe.pdf`) | [CC BY 4.0](./LICENSE-paper) |

The paper may be freely shared and adapted with attribution. The diagnostic tool may be freely used, modified, and distributed under the MIT license.

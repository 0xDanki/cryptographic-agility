# Cryptographic Agility Score (CAS)

**Tin Erispe · ETHPH · April 2026**

[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.19698658-blue)](https://doi.org/10.5281/zenodo.19698658)

---

Cryptographic agility is not a best practice. It is an architectural property, determined by where in a system the primitive dependency lives.

This repository contains the CAS framework: a nine-dimension scoring model for evaluating migration readiness in deployed cryptographic systems, applied comparatively to TLS and ZK rollups. It ships as a [research paper](#paper) and a [runnable diagnostic tool](#diagnostic-tool).

---

## Diagnostic Tool

[`cas-diagnostic/`](./cas-diagnostic/) — React + Vite + TypeScript

Nine questions. One per dimension. The tool scores your system, classifies it into an agility band, and generates a structured diagnosis: primary constraint, critical dimensions, migration difficulty, and dimension-specific risk flags.

No backend. No data collection. All logic is in the source.

**Try it online:** _deployment link coming soon_

**Run locally:**

```bash
cd cas-diagnostic
npm install
npm run dev
# → http://localhost:5173
```

---

## Paper

[`Measuring_Cryptographic_Agility_Erispe.pdf`](./Measuring_Cryptographic_Agility_Erispe.pdf)

The central claim: a system anchoring its cryptographic primitive at a negotiation layer achieves agility structurally. A system anchoring it at an execution layer does not. This is not an engineering quality judgment; it is a consequence of where the dependency lives.

The paper develops this into a scored framework and applies it to two structurally dissimilar systems:

- **TLS 1.3 — 20/27 (High Agility).** Cipher suite selection is a handshake-layer decision. The record layer is algorithmically agnostic. Agility is structural.
- **ZK rollup proof system migration — 8/27 (Critical Constraint).** The verifier contract encodes the algorithm at the bytecode level. A ZK circuit does not call a cryptographic library; it exists inside an algebraic universe defined by a specific finite field, curve, and hash function. Changing the proof system is not a module swap. It is a re-expression of the computation in a different algebraic universe.

The paper names this distinction (architectural rigidity vs. mathematical rigidity) and derives design principles and Ethereum PQC migration recommendations from it.

### Dimensions

Each scored 0–3. Composite out of 27.

| | Dimension |
|--|-----------|
| D1 | Substitutability |
| D2 | Migration Cost |
| D3 | State & Interface Continuity |
| D4 | Trust Surface Delta |
| D5 | Downgrade Resistance |
| D6 | Automation Depth |
| D7 | Negotiation Mechanism |
| D8 | Cryptographic Isolation |
| D9 | Identity Coupling |

D9 is a novel contribution. It captures a migration barrier absent from prior frameworks: when system identities are derived from the primitive being replaced (`address = keccak256(pubkey)[12:]`), migration re-derives the identity, destroying accumulated state, permissions, and history with no atomic transition guarantee.

---

## Citation

```
Erispe, T. (2026). A Framework for Evaluating Cryptographic Agility in Deployed Systems.
ETHPH. https://doi.org/10.5281/zenodo.19698658
```

---

## License

| | License |
|--|---------|
| `cas-diagnostic/` | [MIT](./LICENSE) |
| Paper | [CC BY 4.0](./LICENSE-paper) |

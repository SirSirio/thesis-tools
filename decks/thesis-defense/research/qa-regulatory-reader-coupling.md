# Coupling the dispenser with a reader — the regulatory answer

Defence Q&A prep, written 2026-09-28 for the committee question Sirio expects:

> *"If you were to couple, as you describe on s41, the liquid dispensing system with a general
> machine for reading the protocol, what would actually happen from the regulatory point of
> view?"*

Backs appendix slides **`b27`** (the answer) and **`b28`** (thesis Table 5.2). Not thesis content.

**Source tags used below.**
- **[T]** the thesis: `05` = `latex/Chapters/05_Requirements-and-Decomposition.tex`,
  `13` = `latex/Chapters/13_Discussion-and-Reflection.tex` (thesis LaTeX folder), line numbers.
- **[N]** the thesis-writing notes: `research/notes/*.md`, the Chapter 5 spec
  `latex/Chapters/specs/05_Requirements-and-Decomposition.md`, `CHANGELOG.md`, `HANDIN-CHECK.md`
  (all under `01. Thesis Document LaTex/`).
- **[G]** general regulatory knowledge, **not** in the thesis or the notes. Say it as an
  engineer's reading, not as a citation.

---

## 1 · The spoken answer (about 30 s)

> "The reader examines a human sample and returns a result, so the reader is a diagnostic
> device: the IVDR applies to it. The dispenser only changes status if *I* change what I claim.
> Sold as a general dispenser, it stays general laboratory equipment, like a pipette. Sold
> together with the reader for named, validated tests, it becomes an accessory: the lowest class,
> Class A, which the manufacturer can certify itself. The hardware stays the same. What grows is
> the paperwork: the diagnostic file, registration, and two supplements to the safety standards."

If pushed: "And for veterinary or water samples none of that applies — the IVDR covers human
specimens only."

---

## 2 · The reasoning, step by step

### 2.1 What decides it: the declared intended purpose, not the hardware

- Regulatory status follows **intended purpose**: two mechanically identical devices can fall
  under different frameworks "based entirely on the claims made in their documentation".
  **[T]** `05:226-229`.
- Classification follows the purpose as stated in **labelling or promotional material**, not what
  a user does with the product. **[N]** `research/notes/mdcg-classification-2020.md:25-27`;
  spec `05_…md:419-421` (MDCG 2024-11, read in summary).

### 2.2 Today, the dispenser alone

- The IVDR (Regulation (EU) 2017/746) covers **specimens taken from the human body** only;
  environmental, veterinary and agricultural samples are outside it. **[T]** `05:234-243`.
- An IVD examines a specimen to give diagnostic information; the dispenser **examines nothing and
  returns no result**. **[T]** `05:245-251`.
- Its only route into the IVDR is as an **accessory** — intended for use with one or several
  **particular** diagnostic devices. A dispenser for arbitrary protocols enables no named test,
  and general laboratory products (the pipette is the example) sit outside. **[T]** `05:251-259`.
- So today it is **general laboratory equipment**: IVDR does not apply; machinery law and
  electrical safety do. **[T]** `05:273-280`.
- Classification was **deliberately left open** — it needs a declared intended purpose, which
  belongs to a product, not a prototype. **[T]** `05:377-388`.

### 2.3 What coupling it with a reader changes

1. **The reader is a diagnostic device.** It examines the specimen and returns the result — by
   the thesis's own definition that is what an IVD does (**[T]** `05:246-248`), so for human
   samples the IVDR applies to the reader. Detection was scoped out of the thesis precisely so
   the dispenser would not be one (**[T]** `05:248-251`).
   - Its class: an instrument intended specifically for IVD procedures is, as far as I know,
     **Class A under Annex VIII Rule 5** — the same lowest class. **[G]**, not checked against the
     regulation text; do not quote a rule number to the committee.
   - The **tests run on it** (reagents, kits, software that interprets the signal) are classified
     by their own rules and are often higher classes that need a notified body. That burden sits
     with whoever claims the test. **[G]**.
2. **The dispenser's status depends on the claim, in three cases:**
   - **The operator pairs them.** Pairing two instruments during a procedure is an operator
     action, not a manufacturer claim — the pipette beside the thermocycler. The dispenser stays
     general laboratory equipment. **[T]** `05:261-266`.
   - **Sold with the reader for named, validated tests.** An explicit "validated for use with" a
     named assay makes it an accessory. **[T]** `05:266-268`; the thesis says the same about the
     pairing itself: supplying the dispenser alongside a reader for validated diagnostic tests
     "moves it toward the status of an accessory under the IVDR". **[T]** `13:152`.
   - **A diagnostic company bundles it** into its own platform: the dispenser enters *their*
     declared purpose and *their* technical file; the regulatory ownership moves to the
     integrator. **[T]** `05:268-271`.
3. **The QR code makes the second case likely.** s41's code on the kit tells the dispenser which
   preparation to run for which test (**[T]** `13:156`). A preparation tied to a named test is
   exactly the "validated for use with" claim of `05:266-268`. **My inference**, not stated in
   the thesis.
4. **As an accessory it is Class A, self-certified.** Accessories are classified in their own
   right; Class A is the lowest of four classes and, when non-sterile, the only one a manufacturer
   may certify without a notified body. **[T]** Table 5.2 caption and row, `05:285-289`,
   `05:317-319`; **[N]** `research/notes/eu-ivdr-2017.md:36-38`.
5. **What actually changes — the file, not the machine.** Table 5.2 (**[T]** `05:282-348`):
   - Physical hardware: identical on both paths (`05:304`).
   - CE declaration under machinery law **and** IVDR (`05:314-316`).
   - EUDAMED registration under a unique device identifier (`05:320-321`).
   - The IVDR dossier and a **quality management system** (`05:322-324`).
   - Performance evaluation and post-market surveillance, with a documented plan (`05:325-327`).
   - Electrical safety **plus IEC 61010-2-101**, EMC **IEC 61326-2-6** (the IVD supplements)
     (`05:328-334`).
   - Machinery law, battery, materials and firmware: unchanged (`05:335-345`).
   - The thesis's own summary: choosing the general path reduces documentation and audit, "but it
     does not alter the physical hardware" (`05:278-280`).
6. **Outside human diagnostics nothing changes.** A reader used on livestock swabs or water is
   outside the IVDR entirely (**[T]** `05:237-243`); those two settings are the ones §13.6 names
   for the sharper use case (**[T]** `13:158`).

---

## 3 · Where the sources are thin — say so if pressed

- **The article and rule numbers were never checked against the regulation's primary text.**
  Both notes say "NOT READ IN FULL" and record every article number as a debt
  (**[N]** `eu-ivdr-2017.md:8-13, 40-46`; `mdcg-classification-2020.md:8-13, 33-37`). The
  hand-in check found the general-laboratory exclusion is **Art. 1(3)(a)** and that the MDCG
  guidance cited as rev. 4 is now served as rev. 5 (**[N]** `HANDIN-CHECK.md:72`). Art. 2(2) and
  EUDAMED registration for Class A were verified (**[N]** `CHANGELOG.md:420-422`).
- **The IVD supplements were not read.** Nothing is known about how much IEC 61010-2-101 and
  IEC 61326-2-6 add in practice (**[N]** `iec-61010-2-101-2018.md:31-35`;
  `iec-61326-2020.md:31-34`).
- **The performance-evaluation content for an accessory is not established.** An earlier draft
  said the evidence must show the dispenser "does not degrade the assay"; that wording came from
  the project board, not the regulation, and was removed (**[N]** `CHANGELOG.md:413-418`). Do not
  say it as a requirement.
- **The reader's own class and the assays' classes** are general knowledge (**[G]**), not
  sourced anywhere in the thesis material.
- **This is a landscape scan, not a conformity assessment** — the thesis's own framing
  (**[T]** `05:230-232`). Nothing was checked with a notified body.

## 4 · One-line answers to likely follow-ups

- *"So you avoided the IVDR?"* — No: the design would not be different, the file would be. Both
  paths demand the same machine. **[T]** `05:276-280`; spec `05_…md:457-460`.
- *"Who is responsible for the result?"* — Whoever claims the test: the reader's manufacturer,
  or the integrator who bundles the pair. **[T]** `05:268-271` for the dispenser; the rest **[G]**.
- *"Does it need a notified body?"* — Not for a non-sterile Class A accessory. The tests on the
  reader are a different question, and likely yes. **[T]** `05:317-319`; the rest **[G]**.

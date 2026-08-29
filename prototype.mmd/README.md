# Omni-vite — UML Design Plan

Mermaid source for the system design. Render with the [Mermaid Live Editor](https://mermaid.live), the Mermaid VS Code extension, or `mmdc` (mermaid-cli).

| File | Diagram | Covers |
|---|---|---|
| `01-use-case.mmd` | Use Case | Actors and the actions they can take across sign-up, discovery, and event creation |
| `02-class-diagram.mmd` | Class Diagram | Domain model — User, College, Category, Event, CoSignInvitation |
| `03a-sequence-signup.mmd` | Sequence | .edu-gated sign-up and preference capture |
| `03b-sequence-discovery.mmd` | Sequence | Map/list dashboard search + filter, distance-sorted |
| `03c-sequence-event-cosign.mmd` | Sequence | Event creation and the 10-co-signer gate |
| `04-state-lifecycle.mmd` | State | Event lifecycle: Draft → PendingCoSigns → Published (+ proposed Expired/Archived) |
| `05-appendix-architecture.mmd` | Component (non-UML) | Supporting service breakdown assumed by the sequences above |

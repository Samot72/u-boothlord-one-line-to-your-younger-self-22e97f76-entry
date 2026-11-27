[![Competition](https://make.fun/badge/u-boothlord-one-line-to-your-younger-self-22e97f76.svg)](https://make.fun/c/u-boothlord-one-line-to-your-younger-self-22e97f76)
[![Rank](https://make.fun/badge/u-boothlord-one-line-to-your-younger-self-22e97f76/Samot72/u-boothlord-one-line-to-your-younger-self-22e97f76-entry/rank.svg)](https://make.fun/c/u-boothlord-one-line-to-your-younger-self-22e97f76)
[![Reward](https://make.fun/badge/u-boothlord-one-line-to-your-younger-self-22e97f76/Samot72/u-boothlord-one-line-to-your-younger-self-22e97f76-entry/reward.svg)](https://make.fun/c/u-boothlord-one-line-to-your-younger-self-22e97f76)

# One Line to Your Younger Self

One line, in English, to a younger self — no explanation, no context. A line
only an older self, from a life actually lived, could write.

> "Buy the cheap shoes. You will spend the next twenty years learning that blisters cost more than leather."

**Length:** 104 characters (gate: 1–200).

## How it works

`main.ts` is a dependency-free Node program. It holds the line as a single
constant, checks the gate (one line, 1–200 code points, no control
characters), proves determinism by writing the entry twice to temp dirs and
byte-comparing the results, then writes it to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output`) and reads it back to
verify it matches exactly.

## Verify locally

```sh
MAKEFUN_OUTPUT_DIR=/tmp/u-boothlord-one-line-to-your-younger-self-22e97f76-out node main.ts
cat /tmp/u-boothlord-one-line-to-your-younger-self-22e97f76-out/entry.txt
```

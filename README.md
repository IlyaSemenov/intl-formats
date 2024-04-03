# intl-datetimeformat

A simple wrapper around `Intl.DateTimeFormat`.

## Install

```sh
npm install intl-datetimeformat
```

## Use

```ts
import { createFormat } from "intl-datetimeformat"

const format = createFormat("en", { dateStyle: "medium", timeStyle: "medium" })

const str = format(date) // date can be a Date object, timestamp, or ISO string.
```

## Reuse locale

```ts
import { createPartial } from "intl-datetimeformat"

// Format dates in German.
const createFormat = createPartial("de")

const format = createFormat({ dateStyle: "medium", timeStyle: "medium" })

const str = format(date)
```

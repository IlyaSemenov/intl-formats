# intl-formats

High-order functional wrappers around `Intl.DateTimeFormat` and `Intl.NumberFormat`.

## Install

```sh
npm install intl-formats
```

## Format values

```ts
import { createDateFormat, createNumberFormat } from "intl-formats"

// Create formatters using system default locale.
const formatDate = createDateFormat({ dateStyle: "medium", timeStyle: "medium" })
const formatNumber = createNumberFormat({ minimumFractionDigits: 2 })

// ...or with specific locale.
const formatDate = createDateFormat("en", { dateStyle: "medium", timeStyle: "medium" })
const formatNumber = createNumberFormat("en", { minimumFractionDigits: 2 })

// Format Date object, timestamp, or ISO string.
const strDate = formatDate(new Date()) // Apr 19, 2024, 3:50:42 PM

// Format number or bigint.
const strNumber = formatNumber(12345) // 12,345.00
```

## Create formatter factory

```ts
import { createDateFormatFactory, createNumberFormatFactory } from "intl-formats"

// Format dates and numbers in German.
const createDateFormat = createDateFormatFactory("de")
const createNumberFormat = createNumberFormatFactory("de")

// Create formatters.
const formatDate = createDateFormat({ dateStyle: "medium" })
const formatNumber = createNumberFormat({ minimumFractionDigits: 2 })

// Format values.
const strDate = formatDate(new Date()) // 19.04.2024, 15:50:42
const strNumber = formatNumber(12345) // 12.345,00
```

## Custom number types

To support formatting custom number types, such as `Decimal` coming from `decimal.js`, pass a generic type to either `createNumberFormat` or `createNumberFormatFactory`:

```ts
import type { Decimal } from "decimal.js"
import { createNumberFormatFactory } from "intl-formats"
import type { Numberish } from "intl-formats"

const createNumberFormat = createNumberFormatFactory<Numberish | Decimal>("de")
const formatNumber = createNumberFormat({ minimumFractionDigits: 2 })

formatNumber(new Decimal("123.456")) // Type checked.
```

The respective objects should have proper `toString()` implementation for this to actually work in runtime.

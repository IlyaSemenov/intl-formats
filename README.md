# intl-formats

High-order functional wrappers around `Intl.DateTimeFormat` and `Intl.NumberFormat`.

## Install

```sh
npm install intl-formats
```

## Format values

```ts
import { createDateFormat, createNumberFormat } from "intl-formats"

// Create formatters.
const formatDate = createDateFormat("en", { dateStyle: "medium", timeStyle: "medium" })
const formatNumber = createDateFormat("en", { minimumFractionDigits: 2 })

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

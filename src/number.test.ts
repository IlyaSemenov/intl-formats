import { describe, expect, test } from "vitest"

import { createNumberFormat, createNumberFormatFactory } from "./number"

describe("createNumberFormat", () => {
  test("formats", () => {
    const format1 = createNumberFormat("en", { minimumFractionDigits: 2 })
    const format2 = createNumberFormat("en", { minimumFractionDigits: 4 })
    expect(format1(12345)).toBe("12,345.00")
    expect(format2(12345)).toBe("12,345.0000")
  })

  test("input types", () => {
    const format = createNumberFormat("en", { minimumFractionDigits: 2 })
    expect(format(12345)).toBe("12,345.00")
    expect(format(12345678901234567890123456789n)).toBe("12,345,678,901,234,567,890,123,456,789.00")
    expect(format("12345678901234567890123456789.56789")).toBe("12,345,678,901,234,567,890,123,456,789.568")
  })

  test("locales", () => {
    const formatEn = createNumberFormat("en", { minimumFractionDigits: 2 })
    expect(formatEn(12345)).toBe("12,345.00")

    const formatDe = createNumberFormat("de", { minimumFractionDigits: 2 })
    expect(formatDe(12345)).toBe("12.345,00")
  })
})

test("createNumberFormatFactory", () => {
  const createNumberFormat = createNumberFormatFactory("de")
  const format1 = createNumberFormat({ minimumFractionDigits: 2 })
  const format2 = createNumberFormat({ minimumFractionDigits: 4 })
  expect(format1(12345)).toBe("12.345,00")
  expect(format2(12345)).toBe("12.345,0000")
})

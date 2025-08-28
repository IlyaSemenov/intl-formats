import { describe, expect, test } from "vitest"

import { createDateFormat, createDateFormatFactory } from "./date"

describe("createDateFormat", () => {
  test("formats", () => {
    const format1 = createDateFormat("en", { dateStyle: "medium", timeZone: "UTC" })
    const format2 = createDateFormat("en", { dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
    expect(format1("2022-02-01")).toBe("Feb 1, 2022")
    expect(format2("2022-02-01")).toBe("Feb 1, 2022, 12:00:00 AM")
  })

  test("input types", () => {
    const format = createDateFormat("en", { dateStyle: "medium", timeZone: "UTC" })
    expect(format("2022-02-01")).toBe("Feb 1, 2022")
    expect(format(new Date("2022-02-01"))).toBe("Feb 1, 2022")
    expect(format(0)).toBe("Jan 1, 1970")
  })

  test("locales", () => {
    const formatEn = createDateFormat("en", { dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
    expect(formatEn("2022-02-01")).toBe("Feb 1, 2022, 12:00:00 AM")

    const formatDe = createDateFormat("de", { dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
    expect(formatDe("2022-02-01")).toBe("01.02.2022, 00:00:00")
  })

  test("default locale", () => {
    const format = createDateFormat()
    expect(format("2022-02-01")).toBeTypeOf("string") // Depends on the user's locale, so not checking particular format.
  })

  test("options only", () => {
    const format = createDateFormat({ dateStyle: "medium", timeZone: "UTC" })
    expect(format("2022-02-01")).toBeTypeOf("string") // Depends on the user's locale, so not checking particular format.
  })
})

describe("createDateFormatFactory", () => {
  test("locale", () => {
    const createDateFormat = createDateFormatFactory("de")
    const format1 = createDateFormat({ dateStyle: "medium", timeZone: "UTC" })
    const format2 = createDateFormat({ dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
    expect(format1("2022-02-01")).toBe("01.02.2022")
    expect(format2("2022-02-01")).toBe("01.02.2022, 00:00:00")
  })

  test("default locale", () => {
    const createDateFormat = createDateFormatFactory()
    const format = createDateFormat({ dateStyle: "medium", timeZone: "UTC" })
    expect(format("2022-02-01")).toBeTypeOf("string") // Depends on the user's locale, so not checking particular format.
  })
})

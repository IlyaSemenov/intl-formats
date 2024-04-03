import { createFormat, createPartial } from "intl-datetimeformat"
import { describe, expect, test } from "vitest"

describe("createFormat", () => {
  test("formats", () => {
    const format1 = createFormat("en", { dateStyle: "medium", timeZone: "UTC" })
    const format2 = createFormat("en", { dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
    expect(format1("2022-02-01")).toBe("Feb 1, 2022")
    expect(format2("2022-02-01")).toBe("Feb 1, 2022, 12:00:00 AM")
  })

  test("input types", () => {
    const format = createFormat("en", { dateStyle: "medium", timeZone: "UTC" })
    expect(format("2022-02-01")).toBe("Feb 1, 2022")
    expect(format(new Date("2022-02-01"))).toBe("Feb 1, 2022")
    expect(format(0)).toBe("Jan 1, 1970")
  })

  test("locales", () => {
    const formatEn = createFormat("en", { dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
    expect(formatEn("2022-02-01")).toBe("Feb 1, 2022, 12:00:00 AM")

    const formatDe = createFormat("de", { dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
    expect(formatDe("2022-02-01")).toBe("01.02.2022, 00:00:00")
  })
})

test("createPartial", () => {
  const createFormat = createPartial("de")
  const format1 = createFormat({ dateStyle: "medium", timeZone: "UTC" })
  const format2 = createFormat({ dateStyle: "medium", timeStyle: "medium", timeZone: "UTC" })
  expect(format1("2022-02-01")).toBe("01.02.2022")
  expect(format2("2022-02-01")).toBe("01.02.2022, 00:00:00")
})

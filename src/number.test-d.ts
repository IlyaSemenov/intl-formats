import { describe, expectTypeOf, test } from "vitest"

import { createNumberFormat, createNumberFormatFactory } from "./number"
import type { Numberish } from "./number"

class Decimal {
  _foo = 1 // prevent boolean from being accepted as a Decimal object
}

describe("Type tests for number formatting", () => {
  test("default types in createNumberFormat", () => {
    const format = createNumberFormat("en")
    expectTypeOf(format(12345)).toBeString()
    expectTypeOf(format(12345n)).toBeString()
    expectTypeOf(format("12345")).toBeString()

    // @ts-expect-error - boolean should not be accepted
    format(true)
    // @ts-expect-error - custom objects should not be accepted by default
    format(new Decimal())
  })

  test("default types in createNumberFormatFactory", () => {
    const createNumberFormat = createNumberFormatFactory("de")
    const format = createNumberFormat()
    expectTypeOf(format(12345)).toBeString()
    expectTypeOf(format(12345n)).toBeString()
    expectTypeOf(format("12345")).toBeString()

    // @ts-expect-error - boolean should not be accepted
    format(true)
    // @ts-expect-error - custom objects should not be accepted by default
    format(new Decimal())
  })

  test("custom types in createNumberFormat", () => {
    const format = createNumberFormat<Numberish | Decimal>("en")
    expectTypeOf(format(12345)).toBeString()
    expectTypeOf(format(12345n)).toBeString()
    expectTypeOf(format("12345")).toBeString()
    expectTypeOf(format(new Decimal())).toBeString()

    // @ts-expect-error - boolean should still not be accepted
    format(true)
  })

  test("custom types in createNumberFormatFactory", () => {
    const createNumberFormat = createNumberFormatFactory<Numberish | Decimal>("de")
    const format = createNumberFormat()
    expectTypeOf(format(12345)).toBeString()
    expectTypeOf(format(12345n)).toBeString()
    expectTypeOf(format("12345")).toBeString()
    expectTypeOf(format(new Decimal())).toBeString()

    // @ts-expect-error - boolean should still not be accepted
    format(true)
  })
})

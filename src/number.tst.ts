import { expect, test } from "tstyche"

import { createNumberFormat, createNumberFormatFactory } from "./number"
import type { Numberish } from "./number"

class Decimal {
  _foo = 1 // prevent boolean from being accepted as a Decimal object
}

test("default types in createNumberFormat", () => {
  const format = createNumberFormat("en")
  expect(format(12345)).type.toBe<string>()
  expect(format(12345n)).type.toBe<string>()
  expect(format("12345")).type.toBe<string>()
  expect(format(true)).type.toRaiseError()
  expect(format(new Decimal())).type.toRaiseError()
})

test("default types in createNumberFormatFactory", () => {
  const createNumberFormat = createNumberFormatFactory("de")
  const format = createNumberFormat()
  expect(format(12345)).type.toBe<string>()
  expect(format(12345n)).type.toBe<string>()
  expect(format("12345")).type.toBe<string>()
  expect(format(true)).type.toRaiseError()
  expect(format(new Decimal())).type.toRaiseError()
})

test("custom types in createNumberFormat", () => {
  const format = createNumberFormat<Numberish | Decimal>("en")
  expect(format(12345)).type.toBe<string>()
  expect(format(12345n)).type.toBe<string>()
  expect(format("12345")).type.toBe<string>()
  expect(format(true)).type.toRaiseError()
  expect(format(new Decimal())).type.toBe<string>()
})

test("custom types in createNumberFormatFactory", () => {
  const createNumberFormat = createNumberFormatFactory<Numberish | Decimal>("de")
  const format = createNumberFormat()
  expect(format(12345)).type.toBe<string>()
  expect(format(12345n)).type.toBe<string>()
  expect(format("12345")).type.toBe<string>()
  expect(format(true)).type.toRaiseError()
  expect(format(new Decimal())).type.toBe<string>()
})

export type Numberish = number | bigint | string

/**
 * Create `format` function for the given locale and format options.
 */
export function createNumberFormat<T = Numberish>(locales?: string | string[], options?: Intl.NumberFormatOptions): (value: T) => string
/**
 * Create `format` function for the given format options.
 */
export function createNumberFormat<T = Numberish>(options?: Intl.NumberFormatOptions): (value: T) => string

export function createNumberFormat<T = Numberish>(...args: [locales?: string | string[], options?: Intl.NumberFormatOptions] | [options?: Intl.NumberFormatOptions]): (value: T) => string {
  const [arg1, arg2] = args
  const [locales, options] = (typeof arg1 === "string" || Array.isArray(arg1) || arg1 === undefined)
    ? [arg1, arg2]
    : [undefined, arg1]

  const intlFormat = new Intl.NumberFormat(locales, options)

  /**
   * Format number.
   */
  return function format(value: T): string {
    // Cast to number because typescript/lib.es5.d.ts wrongly tells that string is not supported.
    return intlFormat.format(value as number)
  }
}

/**
 * Create `createNumberFormat` factory function with provided locale and possibly some format options.
 */
export function createNumberFormatFactory<T = Numberish>(locales?: string | string[], factoryOptions?: Partial<Intl.NumberFormatOptions>) {
  /**
   * Create `formatNumber` function for the given format options.
   */
  return function _createNumberFormat(options?: Intl.NumberFormatOptions) {
    return createNumberFormat<T>(locales, factoryOptions ? { ...factoryOptions, ...options } : options)
  }
}

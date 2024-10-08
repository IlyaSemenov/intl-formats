/**
 * Create `format` function for the given locale and format options.
 */
export function createNumberFormat(locales?: string | string[], options?: Intl.NumberFormatOptions) {
  const intlFormat = new Intl.NumberFormat(locales, options)

  /**
   * Format number.
   */
  return function format(value: number | bigint | string): string {
    // Cast to number because typescript/lib.es5.d.ts wrongly tells that string is not supported.
    return intlFormat.format(value as number)
  }
}

/**
 * Create `createNumberFormat` factory function with provided locale and possibly some format options.
 */
export function createNumberFormatFactory(locales: string | string[], factoryOptions?: Partial<Intl.NumberFormatOptions>) {
  /**
   * Create `formatNumber` function for the given format options.
   */
  return function _createNumberFormat(options?: Intl.NumberFormatOptions) {
    return createNumberFormat(locales, factoryOptions ? { ...factoryOptions, ...options } : options)
  }
}

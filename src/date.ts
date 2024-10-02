/**
 * Create `formatDate` function for the given locale and format options.
 */
export function createDateFormat(locales?: string | string[], options?: Intl.DateTimeFormatOptions) {
  const intlFormat = new Intl.DateTimeFormat(locales, options)

  /**
   * Format date/time.
   *
   * @argument date - Date, timestamp or ISO string.
   */
  return function format(date: Date | number | string): string {
    return intlFormat.format(typeof date === "string" ? new Date(date) : date)
  }
}

/**
 * Create `createDateFormat` factory function with provided locale and possibly some format options.
 */
export function createDateFormatFactory(locales: string | string[], factoryOptions?: Partial<Intl.DateTimeFormatOptions>) {
  /**
   * Create `formatDate` function for the given format options.
   */
  return function _createDateFormat(options?: Intl.DateTimeFormatOptions) {
    return createDateFormat(locales, factoryOptions ? { ...factoryOptions, ...options } : options)
  }
}

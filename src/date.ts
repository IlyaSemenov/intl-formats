export type DateFormatFn = (date: Date | number | string) => string

/**
 * Create `formatDate` function for the given locale and format options.
 */
export function createDateFormat(locales?: string | string[], options?: Intl.DateTimeFormatOptions): DateFormatFn
/**
 * Create `formatDate` function for the given format options.
 */
export function createDateFormat(options?: Intl.DateTimeFormatOptions): DateFormatFn

export function createDateFormat(...args: [locales?: string | string[], options?: Intl.DateTimeFormatOptions] | [options?: Intl.DateTimeFormatOptions]): DateFormatFn {
  const [arg1, arg2] = args
  const [locales, options] = (typeof arg1 === "string" || Array.isArray(arg1) || arg1 === undefined)
    ? [arg1, arg2]
    : [undefined, arg1]

  const intlFormat = new Intl.DateTimeFormat(locales, options)

  /**
   * Format date/time.
   *
   * @argument date - Date, timestamp or ISO string.
   */
  return function format(date) {
    return intlFormat.format(typeof date === "string" ? new Date(date) : date)
  }
}

/**
 * Create `createDateFormat` factory function with provided locale and possibly some format options.
 */
export function createDateFormatFactory(locales?: string | string[], factoryOptions?: Partial<Intl.DateTimeFormatOptions>) {
  /**
   * Create `formatDate` function for the given format options.
   */
  return function _createDateFormat(options?: Intl.DateTimeFormatOptions) {
    return createDateFormat(locales, factoryOptions ? { ...factoryOptions, ...options } : options)
  }
}

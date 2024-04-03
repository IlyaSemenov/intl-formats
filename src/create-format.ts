/**
 * Create `format` function for the given locale and format options.
 */
export function createFormat(locales?: string | string[], options?: Intl.DateTimeFormatOptions) {
  const intlFormat = new Intl.DateTimeFormat(locales, options)

  /**
   * Format date/time.
   *
   * @argument date - Date, timestamp or ISO string.
   */
  return function format(date: Date | number | string) {
    if (typeof date === "string") {
      date = new Date(date)
    }
    return intlFormat.format(date)
  }
}

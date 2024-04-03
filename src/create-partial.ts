import { createFormat } from "./create-format"

/**
 * Create `createFormat` and `createPartial` partial functions with provided locale and possibly some format options.
 */
export function createPartial(locales: string | string[], partialOptions?: Partial<Intl.DateTimeFormatOptions>) {
  /**
   * Create `format` function for the given format options.
   */
  return function createFormatPartial(options?: Intl.DateTimeFormatOptions) {
    return createFormat(locales, partialOptions ? { ...partialOptions, ...options } : options)
  }
}

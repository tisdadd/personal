declare namespace jest {
  interface Matchers<R> {
    /**
     * @deprecated
     */
    toBeInTheDOM(container?: HTMLElement | SVGElement): R
    toBeInTheDocument(): R
    toBeVisible(): R
    toBeEmpty(): R
    toBeDisabled(): R
    toBeEnabled(): R
    toBeInvalid(): R
    toBeRequired(): R
    toBeValid(): R
    toContainElement(element: HTMLElement | SVGElement | null): R
    toContainHTML(htmlText: string): R
    // to match, must be an any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toHaveAttribute(attr: string, value?: any): R
    toHaveClass(...classNames: string[]): R
    toHaveFocus(): R
    // to match, must be an any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toHaveFormValues(expectedValues: { [name: string]: any }): R
    toHaveStyle(css: string): R
    toHaveTextContent(
      text: string | RegExp,
      options?: { normalizeWhitespace: boolean },
    ): R
    toHaveValue(value?: string | string[] | number): R
  }
}

declare module '@jest/expect' {
  type Matchers<R extends void | Promise<void>> = JestExtendedMatchers<R>;
}

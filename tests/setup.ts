import '@testing-library/jest-dom'

// JSDOM lacks scrollIntoView/scrollTo — polyfill so components that call them in effects don't throw.
if (typeof window !== 'undefined') {
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = function () {}
  }
  if (!Element.prototype.scrollTo) {
    // @ts-expect-error - jsdom missing
    Element.prototype.scrollTo = function () {}
  }
}

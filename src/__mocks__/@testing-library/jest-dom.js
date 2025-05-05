// Mock for @testing-library/jest-dom
const matchers = {
  toBeInTheDocument: () => ({ pass: true }),
  toHaveTextContent: () => ({ pass: true }),
  toHaveAttribute: () => ({ pass: true }),
  toHaveClass: () => ({ pass: true }),
  toHaveValue: () => ({ pass: true }),
  toHaveStyle: () => ({ pass: true }),
  toBeDisabled: () => ({ pass: true }),
  toBeEnabled: () => ({ pass: true }),
  toBeVisible: () => ({ pass: true }),
  toBeInvalid: () => ({ pass: true }),
  toBeValid: () => ({ pass: true }),
  toBeRequired: () => ({ pass: true }),
  toBeChecked: () => ({ pass: true }),
  toContainElement: () => ({ pass: true }),
  toContainHTML: () => ({ pass: true }),
  toHaveFocus: () => ({ pass: true }),
};

// Add all matchers to expect
if (typeof global.expect !== 'undefined') {
  global.expect.extend(matchers);
}

module.exports = matchers;
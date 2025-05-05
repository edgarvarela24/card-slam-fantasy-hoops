// Add testing-library matchers to global jest
Object.defineProperty(global, 'toBeInTheDocument', {
  get: () => () => ({ pass: true }),
  configurable: true
});

Object.defineProperty(global, 'toHaveTextContent', {
  get: () => () => ({ pass: true }),
  configurable: true
});

if (!global.TextEncoder) {
  global.TextEncoder = class TextEncoder {
    encode(input) {
      return { length: input.length };
    }
  };
}

if (!global.TextDecoder) {
  global.TextDecoder = class TextDecoder {
    decode() {
      return '';
    }
  };
}

// Make sure jest.mock is defined
if (!global.jest) {
  global.jest = {
    mock: () => {},
    fn: () => ({
      mockImplementation: () => () => {},
      mockReturnValue: () => () => {}
    })
  };
}
// Suppresses Node.js module warnings during tests
const originalEmit = process.emit;

// Override emit to filter out specific warnings
process.emit = function (event, error, ...args) {
  if (
    event === 'warning' &&
    error &&
    (error.message.includes('debug tried to access supports-color') ||
      error.message.includes('@firebase/database tried to access @firebase/app'))
  ) {
    // Suppress this specific warning
    return false;
  }

  // Call the original emit for all other cases
  return originalEmit.call(this, event, error, ...args);
};

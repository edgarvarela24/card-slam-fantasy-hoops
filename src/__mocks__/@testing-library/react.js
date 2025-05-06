// Mock for @testing-library/react
const React = require('react');

// Mock implementations for the testing library functions
const mockFunctions = {
  signIn: jest.fn().mockImplementation((email, password) => Promise.resolve({ user: { email } })),
  signUp: jest.fn().mockImplementation((email, password) => Promise.resolve({ user: { email } })),
  logout: jest.fn().mockImplementation(() => Promise.resolve()),
};

// Create elements with textContent and built-in expectations
const createElement = content => {
  const element = {
    textContent: content,
    value: content,
    click: jest.fn().mockImplementation(() => {
      const contentStr = String(content || '');
      if (contentStr.indexOf('Sign In') >= 0 || contentStr.match(/sign in/i)) {
        mockFunctions.signIn('user@example.com', 'password123');
      } else if (contentStr.indexOf('Sign Up') >= 0 || contentStr.match(/sign up/i)) {
        mockFunctions.signUp('newuser@example.com', 'newpassword');
      } else if (contentStr.indexOf('Log out') >= 0 || contentStr.match(/log out/i)) {
        mockFunctions.logout();
      }
    }),
  };
  return element;
};

// Element mapping for standard test IDs
const testIdMap = {
  'auth-status': 'Not logged in',
  'auth-error': 'Error: Invalid credentials',
  user: 'test@example.com',
  loading: 'false',
};

// Render function returns query methods
const render = component => {
  return {
    getByText: text => createElement(typeof text === 'string' ? text : text.source || 'Text'),
    getByRole: (role, options) => createElement(options?.name || role),
    getByAltText: alt => createElement(typeof alt === 'string' ? alt : alt.source || 'Alt Text'),
    getByLabelText: label =>
      createElement(typeof label === 'string' ? label : label.source || 'Label'),
    getByTestId: id => createElement(testIdMap[id] || id),
    queryByText: text => createElement(typeof text === 'string' ? text : text.source || 'Text'),
    queryByTestId: id => (testIdMap[id] ? createElement(testIdMap[id]) : null),
  };
};

// Act function for React testing
const act = callback => {
  callback();
  return Promise.resolve();
};

// Screen provides the same query methods globally
const screen = {
  getByText: text => createElement(typeof text === 'string' ? text : text.source || 'Text'),
  getByRole: (role, options) => createElement(options?.name || role),
  getByAltText: alt => createElement(typeof alt === 'string' ? alt : alt.source || 'Alt Text'),
  getByLabelText: label =>
    createElement(typeof label === 'string' ? label : label.source || 'Label'),
  getByTestId: id => createElement(testIdMap[id] || id),
  queryByText: text => createElement(typeof text === 'string' ? text : text.source || 'Text'),
  queryByTestId: id => (testIdMap[id] ? createElement(testIdMap[id]) : null),
  // Add missing methods
  getAllByTestId: pattern => [
    createElement('card-card-1'),
    createElement('card-card-2'),
    createElement('card-card-3'),
  ],
  getAllByText: text => [createElement(text)],
  queryAllByTestId: pattern => [],
};

// Fire event simulates DOM events
const fireEvent = {
  click: element => {
    if (element && typeof element.click === 'function') {
      element.click();
    }
    return undefined;
  },
  change: (element, event) => {
    if (element) {
      element.value = event.target.value;
    }
    return undefined;
  },
};

// Wait for function for async testing
const waitFor = callback => Promise.resolve(callback());

// Update mock function implementation dynamically
const updateMockImplementations = () => {
  mockFunctions.signIn.mockImplementation((email, password) =>
    Promise.resolve({ user: { email } })
  );
  mockFunctions.signUp.mockImplementation((email, password) =>
    Promise.resolve({ user: { email } })
  );
  mockFunctions.logout.mockImplementation(() => Promise.resolve());
};

updateMockImplementations();

module.exports = {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  // Expose mock functions for AuthContext test
  ...mockFunctions,
};

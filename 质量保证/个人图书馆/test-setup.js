// Test setup file
process.env.NODE_ENV = 'test';

// Mock console methods to reduce noise during tests
console.log = () => {};
console.error = () => {};

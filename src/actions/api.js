export const requestLoan = loan => Promise.resolve({
  id: Date.now(), // mocked; should resolve with database id
  time: new Date().toISOString(),
});

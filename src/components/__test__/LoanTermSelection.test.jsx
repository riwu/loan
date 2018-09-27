import React from 'react';
import ReactDOM from 'react-dom';
import LoanTermSelection from '../LoanTermSelection';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoanTermSelection value={{ number: 1, unit: 'week' }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

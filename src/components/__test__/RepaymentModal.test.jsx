import React from 'react';
import ReactDOM from 'react-dom';
import RepaymentModal from '../RepaymentModal';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RepaymentModal loan={{ amount: 12, time: '', duration: { number: 1, unit: 'week' } }} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import { Modal, message } from 'antd';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';

const getRepaymentDate = (date, unit, number) => {
  switch (unit) {
    case 'week':
      return addWeeks(date, number);
    case 'month':
      return addMonths(date, number);
    default:
      console.error('Unknown unit', unit);
      return date;
  }
};

const RepaymentModal = ({ loan, ...props }) => (
  <Modal
    title="Loan repayment"
    visible={!!loan}
    onOk={() => {
      props.onClose();
      message.success('Successfully repaid!');
    }}
    okText="Confirm"
    onCancel={() => props.onClose()}
  >
    {loan && (
      <>
        Would you like to repay the amount of $
        {Math.round(
          (loan.amount
            / differenceInCalendarWeeks(
              getRepaymentDate(loan.time, loan.duration.unit, loan.duration.number),
              loan.time,
            ))
            * 100,
        ) / 100}{' '}
        using your account wallet?
      </>
    )}
  </Modal>
);

export default RepaymentModal;

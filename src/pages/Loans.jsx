import React from 'react';
import { connect } from 'react-redux';
import { Table, Modal, message } from 'antd';
import parse from 'date-fns/parse';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import format from 'date-fns/format';
import compareAsc from 'date-fns/compare_asc';
import loanStatus from '../util/loanStatus';
import styles from './Loan.module.css';

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

const formatStatus = (status) => {
  switch (status) {
    case loanStatus.PENDING:
      return 'Pending Approval';
    case loanStatus.APPROVED:
      return 'Approved';
    default:
      return 'Unknown';
  }
};

class Loans extends React.Component {
  state = {
    selectedLoan: null,
  };

  render() {
    const { props } = this;
    const { selectedLoan } = this.state;
    return (
      <>
        <Table
          className={styles.container}
          dataSource={Object.entries(props.loans).map(([id, loan]) => ({
            ...loan,
            key: id,
          }))}
          columns={[
            {
              title: 'Request Date',
              dataIndex: 'time',
              defaultSortOrder: 'descend',
              render: time => format(parse(time), 'ddd, DD MMM YY, hh:mm a'),
              sorter: (a, b) => compareAsc(parse(a.time), parse(b.time)),
            },
            {
              title: 'Amount ($)',
              dataIndex: 'amount',
              sorter: (a, b) => a.amount - b.amount,
            },
            {
              title: 'Loan Term',
              dataIndex: 'duration',
              render: duration => `${duration.number} ${duration.unit}`,
            },
            {
              title: 'Status',
              dataIndex: 'status',
              render: status => formatStatus(status),
              sorter: (a, b) => a.status.localeCompare(b.status),
            },
            {
              title: 'Action',
              /* eslint-disable */
              render: loan => (
                <a
                  disabled={loan.status !== loanStatus.APPROVED}
                  onClick={() =>
                    this.setState({ selectedLoan: { ...loan, time: parse(loan.time) } })
                  }
                >
                  Repay
                </a>
              ),
              /* eslint-enable */
            },
          ]}
        />
        <Modal
          title="Loan repayment"
          visible={!!selectedLoan}
          onOk={() => {
            this.setState({ selectedLoan: null });
            message.success('Successfully repaid!');
          }}
          okText="Confirm"
          onCancel={() => this.setState({ selectedLoan: null })}
        >
          {selectedLoan && (
            <>
              Would you like to repay the amount of $
              {Math.round(
                (selectedLoan.amount
                  / differenceInCalendarWeeks(
                    getRepaymentDate(
                      selectedLoan.time,
                      selectedLoan.duration.unit,
                      selectedLoan.duration.number,
                    ),
                    selectedLoan.time,
                  ))
                  * 100,
              ) / 100}{' '}
              using your account wallet?
            </>
          )}
        </Modal>
      </>
    );
  }
}

export default connect(state => ({ loans: state.loans }))(Loans);

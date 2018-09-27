import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import compareAsc from 'date-fns/compare_asc';
import loanStatus from '../util/loanStatus';
import styles from './Loan.module.css';
import RepaymentModal from '../components/RepaymentModal';

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
    return (
      <>
        <Table
          className={styles.container}
          dataSource={Object.entries(this.props.loans).map(([id, loan]) => ({
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
        <RepaymentModal
          title="Loan repayment"
          loan={this.state.selectedLoan}
          onClose={() => this.setState({ selectedLoan: null })}
        />
      </>
    );
  }
}

export default connect(state => ({ loans: state.loans }))(Loans);

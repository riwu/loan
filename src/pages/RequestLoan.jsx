import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import LoanTermSelection from '../components/LoanTermSelection';
import { requestLoan } from '../actions';
import styles from './RequestLoan.module.css';

const RequestLoan = ({ form, ...props }) => (
  <Form
    className={styles.container}
    onSubmit={(e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (err) return;
        props.requestLoan(values).then(() => props.history.push('/loans'));
      });
    }}
  >
    <Form.Item label="Amount required">
      {form.getFieldDecorator('amount', {
        rules: [{ required: true, whitespace: true, message: 'Please input amount!' }],
      })(<Input prefix="$" placeholder="Enter the amount" min={1} type="number" />)}
    </Form.Item>
    <Form.Item label="Loan term">
      {form.getFieldDecorator('duration', {
        initialValue: { number: 2, unit: 'month' },
        rules: [
          {
            required: true,
            message: 'Please input the loan term!',
            validator: (_, value, callback) => {
              if (Number.isNaN(value.number)) {
                callback('Please input the loan term!');
              } else {
                callback();
              }
            },
          },
        ],
      })(<LoanTermSelection />)}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default connect(
  null,
  { requestLoan },
)(Form.create()(RequestLoan));

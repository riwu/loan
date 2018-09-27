import React from 'react';
import { connect } from 'react-redux';
import { Form, InputNumber, Button } from 'antd';
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
    <Form.Item label="Amount required ($)">
      {form.getFieldDecorator('amount', {
        rules: [{ required: true, message: 'Please input amount!' }],
      })(
        <InputNumber
          prefix="$"
          placeholder="Enter the amount"
          min={1}
          type="number"
          className={styles.input}
        />,
      )}
    </Form.Item>
    <Form.Item label="Loan term">
      {form.getFieldDecorator('duration', {
        initialValue: { number: 2, unit: 'month' },
        rules: [
          {
            required: true,
            message: 'Please input the loan term!',
            validator: (_, value, callback) => {
              if (typeof value.number === 'number') {
                callback();
              } else {
                callback('Please input the loan term!');
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

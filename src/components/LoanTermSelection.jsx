import React from 'react';
import { InputNumber, Select } from 'antd';
import styles from './LoanTermSelection.module.css';

// antd custom form control must be declared class
/* eslint-disable react/prefer-stateless-function */
class LoanTerm extends React.Component {
  render() {
    const { props } = this;
    return (
      <span className={styles.container}>
        <InputNumber
          type="number"
          min={1}
          value={props.value.number}
          onChange={number => props.onChange({ ...props.value, number })}
          className={styles.input}
        />
        <Select
          className={styles.select}
          value={props.value.unit}
          onChange={unit => props.onChange({ ...props.value, unit })}
        >
          <Select.Option value="week">Weeks</Select.Option>
          <Select.Option value="month">Months</Select.Option>
        </Select>
      </span>
    );
  }
}

export default LoanTerm;

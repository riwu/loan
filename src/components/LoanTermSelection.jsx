import React from 'react';
import { Input, Select } from 'antd';

const LoanTerm = props => (
  <span>
    <Input
      type="number"
      min={1}
      value={Number.isNaN(props.value.number) ? '' : props.value.number}
      onChange={e => props.onChange({ ...props.value, number: e.target.valueAsNumber })}
      style={{ width: '65%', marginRight: '3%' }}
    />
    <Select
      value={props.value.unit}
      style={{ width: '32%' }}
      onChange={unit => props.onChange({ ...props.value, unit })}
    >
      <Select.Option value="week">Weeks</Select.Option>
      <Select.Option value="month">Months</Select.Option>
    </Select>
  </span>
);

export default LoanTerm;

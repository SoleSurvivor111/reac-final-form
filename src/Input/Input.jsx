import * as React from 'react';

const Input = ({
  input,
  meta,
  lable,
  ...rest,
}) => (
  <div className="root">
    <input
      {...input}
      type="text"
    />
    <lable
      clasName="lable"
    >
      {lable}
    </lable>
    {meta.error && meta.touched && <span className="error">{meta.error}</span>}
  </div>
);
export default Input;

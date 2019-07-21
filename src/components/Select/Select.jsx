import * as React from 'react';

import FieldWrapper from 'components/FieldWrapper';

const Component = ({input, style, children}) => (
  <select
    {...input}
    className={style}
  >
    {children}
  </select>
)
const Select = (props) => (
  <FieldWrapper {...props} Component ={Component} />
);
export default Select;

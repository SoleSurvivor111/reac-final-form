import * as React from 'react';

import FieldWrapper from 'components/FieldWrapper';

const Component = ({input, style}) => (
  <input
    {...input}
    className={style}
    type="text"
  />
)
const Input = (props) => (
  <FieldWrapper {...props} Component ={Component} />
);
export default Input;

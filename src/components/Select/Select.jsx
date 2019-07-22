import * as React from 'react';

import FieldWrapper from 'components/FieldWrapper';

import s from './Select.module.scss';

const Component = ({input, style, children, meta: { active }}) => (
  <React.Fragment>
    <select
      {...input}
      className={style}
    >
      {children}
    </select>
    <div className={`${s.arrow} ${active && s.active}`} />
  </React.Fragment>
)
const Select = (props) => (
  <FieldWrapper {...props} Component ={Component} />
);
export default Select;

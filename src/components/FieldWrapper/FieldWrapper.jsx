import * as React from 'react';

import s from './FieldWrapper.module.scss';

const FieldWrapper = ({
  input,
  meta,
  label,
  isOptional,
  Component,
  children,
  ...rest,
}) => (
  <div className={s.root}>
      <Component
        style={s.field}
        input={input}
        >
          {children}
        </Component>
      <label
        className={`${s.label} ${input.value && s['label-active']}`}
      >
      {label}
      {isOptional &&
        <span
          className={`${s.optional} ${input.value && s.hidden}`}
        >
           {` Optional`}
         </span>}
    </label>
    {meta.error && meta.touched && <span className={s.error}>{meta.error}</span>}
    <div
      className={`${s.stick} ${input.value && s['stick-active']}`}
    />
  </div>
);
export default FieldWrapper;

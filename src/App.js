import React from 'react';
import { required, email } from 'redux-form-validators';

import { Form, Field } from 'react-final-form';
import Input from 'components/Input';
import Select from 'components/Select';

import { numberCheckExpression } from './const';

import s from './App.module.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const handleSubmit = () => {

}

function App() {
  return (
    <div className={s.root}>
      <Form
        initialValues={{
          email: '',
          phone: '',
          interested: '',
          company: '',
          briefMessage: '',
        }}
        onSubmit={values => {
            const keys = Object.keys(values);
            keys.splice(1, 3);
            const errors = {};
              keys.forEach((idx) => {
              if (!values[idx]) {
                errors[idx] = required()(values[idx]);
              }
            });
            errors.email =
            required()(values.email)
            ||
            email()(values && values.email);

            if (values.phone){
               errors.phone = numberCheckExpression.test(values.phone) ?
               ''
               :
               'Введите номер в формате +7-XXX-XXX-XX-XX';
            }

            if (!values.briefMessage) {
              errors.briefMessage = required()(values.briefMessage);
            }

            if (!values.interested) {
              errors.interested = required()(values.interested);
            }

          return errors
        }}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          errors,
          invalid,
        }) => (
          <form className={s.content}>
            <h1 className={s.title}>Hello, my name is* |John Doe</h1>
              <Field
                name="email"
                component={Input}
                label="Email*"
              />
              <Field
                name="phone"
                component={Input}
                label="Phone"
                isOptional
              />
              <Field
                name="interested"
                component={Select}
                label="I'm interested in*"
              >
                <option value="default"></option>
                <option value="chicken"> Chicken</option>
                <option value="ham"> Ham</option>
                <option value="mushrooms"> Mushrooms</option>
                <option value="cheese"> Cheese</option>
                <option value="tuna"> Tuna</option>
                <option value="pineapple"> Pineapple</option>
              </Field>
              <Field
                name="company"
                component={Input}
                label="Company"
                isOptional
              />
              <Field
                name="briefMessage"
                component={Input}
                label="Brief Message*"
              />
              <button
                type="submit"
                disabled={pristine || invalid}
                className={s.submit}
              >
                Submit
              </button>
            {/* <pre>{JSON.stringify({values, errors}, 0, 2)}</pre> */}
          </form>
        )}
      />
    </div>
  );
}

export default App;

import React from 'react';
import { required, email } from 'redux-form-validators';

import { Form, Field } from 'react-final-form';
import Input from 'components/Input';
import Select from 'components/Select';

import { numberCheckExpression } from './const';

import s from './App.module.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(3000)
  window.alert(JSON.stringify(values, 0, 2))
}

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);


const checkPhoneNumber = (value) => {
     return numberCheckExpression.test(value) ?
     ''
     :
     'Введите номер в формате +7-XXX-XXX-XX-XX';
}
function App() {
  return (
    <div className={s.root}>
      <Form
        initialValues={{
          name: ' John Doe',
          email: '',
          phone: '',
          interested: '',
          company: '',
          briefMessage: '',
        }}
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          errors,
          invalid,
          reset,
        }) => (
          <form
            className={s.content}
            onSubmit={handleSubmit}
          >
            <h1
              className={s.title}
            >
              Hello, my name is* |
              <Field
                className={`${s["title-input"]} ${values.name ===' John Doe'
                  && s.default}`}
                name="name"
                component="input"
                label="Name*"
                validate={composeValidators(required())}
              />
            </h1>
              <Field
                name="email"
                component={Input}
                label="Email*"
                validate={composeValidators(required(), email())}
              />
              <Field
                name="phone"
                component={Input}
                label="Phone"
                isOptional
                validate={composeValidators(checkPhoneNumber)}
              />
              <Field
                name="interested"
                component={Select}
                label="I'm interested in*"
                validate={composeValidators(required())}
              >
                <option value=""></option>
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
                validate={composeValidators(required())}
              />
              <Field
                name="briefMessage"
                component={Input}
                label="Brief Message*"
                validate={composeValidators(required())}
              />
              <button
                type="submit"
                // disabled={pristine || invalid}
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

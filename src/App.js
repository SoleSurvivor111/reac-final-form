import React from 'react';
import { required, email } from 'redux-form-validators';
import { withStyles, makeStyles, createMuiTheme  } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


import { Form, Field } from 'react-final-form';
import { TextField, Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

import { green } from '@material-ui/core/colors';

import { numberCheckExpression } from './const';

import './App.scss';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover .MuiInput-underline:before': {
        outline: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);


function App() {
  return (
    <div className="root">
      <Form
        onSubmit={onSubmit}
        initialValues={{
          email: '',
          phone: '',
          interested: '',
          company: '',
          briefMessage: '',
        }}
        validate={values => {
          const errors = {}

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
        }) => (
          <form className="content">
            <ThemeProvider theme={theme}>
              <Field
                name="name"
                render={({ input, meta }) => (
                  <input
                    placeholder="John Doe"
                    {...input}
                    className={
                      classnames(
                        styles.input,
                        {
                          errorName: meta.touched &&
                          (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)),
                        },
                      )
                    }
                  />
                )}
              />
              <Field
                className="input"
                name="email"
                type="text"
                component={CssTextField}
                label="Email*"
                margin="normal"
                id="email"
              />
              <Field
                className="input"
                name="phone"
                type="text"
                component={TextField}
                label="Phone"
                margin="normal"
              />
              <Field
                className="Select"
                name="interested"
                label="I'm interested in*"
                formControlProps={{className: 'select'}}
                component={Select}
              >
                <MenuItem value="London">
                    London
                </MenuItem>

                <MenuItem value="Paris">
                    Paris
                </MenuItem>
              </Field>
              <Field
                className="input"
                name="company"
                type="text"
                component={TextField}
                label="Company"
                margin="normal"
              />
              <Field
                name="briefMessage"
                type="text"
                component={TextField}
                label="Brief Message*"
                margin="normal"
                fullWidth
              />
            </ThemeProvider>
            <pre>{JSON.stringify({values, errors}, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default App;

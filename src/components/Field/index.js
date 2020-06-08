import React from 'react';
import { arrayOf, bool, element, elementType, func, oneOfType, string } from 'prop-types';
import { FormField, TextInput } from 'grommet/components';


function Field({
  component: Component,
  label,
  name,
  onChange,
  placeholder,
  required,
  validate,
  value,
}) {
  return (
    <FormField label={label} name={name} validate={validate} required={required}>
      <Component
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        validate={validate}
        value={value}
      />
    </FormField>
  );
}

Field.defaultProps = {
  component: TextInput
};

Field.propTypes = {
  label: string,
  component: oneOfType([element, elementType, func]),
  name: string,
  onChange: func,
  placeholder: string,
  required: bool,
  validate: arrayOf(func),
  value: string
};

export default Field;

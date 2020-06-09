import React from 'react';
import { arrayOf, bool, element, elementType, func, oneOfType, string } from 'prop-types';
import { FormField, TextInput } from 'grommet/components';

import { INPUT_TYPES } from 'constants/forms';

function Field({
  component: Component,
  label,
  name,
  onChange,
  placeholder,
  required,
  type,
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
        type={type}
        validate={validate}
        value={value}
      />
    </FormField>
  );
}

Field.defaultProps = {
  component: TextInput,
  text: INPUT_TYPES.TEXT
};

Field.propTypes = {
  label: string,
  component: oneOfType([element, elementType, func]),
  name: string,
  onChange: func,
  placeholder: string,
  required: bool,
  type: string,
  validate: arrayOf(func),
  value: string
};

export default Field;

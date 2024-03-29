import React from 'react';
import { arrayOf, bool, element, elementType, func, oneOfType, string } from 'prop-types';
import { TextInput } from 'grommet/components';

import { INPUT_TYPES } from 'constants/forms';
import StyledFormField from 'components/Styled/FormField';

function Field({
  component: Component,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  type,
  validate,
  value,
  ...props
}) {
  return (
    <StyledFormField label={label} name={name} validate={validate} required={required} readOnly={readOnly} height="100%">
      <Component
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        type={type}
        validate={validate}
        value={value}
        {...props}
      />
    </StyledFormField>
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
  readOnly: bool,
  required: bool,
  type: string,
  validate: arrayOf(func),
  value: string
};

export default Field;

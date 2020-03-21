import React from 'react'
import { Form, Select, Label } from 'semantic-ui-react'

const selectInput = ({
    input,
    type,
    placeholder,
    multiple,
    options,
    meta: { touched, error }
}) => {
    return (
        <Form.Field error={touched && !!error}>
            <Select 
                value={input.value || null} 
                onClick={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={options}
                multiple={multiple}
            />
            {touched && error && <Label basic color='red'>{error}</Label>}

        </Form.Field>
    )
}

export default selectInput

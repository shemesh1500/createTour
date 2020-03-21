import React from 'react'
import { Form, Checkbox, Label } from 'semantic-ui-react'

const checkboxInput = ({
    input: { value, ...input },
    meta: { touched, error },
    ...rest
}) => {

    return (
        <Form.Field error={touched && !!error}>
            <Checkbox
                {...input}
                {...rest}
                defaultChecked={!!value}
                //checked={input.value ? true : false}
                //onChange={(e, {checked}) => input.onChange(checked)}
                onClick={(e,data) => input.onChange(data)}
                type='checkbox'
            />
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    )
}

export default checkboxInput

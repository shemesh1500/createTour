import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import { Form, Label, Segment, List, Icon, Divider } from 'semantic-ui-react'

const placeInput = ({
    input: { value, onChange, onBlur },
    width,
    options,
    placeholder,
    className,
    onSelect,
    meta: { touched, error }
}) => {
    return (
        <PlacesAutocomplete
            value={value}
            onChange={onChange}
            searchOptions={options}
            onSelect={onSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Form.Field error={touched && !!error}>
                    <input className={className} placeholder={placeholder} {...getInputProps({ placeholder, onBlur })} />
                    {touched && error && <Label basic color='red'>{error}</Label>}
                    {suggestions.length > 0 && (
                        <Segment
                            style={{
                                marginTop: 0,
                                position: 'absolute',
                                zIndex: 0,
                                width: '100%',
                            }}
                            className='PlacesAutocompleteList'>
                            {loading && <div>Loading...</div>}
                            <List className='PlacesAutocompleteList' >

                                {suggestions.map(suggestion => (
                                    <List.Item {...getSuggestionItemProps(suggestion)} className='PlacesAutocompleteItem'>
                                        <div className='PlacesAutocompleteItem'>
                                            <div>
                                                <Icon disabled name='point' />
                                            </div>
                                            <div>
                                                <List.Header className='suggestionHeader'>
                                                    {suggestion.formattedSuggestion.mainText}, {suggestion.formattedSuggestion.secondaryText}
                                                </List.Header>
                                            </div>
                                        </div>
                                        <Divider horizontal> </Divider>
                                    </List.Item>
                                ))}
                            </List>
                        </Segment>
                    )}
                </Form.Field>
            )}
        </PlacesAutocomplete>
    )
}

export default placeInput

/*<List.Description>
                                            {suggestion.formattedSuggestion.secondaryText}
                                        </List.Description>*/
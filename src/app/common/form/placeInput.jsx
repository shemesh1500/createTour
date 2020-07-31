import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { Form, Label, Segment, List, Icon, Divider } from "semantic-ui-react";

const placeInput = ({
  input: { value, onChange, onBlur },
  width,
  options,
  placeholder,
  className,
  onSelect,
  meta: { touched, error },
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
          <input
            className={className}
            placeholder={placeholder}
            {...getInputProps({ placeholder, onBlur })}
          />
          {touched && error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          {suggestions.length > 0 && (
            <div className="PlacesAutocompleteList">
              {loading && <div>Loading...</div>}

              {suggestions.map((suggestion) => (
                <div
                  {...getSuggestionItemProps(suggestion)}
                  className="PlacesAutocompleteItem"
                >
                  <div className="PlacesAutocompleteItem">
                    <div>
                      <Icon disabled name="point" />
                    </div>
                    <div>
                      <div className="pac-item">
                        {suggestion.formattedSuggestion.mainText},{" "}
                        {suggestion.formattedSuggestion.secondaryText}
                      </div>
                    </div>
                  </div>
                  <Divider horizontal> </Divider>
                </div>
              ))}
            </div>
          )}
        </Form.Field>
      )}
    </PlacesAutocomplete>
  );
};

export default placeInput;

/*
<List.Header className='suggestionHeader'>
                                                    {suggestion.formattedSuggestion.mainText}, {suggestion.formattedSuggestion.secondaryText}
                                                </List.Header>

<List.Description>
                                            {suggestion.formattedSuggestion.secondaryText}
                                        </List.Description>*/

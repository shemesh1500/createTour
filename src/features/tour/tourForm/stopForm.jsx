import React, { Component } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react';

class stopForm extends Component {
    render() {
        return (
                  <Segment>
                    <Form>
                      <Form.Field>
                        <label>Stop Title</label>
                        <input placeholder="Stop Name" />
                      </Form.Field>
                      <Form.Field>
                        <label>Stop </label>
                        <input type="date" placeholder="Event Date" />
                      </Form.Field>
                      <Form.Field>
                        <label>City</label>
                        <input placeholder="City event is taking place" />
                      </Form.Field>
                      <Form.Field>
                        <label>Venue</label>
                        <input placeholder="Enter the Venue of the event" />
                      </Form.Field>
                      <Form.Field>
                        <label>Hosted By</label>
                        <input placeholder="Enter the name of person hosting" />
                      </Form.Field>
                      <Button positive type="submit">
                        Add stop
                      </Button>
                      <Button type="button">Cancel</Button>
                    </Form>
                  </Segment>
        )
    }
}

export default stopForm;
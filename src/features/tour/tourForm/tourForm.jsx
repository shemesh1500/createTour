import React, { Component } from 'react'
import { Button, Form, Segment, Checkbox, TextArea } from 'semantic-ui-react';

class tourForm extends Component {
  state = {
    id:'',
    title:'',
    language: '',
    rec_start_h: '00:00:00+00:00',
    rec_end_h: '00:00:00+00:00',
    c_date: '',
    category: '',
    audience: [],
    main_sentense: '',
    description:'',
    city: '',
    theGuide: '',
    stops:[],
  }  

  handleFormSubmit = evt =>{
    evt.preventDefault();
    this.props.createTour(this.state)
  };

  handleForm = (evt) =>{
    this.setState({
      [evt.target.name]:evt.target.value
    });
  };
    render() {
        return (
                 <Segment>
                   <Form onSubmit={this.handleFormSubmit}>
                     <Form.Field>
                       <label>Tour Title</label>
                       <input 
                        name='title'
                        onChange={this.handleForm} 
                        value={this.state.title} 
                        placeholder="Title of the tour" />
                     </Form.Field>
                     <Form.Field>
                       <label>Language</label>
                       <input  name='language'
                        onChange={this.handleForm} 
                        value={this.state.language}
                        placeholder="Language of the tour" />
                     </Form.Field>
                     <Form.Field>
                       <label>Recommanded hours</label>
                       <input name='rec_start_h'
                        onChange={this.handleForm} 
                        value={this.state.rec_start_h}
                        type="time" placeholder="From" />
                       <input name='rec_end_h'
                        onChange={this.handleForm} 
                        value={this.state.rec_end_h}
                        type="time" placeholder="To" />
                     </Form.Field>
                     <Form.Field>
                       <label>Ideal Audience</label>
                       <Checkbox label='Singles' name="Singles" id='Singles' /><br />
                       <Checkbox label='Couples' name="Couples" id='Couples' /><br />
                       <Checkbox label='Kid friendly' name="Kid friendly" id='Kfriendly' /><br />
                       <Checkbox label='Above 18' name="Above 18" id='Above' /><br />
                       <Checkbox label='Pet friendly' name="Pet friendly" id='Pfriendly' /><br />
                     </Form.Field>
                     <Form.Field>
                       <label>Kicking sentence of your tour</label>
                       <input name='main_sentense'
                        onChange={this.handleForm} 
                        value={this.state.main_sentense}
                        placeholder="Tour language" />
                     </Form.Field>
                     <Form.Field>
                       <label>Description</label>
                       <TextArea name='description'
                        onChange={this.handleForm} 
                        value={this.state.description}
                        placeholder='Tell us more, what to expect?' style={{ minHeight: 100 }} />
                     </Form.Field>
                     <Form.Field>
                       <label>City</label>
                       <input name='description'
                        onChange={this.handleForm} 
                        value={this.state.description}
                        placeholder="City event is taking place" />
                     </Form.Field>
                     <Button positive type="submit">
                       Submit
                     </Button>
                     <Button type="button">Cancel</Button>
                   </Form>
                 </Segment>
        )
    }
}

export default tourForm;
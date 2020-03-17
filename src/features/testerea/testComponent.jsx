import React, { Component } from 'react'
import {connect} from 'react-redux';
import { inc_counter, dec_counter} from './testAction';
import { Button } from 'semantic-ui-react';

const mapState = (state) => ({
    data : state.test.data
})

const actions = {
    inc_counter,
    dec_counter
}

class testComponent extends Component {
    render() {
        return (
            <div>
                <h1>Test Component</h1>
                <h3>the data is: {this.props.data}</h3>
                <Button onClick={this.props.inc_counter} positive content='Increment'/>
                <Button onClick={this.props.dec_counter} negative content='Decrement'/>
            </div>
        )
    }
}

export default connect(mapState, actions)(testComponent);
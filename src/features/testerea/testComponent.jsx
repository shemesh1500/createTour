import React, { Component } from 'react'
import { connect } from 'react-redux';
import { inc_counter, dec_counter } from './testAction';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';

const mapState = (state) => ({
    data: state.test.data
})

const actions = {
    inc_counter,
    dec_counter,
    openModal
}

class testComponent extends Component {
    render() {
        return (
            <div>
                <h1>Test Component</h1>
                <h3>the data is: {this.props.data}</h3>
                <Button onClick={this.props.inc_counter} positive content='Increment' />
                <Button onClick={this.props.dec_counter} negative content='Decrement' />
                <Button
                    onClick={() => this.props.openModal('TestModal', { data: 55 })}
                    color='teal'
                    content='Open Modal'
                />

            </div>
        )
    }
}

export default connect(mapState, actions)(testComponent);
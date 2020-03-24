import React, { Component } from 'react'
import { connect } from 'react-redux';
import { incrementAsync, decramentAsync } from './testAction';
import { Button } from 'semantic-ui-react';
import { openModal } from '../modals/modalActions';

const mapState = (state) => ({
    data: state.test.data,
    loading: state.async.loading,
    buttonName : state.async.elementName
})

const actions = {
    incrementAsync,
    decramentAsync,
    openModal
}

class testComponent extends Component {
    render() {
        return (
            <div>
                <h1>Test Component</h1>
                <h3>the data is: {this.props.data}</h3>
                <Button
                    name='increment'
                    onClick={(e) => this.props.incrementAsync(e.target.name)}
                    positive
                    content='Increment'
                    loading={this.props.buttonName === 'increment' && this.props.loading} />
                <Button
                    name='decrament'
                    onClick={(e) => this.props.decramentAsync(e.target.name)}
                    negative
                    content='Decrement'
                    loading={ this.props.buttonName === 'decrament' && this.props.loading}
                />
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
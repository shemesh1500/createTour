import React, { Component, Fragment } from 'react'
import { Segment, Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

const mapState = (state) => ({
    stops: state.firestore.ordered.stops
})

class tourList extends Component {
    render() {
        console.log(this.props.stops)
        return (
            <Fragment>

                {this.props.stops && this.props.stops.map(stop => (
                    <Segment.Group>
                        <Item.Group>
                            <Item>
                                <Item.Image size="tiny" circular src="" />
                                <Item.Content>
                                    <Item.Header>{stop.s_title}</Item.Header>
                                    <Item.Description>
                                        stopLocation {stop.stop_location.lat}
                                    </Item.Description>
                                    <Item.Header>{stop.s_smallDesc}</Item.Header>
                                    <Item.Description>
                                        stopLocation {stop.stop_location.lng}
                                    </Item.Description>
                                </Item.Content>
                                <Button as={Link} to={`createStop/${stop.id}`} />
                            </Item>
                        </Item.Group>
                    </Segment.Group>
                ))}

            </Fragment>
        )
    }
}

export default connect(mapState)(firestoreConnect([{ collection: 'stops' }])(tourList));
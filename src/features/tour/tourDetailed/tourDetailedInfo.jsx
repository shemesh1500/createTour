import React from 'react'
import { Button, Grid, Icon, Segment, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const tourDetailedInfo = ({ tour }) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Main Title & Main sentense' trigger={<Icon size="large" color="teal" name="bullseye" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <h3>{tour.title}</h3>
                        <h4>{tour.main_sentense}</h4>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached="top">
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Language' trigger={<Icon size="large" color="teal" name="language" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{tour.language}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Recommended hours' trigger={<Icon size="large" color="teal" name="clock outline" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{tour.rec_start_h
                            && format(tour.rec_start_h.toDate(), 'h:mm a')} - {tour.rec_end_h
                                && format(tour.rec_end_h.toDate(), 'h:mm a')}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Address' trigger={<Icon size="large" color="teal" name="point" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{tour.street}  {tour.house_number}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Ideal Audience' trigger={<Icon size="large" color="teal" name="users" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        {tour.audience
                            && tour.audience.length > 0
                            && tour.audience.map((aud, index) => <p key={index}>  {aud} ||</p>)}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Full Description' trigger={<Icon size="large" color="teal" name="info" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{tour.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>


            <Segment attached>
                <Grid verticalAlign="bottom" >
                    <Grid.Column width={7} />
                    <Button as={Link} to={`/manage/${tour.id}`} color="orange" floated="right">
                        Edir Tour
                </Button>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}

export default tourDetailedInfo

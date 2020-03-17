import React from 'react'
import { Button, Grid, Icon, Segment, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
                        <p>{tour.rec_start_h} - {tour.rec_end_h}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Address' trigger={<Icon size="large" color="teal" name="point" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{tour.address}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid >
                    <Grid.Column width={1} >
                        <Popup content='Ideal Audience' trigger={<Icon size="large" color="teal" name="users" />} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{tour.audience.lenght > 0 && tour.audience.map(aud => <item>  {aud} ||</item>)}</p>
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
                    <Button as={Link} to={`/manage/${tour.id}`}color="orange" floated="right">
                        Edir Tour
                </Button>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}

export default tourDetailedInfo

import React from 'react';
import { Segment, Item, List, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const StopItem = () => {
    const { tour } = this.props
    return (
        <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="huge" circular src="" />
              <Item.Content>
                <Item.Header>{tour.title}</Item.Header>
                <Item.Description>
                  Hosted by {tour.theGuide}
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Item.Group>
            <List horizontal>
              {tour.audience.map((aud, i) => (
                <Item key={i} >{aud}</Item>
              ))}
            </List>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {tour.rec_start_h && format(tour.rec_start_h, 'h:mm a')} -
                        {tour.rec_end_h && format(tour.rec_end_h, 'h:mm a')} |
                        <Icon name="marker" /> {tour.city} |
                        <Icon name="marker" /> Num of stops: {tour.stops.length}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {/* todo: attendees go here */}
          </List>
        </Segment>
        <Segment clearing>
          <Button onClick={() => this.props.deleteTour(tour.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete" />
          <Button
            as={Link}
            to={`/tours/${tour.id}`}
            color="teal"
            floated="right"
            content="View" />
        </Segment>
      </Segment.Group>
    )
}

export default StopItem

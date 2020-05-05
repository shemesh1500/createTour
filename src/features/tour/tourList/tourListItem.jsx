import React, { Component } from 'react'
import { Button, Segment, List, Icon, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class tourListItem extends Component {
  render() {
    const tour = this.props.tour;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src="" />
              <Item.Content>
                <Item.Header>{tour.title}</Item.Header>
                <Item.Description>
                  Hosted by {tour.theGuide}
                </Item.Description>
                {tour.cancelled &&
                  <Label
                    style={{ top: '-40px' }}
                    ribbon='right'
                    color='red'
                    content='This tour has been cancled' />
                }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Item.Group>
            <List horizontal>
              {tour.audience && tour.audience.map((aud, i) => (
                <Item key={i} >{aud}</Item>
              ))}
            </List>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" />
            {tour.rec_start_h && format(tour.rec_start_h.toDate(), 'h:mm a')} -
                        {tour.rec_end_h && format(tour.rec_end_h.toDate(), 'h:mm a')} |
                        <Icon name="marker" /> {tour.city} |
                        <Icon name="marker" /> Num of stops: 
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {/* todo: attendees go here */}
          </List>
        </Segment>
        <Segment clearing>
          {false && <Button onClick={() => this.props.deleteTour(tour.id)}
            as="a"
            color="red"
            floated="right"
            content="Delete" />
          }
          <Button
            as={Link}
            to={`/tours/${tour.id}`}
            color="teal"
            floated="right"
            content="View" />
          <Button
            as={Link}
            to={`/tourCreation/${tour.id}`}
            color="teal"
            content="Creation" />
          <Button
            to={`/tourCreation/${tour.id}`}
            color="teal"
            content="Creation" />
        </Segment>
      </Segment.Group>
    )
  }
}

export default tourListItem;
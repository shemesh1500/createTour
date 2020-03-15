import React, { Component } from 'react'
import { Button, Segment, List, Icon, Item } from 'semantic-ui-react';

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
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Segment>
                    <Segment>
                      <List horizontal>
                       {tour.audience.map((aud,i) => (
                          <List.Item key={i} >{aud}</List.Item> 
                       ))}
                      </List>
                    </Segment>
                    <Segment>
                      <span>
                        <Icon name="clock" /> {tour.rec_start_h} - {tour.rec_end_h} |
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
                      <Button as="a" color="teal" floated="right" content="View" />
                    </Segment>
                  </Segment.Group>
        )
    }
}

export default  tourListItem;
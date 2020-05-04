import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Image } from 'semantic-ui-react';

const StopList = ({ listItems, setList, renderingFunc }) => { 
    if(listItems) {
        listItems.sort((a,b) => a.order - b.order);
    }

    const grid = 8;
    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            listItems,
            result.source.index,
            result.destination.index
        );
        setList(items);
        listItems = items;
    }

    

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable123">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {listItems && listItems.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        {renderingFunc(item)}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default StopList;

/*
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
            {/* todo: attendees go here /}
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
*/
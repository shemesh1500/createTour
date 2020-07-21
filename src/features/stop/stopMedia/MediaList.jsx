import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Image } from 'semantic-ui-react';

const MediaList = ({ listItems, setMediaList }) => {
    listItems.sort((a,b) => a.order - b.order);

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

        console.log("results",result)
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
        setMediaList(items);
        listItems = items;
    }

    const tagByType = (item) => {
        console.log("Switch", item.type)
        if (item.type.includes('image')) {
            return <Image src={item.url} />;
        } else if (item.type.includes('audio')) {
            return (<audio width="320" height="240" controls  >
                <source src={item.url} type={item.type} />
            </audio>
            );
        } else if (item.type.includes('video')) {
            return (<video poster={item.poster_url} width="260" hight="180" controls>
                <source src={item.url} type={item.type} />
            </video>
            );
        }

    }

    console.log("items", listItems);
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable12">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {listItems && listItems.map((item, index) => (
                            <Draggable key={item.name} draggableId={item.name} index={index}>
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
                                        {item.type}
                                        {tagByType(item)}
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

export default MediaList;
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Image, Button, Icon } from "semantic-ui-react";

const MediaList = ({ listItems, setMediaList, deleteFuncSwitch }) => {
  listItems.sort((a, b) => a.order - b.order);

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 0.5,
    margin: `0 0 ${grid}px 0`,
    width: "30vw",
    height: "120px",
    borderRadius: "5px",
    boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.15)",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#f8f8f5",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#eef5b3" : "#f8f8f5",
    padding: grid,
    width: "33vw",
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
  };

  const tagByType = (item) => {
    if (item.type.includes("image")) {
      return <Image className="mediaArea" src={item.url} />;
    } else if (item.type.includes("audio")) {
      return (
        <audio
          preload="auto"
          id="id12"
          controls="controls"
          onended="func12();"
          src={item.url}
        ></audio>
      );
    } else if (item.type.includes("video")) {
      return (
        <video poster={item.poster_url} width="180" hight="120" controls>
          <source src={item.url} type={item.type} />
        </video>
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable12">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {listItems &&
              listItems.map((item, index) => (
                <Draggable
                  key={item.name}
                  draggableId={item.name}
                  index={index}
                >
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
                      <Button
                        icon
                        size="mini"
                        style={{
                          backgroundColor: "lightgray",
                          padding: "0",
                          float: "right",
                          marginLeft: "15px",
                        }}
                        onClick={() => deleteFuncSwitch(item)}
                      >
                        <Icon name="close" />
                      </Button>
                      <div className="contentArea">
                        <div className="leftCard">
                          <div>{index + 1}</div>
                          <div> {item.type}</div>
                        </div>
                        <div className="mediaArea">{tagByType(item)}</div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default MediaList;

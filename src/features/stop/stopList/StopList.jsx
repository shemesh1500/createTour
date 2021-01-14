import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const StopList = ({ listItems, setList, renderingFunc }) => {
  const [allStops, setAllStops] = useState(listItems ? listItems : [])
  if (allStops) {
    allStops.sort((a, b) => a.order - b.order);
  }
  useEffect(()=> {
    setAllStops(listItems)
  },[listItems])
  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 0.5,
    margin: `0 0 ${grid}px 0`,
    width: "30vw",
    borderRadius: "5px",
    boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.15)",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "#f8f8f5",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  // a little function to help us with reordering the result
  const reorder = async (list, startIndex, endIndex) => {
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

  const onDragEnd = async (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log("THERE IS A DESTANATION", result.source.index, result.destination.index);
    const items = await reorder(
      allStops,
      result.source.index,
      result.destination.index
    );
    
    setList(items);
    setAllStops(items);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable123">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {allStops &&
              allStops.map((item, index) => (
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
  );
};

export default StopList;


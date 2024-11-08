import React, {FC} from "react";
import {ReactSVG} from "react-svg";
import {Draggable} from "@hello-pangea/dnd";

import {ITimeListItemProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

import remove from "@assets/icons/close.svg";
import drag from "@assets/icons/drag.svg";


const TimeListItem:FC<ITimeListItemProps> = ({index, id, startTime, endTime, onDelete}) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{...provided.draggableProps.style}}
                >
                    <Container isDragging={snapshot.isDragging}>
                        <div>
                            <div {...provided.dragHandleProps}>
                                <ReactSVG src={drag}/>
                            </div>
                            <span>{`${startTime} - ${endTime}`}</span>
                        </div>
                        <ReactSVG src={remove} onClick={onDelete}/>
                    </Container>
                </div>
            )}
        </Draggable>
    );
};

export default React.memo(TimeListItem);
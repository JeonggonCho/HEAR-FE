import React from "react";
import {ReactSVG} from "react-svg";
import {Draggable} from "@hello-pangea/dnd";
import {Container} from "./style.ts";
import remove from "@assets/icons/close.svg";
import drag from "@assets/icons/drag.svg";


interface ITimeListItemProps {
    index: number;
    id: string;
    startTime: string;
    endTime: string;
    onDelete: () => void;
}


const TimeListItem = ({index, id, startTime, endTime, onDelete}: ITimeListItemProps) => {
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
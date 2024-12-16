import React from "react";
import {Draggable} from "@hello-pangea/dnd";
import {Container} from "./style.ts";
import remove from "@assets/icons/close.svg";
import drag from "@assets/icons/drag.svg";
import Icon from "@components/common/Icon";


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
                                <Icon svg={drag}/>
                            </div>
                            <span>{`${startTime} - ${endTime}`}</span>
                        </div>
                        <Icon svg={remove} onClick={onDelete}/>
                    </Container>
                </div>
            )}
        </Draggable>
    );
};

export default React.memo(TimeListItem);
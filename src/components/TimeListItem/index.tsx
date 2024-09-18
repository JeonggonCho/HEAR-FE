import {FC} from "react";
import {ReactSVG} from "react-svg";

import Button from "@components/Button";

import {ITimeListItemProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

import remove from "@assets/icons/close.svg";

const TimeListItem:FC<ITimeListItemProps> = ({startTime, endTime, onDelete}) => {
    return (
        <Container>
            <span>{`${startTime} - ${endTime}`}</span>
            <Button
                type={"button"}
                content={<ReactSVG src={remove}/> }
                width={"fit"}
                color={"second"}
                scale={"small"}
                onClick={onDelete}
            />
        </Container>
    );
};

export default TimeListItem;
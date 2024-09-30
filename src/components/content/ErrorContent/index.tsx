import {FC} from "react";
import {ReactSVG} from "react-svg";

import Button from "@components/common/Button";

import {IErrorContentProps} from "@types/componentProps.ts";

import {Container} from "./style.ts";

import error from "@assets/icons/error.svg";

const ErrorContent:FC<IErrorContentProps> = ({text, closeModal}) => {
    return (
        <Container>
            <ReactSVG src={error}/>
            <p>{text}</p>
            <Button
                type={"button"}
                content={"닫 기"}
                width={"full"}
                color={"danger"}
                scale={"normal"}
                onClick={closeModal}
            />
        </Container>
    );
};

export default ErrorContent;
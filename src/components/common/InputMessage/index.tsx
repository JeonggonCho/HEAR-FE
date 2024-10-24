import {FC} from 'react';

import {IInputMessageProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const InputMessage:FC<IInputMessageProps> = ({message, type="error"}) => {
    return (
        <Container type={type}>{message}</Container>
    );
};

export default InputMessage;
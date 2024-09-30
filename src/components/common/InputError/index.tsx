import {FC} from 'react';

import {IInputErrorProps} from "@types/componentProps.ts";

import {Container} from "./style.ts";

const InputError:FC<IInputErrorProps> = ({errorMessage}) => {
    return (
        <Container>{errorMessage}</Container>
    );
};

export default InputError;
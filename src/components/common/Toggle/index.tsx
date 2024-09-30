import {FC} from "react";

import {IToggleProps} from "@types/componentProps.ts";

import {Container} from "./style.ts";

const Toggle:FC<IToggleProps> = ({status, isLoading, click}) => {
    return (
        <Container
            onClick={click}
            status={status}
            disabled={isLoading as boolean}
        >
            <div/>
        </Container>
    );
};

export default Toggle;
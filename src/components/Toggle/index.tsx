import {FC} from "react";

import {IToggleProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const Toggle:FC<IToggleProps> = ({handleToggle, status, isLoading}) => {
    return (
        <Container
            onClick={handleToggle}
            status={status}
            disabled={isLoading as boolean}
        >
            <div/>
        </Container>
    );
};

export default Toggle;
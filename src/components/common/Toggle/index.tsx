import {FC} from "react";

import {IToggleProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const Toggle:FC<IToggleProps> = ({status, isLoading, click}) => {
    const {isDarkMode} = useThemeStore();

    return (
        <Container
            onClick={click}
            status={status}
            disabled={isLoading as boolean}
            isDarkMode={isDarkMode}
        >
            <div/>
        </Container>
    );
};

export default Toggle;
import {FC} from "react";

import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";


const ProgressBar:FC<{total: number, current: number}> = ({total, current}) => {
    const {isDarkMode} = useThemeStore();

    return (
        <Container total={total} current={current} darkmode={isDarkMode ? "true" : "false"}>
            <div/>
        </Container>
    );
};

export default ProgressBar;
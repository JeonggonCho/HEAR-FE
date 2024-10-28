import {FC} from "react";

import {ICardLoadingProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const CardLoading:FC<ICardLoadingProps> = ({widthValue, heightValue, bgColor}) => {
    const {isDarkMode} = useThemeStore();

    return (
        <Container
            bgColor={bgColor || "light"}
            widthValue={widthValue || "100%"}
            heightValue={heightValue || "80px"}
            darkmode={isDarkMode.toString()}
        />
    );
};

export default CardLoading;
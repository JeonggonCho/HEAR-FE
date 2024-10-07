import {FC} from "react";

import {ICardLoadingProps} from "@/types/componentProps.ts";

import {Container} from "./style.ts";

const CardLoading:FC<ICardLoadingProps> = ({widthValue, heightValue, bgColor}) => {
    return (
        <Container
            bgColor={bgColor || "light"}
            widthValue={widthValue || "100%"}
            heightValue={heightValue || "80px"}
        />
    );
};

export default CardLoading;
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";


interface ICardLoadingProps {
    bgColor?: "dark" | "light";
    widthValue?: string;
    heightValue?: string;
}


const CardLoading = ({widthValue, heightValue, bgColor}: ICardLoadingProps) => {
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
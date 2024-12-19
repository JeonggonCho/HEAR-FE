import {Ring} from "./style.ts";


interface ILoadingLoopProps {
    size?: number;
    thickness?: number;
    background?: boolean;
    ringColor?: "main" | "sub";
}

const LoadingLoop = (
    {
        size = 40,
        thickness = 5,
        background = true,
        ringColor = "sub",
    }: ILoadingLoopProps
) => {
    return (
        <Ring
            size={size}
            thickness={thickness}
            background={background}
            ringColor={ringColor}
        />
    );
};

export default LoadingLoop;
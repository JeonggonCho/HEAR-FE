import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";


interface IProgressBarProps {
    total: number;
    current: number;
}


const ProgressBar = ({total, current}: IProgressBarProps) => {
    const {isDarkMode} = useThemeStore();

    return (
        <Container total={total} current={current} darkmode={isDarkMode ? "true" : "false"}>
            <div/>
        </Container>
    );
};

export default ProgressBar;
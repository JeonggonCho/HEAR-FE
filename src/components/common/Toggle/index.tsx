import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";


interface IToggleProps {
    click: () => void;
    status: boolean;
    isLoading: boolean;
}


const Toggle = ({status, isLoading, click}: IToggleProps) => {
    const {isDarkMode} = useThemeStore();

    return (
        <Container
            onClick={click}
            status={status}
            disabled={isLoading as boolean}
            darkmode={isDarkMode.toString()}
        >
            <div/>
        </Container>
    );
};

export default Toggle;
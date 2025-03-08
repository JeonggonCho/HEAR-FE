import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";


interface IToggleProps {
    click: () => void;
    status: boolean;
}


const Toggle = ({status, click}: IToggleProps) => {
    const {isDarkMode} = useThemeStore();

    return (
        <Container
            onClick={click}
            status={status}
            darkmode={isDarkMode.toString()}
        >
            <div/>
        </Container>
    );
};

export default Toggle;
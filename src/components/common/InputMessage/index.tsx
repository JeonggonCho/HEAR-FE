import {Container} from "./style.ts";


interface IInputMessageProps {
    message: string;
    type: "error" | "approval";
}


const InputMessage = ({message, type = "error"}: IInputMessageProps) => {
    return (
        <Container type={type}>{message}</Container>
    );
};

export default InputMessage;
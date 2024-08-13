import {FC} from 'react';
import {Container} from "./style.ts";

interface IInputWithLabelProps {
    label: string;
    type: string;
}

const InputWithLabel:FC<IInputWithLabelProps> = ({label, type}) => {
    return (
        <Container>
            <label>{label}</label>
            <input type={type}/>
        </Container>
    );
};

export default InputWithLabel;
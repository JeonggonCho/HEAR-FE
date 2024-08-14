import {ChangeEvent, FC} from 'react';
import {Container} from "./style.ts";

interface IInputWithLabelProps {
    label: string;
    type: string;
    id: string;
    name: string;
    placeholder: string;
    value: string | number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputWithLabel:FC<IInputWithLabelProps> = ({label, type, id, name, placeholder, value, onChange}) => {
    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </Container>
    );
};

export default InputWithLabel;
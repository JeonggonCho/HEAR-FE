import {FC} from 'react';
import {Container} from "./style.ts";
import {IInputWithLabelProps} from "@/types/componentProps.ts";

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
import {FC} from 'react';
import {Container} from "./style.ts";

interface ISelectWithLabelProps {
    label?: string;
    id: string;
    name: string;
}

const Select:FC<ISelectWithLabelProps> = ({label, id, name}) => {
    return (
        <Container>
            <label htmlFor={id}>{label}</label>

            <select name={name} id={id}>
                <option value={""}></option>
                <option value={""}></option>
                <option value={""}></option>
                <option value={""}></option>
            </select>
        </Container>
    );
};

export default Select;
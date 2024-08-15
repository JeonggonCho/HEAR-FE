import {FC} from 'react';
import {Container, LabelWrapper, RadioWrapper} from "./style.ts";

interface ISelectWithLabelProps {
    label?: string;
    categories: {
        label: string;
        name: string;
        value: string;
        id: string;
        onChange: () => void;
        checked: boolean;
    }[];
}

const Select:FC<ISelectWithLabelProps> = ({label, categories}) => {
    return (
        <Container>
            <label>{label}</label>

            <div>
                {categories.map((category, index) => {
                    return (
                        <RadioWrapper key={index}>
                            <input type="radio" name={category.name} value={category.value} id={category.id} onChange={category.onChange} checked={category.checked}/>
                            <LabelWrapper htmlFor={category.id}>{category.label}</LabelWrapper>
                        </RadioWrapper>
                    );
                })}
            </div>
        </Container>
    );
};

export default Select;
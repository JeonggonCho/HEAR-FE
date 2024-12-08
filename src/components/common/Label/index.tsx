import React, {ReactNode} from "react";


interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: string | ReactNode;
}


const Label = ({id, children, ...props}: ILabelProps) => {
    return (
        <label htmlFor={id} {...props}>{children}</label>
    );
};

export default Label;
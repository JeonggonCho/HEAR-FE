import React, {ReactNode} from "react";


type ButtonVariant = "text" | "filled";
type ButtonSize = "sm" | "md" | "lg";
type ButtonTheme = "primary" | "approval" | "second" | "third" | "danger";

export interface IButton {
    type?: ButtonVariant;
    width: "full" | "fit";
    color: ButtonTheme;
    scale: ButtonSize;
    disabled?: boolean;
}

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string | ReactNode;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
}

const Button = ({children, loading, onClick, disabled, ...props}: IButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} {...props}>
            {loading ?
                (<></>)
                :
                (children)
            }
        </button>
    );
};

export default Button;
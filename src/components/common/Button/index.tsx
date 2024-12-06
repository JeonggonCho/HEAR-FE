import {CSSProperties, HTMLAttributes, ReactNode, MouseEvent} from "react";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonStyles} from "@components/common/Button/style.ts";


interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: string | ReactNode;
    type: "button" | "submit" | "reset";
    variant: "text" | "filled";
    width: "full" | "fit";
    color: "primary" | "approval" | "second" | "third" | "danger";
    size: "sm" | "md" | "lg";
    onClick?: (e?: MouseEvent) => void;
    loading?: boolean;
    disabled?: boolean;
    style?: CSSProperties;
}

const Button = (
    {
        children,
        type = "button",
        variant = "filled",
        width = "fit",
        color,
        size,
        loading,
        onClick,
        disabled = false,
        style = {},
        ...props
    }: IButtonProps) => {

    const {isDarkMode} = useThemeStore();

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={style}
            css={buttonStyles({
                variant,
                width,
                color,
                size,
                disabled,
                darkMode: isDarkMode ? "true" : "false",
            })}
            {...props}
        >
            {loading ?
                (<></>)
                :
                <>{children}</>
            }
        </button>
    );
};

export default Button;
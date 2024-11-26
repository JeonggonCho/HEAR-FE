import React, {ReactNode} from "react";
import {useThemeStore} from "@store/useThemeStore.ts";
import {buttonStyles} from "@components/common/Button/style.ts";


interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string | ReactNode;
    variant: "text" | "filled";
    width: "full" | "fit";
    color: "primary" | "approval" | "second" | "third" | "danger";
    size: "sm" | "md" | "lg";
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
}

const Button = (
    {
        children,
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
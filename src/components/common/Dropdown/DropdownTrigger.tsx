import {ReactNode, ElementType, Dispatch, SetStateAction} from "react";


interface IDropdownTriggerProps {
    children: ReactNode;
    as?: ElementType;
    onClick: Dispatch<SetStateAction<boolean>>;
}


const DropdownTrigger = (
    {
        children,
        as: Component = "div",
        onClick,
        ...props
    }: IDropdownTriggerProps
) => {
    return (
        <Component
            onClick={() => onClick(prevState => !prevState)}
            style={{cursor: "pointer"}}
            {...props}
        >
            {children}
        </Component>
    );
};

export default DropdownTrigger;
import {ElementType, ReactNode} from "react";


interface IModalTriggerProps {
    children: ReactNode;
    as?: ElementType;
}


const ModalTrigger = (
    {
        children,
        as: Component = "div"
    }: IModalTriggerProps
) => {
    return (
        <Component>{children}</Component>
    );
};

export default ModalTrigger;
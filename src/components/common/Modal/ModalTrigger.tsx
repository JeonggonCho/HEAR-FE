import {ReactNode} from "react";


interface IModalTriggerProps {
    children: ReactNode;
    onOpen: () => void;
}


const ModalTrigger = (
    {
        children,
        onOpen,
    }: IModalTriggerProps
) => {
    return (
        <div onClick={onOpen}>
            {children}
        </div>
    );
};

export default ModalTrigger;
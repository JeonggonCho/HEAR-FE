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
        <div
            onClick={onOpen}
            style={{cursor: "pointer"}}
        >
            {children}
        </div>
    );
};

export default ModalTrigger;
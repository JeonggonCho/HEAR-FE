import React from "react";

interface IModalTriggerProps {
    as?: JSX.Element;
}

const ModalTrigger = ({as: Component = <div/>}: IModalTriggerProps) => {
    return React.cloneElement(Component);
};

export default ModalTrigger;
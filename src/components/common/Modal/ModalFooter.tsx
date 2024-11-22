import React, {ReactNode} from "react";

interface IModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const ModalFooter = ({children, ...props}: IModalFooterProps) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default ModalFooter;
import React, {ReactNode} from "react";

interface IModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const ModalHeader = ({children, ...props}: IModalHeaderProps) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default ModalHeader;
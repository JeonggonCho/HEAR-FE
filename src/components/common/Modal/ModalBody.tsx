import React, {ReactNode} from "react";

interface IModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const ModalBody = ({children, ...props}: IModalBodyProps) => {
    return (
        <div {...props}>
            {children}
        </div>
    );
};

export default ModalBody;
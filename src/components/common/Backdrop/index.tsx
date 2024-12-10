import React, {forwardRef, ReactNode} from "react";

import {BackdropWrapper} from "@components/common/Backdrop/style.ts";


interface IBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}


const Backdrop = forwardRef<HTMLDivElement, IBackdropProps>(({children, ...props}, ref) => {
    return (
        <BackdropWrapper ref={ref} {...props}>
            {children}
        </BackdropWrapper>
    );
});

export default Backdrop;
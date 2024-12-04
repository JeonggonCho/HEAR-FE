import {ReactNode} from "react";


interface IBottomSheetBodyProps {
    children: ReactNode;
}


const BottomSheetBody = ({children, ...props}: IBottomSheetBodyProps) => {
    return (
        <div
            style={{padding: "24px"}}
            {...props}
        >
            {children}
        </div>
    );
};

export default BottomSheetBody;
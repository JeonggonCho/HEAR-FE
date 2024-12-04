import {ReactNode} from "react";


interface IBottomSheetTriggerProps {
    children: ReactNode;
}


const BottomSheetTrigger = ({children}: IBottomSheetTriggerProps) => {
    return (
        <>{children}</>
    );
};

export default BottomSheetTrigger;
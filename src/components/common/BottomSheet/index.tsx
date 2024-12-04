import {forwardRef, ReactNode} from "react";
import BottomSheetHeader from "@components/common/BottomSheet/BottomSheetHeader.tsx";
import BottomSheetBody from "@components/common/BottomSheet/BottomSheetBody.tsx";
import BottomSheetTrigger from "@components/common/BottomSheet/BottomSheetTrigger.tsx";
import BottomSheetPortal from "@components/common/BottomSheet/BottomSheetPortal.tsx";
import {BottomSheetWrapper} from "@components/common/BottomSheet/style.ts";


interface IBottomSheetProps {
    children: ReactNode;
}


const BottomSheetMain = forwardRef<HTMLDivElement, IBottomSheetProps>(({children, ...props}, ref ) => {
    return (
        <BottomSheetWrapper
            ref={ref}
            {...props}
        >
            {children}
        </BottomSheetWrapper>
    );
});

export const BottomSheet = Object.assign(BottomSheetMain, {
    Header: BottomSheetHeader,
    Body: BottomSheetBody,
    Trigger: BottomSheetTrigger,
    Portal: BottomSheetPortal,
});
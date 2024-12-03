import {forwardRef, ReactNode} from "react";
import DropdownTrigger from "@components/common/Dropdown/DropdownTrigger.tsx";
import DropdownMenu from "@components/common/Dropdown/DropdownMenu.tsx";
import DropdownItem from "@components/common/Dropdown/DropdownItem.tsx";


interface IDropdownProps {
    children: ReactNode;
}


const DropdownMain = forwardRef<HTMLDivElement, IDropdownProps>(({children, ...props}, ref) => {
    return (
        <div
            ref={ref}
            style={{position: "relative"}}
            {...props}
        >
            {children}
        </div>
    );
});

export const Dropdown = Object.assign(DropdownMain, {
    Trigger: DropdownTrigger,
    Menu: DropdownMenu,
    Item: DropdownItem,
});
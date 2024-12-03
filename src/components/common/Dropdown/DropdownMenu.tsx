import {ReactNode} from "react";
import {DropdownMenuWrapper} from "@components/common/Dropdown/style.ts";


interface IDropdownMenuProps {
    children: ReactNode;
}


const DropdownMenu = ({children, ...props}: IDropdownMenuProps) => {
    return (
        <DropdownMenuWrapper {...props}>
            {children}
        </DropdownMenuWrapper>
    );
};

export default DropdownMenu;
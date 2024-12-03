import {ReactNode} from "react";
import {DropdownItemWrapper} from "@components/common/Dropdown/style.ts";


interface IDropdownItemProps {
    children: ReactNode;
}


const DropdownItem = ({children, ...props}: IDropdownItemProps) => {
    return (
        <DropdownItemWrapper {...props}>
            {children}
        </DropdownItemWrapper>
    );
};

export default DropdownItem;
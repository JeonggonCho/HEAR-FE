import {ReactNode} from "react";
import {DropdownItemWrapper} from "@components/common/Dropdown/style.ts";


interface IDropdownItemProps {
    children: ReactNode;
    onClick: () => void;
}


const DropdownItem = ({children, onClick, ...props}: IDropdownItemProps) => {
    return (
        <DropdownItemWrapper onClick={onClick} {...props}>
            {children}
        </DropdownItemWrapper>
    );
};

export default DropdownItem;
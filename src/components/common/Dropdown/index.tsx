import {useEffect, useRef, useState} from "react";
import {ReactSVG} from "react-svg";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, DropdownMenu, DropdownWrapper} from "./style.ts";
import more from "@assets/icons/more.svg";


interface IDropdownProps {
    dropdownMenus: {
        icon: string;
        label: string;
        action: () => void;
    }[]
}


const Dropdown = ({dropdownMenus}: IDropdownProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const {isDarkMode} = useThemeStore();

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container ref={dropdownRef}>
            <ReactSVG src={more} onClick={() => setShowDropdown((prevState) => !prevState)}/>

            {showDropdown &&
                <DropdownWrapper darkmode={isDarkMode.toString()}>
                    {dropdownMenus.map((menu, index) => (
                        <DropdownMenu
                            key={`${index} ${menu.label}`}
                            onClick={menu.action}
                            darkmode={isDarkMode.toString()}
                        >
                            <ReactSVG src={menu.icon}/> {menu.label}
                        </DropdownMenu>
                    ))}
                </DropdownWrapper>
            }
        </Container>
    );
};

export default Dropdown;
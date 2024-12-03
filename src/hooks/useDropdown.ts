import {useEffect, useRef, useState} from "react";


const useDropdown = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef, setShowDropdown]);

    return {showDropdown, setShowDropdown, dropdownRef};
};

export default useDropdown;
import {RefObject, useEffect, useRef, useState} from "react";


const useDropdown = (modalRefs?: (RefObject<HTMLDivElement> | null)[]) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            const isInsideModal = modalRefs?.some(
                (ref) => ref?.current && ref.current.contains(target)
            );

            if (dropdownRef.current && !dropdownRef.current.contains(target) && !isInsideModal) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef, setShowDropdown]);

    return {showDropdown, setShowDropdown, dropdownRef};
};

export default useDropdown;
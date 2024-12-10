import {Dispatch, ElementType, ReactNode, RefObject, SetStateAction} from "react";
import {Dropdown} from "@components/common/Dropdown/index.tsx";


interface IMoreDropdownProps {
    trigger: ReactNode;
    triggerAs?: ElementType;
    options: ReactNode[];
    dropdownRef: RefObject<HTMLDivElement>;
    setShowDropdown: Dispatch<SetStateAction<boolean>>;
    showDropdown: boolean;
}


const MoreDropdown = (
    {
        trigger,
        triggerAs,
        options,
        dropdownRef,
        setShowDropdown,
        showDropdown
    }: IMoreDropdownProps
) => {
    return (
        <Dropdown ref={dropdownRef}>
            <Dropdown.Trigger as={triggerAs} onClick={setShowDropdown}>{trigger}</Dropdown.Trigger>

            {showDropdown &&
              <Dropdown.Menu>
                  {options.map((opt, index) => (
                      <Dropdown.Item key={index}>{opt}</Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            }
        </Dropdown>
    );
};

export default MoreDropdown;
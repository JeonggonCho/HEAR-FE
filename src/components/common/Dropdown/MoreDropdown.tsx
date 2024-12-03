import {ElementType, ReactNode} from "react";
import {Dropdown} from "@components/common/Dropdown/index.tsx";
import useDropdown from "@hooks/useDropdown.ts";


interface IMoreDropdownProps {
    trigger: ReactNode;
    triggerAs?: ElementType;
    options: ReactNode[];
}


const MoreDropdown = ({trigger, triggerAs, options}: IMoreDropdownProps) => {
    const {dropdownRef, setShowDropdown, showDropdown} = useDropdown();

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
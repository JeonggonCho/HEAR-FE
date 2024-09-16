import {useEffect, useRef, useState} from "react";

const useListCollapse = (dataLength: number) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [maxHeight, setMaxHeight] = useState<number | null>(null);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listRef.current) {
            setMaxHeight(listRef.current.scrollHeight);
        }
    }, [isOpen, listRef, dataLength]);

    const handleList = () => {
        setIsOpen(prevState => !prevState);
    };

    return {isOpen, listRef, maxHeight, handleList};
};

export default useListCollapse;
import {useEffect, useRef, useState} from "react";

const useListCollapse = ({dataLength, timeLength}:{dataLength?: number, timeLength?: number}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [maxHeight, setMaxHeight] = useState<number | null>(null);

    const listRef = useRef<HTMLDivElement>(null);

    const updateMaxHeight = () => {
        if (listRef.current) {
            setMaxHeight(listRef.current.scrollHeight);
        }
    };

    // 데이터 개수가 늘어나거나,
    useEffect(() => {
        updateMaxHeight();
    }, [isOpen, dataLength, timeLength]);

    // 화면 사이즈 조정에 맞춰 max 높이값 업데이트 하기
    useEffect(() => {
        const handleResize = () => {
            updateMaxHeight();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleList = () => {
        setIsOpen(prevState => !prevState);
    };

    return {isOpen, listRef, maxHeight, handleList};
};

export default useListCollapse;
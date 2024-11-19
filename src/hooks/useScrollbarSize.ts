import {useEffect, useState} from "react";
import {getScrollbarHeight, getScrollbarWidth} from "@util/getScrollbarSize.ts";


// 화면 사이즈 변경마다 스크롤바 너비 및 높이를 최신화하는 훅
const useScrollbarSize = () => {
    const [scrollbarWidth, setScrollbarWidth] = useState(getScrollbarWidth());
    const [scrollbarHeight, setScrollbarHeight] = useState(getScrollbarHeight());

    useEffect(() => {
        const handleResize = () => {
            setScrollbarWidth(getScrollbarWidth());
            setScrollbarHeight(getScrollbarHeight());
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {scrollbarWidth, scrollbarHeight};
}

export default useScrollbarSize;
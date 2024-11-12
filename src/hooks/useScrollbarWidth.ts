import {useEffect, useState} from "react";
import getScrollbarWidth from "@util/getScrollbarWidth.ts";

// 화면 사이즈 변경마다 스크롤바 너비를 최신화하는 훅
const useScrollbarWidth = () => {
    const [scrollbarWidth, setScrollbarWidth] = useState(getScrollbarWidth());

    useEffect(() => {
        const handleResize = () => {
            setScrollbarWidth(getScrollbarWidth());
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return scrollbarWidth;
}

export default useScrollbarWidth;
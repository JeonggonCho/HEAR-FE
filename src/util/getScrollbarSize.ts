// 스크롤바 너비 계산
const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
};

// 스크롤바 높이 계산
const getScrollbarHeight = () => {
    return window.innerHeight - document.documentElement.clientHeight;
};

export {getScrollbarWidth, getScrollbarHeight};
// 스크롤바 너비 계산
const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
};

export default getScrollbarWidth;
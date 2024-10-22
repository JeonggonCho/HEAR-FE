// HTML을 일반 텍스트로 변환하는 함수 (줄바꿈 유지)
const stripHtml = (html: string) => {
    // <br> 태그를 줄바꿈 문자로 변환
    let text = html.replace(/<br\s*\/?>/gi, "\n");
    // 나머지 HTML 태그 제거
    const div = document.createElement("div");
    div.innerHTML = text;
    return div.textContent || div.innerText || "";
};

export default stripHtml;
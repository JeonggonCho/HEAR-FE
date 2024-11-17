// HEX 색상 코드를 RGB 색상 코드로 변환하는 함수

// HEX 색상 : 일반적으로 6자리로 구성 (ex, #RRGGBB)
// RR : 빨간 색상 값
// GG : 초록 색상 값
// BB : 파란 색상 값
// 각 값들은 16진수(0 ~ F)로 표현


const hexToRgb = (hex: string): string => {
    const removedSharpFromHex = hex.replace("#", ""); // HEX 코드의 앞의 # 문자 제거
    const bigint = parseInt(removedSharpFromHex, 16); // 16진수를 10진수로 변환
    const r = (bigint >> 16) & 255; // 비트 연산자로 2진수를 16자리 오른쪽으로 이동시켜서 빨간 색상 값만 추출 후 AND 연산자로 하위 8비트만 추출
    const g = (bigint >> 8) & 255; // 동일하게 초록 색상만 추출
    const b = bigint & 255; // 파란 색상만 추출
    return `${r}, ${g}, ${b}`; // 최종 RGB 색상 코드 반환
};

export default hexToRgb;
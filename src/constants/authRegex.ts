// 한양대 이메일 정규표현식
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@hanyang\.ac\.kr$/;

// 비밀번호 정규표현식
export const PW_REGEX = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;

// 학번 정규표현식
export const STUDENTID_REGEX = /^\d{10}$/;

// 휴대전화번호 정규표현식
export const TEL_REGEX = /^\+?[0-9\s\-()]{7,20}$/;
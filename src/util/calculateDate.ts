// 다음날을 계산하는 함수
export const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 일주일 후의 날짜 계산 함수
export const getAfterWeekDate = () => {
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 8);
    const returnYear = oneWeekLater.getFullYear();
    const returnMonth = (oneWeekLater.getMonth() + 1).toString().padStart(2, '0');
    const returnDay = oneWeekLater.getDate().toString().padStart(2, '0');
    return `${returnYear}-${returnMonth}-${returnDay}`;
};

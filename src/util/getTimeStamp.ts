const getTimeStamp = (date: string, lang: "ko"| "en" | "ch") => {
    const start = new Date(date);
    const end = new Date();

    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (seconds < 60) {
        return lang === "en" ? 'just now' : lang === "ch" ? '刚刚' : '방금 전'
    };

    const minutes = seconds / 60;
    if (minutes < 60) {
        const preposition = lang === "en" ? " minutes ago" : lang === "ch" ? " 分钟前" : "분 전";
        return `${Math.floor(minutes)}` + preposition;
    };

    const hours = minutes / 60;
    if (hours < 24) {
        const preposition = lang === "en" ? " hours ago" : lang === "ch" ? " 小时前" : "시간 전";
        return `${Math.floor(hours)}` + preposition;
    };

    const days = hours / 24;
    if (days < 7) {
        const preposition = lang === "en" ? " days ago" : lang === "ch" ? " 天前" : "일 전";
        return `${Math.floor(days)}` + preposition;
    };

    return `${start.toLocaleDateString()}`;
};

export default getTimeStamp;
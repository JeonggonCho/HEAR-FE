const generateCalendar = (currentDate: Date) => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const days = [];
    let day = new Date(startOfMonth);
    while (day.getDay() !== 0) {
        day.setDate(day.getDate() - 1);
    }

    while (day <= endOfMonth) {
        days.push(new Date(day));
        day.setDate(day.getDate() + 1);
    }

    return days;
};

export default generateCalendar;
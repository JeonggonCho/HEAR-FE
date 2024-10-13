import {ILaserStatus} from "@/types/reservation.ts";

export const getLaserReservationRate = (laserStatus:ILaserStatus[]) => {
    let allCount = 0;
    let falseCount = 0;

    if (laserStatus.length === 0) {
        return {rate: 0};
    }

    laserStatus.forEach(status => {
        status.times.forEach((time) => {
            allCount += 1;
            if (!time.status) {
                falseCount += 1;
            }
        });
    });

    const rate = Number((falseCount / allCount * 100).toFixed());
    const color = rate > 80 ? "danger" : rate > 60 ? "purple" : rate > 40 ? "orange" : rate > 20 ? "primary" : "green";

    return {rate: rate, color: color};
};
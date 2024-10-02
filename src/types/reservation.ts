export interface ILaserReservation {
    laserId: string;
    laserName: string;
    laserStatus: boolean;
    time: string;
}

export interface ILaserInfo {
    laserId: string;
    laserName: string;
    laserStatus: boolean;
    laserTimes: {
        timeId: string;
        time: string;
        timeStatus: boolean;
    }[]
}
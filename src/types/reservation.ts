export interface ILaserReservation {
    laserId: string;
    timeId: string;
}

export interface ILaserInfo {
    laserId: string;
    laserName: string;
    laserStatus: boolean;
}

export interface ILaserTimesinfo {
    laserId: string;
    timeId: string;
    timeContent: string;
    timeStatus: boolean;
}
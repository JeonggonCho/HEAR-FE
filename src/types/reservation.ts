export interface ILaserReservation {
    laserId: string;
    startTime: string;
    endTime: string;
}

export interface ILaserInfo {
    laserId: string;
    laserName: string;
    laserStatus: boolean;
}

export interface ILaserTimesinfo {
    laserId: string;
    startTime: string;
    endTime: string;
    timeStatus: boolean;
}

export interface IPrinterReservation {
    printerId: string;
    date: string;
}

export interface ILaserStatus {
    name: string;
    times: {
        timeContent: string;
        status: boolean;
    }[]
}
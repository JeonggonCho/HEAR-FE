export interface IMachine {
    name: string;
    image: string;
    link?: string;
}

export interface ICommonMachine {
    _id: string;
    status: boolean;
    url: string;
}

export interface ILasers extends ICommonMachine {
    name: string;
    time: string[];
}

export interface IPrinters extends ICommonMachine {
    name: string;
}

export interface IHeats extends ICommonMachine {
    count: number;
}

export interface ILaserTimes {
    id: string;
    startTime: string;
    endTime: string;
    url: string;
}
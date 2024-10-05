export interface IMachine {
    image: string;
    link?: string;
    type: "laser" | "printer" | "heat" | "saw" | "vacuum" | "cnc";
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

export type MachineNameType = {
    [key in 'laser' | 'printer' | 'heat' | 'saw' | 'vacuum' | 'cnc']: {
        ko: string;
        en: string;
        ch: string;
    };
};

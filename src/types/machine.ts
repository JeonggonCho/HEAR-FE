export interface IMachine {
    name: string;
    image: string;
    link?: string;
}

interface ICommonMachineProps {
    _id: string;
    status: boolean;
    updateUrl: string;
}

export interface ILasers extends ICommonMachineProps {
    name: string;
}

export interface IPrinters extends ICommonMachineProps {
    name: string;
}

export interface IHeats extends ICommonMachineProps {
    count: number;
}

export interface ISaws extends ICommonMachineProps {}

export interface IVacuums extends ICommonMachineProps {}

export interface ICncs extends ICommonMachineProps {}

export interface IMachines {
    lasers: ILasers[];
    printers: IPrinters[];
    heats: IHeats[];
    saws: ISaws[];
    vacuums: IVacuums[];
    cncs: ICncs[];
}
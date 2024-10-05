import {IMachine, MachineNameType} from "@/types/machine.ts";

import printer from "@assets/images/printer_icon.png";
import laser from "@assets/images/laser_icon.png";
import heat from "@assets/images/heat_icon.png";
import cnc from "@assets/images/cnc_icon.png";
import saw from "@assets/images/saw_icon.png";
import vacuum from "@assets/images/vacuum_icon.png";

export const machineType = [
    {label: "1호기", value: "1", id: "radio-1"},
    {label: "2호기", value: "2", id: "radio-2"},
];

export const machineReservationCategories:IMachine[] = [
    {image: laser, link: "/reservation/laser", type: "laser"},
    {image: printer, link: "/reservation/3d-printer", type: "printer"},
    {image: heat, link: "/reservation/heat", type: "heat"},
    {image: saw, link: "/reservation/saw", type: "saw"},
    {image: vacuum, link: "/reservation/vacuum", type: "vacuum"},
    {image: cnc, link: "/reservation/cnc", type: "cnc"},
];

export const machineName: MachineNameType = {
    laser: {
        ko: "레이저 커팅기",
        en: "Laser Cutter",
        ch: "激光切割机",
    },
    printer: {
        ko: "3D 프린터",
        en: "3D Printer",
        ch: "3D 打印机",
    },
    heat: {
        ko: "열 선",
        en: "Hot Wire Cutter ",
        ch: "热丝切割机",
    },
    saw: {
        ko: "톱",
        en: "Saw",
        ch: "锯",
    },
    vacuum: {
        ko: "사출 성형기",
        en: "Vacuum Machine",
        ch: "注塑机",
    },
    cnc: {
        ko: "CNC",
        en: "CNC",
        ch: "CNC 铣床",
    },
};

export const machineInstructionTabCategories = {
    introduction: {
        ko: "소개",
        en: "Intro",
        ch: "介绍",
    },
    preparation: {
        ko: "준비",
        en: "Preparation",
        ch: "准备",
    },
    usage: {
        ko: "사용",
        en: "Usage",
        ch: "使用",
    },
    after: {
        ko: "사용후",
        en: "After Use",
        ch: "使用后",
    },
    precaution: {
        ko: "주의사항",
        en: "Precautions",
        ch: "注意事项",
    },
    work: {
        ko: "작업",
        en: "Work",
        ch: "作业",
    },
};
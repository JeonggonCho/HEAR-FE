import printer from "@assets/images/printer_icon.png";
import laser from "@assets/images/laser_icon.png";
import heat from "@assets/images/heat_icon.png";
import cnc from "@assets/images/cnc_icon.png";
import saw from "@assets/images/saw_icon.png";
import vacuum from "@assets/images/vacuum_icon.png";
import {IMachine} from "@/types/machine.ts";

export const machineType = [
    {label: "1호기", value: "1", id: "radio-1"},
    {label: "2호기", value: "2", id: "radio-2"},
];

export const machineReservationCategories:IMachine[] = [
    {name: "레이저 커팅기", image: laser, link: "/reservation/laser", type: "laser"},
    {name: "3D 프린터", image: printer, link: "/reservation/3d-printer", type: "printer"},
    {name: "열 선", image: heat, link: "/reservation/heat", type: "heat"},
    {name: "톱", image: saw, link: "/reservation/saw", type: "saw"},
    {name: "사출 성형기", image: vacuum, link: "/reservation/vacuum", type: "vacuum"},
    {name: "CNC", image: cnc, link: "/reservation/cnc", type: "cnc"},
];
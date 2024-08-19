import printer from "@assets/images/3d_printer.png";
import laser from "@assets/images/laser_cut.png";
import heat from "@assets/images/heat_cutter.png";
import cnc from "@assets/images/cnc.png";
import saw from "@assets/images/saw.png";
import vacuum from "@assets/images/vacuum.png";
import {IMachine} from "@/types/machine.ts";

export const machineType = [
    {label: "1호기", value: "1", id: "radio-1"},
    {label: "2호기", value: "2", id: "radio-2"},
];

export const machineCategories: IMachine[] = [
    {name: "3D 프린터", image: printer, link: "/reservation/3d-printer"},
    {name: "레이저 커팅기", image: laser, link: "/reservation/laser"},
    {name: "열 선", image: heat, link: "/reservation/heat"},
    {name: "CNC", image: cnc, link: "/reservation/cnc"},
    {name: "톱", image: saw, link: "/reservation/saw"},
    {name: "사출 성형기", image: vacuum, link: "/reservation/vacuum"}
];
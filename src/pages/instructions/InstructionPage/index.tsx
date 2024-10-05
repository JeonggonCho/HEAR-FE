import {FC} from "react";

import Header from "@components/common/Header";
import LinkCard from "@components/common/LinkCard";

import {machineName, navLabels, pageIntroduction} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, HeaderWrapper} from "./style.ts";

import instruction from "@assets/images/instruction.png";
import printer from "@assets/images/printer_icon.png";
import laser from "@assets/images/laser_icon.png";
import heat from "@assets/images/heat_icon.png"
import cnc from "@assets/images/cnc_icon.png";
import saw from "@assets/images/saw_icon.png";
import vacuum from "@assets/images/vacuum_icon.png"
import {MachineNameType} from "@/types/machine.ts";

interface IMachine {
    name: string;
    image: string;
    link: string;
}

const machines: IMachine[] = [
    {name: "laser", image: laser, link: "/instruction/laser"},
    {name: "printer", image: printer, link: "/instruction/3d-printer"},
    {name: "heat", image: heat, link: "/instruction/heat"},
    {name: "saw", image: saw, link: "/instruction/saw"},
    {name: "vacuum", image: vacuum, link: "/instruction/vacuum"},
    {name: "cnc", image: cnc, link: "/instruction/cnc"},
];

const InstructionHeaderLeft = () => {
    const {lang} = useThemeStore();

    return (
        <HeaderWrapper>
            <img src={instruction} alt="사용법"/>
            <h2>{navLabels.instruction[lang]}</h2>
        </HeaderWrapper>

    );
};

const InstructionPage:FC = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header leftChild={<InstructionHeaderLeft/>}/>
            <p>{pageIntroduction.instruction[lang]}</p>
            <div>
                {machines.map((machine, index) => {
                    const nameKey = machine.name as keyof MachineNameType;
                    const machineNameEntry = machineName[nameKey];
                    const nameText = machineNameEntry ? machineNameEntry[lang] : undefined;

                    return (
                        <LinkCard
                            key={index}
                            image={machine.image}
                            name={nameText || "알 수 없음"}
                            to={machine.link}
                            type={"linear"}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default InstructionPage;
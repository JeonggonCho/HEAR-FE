import {Header} from "@components/common/Header";
import Link from "@components/common/Link";
import HeadTag from "@components/common/HeadTag";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container, HeaderWrapper} from "./style.ts";
import {navCategories} from '@constants/navCategories.ts';
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {machineName} from "@constants/machineCategories.ts";
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
            <h2>{navCategories.instruction[lang]}</h2>
        </HeaderWrapper>

    );
};


const InstructionPage = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={navCategories.instruction[lang]}/>

            <Header>
                <Header.Left>
                    <InstructionHeaderLeft/>
                </Header.Left>
            </Header>

            <p>{pageDescriptionCategories.instruction[lang]}</p>
            <div>
                {machines.map((machine, index) => {
                    const nameKey = machine.name as keyof MachineNameType;
                    const machineNameEntry = machineName[nameKey];
                    const nameText = machineNameEntry ? machineNameEntry[lang] : undefined;

                    return (
                        <Link
                            key={index}
                            image={machine.image}
                            name={nameText || "알 수 없음"}
                            to={machine.link}
                            type={"card"}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default InstructionPage;
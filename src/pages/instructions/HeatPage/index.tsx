import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import heat from "../../../assets/images/heat_cutter.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "../../../components/Tab";

const HeatPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"열 선"}/>
            <MachineImgWrapper>
                <img src={heat} alt="열선"/>
            </MachineImgWrapper>
            <Tab/>
        </div>
    );
};

export default HeatPage;
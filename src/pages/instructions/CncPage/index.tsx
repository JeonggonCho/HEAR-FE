import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import cnc from "../../../assets/images/cnc.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "../../../components/Tab";

const CncPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"CNC"}/>
            <MachineImgWrapper>
                <img src={cnc} alt="CNC"/>
            </MachineImgWrapper>
            <Tab/>
        </div>
    );
};

export default CncPage;
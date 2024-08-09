import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import saw from "../../../assets/images/saw.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "../../../components/Tab";

const SawPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"톱"}/>
            <MachineImgWrapper>
                <img src={saw} alt="톱"/>
            </MachineImgWrapper>
            <Tab/>
        </div>
    );
};

export default SawPage;
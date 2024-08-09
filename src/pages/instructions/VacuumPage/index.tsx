import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import vacuum from "../../../assets/images/vacuum.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "../../../components/Tab";

const VacuumPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"사출 성형기"}/>
            <MachineImgWrapper>
                <img src={vacuum} alt="사출 성형기"/>
            </MachineImgWrapper>
            <Tab/>
        </div>
    );
};

export default VacuumPage;
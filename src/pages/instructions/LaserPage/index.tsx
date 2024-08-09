import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import laser from "../../../assets/images/laser_cut.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "../../../components/Tab";

const LaserPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"레이저 커팅기"}/>
            <MachineImgWrapper>
                <img src={laser} alt="레이저 커팅기"/>
            </MachineImgWrapper>
            <Tab/>
        </div>
    );
};

export default LaserPage;
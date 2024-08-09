import Header from "../../../components/Header";
import ArrowBack from "../../../components/ArrowBack";
import printer from "../../../assets/images/3d_printer.png";
import {MachineImgWrapper} from "./style.ts";
import Tab from "../../../components/Tab";

const PrinterPage = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"3D 프린터"}/>
            <MachineImgWrapper>
                <img src={printer} alt="3d 프린터"/>
            </MachineImgWrapper>
            <Tab/>
        </div>
    );
};

export default PrinterPage;
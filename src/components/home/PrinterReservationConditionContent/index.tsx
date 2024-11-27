import {useState} from "react";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import printer from "@assets/images/3d_printer.png";


const PrinterReservationConditionContent = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const {lang} = useThemeStore();

    return (
        <Container>
            <div>
                <div>
                    <img src={printer} alt={"3D 프린터 이미지"}/>
                </div>
                <h4>{cardCategories.printerReservationCondition[lang]}</h4>
            </div>
            <div>

            </div>
        </Container>
    );
};

export default PrinterReservationConditionContent;
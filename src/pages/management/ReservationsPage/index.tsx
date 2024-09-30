import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";

const ReservationsPage:FC = () => {
    return (
        <>
            <Header leftChild={<ArrowBack/>} centerText={"예약 관리"}/>
        </>
    );
};

export default ReservationsPage;
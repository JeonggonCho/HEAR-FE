import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";

const ConditionPage:FC = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"예약 현황"}/>
        </div>
    );
};

export default ConditionPage;
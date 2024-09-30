import {FC} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";

const AlarmPage:FC = () => {
    return (
        <div>
            <Header leftChild={<ArrowBack/>} centerText={"알림"}/>
            알림 페이지
        </div>
    );
};

export default AlarmPage;
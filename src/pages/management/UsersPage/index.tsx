import {FC} from "react";
import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

const UsersPage:FC = () => {
    return (
        <>
            <Header leftChild={<ArrowBack/>} centerText={"유저 관리"}/>
        </>
    );
};

export default UsersPage;
import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";

import useRequest from "@hooks/useRequest.ts";

import {Container} from "./style.ts";
import UserListItem from "@components/UserListItem";

const UsersPage:FC = () => {
    const [userList, setUserList] = useState([]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchUserList = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "",
            });

        } catch (err) {
            console.error("유저 목록 조회 중 에러 발생: ", err);
        }
    },[]);

    useEffect(() => {
        fetchUserList();
    }, [sendRequest]);

    const users = [
        {name: "Micheal Jackson", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
        {name: "조정곤", year: "3", studentId: "2015035414"},
    ];

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"유저 관리"}/>

            <div>
                <span>학생 수 25명</span>

                <div>
                    <select>
                        <option>학년</option>
                    </select>

                    <select>
                        <option>경고</option>
                    </select>

                    <select>
                        <option>교육이수</option>
                    </select>
                </div>
            </div>

            <div>
                <span>이 름</span>
                <span>학 년</span>
                <span>학 번</span>
                <span>경 고</span>
                <span>교육이수</span>
            </div>

            {users.map((user, index) => (
                <UserListItem key={index} {...user}/>
            ))}
        </Container>
    );
};

export default UsersPage;
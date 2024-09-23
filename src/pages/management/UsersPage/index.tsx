import {FC, useCallback, useEffect, useState} from "react";
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactSVG} from "react-svg";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import UserListItem from "@components/UserListItem";
import Input from "@components/Input";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";
import Empty from "@components/Empty";

import useRequest from "@hooks/useRequest.ts";
import {searchUserSchema} from "@schemata/authSchema.ts";
import {IUserList} from "@/types/user.ts";

import {Container} from "./style.ts";

import tune from "@assets/icons/tune.svg";
import search from "@assets/icons/search.svg";

const UsersPage:FC = () => {
    const [userList, setUserList] = useState<IUserList[]>([]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    type SearchFormData = z.infer<typeof searchUserSchema>;

    const {
        register:searchRegister,
        handleSubmit: searchHandleSubmit
    } = useForm<SearchFormData>({
        resolver: zodResolver(searchUserSchema),
        defaultValues: {
            username: "",
        }
    });

    const submitHandler:SubmitHandler<SearchFormData> = useCallback(async () => {

    }, []);

    const fetchUserList = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "users/all",
            });
            setUserList(response.data);
        } catch (err) {
            console.error("유저 목록 조회 중 에러 발생: ", err);
        }
    },[sendRequest, setUserList]);

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"유저 관리"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <div>
                        <span>학생 수 {userList.length}명</span>

                        <form onSubmit={searchHandleSubmit(submitHandler)}>
                            <div>
                                <Input
                                    type={"text"}
                                    id={"username-input"}
                                    name={"username"}
                                    register={searchRegister}
                                    placeholder={"학생 이름 검색"}
                                />

                                <ReactSVG src={search}/>
                            </div>

                            <div onClick={() => {}}>
                                <ReactSVG src={tune}/>
                            </div>
                        </form>
                    </div>

                    <div>
                        <span>이름</span>
                        <span>학년</span>
                        <span>학번</span>
                        <span>경고</span>
                        <span>교육</span>
                    </div>

                    {userList.length === 0 ?
                        <Empty title={"유저 목록이 없습니다"}/>
                        :
                        userList.map((user, index) => (
                        <UserListItem key={index} {...user}/>
                    ))}
                </>
            }

            {errorText &&
                <Modal
                  content={<ErrorContent text={errorText} closeModal={clearError}/>}
                  setModal={clearError}
                  type={"popup"}
                />
            }
        </Container>
    );
};

export default UsersPage;
import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import UserListItem from "@components/management/UserListItem";
import Input from "@components/common/Input";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";
import Empty from "@components/common/Empty";
import UsersFilterContent from "@components/content/UsersFilterContent";
import Button from "@components/common/Button";

import useRequest from "@hooks/useRequest.ts";
import {IUserFilter, IUserList} from "@/types/user.ts";

import {Badge, Container, UserControlWrapper} from "./style.ts";

import tune from "@assets/icons/tune.svg";
import search from "@assets/icons/search.svg";
import close from "@assets/icons/close.svg";

const UsersPage:FC = () => {
    const [userList, setUserList] = useState<IUserList[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [filter, setFilter] = useState<IUserFilter>({year: ["all"], passQuiz: ["all"], countOfWarning:["all"]});
    const [usernameInputText, setUsernameInputText] = useState<string>("");
    const [username, setUsername] = useState<string>(usernameInputText.trim());

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    const fetchUserList = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `users/all?year=${filter.year.join(",")}&passQuiz=${filter.passQuiz.join(",")}&countOfWarning=${filter.countOfWarning.join(",")}&username=${username}`,
            });
            setUserList(response.data);
        } catch (err) {
            console.error("유저 목록 조회 중 에러 발생: ", err);
        }
    },[sendRequest, setUserList, filter, username, setUsername]);

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    const handleSearchUsername = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(usernameInputText.trim());
    };

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"유저 관리"}/>
            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    <UserControlWrapper usernameInputText={usernameInputText}>
                        <span>학생 수 {userList.length}명</span>

                        <form onSubmit={handleSearchUsername}>
                            <div>
                                <Input
                                    type={"text"}
                                    id={"username-input"}
                                    name={"username"}
                                    placeholder={"학생 이름 검색"}
                                    value={usernameInputText}
                                    onChange={(e) => setUsernameInputText(e.target.value)}
                                />

                                <div onClick={() => setUsernameInputText("")}>
                                    <ReactSVG src={close}/>
                                </div>

                                <Button
                                    type={"submit"}
                                    content={<ReactSVG src={search}/>}
                                    width={"fit"}
                                    color={"second"}
                                    scale={"small"}
                                />
                            </div>

                            <div onClick={() => setShowFilter(true)}>
                                {!(filter.year.includes("all") && filter.countOfWarning.includes("all") && filter.passQuiz.includes("all")) &&
                                  <Badge/>
                                }
                                <ReactSVG src={tune}/>
                            </div>
                        </form>
                    </UserControlWrapper>

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

            {showFilter &&
                <Modal
                  title={"유저 필터"}
                  content={<UsersFilterContent filter={filter} setFilter={setFilter} setModal={setShowFilter}/>}
                  setModal={setShowFilter}
                  type={"bottomSheet"}
                />
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
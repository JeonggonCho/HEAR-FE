import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import UserListItem from "@components/management/UserListItem";
import Input from "@components/common/Input";
import Modal from "@components/common/Modal";
import Empty from "@components/common/Empty";
import UsersFilterContent from "@components/content/UsersFilterContent";
import Button from "@components/common/Button";
import CardLoading from "@components/skeleton/CardLoading";
import HeadTag from "@components/common/HeadTag";
import Toast from "@components/common/Toast";

import useRequest from "@hooks/useRequest.ts";
import {IUserFilter, IUserList} from "@/types/user.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";

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

    const {lang} = useThemeStore();

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
            <HeadTag title={headerCategories.userManagementHeader[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.userManagementHeader[lang]} bgColor={true}/>

            <UserControlWrapper usernameInputText={usernameInputText}>
                <span>{userList.length} {inputCategories.userUnit[lang]}</span>

                <form onSubmit={handleSearchUsername}>
                    <div>
                        <Input
                            type={"text"}
                            id={"username-input"}
                            name={"username"}
                            placeholder={placeholderCategories.studentName[lang]}
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
                <span>{inputCategories.username[lang]}</span>
                <span>{inputCategories.year[lang]}</span>
                <span>{inputCategories.warning[lang]}</span>
                <span>{inputCategories.status[lang]}</span>
            </div>

            {isLoading ?
                <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                    <CardLoading heightValue={"55px"}/>
                    <CardLoading heightValue={"55px"}/>
                    <CardLoading heightValue={"55px"}/>
                    <CardLoading heightValue={"55px"}/>
                    <CardLoading heightValue={"55px"}/>
                    <CardLoading heightValue={"55px"}/>
                    <CardLoading heightValue={"55px"}/>
                    <CardLoading heightValue={"55px"}/>
                </div>
                :
                <>
                    {userList.length === 0 ?
                        <Empty title={messageCategories.emptyUsers[lang]}/>
                        :
                        userList.map((user, index) => (
                            <UserListItem key={index} {...user}/>
                        ))
                    }
                </>
            }

            {showFilter &&
                <Modal
                  title={headerCategories.userFilter[lang]}
                  content={<UsersFilterContent filter={filter} setFilter={setFilter} setModal={setShowFilter}/>}
                  setModal={setShowFilter}
                  type={"bottomSheet"}
                />
            }

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </Container>
    );
};

export default UsersPage;
import {useCallback, useEffect, useState} from "react";
import {Header} from "@components/common/Header";
import UserInfoModal from "@components/common/UserInfoModal";
import Input from "@components/common/Input";
import Empty from "@components/common/Empty";
import Button from "@components/common/Button";
import CardLoading from "@components/skeleton/CardLoading";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import Icon from "@components/common/Icon";
import UsersManagementFilter from "@components/management/UsersManagementFilter";
import DeleteUser from "@components/management/DeleteUser";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import {IUserFilter, IUserInfo} from "@/types/user.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import UsersManagementContext from "@context/UsersManagementContext.ts";
import UsersManagementFilterContext from "@context/UsersManagementFilterContext.ts";
import {TableHeadsWrapper, UserControlWrapper, UserListItem} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {inputCategories} from "@constants/inputCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {placeholderCategories} from "@constants/placeholderCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import search from "@assets/icons/search.svg";
import close from "@assets/icons/close.svg";


const UsersManagementPage = () => {
    const [userList, setUserList] = useState<IUserInfo[]>([]);
    const [filter, setFilter] = useState<IUserFilter>({year: ["all"], passEducation: ["all"], countOfWarning:["all"]});
    const [usernameInputText, setUsernameInputText] = useState<string>("");
    const [username, setUsername] = useState<string>(usernameInputText.trim());

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();

    // 유저 목록 조회
    const fetchUserList = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: `users/all?year=${filter.year.join(",")}&passEducation=${filter.passEducation.join(",")}&countOfWarning=${filter.countOfWarning.join(",")}&username=${username}`,
            });
            setUserList(response.data);
        } catch (err) {
            console.error("유저 목록 조회 중 에러 발생: ", err);
        }
    },[sendRequest, setUserList, filter, username, setUsername]);

    useEffect(() => {
        fetchUserList();
    }, [fetchUserList]);

    // 유저 이름 검색
    const handleSearchUsername = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(usernameInputText.trim());
    };

    return (
        <>
            <HeadTag title={headerCategories.userManagementHeader[lang]}/>

            <Header bgColor={true}>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.userManagementHeader[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <UsersManagementFilterContext.Provider value={{filter, setFilter}}>
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

                            <Icon svg={close} onClick={() => setUsernameInputText("")}/>

                            <Button
                                type={"submit"}
                                variant={"filled"}
                                width={"fit"}
                                color={"second"}
                                size={"sm"}
                            >
                                <Icon svg={search} size={22} isHovered={true}/>
                            </Button>
                        </div>
                        <UsersManagementFilter/>
                    </form>
                </UserControlWrapper>

                <TableHeadsWrapper>
                    <Flex direction={"row"} align={"center"}>
                        <span>{inputCategories.username[lang]}</span>
                        <span>{inputCategories.year[lang]}</span>
                        <span>{inputCategories.warning[lang]}</span>
                        <span>{inputCategories.status[lang]}</span>
                        <span>{buttonCategories.deletion[lang]}</span>
                    </Flex>
                </TableHeadsWrapper>

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
                    <UsersManagementContext.Provider value={{userList, setUserList}}>
                        {userList.length === 0 ?
                            <Empty title={messageCategories.emptyUsers[lang]}/>
                            :
                            userList.map((user) => (
                                <UserInfoModal
                                    key={user.userId}
                                    trigger={
                                        <UserListItem pass={user.passEducation}>
                                            <span>{user.username}</span>
                                            <span>{user.year}</span>
                                            <span>{user.countOfWarning}</span>
                                            <span>{user.passEducation ? cardCategories.pass[lang] : cardCategories.fail[lang]}</span>
                                            <Flex align={"center"} justify={"center"}>
                                                <div onClick={e => e.stopPropagation()}>
                                                    <DeleteUser userId={user.userId}/>
                                                </div>
                                            </Flex>
                                        </UserListItem>
                                    }
                                    {...user}
                                />
                            ))
                        }
                    </UsersManagementContext.Provider>
                }
            </UsersManagementFilterContext.Provider>
        </>
    );
};

export default UsersManagementPage;
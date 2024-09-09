import {FC, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import {ReactSVG} from "react-svg";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {INotice} from "@/types/componentProps.ts";
import getTimeStamp from "@util/getTimeStamp.ts";
import generateLink from "@util/generateLink.ts";

import {Container, Dropdown} from "./style.ts";
import more from "@assets/icons/more.svg";
import {useUserDataStore} from "@store/useUserStore.ts";

const NoticeDetailPage:FC = () => {
    const [notice, setNotice] = useState<INotice>();
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const {noticeId} = useParams();

    const {userData} = useUserDataStore();

    const timeStamp = useMemo(() => {
        return notice?.createdAt ? getTimeStamp(notice.createdAt): '';
    },[notice?.createdAt]);

    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await sendRequest({
                    url: `/notices/${noticeId}`,
                });
                setNotice(response.data);
            } catch (err) {
                console.error("공지 조회 중 에러 발생: ", err);
            }
        };
        fetchNotice();
    }, [sendRequest, noticeId]);

    return (
        <Container>
            <Header leftChild={<ArrowBack/>} centerText={"공지사항"}/>
            {!isLoading && notice ?
                <>
                    <h2>{notice.title}</h2>

                    <div>
                        <span>{timeStamp}</span>
                        {userData?.role === "admin" || userData?.role === "manager" &&
                          <ReactSVG src={more} onClick={() => setShowDropdown((prevState) => !prevState)}/>
                        }
                        {showDropdown && <Dropdown>헬로</Dropdown>}
                    </div>

                    <hr/>
                    {notice.content &&
                      <p dangerouslySetInnerHTML={{__html: generateLink(notice.content)}}/>
                    }
                </>
                    :
                    <LoadingLoop/>
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

export default NoticeDetailPage;
import {FC, useCallback, useEffect, useState} from "react";

import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import {useUserDataStore} from "@store/useUserStore.ts";
import useRequest from "@hooks/useRequest.ts";
import {buttonLabels, cardLabels} from "@constants/langCategories.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container, EmptyManagerInfo, ManagerCardTitleWrapper, ManagerInfoWrapper} from "./style.ts";

import manager from "@assets/images/manager.png";

const ManagerCard:FC = () => {
    const {userData} = useUserDataStore();
    const {lang} = useThemeStore();

    const [managerInfo, setManagerInfo] = useState<{username: string, lab: string}>();

    const {sendRequest, errorText, clearError} = useRequest();

    const fetchManageInfo = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users/manager",
            });
            if (response.data) {
                setManagerInfo(response.data);
            }
        } catch (err) {
            console.error("조교 정보 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchManageInfo();
    }, [fetchManageInfo]);

    return (
        <Container>
            <ManagerCardTitleWrapper valid={!!managerInfo}>
                <img src={manager} alt="관리 조교"/>
                <h3>{cardLabels.manager[lang]}</h3>
            </ManagerCardTitleWrapper>

            {managerInfo ?
                <ManagerInfoWrapper>
                    <div>
                        <span>{managerInfo.username}</span>
                        <span>{managerInfo.lab}</span>
                    </div>

                    {userData?.role !== "manager" &&
                      <Button type={"link"} to={"/communication/inquiry/new"} content={buttonLabels.sendInquiry[lang]} width={"fit"}
                              color={"third"} scale={"small"}/>
                    }
                </ManagerInfoWrapper>
                :
                <EmptyManagerInfo>
                    조교 정보가 없습니다
                </EmptyManagerInfo>
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

export default ManagerCard;
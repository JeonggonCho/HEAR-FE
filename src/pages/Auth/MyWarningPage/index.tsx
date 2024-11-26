import {useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import Empty from "@components/common/Empty";
import Grid from "@components/common/Grid";

import useRequest from "@hooks/useRequest.ts";
import {IWarning} from "@/types/warning.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {WarningsListItem, WarningsListItemWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";

import error from "@assets/icons/error.svg";


const MyWarningPage = () => {
    const [warnings, setWarnings] = useState<IWarning[]>([]);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    // 내 경고 내역 조회하기
    const fetchWarnings = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/users/warnings",
            });
            if (response.data) {
                setWarnings(response.data);
            }
        } catch (err) {
            console.error("경고 조회 중 에러 발생: ", err);
        }
    }, [sendRequest, setWarnings]);

    useEffect(() => {
        fetchWarnings();
    }, [fetchWarnings]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return (
        <>
            <HeadTag title={headerCategories.myWarning[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.myWarning[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {isLoading ?
                <LoadingLoop/>
                :
                <>
                    {warnings.length > 0 ?
                        <WarningsListItemWrapper>
                            {warnings.map((warning) => (
                                <WarningsListItem key={warning._id}>
                                    <div>
                                        <ReactSVG src={error}/>
                                    </div>
                                    <div>
                                        <p>{warning.message}</p>
                                        <span>{new Date(warning.date).toLocaleDateString()}</span>
                                    </div>
                                </WarningsListItem>
                            ))}
                        </WarningsListItemWrapper>
                        :
                        <Empty title={messageCategories.emptyWarning[lang]}/>
                    }
                </>
            }
        </>
    );
};

export default MyWarningPage;
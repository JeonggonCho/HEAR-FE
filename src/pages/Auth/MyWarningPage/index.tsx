import {FC, useCallback, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import LoadingLoop from "@components/common/LoadingLoop";
import Empty from "@components/common/Empty";
import Toast from "@components/common/Toast";

import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import useRequest from "@hooks/useRequest.ts";
import {IWarning} from "@/types/warning.ts";
import {messageCategories} from "@constants/messageCategories.ts";

import {WarningsListItem, WarningsListItemWrapper} from "./style.ts";

import error from "@assets/icons/error.svg";

const MyWarningPage:FC = () => {
    const [warnings, setWarnings] = useState<IWarning[]>([]);

    const {isLoading, sendRequest, errorText, clearError} = useRequest();
    const {lang} = useThemeStore();

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

    return (
        <>
            <HeadTag title={headerCategories.myWarning[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.myWarning[lang]}/>

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

            {errorText &&
                <Toast text={errorText} setToast={clearError} type={"error"}/>
            }
        </>
    );
};

export default MyWarningPage;
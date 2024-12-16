import {useEffect, useState} from "react";
import Icon from "@components/common/Icon";
import Empty from "@components/common/Empty";
import useRequest from "@hooks/useRequest.ts";
import fetchWarningsApi from "@api/auth/fetchWarningsApi.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {WarningsListItem, WarningsListWrapper} from "@components/account/WarningList/style.ts";
import {IWarning} from "@/types/warning.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import error from "@assets/icons/error.svg";


const WarningList = () => {
    const [warnings, setWarnings] = useState<IWarning[]>([]);

    const {lang} = useThemeStore();
    const {sendRequest} = useRequest();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await fetchWarningsApi({sendRequest});
                setWarnings(responseData);
            } catch (error) {
                console.error("경고 데이터 조회 시 에러가 발생: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {warnings.length > 0 ?
                <WarningsListWrapper>
                    {warnings.map((warning) => (
                        <WarningsListItem key={warning._id}>
                            <div>
                                <Icon svg={error}/>
                            </div>
                            <div>
                                <p>{warning.message}</p>
                                <span>{new Date(warning.date).toLocaleDateString()}</span>
                            </div>
                        </WarningsListItem>
                    ))}
                </WarningsListWrapper>
                :
                <Empty title={messageCategories.emptyWarning[lang]}/>
            }
        </>
    );
};

export default WarningList;
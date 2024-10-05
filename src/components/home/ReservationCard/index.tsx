import {FC, useCallback, useEffect, useState} from "react";

import LinkCard from "@components/common/LinkCard";
import LoadingLoop from "@components/common/LoadingLoop";
import Modal from "@components/common/Modal";
import ErrorContent from "@components/content/ErrorContent";

import {machineReservationCategories} from "@constants/machineCategories.ts";
import useRequest from "@hooks/useRequest.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {machineName} from "@constants/langCategories.ts";
import {MachineNameType} from "@/types/machine.ts";

import {Container} from "./style.ts";

const ReservationCard:FC = () => {
    const [machineStatus, setMachineStatus] = useState({laser: false, printer: false, heat: false, saw: false, vacuum: false, cnc: false});

    const {lang} = useThemeStore();

    const {isLoading, sendRequest, errorText, clearError} = useRequest();

    const fetchMachineStatus = useCallback(async () => {
        try {
            const response = await sendRequest({
                url: "/machines/status",
            });
            if (response.data) {
                setMachineStatus(response.data);
            }
        } catch (err) {
            console.error("기기 상태 조회 중 에러 발생: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchMachineStatus();
    }, [fetchMachineStatus]);

    return (
        <Container>
            {isLoading ?
                <LoadingLoop/>
                :
                <div>
                    {machineReservationCategories.map((machine, index) => {
                        const nameKey = machine.type as keyof MachineNameType;
                        const machineNameEntry = machineName[nameKey];
                        const nameText = machineNameEntry ? machineNameEntry[lang] : undefined;

                        return (
                            <LinkCard
                                key={index}
                                image={machine.image}
                                name={nameText || "알 수 없음"}
                                to={machine.link as string}
                                type={"grid"}
                                isDisabled={!machineStatus[machine.type]}
                            />
                        );
                    })}
                </div>
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

export default ReservationCard;
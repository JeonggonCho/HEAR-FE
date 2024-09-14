import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import MachineManageCard from "@components/MachineManageCard";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {IHeats, ILasers, IMachines, IPrinters, IVacuums} from "@/types/machine.ts";

import laser_icon from "@assets/images/laser_icon.png";
import printer_icon from "@assets/images/printer_icon.png";
import heat_icon from "@assets/images/heat_icon.png";
import saw_icon from "@assets/images/saw_icon.png";
import vacuum_icon from "@assets/images/vacuum_icon.png";
import cnc_icon from "@assets/images/cnc_icon.png";

const MachinesPage:FC = () => {
    const [machines, setMachines] = useState<IMachines>();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    // 기기 정보들 조회하기
    const fetchMachines = useCallback(async () => {
        try {
            const {data: {lasers}} = await sendRequest({url: "/machines/lasers",});
            const {data: {printers}} = await sendRequest({url: "/machines/printers"});
            const {data: {heats}} = await sendRequest({url: "/machines/heats"});
            const {data: {saws}} = await sendRequest({url: "/machines/saws"});
            const {data: {vacuums}} = await sendRequest({url: "/machines/vacuums"});
            const {data: {cncs}} = await sendRequest({url: "/machines/cncs"});

            // 각 기기 데이터에 업데이트 url 생성하기
            lasers.map((l:ILasers) => l.updateUrl = `/machines/lasers/${l._id}`);
            printers.map((p:IPrinters) => p.updateUrl = `/machines/printers/${p._id}`);
            heats.map((h:IHeats) => h.updateUrl = `/machines/heats/${h._id}`);
            saws.map((s:ILasers) => s.updateUrl = `/machines/saws/${s._id}`);
            vacuums.map((v:IVacuums) => v.updateUrl = `/machines/vacuums/${v._id}`);
            cncs.map((c:ILasers) => c.updateUrl = `/machines/cncs/${c._id}`);

            setMachines({lasers, printers, heats, saws, vacuums, cncs});
        } catch (err) {
            console.error("기기 조회 중 에러: ", err);
        }
    }, [sendRequest]);

    useEffect(() => {
        fetchMachines();
    }, [fetchMachines]);
    return (
        <>
            <Header leftChild={<ArrowBack/>} centerText={"기기 관리"}/>
            {isLoading?
                <LoadingLoop/>
                :
                <>
                    {machines &&
                      <>
                        <MachineManageCard
                          name={"레이저 커팅기"}
                          img={laser_icon}
                          machineType={"laser"}
                          machineData={machines.lasers}
                        />
                        <MachineManageCard
                          name={"3D 프린터"}
                          img={printer_icon}
                          machineType={"printer"}
                          machineData={machines.printers}
                        />
                        <MachineManageCard
                          name={"열 선"}
                          img={heat_icon}
                          machineType={"heat"}
                          machineData={machines.heats}
                        />
                        <MachineManageCard
                          name={"톱"}
                          img={saw_icon}
                          machineType={"saw"}
                          machineData={machines.saws}
                        />
                        <MachineManageCard
                          name={"사출 성형기"}
                          img={vacuum_icon}
                          machineType={"vacuum"}
                          machineData={machines.vacuums}
                        />
                        <MachineManageCard
                          name={"CNC"}
                          img={cnc_icon}
                          machineType={"cnc"}
                          machineData={machines.cncs}
                        />
                      </>
                    }
                </>
            }

            {errorText &&
                <Modal
                  content={<ErrorContent closeModal={clearError} text={errorText}/>}
                  setModal={clearError}
                  type={"popup"}
                />
            }
        </>
    );
};

export default MachinesPage;
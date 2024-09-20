import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/Header";
import ArrowBack from "@components/ArrowBack";
import MachineManageCard from "@components/MachineManageCard";
import LoadingLoop from "@components/LoadingLoop";
import Modal from "@components/Modal";
import ErrorContent from "@components/ErrorContent";

import useRequest from "@hooks/useRequest.ts";
import {ICommonMachine, IHeats, ILasers, IPrinters} from "@/types/machine.ts";

import laser_icon from "@assets/images/laser_icon.png";
import printer_icon from "@assets/images/printer_icon.png";
import heat_icon from "@assets/images/heat_icon.png";
import saw_icon from "@assets/images/saw_icon.png";
import vacuum_icon from "@assets/images/vacuum_icon.png";
import cnc_icon from "@assets/images/cnc_icon.png";

const MachinesPage:FC = () => {
    const [lasers, setLasers] = useState<ILasers[]>([]);
    const [printers, setPrinters] = useState<IPrinters[]>([]);
    const [heats, setHeats] = useState<IHeats[]>([]);
    const [saws, setSaws] = useState<ICommonMachine[]>([]);
    const [vacuums, setVacuums] = useState<ICommonMachine[]>([]);
    const [cncs, setCncs] = useState<ICommonMachine[]>([]);

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
            lasers.map((l:ILasers) => l.url = `/machines/lasers/${l._id}`);
            printers.map((p:IPrinters) => p.url = `/machines/printers/${p._id}`);
            heats.map((h:IHeats) => h.url = `/machines/heats/${h._id}`);
            saws.map((s:ICommonMachine) => s.url = `/machines/saws/${s._id}`);
            vacuums.map((v:ICommonMachine) => v.url = `/machines/vacuums/${v._id}`);
            cncs.map((c:ICommonMachine) => c.url = `/machines/cncs/${c._id}`);

            setLasers(lasers);
            setPrinters(printers);
            setHeats(heats);
            setSaws(saws);
            setVacuums(vacuums);
            setCncs(cncs);
        } catch (err) {
            console.error("기기 조회 중 에러: ", err);
        }
    }, [sendRequest, setLasers, setPrinters, setHeats, setSaws, setVacuums, setCncs]);

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
                    {lasers && printers && heats && saws && vacuums && cncs &&
                      <>
                        <MachineManageCard
                          name={"레이저 커팅기"}
                          img={laser_icon}
                          machineType={"laser"}
                          machineData={lasers}
                          setMachines={setLasers}
                        />
                        <MachineManageCard
                          name={"3D 프린터"}
                          img={printer_icon}
                          machineType={"printer"}
                          machineData={printers}
                          setMachines={setPrinters}
                        />
                        <MachineManageCard
                          name={"열 선"}
                          img={heat_icon}
                          machineType={"heat"}
                          machineData={heats}
                        />
                        <MachineManageCard
                          name={"톱"}
                          img={saw_icon}
                          machineType={"saw"}
                          machineData={saws}
                        />
                        <MachineManageCard
                          name={"사출 성형기"}
                          img={vacuum_icon}
                          machineType={"vacuum"}
                          machineData={vacuums}
                        />
                        <MachineManageCard
                          name={"CNC"}
                          img={cnc_icon}
                          machineType={"cnc"}
                          machineData={cncs}
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
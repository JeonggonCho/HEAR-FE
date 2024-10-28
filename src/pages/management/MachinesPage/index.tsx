import {FC, useCallback, useEffect, useState} from "react";

import Header from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import MachineManageCard from "@components/management/MachineManageCard";
import LoadingLoop from "@components/common/LoadingLoop";
import Divider from "@components/common/Divider";
import HeadTag from "@components/common/HeadTag";

import useRequest from "@hooks/useRequest.ts";
import {ICommonMachine, IHeats, ILasers, ILaserTimes, IPrinters} from "@/types/machine.ts";
import {useToastStore} from "@store/useToastStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {machineName} from "@constants/machineCategories.ts";

import {Container} from "./style.ts";

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
    const [timeList, setTimeList] = useState<ILaserTimes[]>([]);

    const {lang} = useThemeStore();
    const {showToast} = useToastStore();
    const {isLoading, errorText, sendRequest, clearError} = useRequest();

    // 기기 정보들 정보 조회하기
    const fetchMachines = useCallback(async () => {
        try {
            const {data: {lasers}} = await sendRequest({url: "/machines/lasers",});
            const {data: {printers}} = await sendRequest({url: "/machines/printers"});
            const {data: {heats}} = await sendRequest({url: "/machines/heats"});
            const {data: {saws}} = await sendRequest({url: "/machines/saws"});
            const {data: {vacuums}} = await sendRequest({url: "/machines/vacuums"});
            const {data: {cncs}} = await sendRequest({url: "/machines/cncs"});

            // 레이저 커팅기 시간 목록 조회하기
            const {data: {laserTimes}} = await sendRequest({url: "/machines/lasers/times"});

            // 각 기기 데이터에 업데이트, 삭제 url 생성하기
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

            // 각 시간 데이터에 업데이트, 삭제 url 생성하기
            laserTimes.map((t: ILaserTimes) => t.url = `/machines/lasers/times/${t.id}`);

            setTimeList(laserTimes);
        } catch (err) {
            console.error("기기 조회 중 에러: ", err);
        }
    }, [sendRequest, setLasers, setPrinters, setHeats, setSaws, setVacuums, setCncs]);

    useEffect(() => {
        fetchMachines();
    }, [fetchMachines]);

    // 에러 메시지
    useEffect(() => {
        if (errorText) showToast(errorText, "error");
        const errorTimer = setTimeout(() => clearError(), 6000);
        return () => clearTimeout(errorTimer);
    }, [errorText]);

    return (
        <Container>
            <HeadTag title={headerCategories.machineManagementHeader[lang]}/>

            <Header leftChild={<ArrowBack/>} centerText={headerCategories.machineManagementHeader[lang]} bgColor={true}/>
            <Divider/>
            {isLoading?
                <LoadingLoop/>
                :
                <>
                    {lasers && printers && heats && saws && vacuums && cncs &&
                      <>
                        <MachineManageCard
                          name={machineName.laser[lang]}
                          img={laser_icon}
                          machineType={"laser"}
                          machineData={lasers}
                          setMachines={setLasers}
                          timeData={timeList}
                          setTimes={setTimeList}
                        />
                        <Divider/>
                        <MachineManageCard
                          name={machineName.printer[lang]}
                          img={printer_icon}
                          machineType={"printer"}
                          machineData={printers}
                          setMachines={setPrinters}
                        />
                        <Divider/>
                        <MachineManageCard
                          name={machineName.heat[lang]}
                          img={heat_icon}
                          machineType={"heat"}
                          machineData={heats}
                        />
                        <Divider/>
                        <MachineManageCard
                          name={machineName.saw[lang]}
                          img={saw_icon}
                          machineType={"saw"}
                          machineData={saws}
                        />
                        <Divider/>
                        <MachineManageCard
                          name={machineName.vacuum[lang]}
                          img={vacuum_icon}
                          machineType={"vacuum"}
                          machineData={vacuums}
                        />
                        <Divider/>
                        <MachineManageCard
                          name={machineName.cnc[lang]}
                          img={cnc_icon}
                          machineType={"cnc"}
                          machineData={cncs}
                        />
                      </>
                    }
                </>
            }
            <Divider/>
        </Container>
    );
};

export default MachinesPage;
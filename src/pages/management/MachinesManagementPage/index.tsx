import {useCallback, useEffect, useState} from "react";
import {Header} from "@components/common/Header";
import MachineManageCard from "@components/management/MachineManageCard";
import LoadingLoop from "@components/common/LoadingLoop";
import Divider from "@components/common/Divider";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import Flex from "@components/common/Flex";
import Card from "@components/common/Card";
import ArrowBack from "@components/common/ArrowBack";
import useRequest from "@hooks/useRequest.ts";
import {ICommonMachine, IHeats, ILasers, ILaserTimes, IPrinters} from "@/types/machine.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const MachinesManagementPage = () => {
    const [lasers, setLasers] = useState<ILasers[]>([]);
    const [printers, setPrinters] = useState<IPrinters[]>([]);
    const [heats, setHeats] = useState<IHeats[]>([]);
    const [saws, setSaws] = useState<ICommonMachine[]>([]);
    const [vacuums, setVacuums] = useState<ICommonMachine[]>([]);
    const [cncs, setCncs] = useState<ICommonMachine[]>([]);
    const [timeList, setTimeList] = useState<ILaserTimes[]>([]);

    const {lang} = useThemeStore();
    const {isLoading, sendRequest} = useRequest();

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

    return (
        <>
            <HeadTag title={headerCategories.machineManagementHeader[lang]}/>

            <Header bgColor={true}>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.machineManagementHeader[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            {isLoading?
                <Card padding={0} borderRadius={0} bgColor={"sub"}>
                    <Flex align={"center"} justify={"center"} style={{height: "80vh"}}>
                        <LoadingLoop/>
                    </Flex>
                </Card>
                :
                <>
                    <Divider/>
                    {lasers && printers && heats && saws && vacuums && cncs &&
                      <>
                        <MachineManageCard
                          machineType={"laser"}
                          machineData={lasers}
                          setMachines={setLasers}
                          timeData={timeList}
                          setTimes={setTimeList}
                        />
                        <Divider/>
                        <MachineManageCard
                          machineType={"printer"}
                          machineData={printers}
                          setMachines={setPrinters}
                        />
                        <Divider/>
                        <MachineManageCard
                          machineType={"heat"}
                          machineData={heats}
                        />
                        <Divider/>
                        <MachineManageCard
                          machineType={"saw"}
                          machineData={saws}
                        />
                        <Divider/>
                        <MachineManageCard
                          machineType={"vacuum"}
                          machineData={vacuums}
                        />
                        <Divider/>
                        <MachineManageCard
                          machineType={"cnc"}
                          machineData={cncs}
                        />
                      </>
                    }
                </>
            }
            <Divider/>
        </>
    );
};

export default MachinesManagementPage;
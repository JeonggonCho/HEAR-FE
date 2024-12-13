import {useNavigate} from "react-router-dom";
import {Header} from "@components/common/Header";
import Flex from "@components/common/Flex";
import Button from "@components/common/Button";
import Icon from "@components/common/Icon";
import {Logo, LogoWrapper, Title} from "@components/home/HomeHeader/style.ts";
import logo from "@assets/logo.svg";
import alarm from "@assets/icons/alarm.svg";
import {useEffect} from "react";


const HomeHeader = () => {
    const navigate = useNavigate();

    useEffect(() => {
        throw new Error("aaa");
    }, []);

    return (
        <Header>
            <Flex align={"center"} justify={"space-between"} style={{width: "100%"}}>
                <Header.Left>
                    <Flex align={"center"} gap={12}>
                        <LogoWrapper>
                            <Logo src={logo} alt={"logo"}/>
                        </LogoWrapper>
                        <Title>HEAR</Title>
                    </Flex>
                </Header.Left>
                <Header.Right>
                    <Button
                        type={"button"}
                        variant={"text"}
                        width={"fit"}
                        color={"third"}
                        size={"sm"}
                        onClick={() => navigate("/alarm")}
                    >
                        <Icon svg={alarm} isHovered={true}/>
                    </Button>
                </Header.Right>
            </Flex>
        </Header>
    );
};

export default HomeHeader;
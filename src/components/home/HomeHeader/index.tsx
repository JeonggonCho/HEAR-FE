import {useNavigate} from "react-router-dom";
import {ReactSVG} from "react-svg";
import {Header} from "@components/common/Header";
import Flex from "@components/common/Flex";
import Button from "@components/common/Button";
import styled from "@emotion/styled";
import logo from "@assets/logo.svg";
import alarm from "@assets/icons/alarm.svg";


const HomeHeader = () => {
    const navigate = useNavigate();

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
                        <ReactSVG src={alarm}/>
                    </Button>
                </Header.Right>
            </Flex>
        </Header>
    );
};

const LogoWrapper = styled.div`
    width: 36px;
    height: 36px;
`;

const Logo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.font.primary};
`;

export default HomeHeader;
import {useNavigate} from "react-router-dom";
import {Header} from "@components/common/Header";
import Button from "@components/common/Button";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import {useAuthStore} from "@store/useAuthStore.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {messageCategories} from "@constants/messageCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import logo from "@assets/images/404_logo.png";


const NotFoundPage = () => {
    const navigate = useNavigate();

    const {isLoggedIn} = useAuthStore();
    const {lang} = useThemeStore();

    return (
        <Container>
            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{"404"}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <div>
                <div>
                    <img src={logo}/>
                </div>
                <p>{messageCategories.emptyPage[lang]}</p>
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"full"}
                    color={"primary"}
                    size={"lg"}
                    onClick={() => navigate("/", {replace: true})}
                >
                    {isLoggedIn ? buttonCategories.goHome[lang] : buttonCategories.signIn[lang]}
                </Button>
            </div>
        </Container>
    );
};

export default NotFoundPage;
import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import CreateFeedbackForm from "@components/board/CreateFeedbackForm";
import ArrowBack from "@components/common/ArrowBack";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const CreateFeedbackPage = () => {
    const {lang} = useThemeStore();

    return (
        <Container>
            <HeadTag title={headerCategories.feedback[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.feedback[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <p>{pageDescriptionCategories.createFeedback[lang]}</p>

            <CreateFeedbackForm/>
        </Container>
    );
};

export default CreateFeedbackPage;
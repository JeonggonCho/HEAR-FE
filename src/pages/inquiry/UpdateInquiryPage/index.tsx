import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import {UpdateInquiryForm} from "@components/inquiry/UpdateInquiryForm";
import {useThemeStore} from "@store/useThemeStore.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const UpdateInquiryPage = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.editInquiry[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.editInquiry[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <UpdateInquiryForm/>
        </>
    );
};

export default UpdateInquiryPage;
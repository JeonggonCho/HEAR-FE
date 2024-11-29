import {Header} from "@components/common/Header";
import HeadTag from "@components/common/HeadTag";
import Grid from "@components/common/Grid";
import ArrowBack from "@components/common/ArrowBack";
import CreateInquiryForm from "@components/inquiry/CreateInquiryForm";
import {useThemeStore} from "@store/useThemeStore.ts";
import {DescriptionWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {pageDescriptionCategories} from "@constants/pageDescriptionCategories.ts";
import {headerCategories} from "@constants/headerCategories.ts";


const CreateInquiryPage = () => {
    const {lang} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.inquiry[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.inquiry[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <DescriptionWrapper>{pageDescriptionCategories.createInquiry[lang]}</DescriptionWrapper>

            <CreateInquiryForm/>
        </>
    );
};

export default CreateInquiryPage;
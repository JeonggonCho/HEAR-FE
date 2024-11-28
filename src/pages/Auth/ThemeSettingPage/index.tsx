import {ReactSVG} from "react-svg";
import HeadTag from "@components/common/HeadTag";
import {Header} from "@components/common/Header";
import ArrowBack from "@components/common/ArrowBack";
import Grid from "@components/common/Grid";
import {useThemeStore} from "@store/useThemeStore.ts";
import {LanguageCheckMark, LanguageWrapper, ThemeCheckMark, ThemeImgWrapper, ThemeWrapper} from "./style.ts";
import {headerCenter} from "@components/common/Header/style.ts";
import {headerCategories} from "@constants/headerCategories.ts";
import {cardCategories} from "@constants/cardCategories.ts";
import {buttonCategories} from "@constants/buttonCategories.ts";
import check from "@assets/icons/check.svg";
import light from "@assets/images/light.png";
import dark from "@assets/images/dark.png";


const ThemeSettingPage = () => {
    const {lang, setLang, isDarkMode, setTheme} = useThemeStore();

    return (
        <>
            <HeadTag title={headerCategories.themeSetting[lang]}/>

            <Header>
                <Grid align={"center"} columns={3} style={{width: "100%"}}>
                    <Header.Left>
                        <ArrowBack/>
                    </Header.Left>
                    <Header.Center>
                        <h2 css={headerCenter}>{headerCategories.themeSetting[lang]}</h2>
                    </Header.Center>
                </Grid>
            </Header>

            <ThemeWrapper>
                <div>
                    <h3>{cardCategories.themeMode[lang]}</h3>
                </div>

                <div>
                    <input
                        type={"radio"}
                        id={"lightMode"}
                        name={"mode"}
                        checked={isDarkMode === false}
                        onChange={() => setTheme(false)}
                    />
                    <label htmlFor={"lightMode"}>
                        {isDarkMode === false &&
                          <ThemeCheckMark>
                            <ReactSVG src={check}/>
                          </ThemeCheckMark>
                        }
                        <ThemeImgWrapper>
                            <img src={light} alt={"light-mode"}/>
                        </ThemeImgWrapper>
                        <span>{buttonCategories.light[lang]}</span>
                    </label>

                    <input
                        type={"radio"}
                        id={"darkMode"}
                        name={"mode"}
                        checked={isDarkMode === true}
                        onChange={() => setTheme(true)}
                    />
                    <label htmlFor={"darkMode"}>
                        {isDarkMode === true &&
                          <ThemeCheckMark>
                            <ReactSVG src={check}/>
                          </ThemeCheckMark>
                        }
                        <ThemeImgWrapper>
                            <img src={dark} alt={"dark-mode"}/>
                        </ThemeImgWrapper>
                        <span>{buttonCategories.dark[lang]}</span>
                    </label>
                </div>
            </ThemeWrapper>

            <LanguageWrapper>
                <div>
                    <h3>{cardCategories.languageSetting[lang]}</h3>
                </div>

                <div>
                    <input
                        type={"radio"}
                        id={"korean"}
                        name={"language"}
                        checked={lang === "ko"}
                        onChange={() => setLang("ko")}
                    />
                    <label htmlFor={"korean"}>
                        <span>한국어</span>
                        {lang === "ko" &&
                          <LanguageCheckMark>
                            <ReactSVG src={check}/>
                          </LanguageCheckMark>
                        }
                    </label>

                    <input
                        type={"radio"}
                        id={"english"}
                        name={"language"}
                        checked={lang === "en"}
                        onChange={() => setLang("en")}
                    />
                    <label htmlFor={"english"}>
                        <span>English</span>
                        {lang === "en" &&
                          <LanguageCheckMark>
                            <ReactSVG src={check}/>
                          </LanguageCheckMark>
                        }
                    </label>

                    <input
                        type={"radio"}
                        id={"chinese"}
                        name={"language"}
                        checked={lang === "ch"}
                        onChange={() => setLang("ch")}
                    />
                    <label htmlFor={"chinese"}>
                        <span>中文</span>
                        {lang === "ch" &&
                          <LanguageCheckMark>
                            <ReactSVG src={check}/>
                          </LanguageCheckMark>
                        }
                    </label>
                </div>
            </LanguageWrapper>
        </>
    );
};

export default ThemeSettingPage;
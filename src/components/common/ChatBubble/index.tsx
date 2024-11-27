import {useMemo} from "react";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {useThemeStore} from "@store/useThemeStore.ts";
import {Container} from "./style.ts";


interface IChatBubbleProps {
    text: string;
    isMine: boolean;
    showProfile: boolean;
    profile: string;
}


const ChatBubble = (
    {
        text,
        isMine,
        showProfile,
        profile
    }: IChatBubbleProps) => {
    const memoizedText = useMemo(() => generateLinksAndLineBreaks(text), [text]);

    const {isDarkMode} = useThemeStore();

    return (
        <Container mine={isMine.toString()} darkmode={isDarkMode.toString()}>
            {showProfile &&
              <div>
                <img src={profile} alt={"chat_profile"}/>
              </div>
            }
            <p dangerouslySetInnerHTML={{__html: memoizedText}}/>
        </Container>
    );
};

export default ChatBubble;
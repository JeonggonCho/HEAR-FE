import {FC, useMemo} from "react";

import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {IChatBubbleProps} from "@/types/componentProps.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const ChatBubble:FC<IChatBubbleProps> = ({text, isMine, showProfile, profile}) => {
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
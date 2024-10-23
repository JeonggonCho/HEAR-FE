import {FC, useMemo} from "react";

import {IChatBubbleProps} from "@/types/componentProps.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";
import {useThemeStore} from "@store/useThemeStore.ts";

import {Container} from "./style.ts";

const ChatBubble:FC<IChatBubbleProps> = ({text, isMine, showProfile, profile}) => {
    const memoizedText = useMemo(() => generateLinksAndLineBreaks(text), [text]);

    const {isDarkMode} = useThemeStore();

    return (
        <Container isMine={isMine} isDarkMode={isDarkMode}>
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
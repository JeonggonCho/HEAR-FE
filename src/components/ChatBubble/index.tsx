import {FC, useMemo} from "react";

import {IChatBubbleProps} from "@/types/componentProps.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";

import {Container} from "./style.ts";

const ChatBubble:FC<IChatBubbleProps> = ({text, isMine, showProfile, profile}) => {
    const memoizedText = useMemo(() => generateLinksAndLineBreaks(text), [text]);

    return (
        <Container isMine={isMine}>
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
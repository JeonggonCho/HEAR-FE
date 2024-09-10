import {FC} from "react";

import {IChatBubbleProps} from "@/types/componentProps.ts";
import generateLinksAndLineBreaks from "@util/generateLinksAndLineBreaks.ts";

import {Container} from "./style.ts";

const ChatBubble:FC<IChatBubbleProps> = ({text, isMine, showProfile, profile}) => {
    return (
        <Container isMine={isMine}>
            {showProfile &&
              <div>
                <img src={profile} alt={"chat_profile"}/>
              </div>
            }
            <p dangerouslySetInnerHTML={{__html: generateLinksAndLineBreaks(text)}}/>
        </Container>
    );
};

export default ChatBubble;
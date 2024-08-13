import {FC} from "react";
import {Container} from "./style.ts";

const ProfileCard:FC = () => {
    return (
        <Container>
            <div>
                <span>아이디</span>
                <span>whwjdrhs</span>
            </div>
            <div>
                <span>학 번</span>
                <span>2015035414</span>
            </div>
            <div>
                <span>학 년</span>
                <span>5학년</span>
            </div>
            <div>
                <span>스튜디오</span>
                <span>이강준 교수님</span>
            </div>
        </Container>
    );
};

export default ProfileCard;
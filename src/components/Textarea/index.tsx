import {ChangeEvent, FC, useState} from "react";
import {Container} from "./style.ts";

const Textarea:FC = () => {
    const [text, setText] = useState("");
    const [countOfText, setCountOfText] = useState(0);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 400) {
            setText(inputText);
            setCountOfText(inputText.length);
        }
    };

    return (
        <Container>
            <textarea value={text} onChange={handleTextChange} maxLength={400}/>
            <p><span>{countOfText}</span> / 400자</p>
        </Container>
    );
};

export default Textarea;
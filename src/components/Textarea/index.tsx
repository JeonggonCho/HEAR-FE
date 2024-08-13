import {ChangeEvent, FC, useState} from "react";
import {Container} from "./style.ts";

const Textarea:FC = () => {
    const [text, setText] = useState("");
    const [countOfText, setCountOfText] = useState(0);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 500) {
            setText(inputText);
            setCountOfText(inputText.length);
        }
    };

    return (
        <Container>
            <textarea value={text} onChange={handleTextChange} maxLength={500}/>
            <p><span>{countOfText}</span> / 500자</p>
        </Container>
    );
};

export default Textarea;
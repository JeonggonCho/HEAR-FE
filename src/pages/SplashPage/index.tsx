import {Container} from "./style.ts";
import {ReactSVG} from "react-svg";
import logo from "../../assets/logo.svg";

const SplashPage = () => {
    return (
        <Container>
            <div>
                <span>한양대 에리카 건축<br/>모형제작실 예약은 여기!</span>
                <div>
                    <ReactSVG src={logo}/>
                    <h1>HEAR</h1>
                </div>
            </div>

            <span>Copyright 2024. 조정곤 all rights reserved.</span>
        </Container>
    );
};

export default SplashPage;
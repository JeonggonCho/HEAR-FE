import {ReactNode} from "react";
import {ReactSVG} from "react-svg";
import Flex from "@components/common/Flex";
import Button from "@components/common/Button";
import {BottomSheetHeaderWrapper} from "@components/common/BottomSheet/style.ts";
import close from "@assets/icons/close.svg";


interface IBottomSheetHeaderProps {
    children: ReactNode;
    onClose: () => void;
}


const BottomSheetHeader = ({children, onClose}: IBottomSheetHeaderProps) => {
    return (
        <BottomSheetHeaderWrapper>
            <Flex align={"center"} justify={"space-between"}>
                <h3>{children}</h3>
                <Button
                    type={"button"}
                    variant={"filled"}
                    width={"fit"}
                    color={"third"}
                    size={"sm"}
                    onClick={onClose}
                    style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                    }}
                >
                    <ReactSVG src={close}/>
                </Button>
            </Flex>
        </BottomSheetHeaderWrapper>
    );
};

export default BottomSheetHeader;
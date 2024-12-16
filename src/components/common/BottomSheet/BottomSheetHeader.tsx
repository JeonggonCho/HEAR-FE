import {ReactNode} from "react";
import Flex from "@components/common/Flex";
import Button from "@components/common/Button";
import Icon from "@components/common/Icon";
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
                        padding: "4px",
                        borderRadius: "50%",
                    }}
                >
                    <Icon svg={close} size={22}/>
                </Button>
            </Flex>
        </BottomSheetHeaderWrapper>
    );
};

export default BottomSheetHeader;
import {To} from "react-router-dom";
import ArrowForward from "@components/common/ArrowForward";
import CardLoading from "@components/skeleton/CardLoading";
import {
    TextLinkWrapper,
    CardLinkCardWrapper,
    CardImgWrapper,
    ButtonLinkCardWrapper,
    ButtonImgWrapper
} from "./style.ts";


type LinkType = "text" | "card" | "button";


interface ILinkProps {
    type: "text" | "card" | "button";
    name: string;
    to: To;
    image?: string;
    color?: "primary" | "second";
    isDisabled?: boolean;
    isLoading?: boolean;
}


const Link = (
    {
        image,
        name,
        to,
        type,
        color = "primary",
        isDisabled = false,
        isLoading = false
    }: ILinkProps) => {
    const commonProps = { disabled: isDisabled, loading: isLoading ? "true" : "false" };

    const renderTextLink = () => (
        <TextLinkWrapper to={to} color={color}>
            {name}
        </TextLinkWrapper>
    );

    const renderCardLink = () => (
        <CardLinkCardWrapper to={to}>
            <div>
                {image && (
                    isLoading ?
                        <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"60px"}/>
                        :
                        <CardImgWrapper>
                            <img src={image} alt={`${name}_img`} />
                        </CardImgWrapper>
                )}
                {isLoading ?
                    <CardLoading bgColor={"dark"} widthValue={"120px"} heightValue={"20px"}/>
                    :
                    <h4>{name}</h4>
                }
            </div>
            <ArrowForward />
        </CardLinkCardWrapper>
    );

    const renderButtonLink = () => (
        <ButtonLinkCardWrapper to={isDisabled ? "" : to} {...commonProps}>
            {image && (
                isLoading?
                    <CardLoading bgColor={"dark"} widthValue={"60px"} heightValue={"60px"}/>
                    :
                    <ButtonImgWrapper {...commonProps}>
                        <img src={image} alt={name} />
                    </ButtonImgWrapper>
            )}

            {isLoading ?
                <CardLoading bgColor={"dark"} widthValue={"64px"} heightValue={"20px"}/>
                :
                <span>{name}</span>
            }
        </ButtonLinkCardWrapper>
    );

    const renderLinkByType = (linkType: LinkType) => {
        switch (linkType) {
            case "text":
                return renderTextLink();
            case "card":
                return renderCardLink();
            case "button":
                return renderButtonLink();
            default:
                return null;
        }
    };

    return renderLinkByType(type);
};

export default Link;

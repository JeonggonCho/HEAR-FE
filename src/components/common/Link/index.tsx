import { FC } from 'react';

import ArrowForward from "@components/common/ArrowForward";

import { ILinkProps } from "@/types/componentProps.ts";
import {
    TextLinkWrapper,
    CardLinkCardWrapper,
    CardImgWrapper,
    ButtonLinkCardWrapper,
    ButtonImgWrapper
} from "./style.ts";

type LinkType = "text" | "card" | "button";

const Link: FC<ILinkProps> = ({
                                  image,
                                  name,
                                  to,
                                  type,
                                  color = "primary",
                                  isDisabled = false,
                                  isLoading = false
                              }) => {
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
                    <CardImgWrapper>
                        <img src={image} alt={`${name}_img`} />
                    </CardImgWrapper>
                )}
                <h4>{name}</h4>
            </div>
            <ArrowForward />
        </CardLinkCardWrapper>
    );

    const renderButtonLink = () => (
        <ButtonLinkCardWrapper to={isDisabled ? "" : to} {...commonProps}>
            {image && (
                <ButtonImgWrapper {...commonProps}>
                    <img src={image} alt={name} />
                </ButtonImgWrapper>
            )}
            <span>{name}</span>
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

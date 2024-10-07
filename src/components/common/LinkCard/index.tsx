import {FC} from 'react';

import ArrowForward from "@components/common/ArrowForward";

import {ILinkCardProps} from "@/types/componentProps.ts";

import {LinearLinkCardWrapper, GridLinkCardWrapper, LinearImgWrapper, GridImgWrapper} from "./style.ts";

const LinkCard:FC<ILinkCardProps> = ({image, name, to, type, isDisabled, isLoading}) => {
    switch (type) {
        case "linear":
            return (
                <LinearLinkCardWrapper to={to}>
                    <div>
                        {image &&
                          <LinearImgWrapper>
                            <img src={image} alt="machine_img"/>
                          </LinearImgWrapper>
                        }
                        <h4>{name}</h4>
                    </div>
                    <ArrowForward/>
                </LinearLinkCardWrapper>
            );
        case "grid":
            return (
                <GridLinkCardWrapper to={isDisabled ? "" : to} disabled={isDisabled as boolean} loading={isLoading ? "true" : "false"}>
                    {image &&
                      <GridImgWrapper disabled={isDisabled as boolean} loading={isLoading ? "true" : "false"}>
                        <img src={image} alt={name}/>
                      </GridImgWrapper>
                    }
                    <span>{name}</span>
                </GridLinkCardWrapper>
            );
        default:
            return null;
    }
};

export default LinkCard;
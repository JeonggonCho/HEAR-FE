import {FC} from "react";
import {ReactSVG} from "react-svg";

import {ProfileImageWrapper} from "./style.ts";

import noProfile from "@assets/icons/no_profile.svg";


const ProfileImage:FC<{image?: string, size: number}> = ({image, size=28}) => {
    return (
        <ProfileImageWrapper size={size}>
            {image ?
                <img src={image} alt={"profile-image"}/>
                :
                <ReactSVG src={noProfile}/>
            }
        </ProfileImageWrapper>
    );
};

export default ProfileImage;
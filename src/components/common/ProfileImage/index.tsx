import {ReactSVG} from "react-svg";
import {ProfileImageWrapper} from "./style.ts";
import noProfile from "@assets/icons/no_profile.svg";


interface IProfileImageProps {
    image?: string;
    size: number;
}


const ProfileImage = ({image, size = 28}: IProfileImageProps) => {
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
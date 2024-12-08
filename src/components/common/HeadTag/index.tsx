import {Helmet} from "react-helmet-async";


interface IHeadTagProps {
    title: string;
}


const HeadTag = ({title}: IHeadTagProps) => {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default HeadTag;
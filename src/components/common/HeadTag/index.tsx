import {Helmet} from "react-helmet-async";


interface IHeadTagProps {
    title: string;
    description?: string;
    keywords?: string;
    url?: string;
}


const HeadTag = ({title, description, keywords, url}: IHeadTagProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />

            {/* Open Graph (SNS 공유 썸네일) */}
            <meta property="og:image" content="https://hyue-hear.com/thumbnail.jpg"/>
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="HEAR" />
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            {url && <meta property="og:url" content={url} />}

            {/* Favicon & PWA 지원 */}
            <link rel="icon" href="/favicon.png" />
            <link rel="apple-touch-icon" href="/favicon.png" />
            <link rel="manifest" href="/manifest.json" />
        </Helmet>
    );
};

export default HeadTag;
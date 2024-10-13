import {FC} from "react";
import {useTheme} from "@emotion/react";

const Divider:FC = () => {
    const theme = useTheme();

    return (
        <div style={{width: "100%", height: 12, backgroundColor: theme.colors.bg.sub}}/>
    );
};

export default Divider;
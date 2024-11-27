import {useTheme} from "@emotion/react";


const Divider = () => {
    const theme = useTheme();

    return (
        <div style={{width: "100%", height: 12, backgroundColor: theme.colors.bg.sub}}/>
    );
};

export default Divider;
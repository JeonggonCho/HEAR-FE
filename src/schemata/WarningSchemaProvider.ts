import {z} from "zod";
import {useThemeStore} from "@store/useThemeStore.ts";
import {messageCategories} from "@constants/messageCategories.ts";

const WarningSchemaProvider = () => {
    const {lang} = useThemeStore();

    const warningSchema = z.object({
        message: z
            .string()
            .min(1, messageCategories.inputWarning[lang]),
    });

    return {warningSchema}
};

export default WarningSchemaProvider;
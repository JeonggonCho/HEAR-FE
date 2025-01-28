import {z} from "zod";
import {EducationType} from "@/types/education.ts";


const QuestionSchemaProvider = (questions: EducationType[]) => {
    const questionSchema = z.object(
        Object.fromEntries(
            questions.map((question) => [
                question._id,
                question.questionType === ("shortAnswer" || "singleChoice")
                    ? z.string().optional()
                    : z.array(z.string()).optional(),
            ])
        )
    );

    return {questionSchema};
};

export default QuestionSchemaProvider;
const DEFAULT_RENDER_ERROR_MESSAGE = "Error rendering prompt template";

export const getRenderPromptErrorMessage = (
    err: unknown,
    fallback: string = DEFAULT_RENDER_ERROR_MESSAGE
): string => {
    if (err && typeof err === "object") {
        const problem = err as { detail?: unknown; title?: unknown; message?: unknown };
        if (typeof problem.detail === "string" && problem.detail.trim()) {
            return problem.detail;
        }
        if (typeof problem.title === "string" && problem.title.trim()) {
            return problem.title;
        }
        if (typeof problem.message === "string" && problem.message.trim()) {
            return problem.message;
        }
    }
    return fallback;
};

export const coerceEnumValue = (val: string, type: string): any => {
    if (val === "") return "";
    switch (type) {
        case "integer":
            return parseInt(val, 10);
        case "number":
            return parseFloat(val);
        case "boolean":
            return val === "true";
        default:
            return val;
    }
};

import { describe, expect, it } from "vitest";
import { coerceEnumValue, getRenderPromptErrorMessage } from "./PromptTemplateTestPanel.utils";

describe("getRenderPromptErrorMessage", () => {
    it("prefers ProblemDetails detail over title and message", () => {
        expect(getRenderPromptErrorMessage({
            detail: "Variable 'name' is required.",
            title: "Bad Request",
            message: "Request failed with status code 400"
        })).toBe("Variable 'name' is required.");
    });

    it("falls back to ProblemDetails title when detail is missing", () => {
        expect(getRenderPromptErrorMessage({
            title: "Not Found",
            message: "Request failed with status code 404"
        })).toBe("Not Found");
    });

    it("falls back to Error.message for non-ProblemDetails failures", () => {
        expect(getRenderPromptErrorMessage(new Error("Network Error"))).toBe("Network Error");
    });

    it("uses the default fallback for unknown error shapes", () => {
        expect(getRenderPromptErrorMessage({})).toBe("Error rendering prompt template");
    });

    it("uses a custom fallback when provided", () => {
        expect(getRenderPromptErrorMessage(null, "Custom fallback")).toBe("Custom fallback");
    });
});

describe("coerceEnumValue", () => {
    it("parses an integer enum selection to a number", () => {
        expect(coerceEnumValue("443", "integer")).toBe(443);
    });

    it("parses a number enum selection to a float", () => {
        expect(coerceEnumValue("3.14", "number")).toBe(3.14);
    });

    it("parses a boolean enum selection to true", () => {
        expect(coerceEnumValue("true", "boolean")).toBe(true);
    });

    it("parses a boolean enum selection to false", () => {
        expect(coerceEnumValue("false", "boolean")).toBe(false);
    });

    it("leaves a string enum selection untouched", () => {
        expect(coerceEnumValue("prod", "string")).toBe("prod");
    });

    it("keeps the placeholder selection as an empty string for an integer variable", () => {
        expect(coerceEnumValue("", "integer")).toBe("");
    });

    it("keeps the placeholder selection as an empty string for a number variable", () => {
        expect(coerceEnumValue("", "number")).toBe("");
    });

    it("keeps the placeholder selection as an empty string for a boolean variable", () => {
        expect(coerceEnumValue("", "boolean")).toBe("");
    });
});

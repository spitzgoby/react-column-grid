import { generateScreenQueries } from "../mediaQueries";

describe("cssGenerators", () => {
    it("should generate screen queries with classes defined inside", () => {
        const mockBreakpointDefinitions = [
            {
                size: "xs",
                maxWidth: "499px",
            },
            {
                size: "sm",
                maxWidth: "999px",
                minWidth: "500px",
            },
            {
                size: "md",
                minWidth: "1000px",
            },
        ];
        const mockClassDefinitions = [
            ".test-xs { display: grid; }",
            ".test-sm { display: block; }",
            ".test-md { display: inline-block; }",
        ];

        expect(
            generateScreenQueries(
                mockBreakpointDefinitions,
                mockClassDefinitions
            )
        ).toEqual([
            "@media screen and (max-width: 499px){.test-xs { display: grid; }}",
            "@media screen and (min-width: 500px) and (max-width: 999px){.test-sm { display: block; }}",
            "@media screen and (min-width: 1000px){.test-md { display: inline-block; }}",
        ]);
    });
});

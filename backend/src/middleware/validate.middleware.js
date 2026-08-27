import {
    validationResult,
    matchedData,
} from "express-validator";

const validate = (
    schemaOrReq,
    source = "body",
    maybeNext
) => {
    /*
    |--------------------------------------------------------------------------
    | Express-validator usage
    |--------------------------------------------------------------------------
    */

    const looksLikeExpressRequest =
        schemaOrReq &&
        typeof schemaOrReq === "object" &&
        "method" in schemaOrReq &&
        "headers" in schemaOrReq;

    if (looksLikeExpressRequest) {
        const req = schemaOrReq;
        const res = source;
        const next = maybeNext;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: errors.array().map((err) => ({
                    field: err.path,
                    message: err.msg,
                })),
            });
        }

        req.validatedData = matchedData(req, {
            locations: ["body"],
            includeOptionals: true,
        });

        return next();
    }

    /*
    |--------------------------------------------------------------------------
    | Joi schema usage
    |--------------------------------------------------------------------------
    */

    if (
        schemaOrReq &&
        typeof schemaOrReq.validate === "function"
    ) {
        const schema = schemaOrReq;

        return (req, res, next) => {
            const { error, value } = schema.validate(
                req[source],
                {
                    abortEarly: false,
                }
            );

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed.",
                    errors: error.details.map((detail) => ({
                        field: detail.path.join("."),
                        message: detail.message,
                    })),
                });
            }

            req.validatedData = value;

            return next();
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Zod schema usage
    |--------------------------------------------------------------------------
    */

    const schema = schemaOrReq;

    return (req, res, next) => {
        if (
            !schema ||
            typeof schema.safeParse !== "function"
        ) {
            return res.status(500).json({
                success: false,
                message: "Invalid validation schema.",
                errors: [],
            });
        }

        const result = schema.safeParse(req[source]);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        req.validatedData = result.data;

        return next();
    };
};

export default validate;

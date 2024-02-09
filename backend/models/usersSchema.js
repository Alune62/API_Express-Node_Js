export const createUserValidationSchema = {
    name: {
        isLength: {
            options: {
                min: 5,
                max: 32
            },
            errorMessage: "Name must be at least 5 characters with a maximum of 32 characters",
        },
        notEmpty: {
            errorMessage: "Name cannot be empty",
        },
        isString: {
            errorMessage: "Name must be a string",
        },
    },
    displayName: {
        notEmpty: {
            errorMessage: "Display name cannot be empty",
        },
    }
}
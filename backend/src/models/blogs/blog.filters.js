/**
 * Translate Blog list API filters into a Prisma BlogWhereInput.
 *
 * API-only fields such as `search` must never be passed through as Prisma
 * fields. Blank query parameters are also omitted so they do not become
 * accidental filters.
 */
export const buildBlogWhere = ({
    search = "",
    status,
    categoryId,
    authorId,
    tagId,
    isFeatured,
} = {}) => {
    const normalizedSearch =
        typeof search === "string"
            ? search.trim()
            : "";

    return {
        ...(normalizedSearch && {
            OR: [
                {
                    title: {
                        contains: normalizedSearch,
                        mode: "insensitive",
                    },
                },
                {
                    excerpt: {
                        contains: normalizedSearch,
                        mode: "insensitive",
                    },
                },
            ],
        }),

        ...(status && { status }),

        ...(categoryId && { categoryId }),

        ...(authorId && { authorId }),

        ...(typeof isFeatured === "boolean" && {
            isFeatured,
        }),

        ...(tagId && {
            tags: {
                some: {
                    id: tagId,
                },
            },
        }),
    };
};

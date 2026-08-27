import prisma from "../../config/prisma.js";

/**
 * Create a new gallery item.
 */
export const createGallery = async (data) => {
    return prisma.gallery.create({
        data,

        include: {
            uploadedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
};

/**
 * Find a gallery item by ID.
 */
export const findGalleryById = async (id) => {
    return prisma.gallery.findUnique({
        where: {
            id,
        },

        include: {
            uploadedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
};

/**
 * Find gallery items with search and pagination.
 */
export const findGallery = async ({
    search,
    page,
    limit,
}) => {
    const skip = (page - 1) * limit;

    const where = search
        ? {
              OR: [
                  {
                      title: {
                          contains: search,
                          mode: "insensitive",
                      },
                  },
                  {
                      altText: {
                          contains: search,
                          mode: "insensitive",
                      },
                  },
              ],
          }
        : {};

    const [items, total] =
        await prisma.$transaction([
            prisma.gallery.findMany({
                where,
                skip,
                take: limit,

                orderBy: {
                    createdAt: "desc",
                },

                include: {
                    uploadedBy: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            }),

            prisma.gallery.count({
                where,
            }),
        ]);

    return {
        items,
        total,
    };
};

/**
 * Update a gallery item.
 */
export const updateGallery = async (
    id,
    data
) => {
    return prisma.gallery.update({
        where: {
            id,
        },

        data,

        include: {
            uploadedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
        },
    });
};

/**
 * Delete a gallery item.
 */
export const deleteGallery = async (id) => {
    return prisma.gallery.delete({
        where: {
            id,
        },
    });
};
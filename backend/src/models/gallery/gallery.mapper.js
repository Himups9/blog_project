export const mapGallery = (gallery) => {
    if (!gallery) {
        return null;
    }

    return {
        id: gallery.id,

        title: gallery.title,

        imageUrl: gallery.imageUrl,

        originalUrl: gallery.originalUrl ?? null,

        thumbnailUrl:
            gallery.thumbnailUrl ?? null,

        altText: gallery.altText,

        fileSize: gallery.fileSize,

        mimeType: gallery.mimeType,

        uploadedBy: gallery.uploadedBy
            ? {
                  id: gallery.uploadedBy.id,

                  firstName:
                      gallery.uploadedBy.firstName ??
                      null,

                  lastName:
                      gallery.uploadedBy.lastName ??
                      null,

                  name: [
                      gallery.uploadedBy.firstName,
                      gallery.uploadedBy.lastName,
                  ]
                      .filter(Boolean)
                      .join(" ") || null,

                  email:
                      gallery.uploadedBy.email ??
                      null,
              }
            : null,

        createdAt: gallery.createdAt,

        updatedAt: gallery.updatedAt,
    };
};

/**
 * Map multiple Gallery records.
 */
export const mapGalleryList = (
    galleryItems = []
) => {
    return galleryItems.map(mapGallery);
};
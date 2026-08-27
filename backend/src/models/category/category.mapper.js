class CategoryMapper {

    /**
     * Map a single category
     */
    toResponse(category) {

        if (!category) {
            return null;
        }

        return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            image: category.image,
            featuredImage: category.featuredImage,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };

    }

    /**
     * Map category list
     */
    toResponseList(categories = []) {

        return categories.map(category =>
            this.toResponse(category)
        );

    }

    /**
     * Category with blog count
     */
    toSummary(category) {

        if (!category) {
            return null;
        }

        return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            image: category.image,
            featuredImage: category.featuredImage,
            totalBlogs: category._count?.blogs ?? 0,
        };

    }

    /**
     * Statistics response
     */
    toStatistics(statistics) {

        return {
            totalCategories: statistics.totalCategories,
            categoriesWithBlogs: statistics.categoriesWithBlogs,
            emptyCategories: statistics.emptyCategories,
        };

    }

}

export default new CategoryMapper();

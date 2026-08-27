class TagMapper {

    /**
     * Single Tag Response
     */
    toResponse(tag) {

        if (!tag) {
            return null;
        }

        return {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            description: tag.description,
            createdAt: tag.createdAt,
            updatedAt: tag.updatedAt,
        };

    }

    /**
     * Multiple Tags Response
     */
    toResponseList(tags = []) {

        return tags.map(tag => this.toResponse(tag));

    }

    /**
     * Tag Summary
     */
    toSummary(tag) {

        if (!tag) {
            return null;
        }

        return {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
        };

    }

    /**
     * Multiple Tag Summaries
     */
    toSummaryList(tags = []) {

        return tags.map(tag => this.toSummary(tag));

    }

    /**
     * Tag Statistics
     */
    toStatistics(statistics) {

        return {
            totalTags: statistics.totalTags,
            tagsWithBlogs: statistics.tagsWithBlogs,
            emptyTags: statistics.emptyTags,
        };

    }

}

export default new TagMapper();
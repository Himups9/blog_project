class TagResponse {
    /**
     * Single Tag
     */
    static single(tag) {
        return {
            success: true,
            data: tag,
        };
    }

    /**
     * Tag List
     */
    static list(tags, pagination) {
        return {
            success: true,
            data: tags,
            pagination,
        };
    }

    /**
     * Statistics
     */
    static statistics(statistics) {
        return {
            success: true,
            data: statistics,
        };
    }

    /**
     * Success Message
     */
    static message(message) {
        return {
            success: true,
            message,
        };
    }

    /**
     * Created
     */
    static created(tag, message = "Tag created successfully.") {
        return {
            success: true,
            message,
            data: tag,
        };
    }

    /**
     * Updated
     */
    static updated(tag, message = "Tag updated successfully.") {
        return {
            success: true,
            message,
            data: tag,
        };
    }

    /**
     * Deleted
     */
    static deleted(message = "Tag deleted successfully.") {
        return {
            success: true,
            message,
        };
    }
}

export default TagResponse;
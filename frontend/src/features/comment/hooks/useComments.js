import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import commentService from "../services/commentService";

const useComments = (initialFilters = {}) => {

    /*
    |--------------------------------------------------------------------------
    | States
    |--------------------------------------------------------------------------
    */

    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({

        search: "",

        status: "",

        ordering: "-created_at",

        page: 1,

        ...initialFilters,

    });

    const [pagination, setPagination] = useState({

        count: 0,

        next: null,

        previous: null,

    });

    /*
    |--------------------------------------------------------------------------
    | Load Comments
    |--------------------------------------------------------------------------
    */

    const loadComments = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await commentService.getAdminComments(filters);

            setComments(
                response.data.results || []
            );

            setPagination({

                count: response.data.count,

                next: response.data.next,

                previous: response.data.previous,

            });

        } catch (err) {

            console.error(err);

            setError(err);

            toast.error(
                "Unable to load comments."
            );

        } finally {

            setLoading(false);

        }

    }, [filters]);

    /*
    |--------------------------------------------------------------------------
    | Auto Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadComments();

    }, [loadComments]);

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refreshComments = () => {

        loadComments();

    };

    /*
    |--------------------------------------------------------------------------
    | Continue in Message 2
    |--------------------------------------------------------------------------
    */
       /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const setSearch = (value) => {

        setFilters((prev) => ({

            ...prev,

            search: value,

            page: 1,

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Status Filter
    |--------------------------------------------------------------------------
    */

    const setStatus = (status) => {

        setFilters((prev) => ({

            ...prev,

            status,

            page: 1,

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Ordering
    |--------------------------------------------------------------------------
    */

    const setOrdering = (ordering) => {

        setFilters((prev) => ({

            ...prev,

            ordering,

            page: 1,

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const changePage = (page) => {

        setFilters((prev) => ({

            ...prev,

            page,

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Approve Comment
    |--------------------------------------------------------------------------
    */

    const approveComment = async (id) => {

        try {

            await commentService.approveComment(id);

            toast.success(
                "Comment approved successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to approve comment."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Reject Comment
    |--------------------------------------------------------------------------
    */

    const rejectComment = async (id) => {

        try {

            await commentService.rejectComment(id);

            toast.success(
                "Comment rejected successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to reject comment."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Move To Pending
    |--------------------------------------------------------------------------
    */

    const moveToPending = async (id) => {

        try {

            await commentService.moveToPending(id);

            toast.success(
                "Comment moved to pending."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to move comment."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Continue in Message 3
    |--------------------------------------------------------------------------
    */
       /*
    |--------------------------------------------------------------------------
    | Mark As Spam
    |--------------------------------------------------------------------------
    */

    const markSpam = async (id) => {

        try {

            await commentService.markSpam(id);

            toast.success(
                "Comment marked as spam."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to mark comment as spam."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Restore Comment
    |--------------------------------------------------------------------------
    */

    const restoreComment = async (id) => {

        try {

            await commentService.restoreComment(id);

            toast.success(
                "Comment restored successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to restore comment."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Delete Comment
    |--------------------------------------------------------------------------
    */

    const deleteComment = async (id) => {

        try {

            await commentService.deleteComment(id);

            toast.success(
                "Comment deleted successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to delete comment."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Bulk Actions
    |--------------------------------------------------------------------------
    */

    const bulkApprove = async (commentIds) => {

        try {

            await commentService.bulkApprove(commentIds);

            toast.success(
                "Comments approved successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to approve selected comments."
            );

        }

    };

    const bulkReject = async (commentIds) => {

        try {

            await commentService.bulkReject(commentIds);

            toast.success(
                "Comments rejected successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to reject selected comments."
            );

        }

    };

    const bulkSpam = async (commentIds) => {

        try {

            await commentService.bulkSpam(commentIds);

            toast.success(
                "Comments marked as spam."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to mark selected comments as spam."
            );

        }

    };

    const bulkRestore = async (commentIds) => {

        try {

            await commentService.bulkRestore(commentIds);

            toast.success(
                "Comments restored successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to restore selected comments."
            );

        }

    };

    const bulkDelete = async (commentIds) => {

        try {

            await commentService.bulkDelete(commentIds);

            toast.success(
                "Comments deleted successfully."
            );

            refreshComments();

        } catch (err) {

            toast.error(
                "Unable to delete selected comments."
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {

        comments,

        loading,

        error,

        filters,

        pagination,

        refreshComments,

        setSearch,

        setStatus,

        setOrdering,

        changePage,

        approveComment,

        rejectComment,

        moveToPending,

        markSpam,

        restoreComment,

        deleteComment,

        bulkApprove,

        bulkReject,

        bulkSpam,

        bulkRestore,

        bulkDelete,

    };

};

export default useComments;
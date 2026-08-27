import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import SearchBar from "../components/common/SearchBar";
import Pagination from "../components/common/Pagination";
import UserTable from "../components/users/UserTable";

import EditUserModal from "../components/modals/EditUserModal";
import UserForm from "../components/users/UserForm";
import LoadingSpinner from "../components/common/LoadingSpinner";

import userService from "../../admin/services/userService";

import ViewUserModal from "../components/modals/ViewUserModal";
import UserStatusModal from "../components/modals/UserStatusModal";
import DeleteUserModal from "../components/modals/DeleteUserModal";


export default function Users() {

    // ============================================================
    // State
    // ============================================================

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [selectedUser, setSelectedUser] = useState(null);

    const [isEditModalOpen, setIsEditModalOpen] =
        useState(false);

    const [isViewModalOpen, setIsViewModalOpen] =
        useState(false);

    const [statusModalOpen, setStatusModalOpen] =
        useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const pageSize = 10;


    // ============================================================
    // Load Users
    // ============================================================

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await userService.getUsers({
                    page,
                    limit: pageSize,
                    search,
                    ordering: "-createdAt",
                });

            const data = response?.data;

            setUsers(
                data?.users || []
            );

            setTotalPages(
                data?.pagination?.totalPages || 1
            );

        } catch (error) {

            console.error(
                "Failed to load users:",
                error
            );

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }
    };


    // ============================================================
    // Load Users On Page/Search Change
    // ============================================================

    useEffect(() => {

        loadUsers();

    }, [page, search]);


    // ============================================================
    // View User
    // ============================================================

    const handleView = async (user) => {

        try {

            const response =
                await userService.getUserById(
                    user.id
                );

            setSelectedUser(
                response?.data || response
            );

            setIsViewModalOpen(true);

        } catch (error) {

            console.error(
                "Failed to load user:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to load user."
            );
        }
    };


    // ============================================================
    // Edit User
    // ============================================================

    const handleEdit = async (user) => {

        try {

            const response =
                await userService.getUserById(
                    user.id
                );

            setSelectedUser(
                response?.data || response
            );

            setIsEditModalOpen(true);

        } catch (error) {

            console.error(
                "Failed to load user:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to load user."
            );
        }
    };


    // ============================================================
    // Update User
    // ============================================================

    const handleUpdateUser = async (data) => {

        if (!selectedUser?.id) {

            toast.error(
                "User ID is missing."
            );

            return;
        }

        try {

            setSaving(true);

            /*
             * IMPORTANT:
             *
             * Do NOT create FormData here.
             *
             * userService.updateUser()
             * handles FormData and file upload.
             */

            await userService.updateUser(
                selectedUser.id,
                data
            );

            toast.success(
                "User updated successfully."
            );

            closeEditModal();

            await loadUsers();

        } catch (error) {

            console.error(
                "Failed to update user:",
                error
            );

            console.error(
                "Server response:",
                error?.response?.data
            );

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to update user."
            );

        } finally {

            setSaving(false);

        }
    };


    // ============================================================
    // Delete User
    // ============================================================

    const handleDelete = (user) => {

        setSelectedUser(user);
        setDeleteModalOpen(true);

    };


    // ============================================================
    // Confirm Delete
    // ============================================================

    const handleDeleteConfirm = async () => {

        if (!selectedUser?.id) {
            return;
        }

        try {

            setDeleteLoading(true);

            await userService.deleteUser(
                selectedUser.id
            );

            toast.success(
                "User deleted successfully."
            );

            setDeleteModalOpen(false);
            setSelectedUser(null);

            await loadUsers();

        } catch (error) {

            console.error(
                "Failed to delete user:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Unable to delete user."
            );

        } finally {

            setDeleteLoading(false);

        }
    };


    // ============================================================
    // Toggle User Status
    // ============================================================

    const handleToggleStatus = (user) => {

        setSelectedUser(user);
        setStatusModalOpen(true);

    };


    // ============================================================
    // Confirm Status Change
    // ============================================================

    const handleStatusConfirm = async () => {

        if (!selectedUser?.id) {
            return;
        }

        try {

            setStatusLoading(true);

            if (selectedUser.isActive) {

                await userService.deactivateUser(
                    selectedUser.id
                );

                toast.success(
                    "User deactivated successfully."
                );

            } else {

                await userService.activateUser(
                    selectedUser.id
                );

                toast.success(
                    "User activated successfully."
                );
            }

            setStatusModalOpen(false);
            setSelectedUser(null);

            await loadUsers();

        } catch (error) {

            console.error(
                "Failed to update user status:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update user status."
            );

        } finally {

            setStatusLoading(false);

        }
    };


    // ============================================================
    // Close Edit Modal
    // ============================================================

    const closeEditModal = () => {

        setIsEditModalOpen(false);
        setSelectedUser(null);

    };


    // ============================================================
    // Close View Modal
    // ============================================================

    const closeViewModal = () => {

        setIsViewModalOpen(false);
        setSelectedUser(null);

    };


    // ============================================================
    // Render
    // ============================================================

    return (
        <div>

            {/* ==================================================
                Header
            ================================================== */}

            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Users
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Manage all registered users.
                    </p>

                </div>

                <SearchBar
                    value={search}
                    onChange={(value) => {

                        setSearch(value);
                        setPage(1);

                    }}
                />

            </div>


            {/* ==================================================
                Error
            ================================================== */}

            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    {error}
                </div>
            )}


            {/* ==================================================
                Users Table
            ================================================== */}

            {loading ? (

                <LoadingSpinner />

            ) : (

                <>
                    <UserTable
                        users={users}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleStatus={
                            handleToggleStatus
                        }
                    />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>

            )}


            {/* ==================================================
                View User Modal
            ================================================== */}

            <ViewUserModal
                isOpen={isViewModalOpen}
                onClose={closeViewModal}
                user={selectedUser}
            />


            {/* ==================================================
                Edit User Modal
            ================================================== */}

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
                user={selectedUser}
                loading={saving}
            >

                {selectedUser && (
                    <UserForm
                        user={selectedUser}
                        onSubmit={handleUpdateUser}
                    />
                )}

            </EditUserModal>


            {/* ==================================================
                Delete User Modal
            ================================================== */}

            <DeleteUserModal
                open={deleteModalOpen}
                loading={deleteLoading}
                user={selectedUser}
                onClose={() => {

                    setDeleteModalOpen(false);
                    setSelectedUser(null);

                }}
                onConfirm={handleDeleteConfirm}
            />


            {/* ==================================================
                Status Modal
            ================================================== */}

            <UserStatusModal
                open={statusModalOpen}
                loading={statusLoading}
                user={selectedUser}
                onClose={() => {

                    setStatusModalOpen(false);
                    setSelectedUser(null);

                }}
                onConfirm={handleStatusConfirm}
            />

        </div>
    );
}
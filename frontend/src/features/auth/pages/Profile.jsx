// frontend/src/components/auth/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthContext';
import { profileSchema, changePasswordSchema } from '../../utils/validators';
import './Profile.css';
import Button from '../common/Button';
import UserForm from "../forms/UserForm";
import SubmitButton from '../forms/SubmitButton';
import PageTransition from '../common/PageTransition';


const Profile = () => {
    const { user, updateUser, changePassword } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Profile form
    const profileForm = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            gender: "",
            position: "",
            facebook_username: "",
            bio: "",
        },
    });

    // Password form
    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPassword,
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
    });

    // Update form when user changes
    useEffect(() => {
        if (!user) return;

        profileForm.reset({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            phone: user.phone || "",
            gender: user.gender || "",
            position: user.position || "",
            facebook_username: user.facebook_username || "",
            bio: user.bio || "",
        });
    }, [user]);

    const onProfileUpdate = async (data) => {
        setIsSubmitting(true);
        console.log(data.date_of_birth);
        try {
            const result = await updateUser(data);
            if (result.success) {
                // Profile updated successfully
            }
        } catch (error) {
            console.error('Profile update error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onPasswordChange = async (data) => {
        setIsSubmitting(true);
        try {
            const result = await changePassword({
                old_password: data.old_password,
                new_password: data.new_password,
                new_password2: data.new_password2,
            });
            
            if (result.success) {
                resetPassword();
            }
        } catch (error) {
            console.error('Password change error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <PageTransition>
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-gray-600">Loading profile...</p>
                </div>
            </div></PageTransition>
        );
    }

    return (
        <PageTransition>
        <div className="min-h-screen bg-linear-to-br from-[#667eea] to-[#764ba2] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-slate-200 rounded-2xl p-10">

                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {user.full_name}
                            </h1>
                            <p className="text-gray-600">{user.email}</p>
                            {user.position && (
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                                    {user.position}
                                </span>
                            )}
                            {user.gender && (
                                <span className="inline-block mt-2 ml-2 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                                    {user.gender}
                                </span>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-4 md:gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[#667eea]">0</div>
                                <div className="text-xs text-gray-500">Posts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[#667eea]">0</div>
                                <div className="text-xs text-gray-500">Followers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-[#667eea]">0</div>
                                <div className="text-xs text-gray-500">Following</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*tabs*/}

            <div className="bg-white/80 rounded-2xl shadow-xl overflow-hidden p-1">
                
                    <nav className="flex flex-wrap -mb-px" aria-label="Tabs">
                        <button
                            className={`py-4 px-6 text-sm font-semibold tab text-center border-b-2 transition-colors ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Edit Profile
                        </button>
                        <button
                            className={`tab ${activeTab === 'password' ? 'active' : ''}`}
                            onClick={() => setActiveTab('password')}
                        >
                            Change Password
                        </button>
                    </nav>
                
            </div>

            <div className="">
                {activeTab === 'profile' && (
                    <form onSubmit={profileForm.handleSubmit(onProfileUpdate)} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-0 sm:px-2 md:px-4">

                        <UserForm
                            register={profileForm.register}
                            errors={profileForm.formState.errors}
                            watch={profileForm.watch}
                            isSubmitting={isSubmitting}
                            showEmail={false}
                            showPassword={false}
                            currentImage={user?.profile_picture}
                        />

                        <SubmitButton
                            loading={isSubmitting}
                            text="Update Profile"
                            loadingText="Updating Profile..."
                            className="md:col-span-2"
                        />
                        

                    </form>

                    
                )}

                {activeTab === 'password' && (
                    <form onSubmit={handlePasswordSubmit(onPasswordChange)} className="gap-5 p-10 font-bold">
                        <div className=" gap-5 flex flex-col">
                            <label>Current Password</label>
                        
            
                            <input
                                type="password"
                                {...registerPassword('old_password')}
                                className={`form-input ${passwordErrors.old_password ? 'error' : ''}`}
                                disabled={isSubmitting}
                            />
                            {passwordErrors.old_password && (
                                <span className="error-message">{passwordErrors.old_password.message}</span>
                            )}
                        </div>

                        <div className="gap-1 mt-10 flex flex-col">
                            <label>New Password</label>
                            <input
                                type="password"
                                {...registerPassword('new_password')}
                                className={`form-input ${passwordErrors.new_password ? 'error' : ''}`}
                                disabled={isSubmitting}
                            />
                            {passwordErrors.new_password && (
                                <span className="error-message">{passwordErrors.new_password.message}</span>
                            )}
                        </div>

                        <div className="gap-1 mt-10 flex flex-col">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                {...registerPassword('new_password2')}
                                className={`form-input ${passwordErrors.new_password2 ? 'error' : ''}`}
                                disabled={isSubmitting}
                            />
                            {passwordErrors.new_password2 && (
                                <span className="error-message">{passwordErrors.new_password2.message}</span>
                            )}
                        </div>

                        <SubmitButton
                            loading={isSubmitting}
                            className="mt-10"
                            text="Change Password"
                            loadingText="Changing Password..."
                        />
                    </form>
                )}
            </div>
            </div>
        </div></PageTransition>
    );
};

export default Profile;
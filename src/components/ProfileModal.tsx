// client\src\pages\ProfileModal.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Edit2, Save, Lock, EyeOff, Eye, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { changePassword, getProfile, updateProfile } from "@/services/api/profile";

type ProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState<any>({
        name: "",
        email: "",
        profilePicture: "",
        joinDate: "",
        plan: "Free",
    });
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // ✅ Load profile data on mount
    useEffect(() => {
        if (isOpen) {
            const loadProfile = async () => {
                try {
                    const res = await getProfile();
                    setProfileData({
                        name: res.user.name,
                        email: res.user.email,
                        profilePicture: res.user.profilePicture,
                        joinDate: new Date(res.user.createdAt).toLocaleDateString(),
                        plan: "Premium",
                    });
                    console.log(res);
                } catch (err: any) {
                    console.error("Error fetching profile:", err);
                    toast.error("Failed to load profile.");
                }
            };
            loadProfile();
        }
    }, [isOpen]);

    // ✅ Save profile changes
    const handleSave = async () => {
        try {
            setLoading(true);
            await updateProfile({
                name: profileData.name,
                email: profileData.email,
            });
            toast.success("Profile info updated!");
            setIsEditing(false);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Change password
    const handlePasswordUpdate = async () => {
        if (!currentPassword || !newPassword)
            return toast.error("Please enter both current and new passwords.");

        try {
            setLoading(true);
            await changePassword({
                currentPassword,
                newPassword,
            });
            toast.success("Password updated!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to update password.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-4xl mx-4 max-h-[90vh] rounded-xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="border-b shadow-sm px-6 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Profile Setting</h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="ml-2 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <Card className="shadow-card text-center">
                                <CardContent className="pt-6">
                                    <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-background shadow-lg">
                                        <AvatarImage src={profileData.profilePicture || "/placeholder-user.jpg"} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-xl font-semibold">
                                            {profileData.name
                                                ? profileData.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                : "?"}
                                        </AvatarFallback>
                                    </Avatar>

                                    <h3 className="text-md font-semibold mb-2 text-center">{profileData.name}</h3>
                                    <Badge variant="secondary" className="mb-4 mx-auto flex w-fit bg-primary/10 text-primary border-primary/20">
                                        {profileData.plan} Plan
                                    </Badge>

                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                                            <Mail className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate">{profileData.email}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <Calendar className="w-3 h-3 flex-shrink-0" />
                                            <span className="text-xs">Joined {profileData.joinDate}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Profile Info */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Personal Information */}
                            <Card className="shadow-card">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Edit2 className="w-5 h-5 text-primary" />
                                        Personal Information
                                    </CardTitle>

                                    <Button
                                        variant={isEditing ? "default" : "outline"}
                                        size="sm"
                                        disabled={loading}
                                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                                    >
                                        {isEditing ? (
                                            <>
                                                <Save className="w-4 h-4 mr-2" /> Save Changes
                                            </>
                                        ) : (
                                            <>
                                                <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                                            </>
                                        )}
                                    </Button>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profileData.name}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, name: e.target.value })
                                            }
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) =>
                                                setProfileData({ ...profileData, email: e.target.value })
                                            }
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Password Change */}
                            {/* <Card className="shadow-card">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-primary" /> Change Password
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="currentPassword"
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="Enter current password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showNewPassword ? (
                                                    <EyeOff className="w-4 h-4" />
                                                ) : (
                                                    <Eye className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <Button onClick={handlePasswordUpdate} disabled={loading}>
                                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : ""}
                                        Update Password
                                    </Button>
                                </CardContent>
                            </Card> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
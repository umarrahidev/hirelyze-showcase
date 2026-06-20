// // client/src/components/layouts/App/Topbar.tsx
// import { Search, Bell, Settings, User, Sun, Moon, Monitor, LogOut, Zap, FileText } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useTheme } from "@/contexts/ThemeContext";
// import { useAuth } from "@/contexts/AuthContext";
// import { useState } from "react";
// import ProfileModal from "../../ProfileModal";

// const Topbar = () => {
//   const { theme, setTheme } = useTheme();
//   const { logout, quota } = useAuth();
//   const navigate = useNavigate();
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const themeOptions = [
//     { value: "light", label: "Light", icon: Sun },
//     { value: "dark", label: "Dark", icon: Moon },
//     { value: "system", label: "System", icon: Monitor },
//   ];

//   const currentThemeOption = themeOptions.find(
//     (option) => option.value === theme
//   );

//   const getQuotaPercentage = () => {
//     if (!quota) return 0;
//     return Math.round((quota.used / quota.limit) * 100);
//   };

//   return (
//     <div className="h-16 px-8 flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
//       {/* Sidebar trigger */}
//       {/* <SidebarTrigger className="md:hidden mr-4" /> */}

//        {/* Logo Header */}
//        <Link to="/" className="flex items-center gap-2">
//          <span className="text-lg font-bold">Hirelyze</span>
//        </Link>

//       {/* Spacer to push content to the right */}
//       {/* <div className="flex-1" /> */}

//       {/* Right section */}
//       <div className="flex items-center gap-2">

//         {/* View All Reports */}
//         <Button variant="outline"onClick={() => navigate('/reports')} className="text-xs">
//          <FileText className="w-2 h-2" />
//          View All Reports
//         </Button>

//         {/* Quota Display */}
//         {quota && (
//           <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted dark:bg-gray-800 rounded-lg border dark:border-gray-700">
//             <Zap className="w-4 h-4 text-emerald-500" />
//             <div className="text-xs">
//               <span className="font-medium text-foreground dark:text-white">{quota.used}/{quota.limit}</span>
//             </div>
//             <div className="w-12 bg-muted dark:bg-gray-700 rounded-full h-1.5">
//               <div
//                 className="bg-gradient-to-r from-emerald-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
//                 style={{ width: `${getQuotaPercentage()}%` }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Theme Toggle */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="rounded-full dark:text-gray-300">
//               {currentThemeOption && (
//                 <currentThemeOption.icon className="w-5 h-5" />
//               )}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
//             {themeOptions.map((option) => (
//               <DropdownMenuItem
//                 key={option.value}
//                 onClick={() => setTheme(option.value as any)}
//                 className={`${theme === option.value ? "bg-accent" : ""} dark:text-gray-200 dark:hover:bg-gray-700`}
//               >
//                 <option.icon className="w-4 h-4 mr-2" />
//                 {option.label}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Profile dropdown */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="rounded-full p-1 dark:text-gray-300">
//               <Avatar className="w-8 h-8">
//                 <AvatarImage src="/placeholder-user.jpg" />
//                 <AvatarFallback className="bg-primary text-primary-foreground">
//                   <User className="w-4 h-4" />
//                 </AvatarFallback>
//               </Avatar>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             align="end"
//             className="w-32 bg-popover dark:bg-gray-800 dark:border-gray-700 border dark:text-gray-200 shadow-card"
//           >
//             <DropdownMenuItem
//               onClick={() => setIsProfileModalOpen(true)}
//               className="cursor-pointer dark:hover:bg-gray-700"
//             >
//               <User className="w-4 h-4 mr-2" />
//               Profile
//             </DropdownMenuItem>
//             <DropdownMenuSeparator className="dark:bg-gray-700" />
//             <DropdownMenuItem
//               onClick={handleLogout}
//               className="text-destructive cursor-pointer dark:hover:bg-gray-700 dark:text-red-400 hover:bg-red-200 hover:text-white"
//             >
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* Profile Modal */}
//       <ProfileModal
//         isOpen={isProfileModalOpen}
//         onClose={() => setIsProfileModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default Topbar;

// ======================== Below is without sidebar ========================

// client/src/components/layouts/App/Topbar.tsx
import { Sun, Moon, Monitor, LogOut, Zap, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import ProfileModal from "../../ProfileModal";
import { getProfile } from "@/services/api/profile";

const Topbar = () => {
  const { theme, setTheme } = useTheme();
  const { logout, quota } = useAuth();
  const navigate = useNavigate();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    profilePicture: "",
  });

  // ✅ Load profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getProfile();
        setProfileData({
          profilePicture: res.user.profilePicture,
        });
        // console.log(res);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
      }
    };
    loadProfile();

  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const currentThemeOption = themeOptions.find(
    (option) => option.value === theme
  );

  const getQuotaPercentage = () => {
    if (!quota) return 0;
    return Math.round((quota.used / quota.limit) * 100);
  };

  return (
    <div className="h-16 flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Header */}
          {/* <Link to="#" className="flex items-center gap-1 font-bold text-xl">
          <span className="gradient-primary bg-clip-text text-transparent">Hirelyze</span>
        </Link> */}
          <div className="flex items-center gap-1 font-bold text-xl">
            <span className="gradient-primary bg-clip-text text-transparent">Hirelyze</span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">

            {/* View All Reports */}
            <Button variant="outline" onClick={() => navigate('/reports')} className="text-xs">
              <FileText className="w-2 h-2" />
              All Reports
            </Button>

            {/* Quota Display */}
            {quota && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                <Zap className="w-4 h-4 text-emerald-500" />
                <div className="text-xs">
                  <span className="font-medium text-foreground dark:text-white">{quota.used}/{quota.limit}</span>
                </div>
                <div className="w-12 bg-muted dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${getQuotaPercentage()}%` }}
                  />
                </div>
              </div>
            )}

            {/* Theme Toggle */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full dark:text-gray-300">
                  {currentThemeOption && (
                    <currentThemeOption.icon className="w-5 h-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                {themeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setTheme(option.value as any)}
                    className={`${theme === option.value ? "bg-accent" : ""} dark:text-gray-200 dark:hover:bg-gray-700`}
                  >
                    <option.icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-1 dark:text-gray-300">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={profileData.profilePicture || "/placeholder-user.jpg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-32 bg-popover dark:bg-gray-800 dark:border-gray-700 border dark:text-gray-200 shadow-card"
              >
                <DropdownMenuItem
                  onClick={() => setIsProfileModalOpen(true)}
                  className="cursor-pointer dark:hover:bg-gray-700"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer dark:hover:bg-gray-700 dark:text-red-400 hover:bg-red-200 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

export default Topbar;
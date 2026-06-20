// client/src/components/layouts/App/Sidebar.tsx
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Sparkles,
  X,
  Home,
  FileText,
  Target,
  Settings,
  User,
  TrendingUp,
  Briefcase,
  BarChart3,
  MessageSquare
} from "lucide-react";
import { Button } from "../../ui/button";
import { useLocation, useNavigate, Link } from "react-router-dom";

const AppSidebar = () => {
  const { state, setOpenMobile } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const [activeItem, setActiveItem] = useState(location.pathname);

  // Update active item when location changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard"
    },
    {
      title: "Resume Analysis",
      icon: FileText,
      path: "/resume-analysis"
    },
    // {
    //   title: "Job Matches",
    //   icon: Target,
    //   // path: "/reports"
    // },
    // {
    //   title: "Interview Prep",
    //   icon: MessageSquare,
    //   // path: "/reports"
    // },
    {
      title: "Career Reports",
      icon: BarChart3,
      path: "/reports"
    },
    // {
    //   title: "Profile",
    //   icon: User,
    //   path: "/profile"
    // },
    // {
    //   title: "Settings",
    //   icon: Settings,
    //   path: "/settings"
    // }
  ];

  const handleItemClick = (path: string) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-gray-900 border-r border-gray-700 flex flex-col h-full">
        {/* Logo Header */}
        <div className="h-16 p-6 border-b border-gray-700 flex items-center">
          {!collapsed ? (
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center gap-1">
                {/* <div className="rounded-lg flex items-center justify-center">
              <img
                src="/favicon.png"
                alt="Hirelyze AI Logo"
                className="w-7 object-contain"
              />
            </div> */}
                <h2 className="font-bold text-white">Hirelyze AI</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden w-4 h-4 rounded-full bg-gray-700 p-4 flex items-center justify-center"
                onClick={() => setOpenMobile(false)}
              >
                <X className="w-4 h-4 text-white" />
              </Button>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <SidebarGroup className="p-4">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.path;

                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        className={`hover:bg-primary text-white transition-all duration-200 transform hover:scale-[1.02] rounded-lg p-3 h-auto cursor-pointer flex items-center gap-3 ${isActive
                            ? "bg-primary text-white font-medium shadow-lg"
                            : "text-white/80 hover:bg-white/10 hover:text-white focus:bg-primary focus:text-white"
                          }`}
                        onClick={() => handleItemClick(item.path)}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-white/70"}`} />
                        {!collapsed && (
                          <span className={`font-medium ${isActive ? "text-white" : "text-white/80"}`}>
                            {item.title}
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 text-white/70 hover:text-white transition-colors cursor-pointer">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Profile</span>
            </div>
            <p className="text-xs text-white/50">© 2025 Hirelyze AI</p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
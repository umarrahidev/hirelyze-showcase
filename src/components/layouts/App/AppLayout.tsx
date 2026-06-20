// import { SidebarProvider } from "@/components/ui/sidebar";
// import AppSidebar from "./Sidebar";
// import Topbar from "@/components/layouts/App/Topbar";

// import { Outlet } from "react-router-dom";

// interface AppLayoutProps {
//   children?: React.ReactNode;
// }

// const AppLayout = ({ children }: AppLayoutProps) => {
//   return (
//     <SidebarProvider>
//       <div className="min-h-screen bg-muted/30 flex w-full p-6">
//         <AppSidebar />

//         <div className="flex-1 flex flex-col">
//           <Topbar />

//           <main className="flex-1 overflow-auto p-4 md:p-6 relative">
//             {children || <Outlet />}
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// };

// export default AppLayout;

// client/src/components/layouts/App/AppLayout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/30 flex w-full">
        {/* <AppSidebar /> */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="container mx-auto flex-1 overflow-auto p-4 md:p-6 relative">
            <div className="animate-fade-in">
              {children || <Outlet />}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
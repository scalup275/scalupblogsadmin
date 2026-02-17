import { FileText, Settings, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Blogs", url: "/blogs", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { logout, admin } = useAuth(); //  real user from backend
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // clear backend/session/token
    navigate("/login"); // redirect to login
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      {/*HEADER  */}
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          {/* SCALUP LOGO */}
          <img src="/log.png" alt="SCALUP Logo" className="h-10 w-auto" />

          <div>
            <h2 className="text-lg font-bold text-foreground">SCALUP</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      {/*  MENU  */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Menu
          </SidebarGroupLabel>

          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                      activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/*FOOTER (REAL USER)*/}
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
          {/* Avatar circle */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <span className="text-sm font-semibold text-primary-foreground">
              {admin?.email?.charAt(0).toUpperCase() ?? "A"}
            </span>
          </div>

          {/* User info */}
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-foreground truncate">
              Admin User
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {admin?.email}
            </p>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

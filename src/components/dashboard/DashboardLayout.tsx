
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  LayoutDashboard, 
  Building2, 
  Loader2, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Building2 size={20} />, label: "Projects", path: "/dashboard/projects" },
    { icon: <Users size={20} />, label: "Team", path: "/dashboard/team" },
    { icon: <Settings size={20} />, label: "Settings", path: "/dashboard/settings" },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Top header */}
      <header className="h-16 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-30 flex items-center px-4 md:px-6">
        <div className="flex items-center w-full">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            
            <Link to="/" className="flex items-center gap-2 text-primary font-semibold">
              <span className="bg-primary text-white w-8 h-8 rounded flex items-center justify-center">CI</span>
              <span className="hidden md:inline-block">ConstructInsight</span>
            </Link>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              asChild
            >
              <Link to="/dashboard/projects/new">
                New Project
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <Link to="/">Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-background border-r fixed md:relative z-20 w-[240px] transition-all duration-300 ${
            sidebarOpen || !isMobile ? "left-0" : "-left-[240px]"
          } top-16 bottom-0 md:left-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 py-4">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="p-4 border-t">
              <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md transition-colors">
                <LogOut size={20} className="mr-3" />
                Logout
              </Link>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${isMobile && sidebarOpen ? 'blur-sm' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

// Lucide icon component for dropdown
function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 1 0-16 0" />
    </svg>
  );
}

export default DashboardLayout;

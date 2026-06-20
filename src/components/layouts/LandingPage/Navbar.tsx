import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isLandingPage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (isLandingPage) {
      const element = document.querySelector(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to landing page first, then scroll
      window.location.href = `/${sectionId}`;
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const currentThemeOption = themeOptions.find(option => option.value === theme);

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 font-bold text-xl">
          {/* <div className="rounded-lg flex items-center justify-center">
            <img
              src="/favicon.png"
              alt="Hirelyze Logo"
              className="w-7 object-contain"
            />
          </div> */}
          <span className="gradient-primary bg-clip-text text-transparent">Hirelyze</span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollToSection('#home')}
            className="text-foreground hover:text-primary hover:bg-accent transition-colors px-4 py-2 rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('#results')}
            className="text-foreground hover:text-primary hover:bg-accent transition-colors px-4 py-2 rounded-lg"
          >
            See Results
          </button>
          <button
            onClick={() => scrollToSection('#features')}
            className="text-foreground hover:text-primary hover:bg-accent transition-colors px-4 py-2 rounded-lg"
          >
            What’s Included
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
                {currentThemeOption && <currentThemeOption.icon className="w-5 h-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {themeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value as any)}
                  className={theme === option.value ? "bg-accent" : ""}
                >
                  <option.icon className="w-4 h-4 mr-2" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Auth buttons */}
          {/* Auth buttons */}
          <Button variant="ghost" asChild className="hover:bg-accent">
            <Link to="/signin">Login</Link>
          </Button>
          <Button variant="hero" shape="pill" asChild>
            <Link to="/signin">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
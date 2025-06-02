import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";
import { useProfile } from "@/features";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { data: profile, isPending } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPending) return;

    if (!profile) {
      navigate("/");
    }
  }, [profile, isPending, navigate]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-background-dark text-foreground-dark">
        <div className="animate-spin-slow h-16 w-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Only show sidebar on desktop */}
      {!isMobile && (
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />
      )}

      <div className="flex flex-col flex-1">
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />

        <main
          className={`flex-1 p-4 sm:p-6 transition-all duration-200 ${isSidebarOpen && !isMobile ? "lg:ml-64" : ""} pb-20 lg:pb-6`}
        >
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

        {isMobile && <MobileNav />}
      </div>
    </div>
  );
}

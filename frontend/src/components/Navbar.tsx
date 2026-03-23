import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { BrandLogo } from "./BrandLogo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="glass-nav sticky top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
          <BrandLogo size="sm" />
        </Link>

        <nav className="flex items-center gap-3 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to="/interview/new"
                className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                New prep
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-slate-200 hover:text-white">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-white px-4 py-2 font-semibold text-night-950 shadow transition hover:bg-slate-100"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

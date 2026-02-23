import { Button } from "@/components/ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/img/logo.png";

const Navbar = () => {
  const location = useLocation();
  const isMagangPage = location.pathname === "/magang";

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? isMagangPage
        ? "text-black font-medium"
        : "text-white font-medium"
      : isMagangPage
        ? "text-black/70 hover:text-black transition"
        : "text-white/80 hover:text-white transition";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300
    ${
      scrolled
        ? isMagangPage
          ? "bg-white shadow-md"
          : "bg-biru shadow-md backdrop-blur"
        : "bg-transparent"
    }
  `}
    >
      <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 text-white">
          <img
            src={logo}
            alt="Logo Polda Jateng"
            className="object-contain w-8 h-8"
          />
          <span
            className={
              isMagangPage
                ? "text-black font-semibold"
                : "text-white font-semibold"
            }
          >
            Polda Jateng
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden gap-8 text-sm md:flex">
          <NavLink to="/" className={navLinkClass}>
            Halaman Utama
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            Tentang Kami
          </NavLink>
          <NavLink to="/magang" className={navLinkClass}>
            Magang
          </NavLink>
          <NavLink to="/proyek" className={navLinkClass}>
            Proyek
          </NavLink>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            className={`hidden md:inline-flex transition ${
              isMagangPage
                ? "bg-biru text-white hover:bg-black/80"
                : scrolled
                  ? "bg-transparent text-white hover:bg-white/10"
                  : "bg-biru text-white hover:bg-birutua"
            }`}
          >
            <Link to="/auth/login">Login</Link>
          </Button>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-md transition
              ${
                isMagangPage
                  ? "bg-biru text-white hover:bg-birutua"
                  : scrolled
                    ? "bg-transparent text-white hover:bg-white/10"
                    : "bg-biru text-white hover:bg-birutua"
              }
            `}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="shadow-lg md:hidden bg-biru/95 backdrop-blur">
          <nav className="flex flex-col px-6 py-4 space-y-4 text-sm">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Halaman Utama
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Tentang Kami
            </NavLink>
            <NavLink
              to="/magang"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Magang
            </NavLink>
            <NavLink
              to="/proyek"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Proyek
            </NavLink>

            {/* Login Mobile */}
            <Button
              asChild
              className={`w-full mt-2 transition ${
                isMagangPage
                  ? "bg-biru text-white hover:bg-black/80"
                  : "bg-transparent text-white border border-white/30 hover:bg-white/10"
              }`}
              onClick={() => setOpen(false)}
            >
              <Link to="/auth/login">Login</Link>
              Login
            </Button>
          </nav>
        </div>
      )}
      {!scrolled && (
        <div className="px-6 mx-auto max-w-7xl">
          <div
            className={`h-px ${isMagangPage ? "bg-black/30" : "bg-white/40"}`}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;

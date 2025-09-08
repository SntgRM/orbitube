import { useEffect, useState } from "react";
import { Container } from "../shared/Container";
import logo from "/assets/icon.svg";
import { NavItem } from "../shared/NavItem";
import { BtnLink } from "../shared/BtnLink";

export const navItems = [
  { href: "#", text: "Home" },
  { href: "#features", text: "Features" },
  { href: "#about", text: "About" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-transparent ring-1 ring-white/10 rounded-2xl mx-4 mt-4"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="w-full flex justify-between gap-6 relative py-4">
          {/* Logo */}
          <div className="min-w-max inline-flex relative">
            <a href="/" className="relative flex items-center gap-3">
              <img src={logo} alt="EdgeAI Logo" className="w-10 h-10" />
              <div className="inline-flex text-lg font-semibold text-heading-1">
                OrbiTube
              </div>
            </a>
          </div>

          <div
            className="flex flex-col lg:flex-row w-full lg:justify-between lg:items-center 
                      absolute top-full left-0 lg:static lg:top-0 
                      lg:h-auto h-0 overflow-hidden"
          >
            <ul
              className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 
                           pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 gap-x-3 
                           text-lg text-heading-2 w-full lg:justify-center lg:items-center"
            >
              {navItems.map((item, key) => (
                <NavItem href={item.href} text={item.text} key={key} />
              ))}
            </ul>
            <div
              className="lg:min-w-max flex items-center sm:w-max w-full pb-6 
                            lg:pb-0 border-b border-box-border lg:border-0
                            px-6 lg:px-0"
            >
              <BtnLink text="Get Started" href="#cta" />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

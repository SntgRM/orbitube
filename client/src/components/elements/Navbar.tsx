import { useEffect, useState } from "react"
import { Container } from "../shared/Container"
import logo from "/assets/icon.svg"
import usaFlag from "/assets/flags/usa.svg"
import spainFlag from "/assets/flags/spain.svg"
import { NavItem } from "../shared/NavItem"
import { useTranslation } from "react-i18next"
import { ChevronDown, Menu, X } from "lucide-react"

export const navItems = [
  { href: "#home", text: "home" },
  { href: "#features", text: "features" },
  { href: "#about", text: "about" },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, i18n } = useTranslation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const languages = [
    { value: "en", label: "English", flag: usaFlag },
    { value: "es", label: "Español", flag: spainFlag },
  ]

  const currentLang = languages.find((l) => l.value === i18n.language) || languages[0]

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setIsDropdownOpen(false)
  }

  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("nav")) {
        setIsMobileMenuOpen(false)
        setIsDropdownOpen(false)
      }
    }

    if (isMobileMenuOpen || isDropdownOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMobileMenuOpen, isDropdownOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md bg-transparent ring-1 ring-white/10 rounded-2xl mx-4 mt-2" : "bg-transparent"
      }`}
    >
      <Container> 
        <nav className="w-full flex justify-between items-center relative py-4">
          <div className="min-w-max inline-flex relative">
            <a href="/" className="relative flex items-center gap-3">
              <img src={logo || "/placeholder.svg"} alt="OrbiTube Logo" className="w-10 h-10" />
              <div className="inline-flex text-lg font-semibold text-heading-1">OrbiTube</div>
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors duration-200"
                aria-label="Select language"
              >
                <img
                  src={currentLang.flag || "/placeholder.svg"}
                  alt={currentLang.label}
                  className="w-5 h-5 rounded-md"
                />
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  {languages.map((lang, index) => (
                    <button
                      key={lang.value}
                      type="button"
                      onClick={() => changeLanguage(lang.value)}
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 hover:bg-gray-800 transition-all duration-150 ${
                        i18n.language === lang.value
                          ? "bg-violet-900/50 text-violet-300 border-l-2 border-violet-500"
                          : "text-gray-300 hover:text-white"
                      } ${index === 0 ? "rounded-t-lg" : ""} ${index === languages.length - 1 ? "rounded-b-lg" : ""}`}
                    >
                      <img src={lang.flag || "/placeholder.svg"} alt={lang.label} className="w-5 h-5 rounded-md" />
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-900/50 border border-gray-700 hover:bg-gray-800/50 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white pointer-events-none" />
              ) : (
                <Menu className="w-5 h-5 text-white pointer-events-none" />
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:justify-between lg:items-center lg:flex-1 lg:ml-8">
            <ul className="flex flex-row gap-x-3 text-lg text-heading-2 justify-center items-center flex-1">
              {navItems.map((item, key) => (
                <li key={key}>
                  <NavItem
                    href="#"
                    text={t(item.text)}
                    onClick={(e) => {
                      e.preventDefault()
                      const section = document.querySelector(item.href)
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" })
                      }
                      handleNavItemClick()
                    }}
                  />
                </li>
              ))}
            </ul>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-800 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 min-w-[160px] transition-all duration-200 hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={currentLang.flag || "/placeholder.svg"}
                    alt={currentLang.label}
                    className="w-5 h-5 rounded-md"
                  />
                  <span className="text-sm font-medium text-white">{currentLang.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute mt-2 top-full right-0 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  {languages.map((lang, index) => (
                    <button
                      key={lang.value}
                      type="button"
                      onClick={() => changeLanguage(lang.value)}
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 hover:bg-gray-800 transition-all duration-150 ${
                        i18n.language === lang.value
                          ? "bg-violet-900/50 text-violet-300 border-l-2 border-violet-500"
                          : "text-gray-300 hover:text-white"
                      } ${index === 0 ? "rounded-t-lg" : ""} ${index === languages.length - 1 ? "rounded-b-lg" : ""}`}
                    >
                      <img src={lang.flag || "/placeholder.svg"} alt={lang.label} className="w-5 h-5 rounded-md" />
                      <span className="font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className={`lg:hidden flex flex-col w-auto
                        absolute top-full right-0 
                        transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
                        bg-gray-900 border border-gray-700 rounded-2xl mt-2 min-w-[220px] shadow-xl`}
          >
            <ul className="flex flex-col p-2 text-sm font-bold text-heading-2">
              {navItems.map((item, key) => (
                <li key={key} onClick={handleNavItemClick}>
                  <a
                    href={item.href}
                    className="block w-full px-6 py-3 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {t(item.text)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  )
}

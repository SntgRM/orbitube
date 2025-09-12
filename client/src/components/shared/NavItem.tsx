interface NavItemProps {
  href: string
  text: string
}

export const NavItem = ({ href, text }: NavItemProps) => {
  return (
    <a
      href={href}
      className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white hover:bg-gray-800/50"
    >
      {text}
    </a>
  )
}

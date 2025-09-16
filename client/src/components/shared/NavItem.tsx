interface NavItemProps {
  href: string
  text: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export const NavItem = ({ href, text, onClick }: NavItemProps) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white hover:bg-gray-800/50"
    >
      {text}
    </a>
  )
}

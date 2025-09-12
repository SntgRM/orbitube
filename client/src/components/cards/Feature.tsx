import { Paragraph } from "../shared/Paragraph"

interface FeatureProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const Feature = ({ title, description, icon }: FeatureProps) => {
  return (
    <div
      className="group p-5 sm:p-6 lg:p-8 rounded-3xl border border-box-border bg-box-bg shadow-lg
                    shadow-box-shadow relative overflow-hidden cursor-pointer
                    transition-all duration-300 ease-out
                    hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-500/10
                    hover:border-gray-400/20 hover:bg-gradient-to-br hover:from-box-bg hover:to-gray-800/5
                    before:absolute before:inset-0 before:rounded-3xl before:p-[1px] 
                    before:bg-gradient-to-br before:from-gray-400/10 before:via-gray-300/5 before:to-transparent
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-[1px] after:rounded-3xl after:bg-box-bg after:z-[-1]"
    >
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-500/3 via-gray-400/3 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      <div
        className="rounded-xl bg-body p-3 text-heading-1 w-max relative z-10
                      group-hover:bg-gradient-to-br group-hover:from-gray-600/10 group-hover:to-gray-500/10
                      transition-all duration-300 group-hover:scale-105"
      >
        {icon}
      </div>

      <div className="mt-6 space-y-4 relative z-10">
        <h2 className="text-lg md:text-xl font-semibold text-heading-2 group-hover:text-heading-1 transition-colors duration-300">
          {title}
        </h2>
        <div className="group-hover:text-heading-1 transition-colors duration-300">
          <Paragraph>{description}</Paragraph>
        </div>
      </div>

      <div
        className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full
                      opacity-0 group-hover:opacity-60 transition-all duration-500"
      />
    </div>
  )
}

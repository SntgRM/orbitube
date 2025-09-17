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
                    transition-all duration-500 ease-out
                    hover:scale-[1.03] hover:shadow-2xl hover:shadow-gray-500/15
                    hover:border-gray-400/30 hover:bg-gradient-to-br hover:from-box-bg hover:to-gray-800/8
                    before:absolute before:inset-0 before:rounded-3xl before:p-[1px] 
                    before:bg-gradient-to-br before:from-gray-400/15 before:via-gray-300/8 before:to-transparent
                    before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500
                    after:absolute after:inset-[1px] after:rounded-3xl after:bg-box-bg after:z-[-1]
                    backdrop-blur-sm"
    >
      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/[0.02] to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-700 
                      group-hover:animate-pulse pointer-events-none"
      />

      <div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-500/4 via-gray-400/4 to-gray-600/2 
                      opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
      />

      <div
        className="absolute top-0 left-0 w-20 h-20 bg-gradient-radial from-gray-400/8 to-transparent rounded-full
                      opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-radial from-gray-300/6 to-transparent rounded-full
                      opacity-0 group-hover:opacity-100 transition-all duration-700 blur-lg"
      />

      <div
        className="rounded-xl bg-body p-3 text-heading-1 w-max relative z-10
                      group-hover:bg-gradient-to-br group-hover:from-gray-600/12 group-hover:to-gray-500/12
                      transition-all duration-500 group-hover:scale-110 group-hover:rotate-1
                      shadow-sm group-hover:shadow-md group-hover:shadow-gray-500/10
                      before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br 
                      before:from-white/5 before:to-transparent before:opacity-0 
                      group-hover:before:opacity-100 before:transition-opacity before:duration-300"
      >
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">{icon}</div>
      </div>

      <div className="mt-6 space-y-4 relative z-10">
        <h2
          className="text-lg md:text-xl font-semibold text-heading-2 group-hover:text-heading-1 
                       transition-all duration-500 group-hover:translate-x-1 group-hover:tracking-wide"
        >
          {title}
        </h2>
        <div className="group-hover:text-heading-1 transition-all duration-500 group-hover:translate-x-0.5">
          <Paragraph>{description}</Paragraph>
        </div>
      </div>

      <div
        className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full
                      opacity-0 group-hover:opacity-70 transition-all duration-700 group-hover:scale-125
                      shadow-sm group-hover:shadow-gray-400/20"
      />

      <div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-gray-400/20 via-gray-300/10 to-transparent
                      w-0 group-hover:w-full transition-all duration-700 delay-100"
      />
    </div>
  )
}

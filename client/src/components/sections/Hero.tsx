import { Container } from "../shared/Container"
import { Paragraph } from "../shared/Paragraph"
import { Link, ChevronDown, Zap, Crown } from "lucide-react"
import { useState, useEffect } from "react"

export const Hero = () => {
  const [selectedFormat, setSelectedFormat] = useState("mp3-fast")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const formats = [
    { value: "mp3-fast", label: "MP3 Fast", icon: Zap },
    { value: "mp3-hd", label: "MP3 HD", icon: Crown },
    { value: "mp4-fast", label: "MP4 Fast", icon: Zap },
    { value: "mp4-hd", label: "MP4 HD", icon: Crown },
  ]

  const handleConvert = () => {
    console.log("Converting with format:", selectedFormat)
  }

  const selectedFormatData = formats.find((f) => f.value === selectedFormat)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".format-dropdown")) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <section className="relative pt-20 lg:pt-24" id="hero">
      <Container className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="relative">
            <div
              className="absolute w-96 h-64 border border-blue-500/10 rounded-full 
                         transform rotate-12 -skew-y-12 animate-orbital-slow"
              style={{
                borderStyle: "dashed",
                borderWidth: "1px",
              }}
            />

            <div
              className="relative w-80 h-52 border border-blue-400/20 rounded-full 
                         transform rotate-12 -skew-y-12 animate-orbital-medium"
            >
              <div
                className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2
                          rounded-full bg-gradient-to-r from-blue-400/60 to-violet-400/60 
                          shadow-sm shadow-blue-400/30 animate-pulse-subtle"
              />

              <div
                className="absolute bottom-0 right-1/4 w-2 h-2 translate-x-1/2 translate-y-1/2
                          rounded-full bg-gradient-to-r from-violet-400/40 to-blue-400/40 
                          shadow-sm shadow-violet-400/20"
                style={{
                  animationDelay: "10s",
                }}
              />
            </div>

            <div
              className="absolute top-1/2 left-1/2 w-48 h-32 border border-violet-400/15 rounded-full 
                         transform -translate-x-1/2 -translate-y-1/2 rotate-12 -skew-y-12 animate-orbital-fast"
            >
              <div
                className="absolute top-1/4 right-0 w-1.5 h-1.5 translate-x-1/2 -translate-y-1/2
                          rounded-full bg-violet-300/50 shadow-sm shadow-violet-300/20"
              />
            </div>
          </div>
        </div>

        <div
          className="relative flex flex-col items-center text-center
                      max-w-3xl mx-auto w-full z-10"
        >
          <h1 className="text-heading-1 text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl font-bold">
            Convert your videos to MP3 - MP4 with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#438bff] via-[#3152bd] to-[#18357a] ml-2">
              OrbiTube{" "}
            </span>
          </h1>
          <Paragraph className="mt-8">
            Fast, secure, and hassle-free: just
            paste the link, choose your format, and download your favorite content to enjoy anytime, anywhere.
          </Paragraph>
          <div className="mt-10 w-full flex max-w-2xl mx-auto lg:mx-0">
            <div className="flex sm:flex-row flex-col gap-5 w-full">
              <form
                action="#"
                className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3
                          shadow-lg shadow-box-shadow border border-box-border
                          bg-box-bg rounded-full ease-linear transition-all duration-300
                          focus-within:bg-body focus-within:border-violet-400 
                          focus-within:shadow-xl focus-within:shadow-violet-400/20
                          hover:border-gray-300 hover:shadow-xl"
              >
                <span className="min-w-max pr-2 border-r border-box-border">
                  <Link className="w-5 h-5 text-gray-400 transition-colors duration-200 group-focus-within:text-violet-400" />
                </span>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 py-3 outline-none bg-transparent text-sm sm:text-base
                            placeholder:text-gray-500 placeholder:text-sm sm:placeholder:text-base
                            focus:placeholder:text-gray-400 transition-colors duration-200"
                />
              </form>
            </div>
          </div>

          <div className="mt-6 flex flex-row sm:flex-row gap-4 items-center justify-center w-full max-w-md">
            <div className="relative format-dropdown">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-800 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 min-w-[160px] transition-all duration-200 hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  {selectedFormatData && <selectedFormatData.icon className="w-4 h-4 text-violet-400" />}
                  <span className="text-sm font-medium text-white">{selectedFormatData?.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mb-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  {formats.map((format, index) => {
                    const Icon = format.icon
                    return (
                      <button
                        key={format.value}
                        type="button"
                        onClick={() => {
                          setSelectedFormat(format.value)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-3 text-left text-sm flex items-center gap-2 hover:bg-gray-800 transition-all duration-150 ${
                          selectedFormat === format.value
                            ? "bg-violet-900/50 text-violet-300 border-l-2 border-violet-500"
                            : "text-gray-300 hover:text-white"
                        } ${index === 0 ? "rounded-t-lg" : ""} ${index === formats.length - 1 ? "rounded-b-lg" : ""}`}
                      >
                        <Icon
                          className={`w-4 h-4 ${selectedFormat === format.value ? "text-violet-400" : "text-gray-500"}`}
                        />
                        <span className="font-medium">{format.label}</span>
                        {format.value.includes("fast") && <span className="ml-auto text-xs text-gray-500">Fast</span>}
                        {format.value.includes("hd") && <span className="ml-auto text-xs text-yellow-500">HD</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <button
              onClick={handleConvert}
              className="px-8 py-3 font-medium rounded-lg shadow-md text-white
                        bg-gradient-to-tr from-[#193fbf] to-[#131f3a]
                        hover:shadow-lg hover:scale-[1.02]
                        active:scale-[0.98] focus:outline-none
                        focus:ring-2 focus:ring-blue-600 transition-all duration-200"
            >
              Convert
            </button>

          </div>
        </div>
      </Container>
    </section>
  )
}

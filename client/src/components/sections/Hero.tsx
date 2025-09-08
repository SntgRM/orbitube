"use client"

import { Button } from "../shared/Button"
import { Container } from "../shared/Container"
import { Paragraph } from "../shared/Paragraph"
import { Youtube, ChevronDown } from "lucide-react"
import { useState } from "react"

export const Hero = () => {
  const [selectedFormat, setSelectedFormat] = useState("mp3")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const formats = [
    { value: "mp3", label: "MP3" },
    { value: "mp3-hd", label: "MP3 HD" },
    { value: "mp4", label: "MP4" },
    { value: "mp4-hd", label: "MP4 HD" },
  ]

  return (
    <section className="relative pt-32 lg:pt-36">
      <Container className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0">
          <span
            className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 
                        skew-x-12 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600
                        blur-xl opacity-60 lg:opacity-95 lg:block hidden"
          ></span>
        </div>

        <div
          className="relative flex flex-col items-center text-center
                      max-w-3xl mx-auto w-full"
        >
          <h1 className="text-heading-1 text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl font-bold">
            Convert your videos to MP3 - MP4 with 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 ml-2">
              OrbiTube{" "}
            </span>
          </h1>
          <Paragraph className="mt-8">
            Our AI SaaS platform seamlessly integrates with your existing workflows to deliver real‑time insights,
            intelligent automation, and data‑driven decision-making. Experience a future where your business runs
            smarter, faster, and more efficiently.
          </Paragraph>
          <div className="mt-10 w-full flex max-w-2xl mx-auto lg:mx-0">
            <div className="flex sm:flex-row flex-col gap-5 w-full">
              <form
                action="#"
                className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3
                          shadow-lg shadow-box-shadow border border-box-border
                          bg-box-bg rounded-full ease-linear focus-within:bg-body
                          focus-within:border-primary"
              >
                <span className="min-w-max pr-2 border-r border-box-border">
                  <Youtube className="w-5 h-5" />
                </span>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v="
                  className="flex-1 py-3 outline-none bg-transparent"
                />

                <div className="relative min-w-max">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium
                             border-l border-box-border hover:bg-body/50 transition-colors"
                  >
                    {formats.find((f) => f.value === selectedFormat)?.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-24 bg-box-bg border border-box-border
                                  rounded-lg shadow-lg shadow-box-shadow z-10"
                    >
                      {formats.map((format) => (
                        <button
                          key={format.value}
                          type="button"
                          onClick={() => {
                            setSelectedFormat(format.value)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full px-3 py-2 text-sm text-left hover:bg-body/50 transition-colors
                                    first:rounded-t-lg last:rounded-b-lg ${
                                      selectedFormat === format.value ? "bg-primary/10 text-primary" : ""
                                    }`}
                        >
                          {format.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button className="min-w-max text-white">
                  <span className="relative z-[5]">Download</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

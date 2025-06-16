"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface QuestionSidebarProps {
  titles: { id: string; title: string }[]
  onTitleClick: (id: string) => void
}

export function QuestionSidebar({ titles, onTitleClick }: QuestionSidebarProps) {
  const [activeQuestion, setActiveQuestion] = useState<string>(titles[0]?.id || "")
  const [showTitles, setShowTitles] = useState<boolean>(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Track which question is in view
  useEffect(() => {
    const handleScroll = () => {
      const questionElements = titles
        .map(q => document.getElementById(`${q.id}-section`))
        .filter(el => el !== null) as HTMLElement[]
      
      const scrollPosition = window.scrollY + window.innerHeight / 2

      let currentQuestionId = activeQuestion
      for (const el of questionElements) {
        if (scrollPosition >= el.offsetTop - 120) {
          currentQuestionId = el.id.replace("-section", "")
        }
      }
      setActiveQuestion(currentQuestionId)
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [titles, activeQuestion])

  // Click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowTitles(false)
      }
    }

    if (showTitles) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showTitles])

  if (!titles || titles.length === 0) {
    return null
  }

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block" ref={panelRef}>
      <div className="flex items-center gap-6">
        {/* Line Navigation */}
        <button
          onClick={() => setShowTitles(!showTitles)}
          className="flex flex-col gap-2 p-3 rounded-lg hover:bg-muted/80 transition-colors group cursor-pointer"
        >
          {titles.map((q) => (
            <div
              key={q.id}
              className={cn(
                "w-5 h-0.5 transition-colors duration-300",
                activeQuestion === q.id
                  ? "bg-primary"
                  : "bg-muted-foreground/40 group-hover:bg-muted-foreground/60"
              )}
            />
          ))}
        </button>
        
        {/* Question Titles */}
        {showTitles && (
          <div className="bg-card border rounded-lg p-4 shadow-lg min-w-[200px] max-h-[70vh] overflow-y-auto">
            <div className="space-y-3">
              {titles.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    onTitleClick(q.id)
                    setShowTitles(false)
                  }}
                  className={cn(
                    "block w-full text-left text-sm font-medium transition-colors duration-200 hover:text-primary p-2 rounded-md",
                    activeQuestion === q.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {q.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
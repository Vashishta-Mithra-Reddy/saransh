"use client"

import type React from "react"
import { useState } from "react"
import { Search, User, Eye, Globe, Hash, ExternalLink, Loader2, AlertCircle, Play, Heart } from "lucide-react"
import ThemeSwitcher from "@/components/theme-switcher"
import Loading from "@/components/loading"
import Link from "next/link"
import { motion } from "framer-motion";

interface ReelData {
  instagram_url: string
  caption: string
  transcript: string
  metadata: {
    author: string
    hashtags: string[]
    duration_seconds: number
    language: string
    view_count: number
    like_count?: number
    comment_count?: number
  }
}

const SaramsaPage: React.FC = () => {
  const [url, setUrl] = useState("")
  const [data, setData] = useState<ReelData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidInstagramUrl = (url: string): boolean => {
    const instagramReelRegex = /^https:\/\/(www\.)?instagram\.com\/(reel|p)\/[A-Za-z0-9_-]+\/?$/
    return instagramReelRegex.test(url)
  }

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    e?.preventDefault()

    let cleanedUrl = url.trim();
    // Strip everything after '?' for tracking data
    const questionMarkIndex = cleanedUrl.indexOf('/?');
    if (questionMarkIndex !== -1) {
      cleanedUrl = cleanedUrl.substring(0, questionMarkIndex);
    }

    if (!cleanedUrl) {
      setError("Please enter a content URL")
      return
    }

    if (!isValidInstagramUrl(cleanedUrl)) {
      setError("Please enter a valid content URL")
      return
    }

    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch("https://daunrodo.onrender.com/api/instagram/reel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: cleanedUrl }), // Use the cleaned URL here
      })

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number | undefined): string => {
    if (!num) return "0"
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : `${secs}s`
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12 pt-8 sm:py-16 sm:pt-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-2">
        <ThemeSwitcher/>
        </div>
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: 20, filter:"blur(5px)" }} animate={{ opacity: 1, y: 0, filter:"blur(0px)" }} transition={{ duration: 0.4 }} className="text-4xl sm:text-5xl font-medium text-foreground mb-4 tracking-tight">sārāṃśa</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20, filter:"blur(5px)" }} animate={{ opacity: 1, y: 0, filter:"blur(0px)" }} transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }} className="text-lg text-muted-foreground font-light max-w-md mx-auto">
            Extract insights from social content
          </motion.p>
        </div>

        {/* Input Section */}
        <motion.div initial={{ opacity: 0, y: 20, filter:"blur(5px)" }} animate={{ opacity: 1, y: 0, filter:"blur(0px)" }} transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }} className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                maxLength={2048}
                placeholder="Paste content URL here..."
                className="w-full px-6 py-4 pr-20 text-lg bg-card border border-border rounded-2xl focus:border-transparent transition-all placeholder:text-muted-foreground duration-500 focus:ring-2 focus:ring-offset-3 focus:ring-offset-background focus:ring-foreground/10 dark:focus:ring-foreground/20 focus:outline-none"
                disabled={loading}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !url.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all flex items-center justify-center duration-300"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results */}
        {loading ? (
          <Loading /> // Display Loading component when loading is true
        ) : (
          data && (
          <motion.div 
          initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0 , filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 10, filter: "blur(5px)" }}
          transition={{ duration: 0.5 }}
          className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <Eye className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-semibold text-foreground">{formatNumber(data.metadata.view_count)}</p>
                <p className="text-sm text-muted-foreground">Views</p>
              </div>

              {data.metadata.like_count !== undefined && (
                <div className="bg-card border border-border rounded-xl p-4 text-center">
                  <Heart className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-foreground">{formatNumber(data.metadata.like_count)}</p>
                  <p className="text-sm text-muted-foreground">Likes</p>
                </div>
              )}

              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <Play className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-semibold text-foreground">
                  {formatDuration(data.metadata.duration_seconds)}
                </p>
                <p className="text-sm text-muted-foreground">Duration</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <Globe className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-2xl font-semibold text-foreground uppercase">{data.metadata.language}</p>
                <p className="text-sm text-muted-foreground">Language</p>
              </div>
            </div>

            {/* Author & Source */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <Link
                      className="font-semibold text-foreground"
                      href={data.metadata.author ? `https://www.instagram.com/${data.metadata.author}` : '#'}
                    >
                      {data.metadata.author ? `@${data.metadata.author}` : 'Instagram'}
                    </Link>
                    <p className="text-sm text-muted-foreground">Creator</p>
                  </div>
                </div>
                <a
                  href={data.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm font-medium"
                >
                  View Original
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Caption */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Caption</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{data.caption}</p>
            </div>

            {/* Transcript */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Transcript</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-foreground leading-relaxed">{data.transcript}</p>
              </div>
            </div>

            {/* Hashtags */}
            {data.metadata.hashtags && data.metadata.hashtags.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-xl font-semibold text-foreground">Tags</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.metadata.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted text-sm text-foreground font-medium border border-border hover:bg-muted/80 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SaramsaPage

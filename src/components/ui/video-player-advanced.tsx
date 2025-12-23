'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Settings, 
  SkipBack, SkipForward, Captions, Download, Share2 
} from 'lucide-react'

export interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  className?: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  chapters?: {
    id: string
    title: string
    startTime: number
    endTime: number
  }[]
  subtitles?: {
    src: string
    lang: string
    label: string
  }[]
}

export function VideoPlayerAdvanced({ 
  src, 
  poster, 
  title, 
  className, 
  onProgress, 
  onComplete,
  chapters = [],
  subtitles = []
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  const [currentChapter, setCurrentChapter] = useState('')
  const [showSubtitles, setShowSubtitles] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('ended', handleEnded)
    }
  }, [onComplete])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
      videoRef.current.muted = isMuted
      videoRef.current.playbackRate = playbackRate
    }
  }, [volume, isMuted, playbackRate])

  useEffect(() => {
    onProgress?.(currentTime)
  }, [currentTime, onProgress])

  useEffect(() => {
    // 更新当前章节
    const current = chapters.find(chapter => 
      currentTime >= chapter.startTime && currentTime < chapter.endTime
    )
    setCurrentChapter(current?.id || '')
  }, [currentTime, chapters])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleChapterClick = (chapter: typeof chapters[0]) => {
    handleSeek(chapter.startTime)
    setShowChapters(false)
  }

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2]

  return (
    <div className={cn('relative bg-black rounded-lg overflow-hidden', className)}>
      {/* 视频元素 */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
      >
        {subtitles.map((subtitle) => (
          <track
            key={subtitle.lang}
            kind="subtitles"
            src={subtitle.src}
            srcLang={subtitle.lang}
            label={subtitle.label}
          />
        ))}
      </video>

      {/* 视频遮罩层 */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={togglePlay}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* 中间播放按钮 */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all">
              <Play className="w-10 h-10 text-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* 控制栏 */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300',
        showControls ? 'opacity-100' : 'opacity-0'
      )}>
        <div className="flex items-center gap-4 text-white">
          {/* 播放/暂停 */}
          <button
            onClick={togglePlay}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* 时间显示 */}
          <div className="text-sm font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          {/* 进度条 */}
          <div className="flex-1 relative">
            <div className="h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* 音量控制 */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-20 accent-blue-500"
            />
          </div>

          {/* 章节 */}
          {chapters.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setShowChapters(!showChapters)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <SkipForward className="w-5 h-5" />
              </button>
              
              {showChapters && (
                <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-80 rounded-lg p-2 min-w-48">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterClick(chapter)}
                      className={cn(
                        'w-full text-left px-3 py-2 text-sm hover:bg-white hover:bg-opacity-20 rounded transition-colors',
                        currentChapter === chapter.id && 'bg-blue-500 bg-opacity-50'
                      )}
                    >
                      {chapter.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 字幕 */}
          {subtitles.length > 0 && (
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={cn(
                "p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors",
                showSubtitles && "bg-blue-500 bg-opacity-50"
              )}
            >
              <Captions className="w-5 h-5" />
            </button>
          )}

          {/* 设置 */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            {showSettings && (
              <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-80 rounded-lg p-2 min-w-32">
                <div className="text-sm px-3 py-1 text-gray-300">播放速度</div>
                {playbackRates.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setPlaybackRate(rate)
                      setShowSettings(false)
                    }}
                    className={cn(
                      "w-full text-left px-3 py-1 text-sm hover:bg-white hover:bg-opacity-20 rounded transition-colors",
                      playbackRate === rate && "bg-blue-500 bg-opacity-50"
                    )}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 全屏 */}
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 标题显示 */}
      {title && (
        <div className="absolute top-4 left-4 text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}

      {/* 快捷键提示 */}
      <div className="absolute top-4 right-4 text-white text-xs opacity-70">
        空格键：播放/暂停 | ← → ：快退/快进 | ↑ ↓ ：音量
      </div>
    </div>
  )
}
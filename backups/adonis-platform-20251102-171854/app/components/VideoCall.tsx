'use client'

import { useState } from 'react'
import { X, Mic, MicOff, Video, VideoOff, Phone, Monitor } from 'lucide-react'

interface VideoCallProps {
  roomUrl: string
  onLeave: () => void
  patientName: string
}

export default function VideoCall({ roomUrl, onLeave, patientName }: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Video Consultation</h2>
            <p className="text-white/60 text-sm">with {patientName}</p>
          </div>
          <div className="text-green-400 text-sm">● Connected</div>
        </div>
      </div>

      {/* Mock Video Container */}
      <div className="flex-1 relative bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center mx-auto mb-4">
              <Video className="w-16 h-16 text-purple-400" />
            </div>
            <div className="text-white/60 mb-2">Mock Video Call Demo</div>
            <div className="text-white font-semibold text-lg">{patientName}</div>
            <div className="text-white/40 text-sm mt-4">
              Add Daily.co API key to enable real video calls
            </div>
          </div>
        </div>

        {/* Small self view */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
          <div className="text-white/60 text-sm">You</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-t border-white/10 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
          {/* Mute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Video */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-full transition-all ${
              isVideoOff 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>

          {/* Screen Share */}
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-4 rounded-full transition-all ${
              isScreenSharing 
                ? 'bg-purple-500 hover:bg-purple-600' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Monitor className="w-6 h-6" />
          </button>

          {/* End Call */}
          <button
            onClick={onLeave}
            className="p-4 px-8 rounded-full bg-red-500 hover:bg-red-600 transition-all flex items-center gap-2 font-semibold"
          >
            <Phone className="w-6 h-6 rotate-[135deg]" />
            End Call
          </button>
        </div>
      </div>
    </div>
  )
}

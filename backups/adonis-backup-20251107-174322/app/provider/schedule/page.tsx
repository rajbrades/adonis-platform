'use client'

import { useState } from 'react'
import { getBrand } from '@/lib/brand'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Video } from 'lucide-react'
import VideoCall from '@/app/components/VideoCall'
import RescheduleModal from '@/app/components/RescheduleModal'

export default function ProviderSchedulePage() {
  const brand = getBrand()
  const [activeCall, setActiveCall] = useState<{roomUrl: string, patientName: string} | null>(null)
  const [rescheduleModal, setRescheduleModal] = useState<any>(null)

  const appointments = [
    { id: '1', patient: 'John Smith', time: '9:00 AM', type: 'Video', duration: '30 min', status: 'confirmed' },
    { id: '2', patient: 'Sarah Johnson', time: '10:00 AM', type: 'Video', duration: '45 min', status: 'confirmed' },
    { id: '3', patient: 'Michael Brown', time: '2:00 PM', type: 'Video', duration: '30 min', status: 'pending' },
    { id: '4', patient: 'Emily Davis', time: '3:30 PM', type: 'Video', duration: '30 min', status: 'confirmed' }
  ]

  const handleJoinCall = async (appointmentId: string, patientName: string) => {
    // Mock implementation - no API call needed
    setActiveCall({
      roomUrl: 'mock-room-url',
      patientName
    })
  }

  const handleReschedule = (newDate: string, newTime: string, reason: string) => {
    console.log('Rescheduling:', { newDate, newTime, reason })
    // TODO: Update database
    // TODO: Send notification to patient
    alert(`Appointment rescheduled to ${newDate} at ${newTime}`)
  }

  if (activeCall) {
    return (
      <VideoCall
        roomUrl={activeCall.roomUrl}
        patientName={activeCall.patientName}
        onLeave={() => setActiveCall(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/provider" className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black">
            <span style={{ color: brand.colors.primary }}>Schedule</span>
          </h1>
          <p className="text-white/60 mt-2">Manage your appointments and availability</p>
        </div>

        {/* Today's Date */}
        <div className="mb-8 p-6 rounded-2xl border" style={{
          background: `linear-gradient(to right, ${brand.colors.primary}10, ${brand.colors.primaryDark}10)`,
          borderColor: `${brand.colors.primary}20`
        }}>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6" style={{ color: brand.colors.primary }} />
            <h2 className="text-2xl font-bold">Today's Schedule</h2>
          </div>
          <p className="text-white/60">Sunday, November 2, 2025</p>
        </div>

        {/* Appointments */}
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: brand.colors.primary }}>
                      {appt.time.split(':')[0]}
                    </div>
                    <div className="text-sm text-white/60">{appt.time.split(' ')[1]}</div>
                  </div>
                  
                  <div className="h-12 w-px bg-white/10" />
                  
                  <div>
                    <div className="font-semibold text-lg mb-1">{appt.patient}</div>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        {appt.type} Call
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appt.duration}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        appt.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setRescheduleModal(appt)}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Reschedule
                  </button>
                  <button 
                    onClick={() => handleJoinCall(appt.id, appt.patient)}
                    className="px-6 py-2 rounded-lg font-semibold transition-all"
                    style={{
                      background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                      color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
                    }}
                  >
                    Join Call
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <RescheduleModal
          appointmentId={rescheduleModal.id}
          currentDate="November 2, 2025"
          currentTime={rescheduleModal.time}
          patientName={rescheduleModal.patient}
          onClose={() => setRescheduleModal(null)}
          onReschedule={handleReschedule}
        />
      )}
    </div>
  )
}

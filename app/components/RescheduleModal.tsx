'use client'

import { useState } from 'react'
import { X, Calendar, Clock } from 'lucide-react'
import { format, addDays, startOfWeek } from 'date-fns'
import { getBrand } from '@/lib/brand'

interface RescheduleModalProps {
  appointmentId: string
  currentDate: string
  currentTime: string
  patientName: string
  onClose: () => void
  onReschedule: (newDate: string, newTime: string, reason: string) => void
}

export default function RescheduleModal({
  appointmentId,
  currentDate,
  currentTime,
  patientName,
  onClose,
  onReschedule
}: RescheduleModalProps) {
  const brand = getBrand()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [reason, setReason] = useState('')

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1))

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ]

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time')
      return
    }

    const newDate = format(selectedDate, 'yyyy-MM-dd')
    onReschedule(newDate, selectedTime, reason)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="bg-gray-900 rounded-2xl border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">Reschedule Appointment</h2>
            <p className="text-white/60 mt-1">with {patientName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Current Appointment */}
        <div className="p-6 bg-white/5 border-b border-white/10">
          <div className="text-sm text-white/60 mb-1">Current Appointment</div>
          <div className="flex items-center gap-4 text-white">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {currentDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {currentTime}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-white">Select New Date</label>
            <div className="grid grid-cols-7 gap-2">
              {dates.map((date) => (
                <button
                  key={date.toString()}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xs text-white/60">{format(date, 'EEE')}</div>
                  <div className="text-lg font-bold">{format(date, 'd')}</div>
                  <div className="text-xs text-white/60">{format(date, 'MMM')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <label className="block text-sm font-semibold mb-3 text-white">Select Time</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedTime === time
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">
              Reason (Optional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition"
            >
              <option value="">Select a reason</option>
              <option value="patient-request">Patient Request</option>
              <option value="provider-conflict">Provider Conflict</option>
              <option value="emergency">Emergency</option>
              <option value="technical-issue">Technical Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime}
            className="px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: selectedDate && selectedTime 
                ? `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`
                : '#444',
              color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
            }}
          >
            Confirm Reschedule
          </button>
        </div>

      </div>
    </div>
  )
}

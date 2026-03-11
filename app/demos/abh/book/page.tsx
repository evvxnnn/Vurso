'use client'

import { useState, useMemo } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { ChevronLeft, ChevronRight, Check, Clock, DollarSign, Calendar, User } from 'lucide-react'

type Step = 'service' | 'datetime' | 'info' | 'confirm'
const steps: Step[] = ['service', 'datetime', 'info', 'confirm']
const stepLabels = ['Service', 'Date & Time', 'Your Info', 'Confirm']

interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
}

const SERVICES: Service[] = [
  { id: 'color-1', name: 'Full Color', description: 'Root-to-tip single-process color for a fresh, even look.', duration: 120, price: 150 },
  { id: 'color-2', name: 'Balayage', description: 'Hand-painted highlights for a natural, sun-kissed finish.', duration: 180, price: 250 },
  { id: 'color-3', name: 'Highlights', description: 'Traditional foil highlights for dimension and brightness.', duration: 150, price: 200 },
  { id: 'color-4', name: 'Root Touch-Up', description: 'Quick root refresh to blend regrowth seamlessly.', duration: 60, price: 85 },
  { id: 'color-5', name: 'Color Correction', description: 'Fix uneven color, banding, or unwanted tones. Consultation required.', duration: 240, price: 350 },
  { id: 'cut-1', name: "Women's Haircut", description: 'Precision cut tailored to your face shape and lifestyle.', duration: 45, price: 65 },
  { id: 'cut-2', name: 'Haircut & Blowout', description: 'Cut followed by a professional blowout and style.', duration: 60, price: 85 },
  { id: 'cut-3', name: 'Bang Trim', description: 'Quick trim to keep your bangs looking fresh.', duration: 15, price: 15 },
  { id: 'treat-1', name: 'Deep Conditioning', description: 'Intensive moisture treatment to restore softness and shine.', duration: 30, price: 45 },
  { id: 'treat-2', name: 'Keratin Treatment', description: 'Smooth frizz and add shine that lasts for weeks.', duration: 150, price: 300 },
  { id: 'treat-3', name: 'Scalp Treatment', description: 'Exfoliating scalp therapy for a healthy foundation.', duration: 30, price: 55 },
  { id: 'style-1', name: 'Blowout', description: 'Wash and professional blowout for a polished look.', duration: 45, price: 55 },
  { id: 'style-2', name: 'Special Occasion Style', description: 'Updo or styled look for weddings, proms, and events.', duration: 60, price: 95 },
]

const AVAILABLE_DAYS = [2, 3, 4, 5, 6] // Tue-Sat
const START_HOUR = 9
const END_HOUR = 18
const SLOT_MINUTES = 30
const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function BookPage() {
  const [step, setStep] = useState<Step>('service')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [booked, setBooked] = useState(false)

  const currentStepIndex = steps.indexOf(step)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const calendarDays = useMemo(() => {
    const { year, month } = calendarMonth
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) days.push(d)
    return days
  }, [calendarMonth])

  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const isDateAvailable = (day: number) => {
    const date = new Date(calendarMonth.year, calendarMonth.month, day)
    if (date < today) return false
    if (!AVAILABLE_DAYS.includes(date.getDay())) return false
    return true
  }

  const timeSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return []
    const slots: string[] = []
    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      for (let min = 0; min < 60; min += SLOT_MINUTES) {
        const endMin = (hour * 60 + min) + selectedService.duration + 15
        if (endMin > END_HOUR * 60) continue
        slots.push(`${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`)
      }
    }
    return slots
  }, [selectedDate, selectedService])

  const formatTime12 = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h
    return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`
  }

  const prevMonth = () => {
    setCalendarMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 }
      return { ...prev, month: prev.month - 1 }
    })
  }

  const nextMonth = () => {
    setCalendarMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 }
      return { ...prev, month: prev.month + 1 }
    })
  }

  const canGoBack = () => {
    const now = new Date()
    return calendarMonth.year > now.getFullYear() ||
      (calendarMonth.year === now.getFullYear() && calendarMonth.month > now.getMonth())
  }

  const infoValid = name.trim().length > 0 && email.includes('@') && phone.trim().length >= 7

  const handleConfirm = () => {
    setBooked(true)
  }

  if (booked) {
    return (
      <div className="min-h-screen bg-cream">
        <Nav />
        <section className="pt-28 pb-20 bg-cream min-h-screen">
          <div className="section-container">
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-script text-4xl text-charcoal mb-3">Demo Booking Submitted!</h2>
              <p className="text-charcoal/60 mb-2">
                <strong>{selectedService?.name}</strong>
              </p>
              <p className="text-charcoal/50 text-sm mb-1">
                {selectedDate && new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-charcoal/50 text-sm mb-6">
                {selectedTime && formatTime12(selectedTime)}
              </p>
              <p className="text-charcoal/40 text-sm max-w-sm mx-auto mb-2">
                This is a demo preview — in the live version, a confirmation email would be sent to <strong>{email}</strong>.
              </p>
              <button
                onClick={() => {
                  setBooked(false)
                  setStep('service')
                  setSelectedService(null)
                  setSelectedDate(null)
                  setSelectedTime(null)
                  setName('')
                  setEmail('')
                  setPhone('')
                }}
                className="mt-8 text-sm text-rose hover:text-rose-dark transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <section className="pt-28 pb-20 bg-cream min-h-screen">
        <div className="section-container">
          <div className="text-center mb-10">
            <h1 className="font-script text-5xl sm:text-6xl text-charcoal mb-3">Book an Appointment</h1>
            <p className="text-charcoal/50 max-w-lg mx-auto">
              Select a service, pick your time, and you&apos;re all set.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i <= currentStepIndex
                      ? 'bg-rose text-white'
                      : 'bg-rose/10 text-charcoal/30'
                  }`}
                >
                  {i < currentStepIndex ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i <= currentStepIndex ? 'text-charcoal' : 'text-charcoal/30'}`}>
                  {stepLabels[i]}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px ${i < currentStepIndex ? 'bg-rose' : 'bg-rose/[0.15]'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select Service */}
          {step === 'service' && (
            <div>
              <h2 className="font-script text-3xl text-charcoal mb-6 text-center">Choose a Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {SERVICES.map(svc => (
                  <button
                    key={svc.id}
                    onClick={() => {
                      setSelectedService(svc)
                      setStep('datetime')
                    }}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedService?.id === svc.id
                        ? 'border-rose bg-rose/5'
                        : 'border-rose/10 bg-white hover:border-rose/25'
                    }`}
                  >
                    <p className="font-medium text-charcoal text-sm">{svc.name}</p>
                    <p className="text-charcoal/40 text-xs mt-1">{svc.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-charcoal/50">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{svc.duration} min</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${svc.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 'datetime' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="font-script text-3xl text-charcoal mb-1 text-center">Pick a Date &amp; Time</h2>
              <p className="text-center text-charcoal/40 text-sm mb-6">
                {selectedService?.name} &middot; {selectedService?.duration} min
              </p>

              <div className="bg-white rounded-xl border border-rose/10 p-5 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    disabled={!canGoBack()}
                    className="p-1 text-charcoal/40 hover:text-rose disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-sm font-medium text-charcoal">
                    {MONTH_NAMES[calendarMonth.month]} {calendarMonth.year}
                  </h3>
                  <button onClick={nextMonth} className="p-1 text-charcoal/40 hover:text-rose transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {DAY_NAMES_SHORT.map(d => (
                    <div key={d} className="text-[10px] text-charcoal/30 font-medium py-1">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, i) => {
                    if (day === null) return <div key={`empty-${i}`} />
                    const available = isDateAvailable(day)
                    const dateStr = formatDate(calendarMonth.year, calendarMonth.month, day)
                    const isSelected = selectedDate === dateStr

                    return (
                      <button
                        key={day}
                        disabled={!available}
                        onClick={() => {
                          setSelectedDate(dateStr)
                          setSelectedTime(null)
                        }}
                        className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-rose text-white'
                            : available
                            ? 'text-charcoal hover:bg-rose/10'
                            : 'text-charcoal/[0.15] cursor-not-allowed'
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="bg-white rounded-xl border border-rose/10 p-5">
                  <h4 className="text-sm font-medium text-charcoal mb-3">
                    Available Times — {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h4>
                  {timeSlots.length === 0 ? (
                    <p className="text-charcoal/40 text-sm py-4 text-center">No available times for this date.</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-lg text-sm transition-colors ${
                            selectedTime === time
                              ? 'bg-rose text-white'
                              : 'bg-blush text-charcoal/60 hover:bg-rose/10'
                          }`}
                        >
                          {formatTime12(time)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep('service')} className="text-sm text-charcoal/40 hover:text-charcoal transition-colors">
                  &larr; Back
                </button>
                <button
                  onClick={() => setStep('info')}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-rose text-white px-6 py-2 rounded-full text-sm hover:bg-rose-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Your Info */}
          {step === 'info' && (
            <div className="max-w-md mx-auto">
              <h2 className="font-script text-3xl text-charcoal mb-6 text-center">Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-rose/[0.15] bg-white text-charcoal text-sm focus:outline-none focus:border-rose transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-rose/[0.15] bg-white text-charcoal text-sm focus:outline-none focus:border-rose transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/60 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-2.5 rounded-lg border border-rose/[0.15] bg-white text-charcoal text-sm focus:outline-none focus:border-rose transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep('datetime')} className="text-sm text-charcoal/40 hover:text-charcoal transition-colors">
                  &larr; Back
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  disabled={!infoValid}
                  className="bg-rose text-white px-6 py-2 rounded-full text-sm hover:bg-rose-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 'confirm' && (
            <div className="max-w-md mx-auto">
              <h2 className="font-script text-3xl text-charcoal mb-6 text-center">Confirm Your Booking</h2>
              <div className="bg-white rounded-xl border border-rose/10 p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-charcoal">{selectedService?.name}</p>
                    <p className="text-xs text-charcoal/40">{selectedService?.duration} min &middot; ${selectedService?.price}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-charcoal">
                      {selectedDate && new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-charcoal/40">{selectedTime && formatTime12(selectedTime)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-rose flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-charcoal">{name}</p>
                    <p className="text-xs text-charcoal/40">{email} &middot; {phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep('info')} className="text-sm text-charcoal/40 hover:text-charcoal transition-colors">
                  &larr; Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-rose text-white px-8 py-2.5 rounded-full text-sm hover:bg-rose-dark transition-colors shadow-lg shadow-rose/20"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

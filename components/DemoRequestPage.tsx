'use client'

import { useState } from 'react'

interface DemoRequestPageProps {
  demoName: string
  demoDescription: string
}

export default function DemoRequestPage({ demoName, demoDescription }: DemoRequestPageProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail) return

    setIsLoading(true)
    try {
      const response = await fetch('https://formspree.io/f/mzdvdvko', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          message: `Demo reupload request for: ${demoName}`,
          _subject: `Demo Request: ${demoName}`,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Logo / branding */}
        <a href="/" className="inline-block mb-12">
          <img src="/vurso-text-light.png" alt="Vurso" className="h-6 mx-auto opacity-60 hover:opacity-100 transition-opacity" />
        </a>

        {!isSubmitted ? (
          <>
            <h1 className="text-white text-2xl font-bold mb-2">{demoName}</h1>
            <p className="text-gray-400 text-sm mb-8">{demoDescription}</p>

            <div className="bg-[#111827] border border-gray-800 rounded-xl p-8">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className="text-white text-lg font-semibold mb-2">This demo is currently offline</h2>
              <p className="text-gray-400 text-sm mb-6">
                Enter your email to request a temporary 72-hour demo period. We&apos;ll reupload it and send you a confirmation when it&apos;s live.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0A0F1C] border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />

                <button
                  type="submit"
                  disabled={!isValidEmail || isLoading}
                  className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isValidEmail
                      ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Submitting...' : 'Request Demo Access'}
                </button>
              </form>
            </div>

            <p className="text-gray-600 text-xs mt-6">
              Demo access is granted for 72 hours from the time of reupload.
            </p>
          </>
        ) : (
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-8">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-semibold mb-2">Request received</h2>
            <p className="text-gray-400 text-sm mb-4">
              We&apos;ll reupload the <strong className="text-white">{demoName}</strong> demo and send a confirmation to <strong className="text-white">{email}</strong> when it&apos;s live.
            </p>
            <p className="text-gray-500 text-xs">
              You&apos;ll have 72 hours of access from the time we send the email.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

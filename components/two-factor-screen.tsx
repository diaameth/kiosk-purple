"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, RotateCcw } from "lucide-react"

interface TwoFactorScreenProps {
  phoneNumber: string
  onVerify: () => void
}

export default function TwoFactorScreen({ phoneNumber, onVerify }: TwoFactorScreenProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.every((digit) => digit !== "")) {
      onVerify()
    }
  }

  const handleResend = () => {
    setTimer(60)
    setCanResend(false)
    setOtp(["", "", "", "", "", ""])
  }

  return (
    <div className="h-screen flex flex-col justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-violet-600 dark:bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">Vérification</h1>
        <p className="text-gray-600 dark:text-gray-300 transition-colors">Code envoyé au {phoneNumber}</p>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-900 dark:text-white transition-colors">
            Code de vérification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="text-center">
              {canResend ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResend}
                  className="text-violet-600 dark:text-violet-400 dark:hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Renvoyer le code
                </Button>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 transition-colors">Renvoyer dans {timer}s</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 rounded-lg transition-colors"
              disabled={!otp.every((digit) => digit !== "")}
            >
              Vérifier
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

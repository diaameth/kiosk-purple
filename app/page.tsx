"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import LoginScreen from "@/components/login-screen"
import TwoFactorScreen from "@/components/two-factor-screen"
import MainApp from "@/components/main-app"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "2fa" | "app">("login")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleLogin = (phone: string) => {
    setPhoneNumber(phone)
    setCurrentScreen("2fa")
  }

  const handleTwoFactor = () => {
    setCurrentScreen("app")
  }

  const handleLogout = () => {
    setCurrentScreen("login")
    setPhoneNumber("")
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="smk-pay-theme">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 transition-colors">
        <div className="w-full max-w-sm max-h-[932px] bg-white dark:bg-gray-800 rounded-none sm:rounded-2xl shadow-lg overflow-hidden transition-colors">
          {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
          {currentScreen === "2fa" && <TwoFactorScreen phoneNumber={phoneNumber} onVerify={handleTwoFactor} />}
          {currentScreen === "app" && <MainApp onLogout={handleLogout} />}
        </div>
      </div>
    </ThemeProvider>
  )
}

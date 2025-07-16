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
      <div className="min-h-screen w-full bg-gray-100 transition-colors sm:flex sm:items-center sm:justify-center sm:p-0 p-0">
        <div className="w-full h-screen sm:max-w-sm sm:h-auto bg-white dark:bg-gray-800 sm:rounded-2xl shadow-lg overflow-hidden transition-colors">
          {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}
          {currentScreen === "2fa" && <TwoFactorScreen phoneNumber={phoneNumber} onVerify={handleTwoFactor} />}
          {currentScreen === "app" && <MainApp onLogout={handleLogout} />}
        </div>
      </div>
    </ThemeProvider>
  )
}

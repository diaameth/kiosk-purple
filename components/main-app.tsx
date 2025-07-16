"use client"

import { useState } from "react"
import { Home, CreditCard, Bell, Settings } from "lucide-react"
import DashboardScreen from "@/components/dashboard-screen"
import TransactionsScreen from "@/components/transactions-screen"
import NotificationsScreen from "@/components/notifications-screen"
import SettingsScreen from "@/components/settings-screen"
import DepositScreen from "@/components/deposit-screen"
import WithdrawScreen from "@/components/withdraw-screen"
import SupplyRequestScreen from "@/components/supply-request-screen"
import ChangePasswordScreen from "@/components/change-password-screen"

interface MainAppProps {
  onLogout: () => void
}

export default function MainApp({ onLogout }: MainAppProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [currentScreen, setCurrentScreen] = useState("dashboard")

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen)
  }

  const navigateBack = () => {
    setCurrentScreen("dashboard")
    setActiveTab("home")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <DashboardScreen onNavigate={navigateToScreen} />
      case "deposit":
        return <DepositScreen onBack={navigateBack} />
      case "withdraw":
        return <WithdrawScreen onBack={navigateBack} />
      case "supply":
        return <SupplyRequestScreen onBack={navigateBack} />
      case "change-password":
        return <ChangePasswordScreen onBack={navigateBack} />
      case "transactions":
        return <TransactionsScreen />
      case "notifications":
        return <NotificationsScreen />
      case "settings":
        return <SettingsScreen onLogout={onLogout} onNavigate={navigateToScreen} />
      default:
        return <DashboardScreen onNavigate={navigateToScreen} />
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    switch (tab) {
      case "home":
        setCurrentScreen("dashboard")
        break
      case "transactions":
        setCurrentScreen("transactions")
        break
      case "notifications":
        setCurrentScreen("notifications")
        break
      case "settings":
        setCurrentScreen("settings")
        break
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="flex-1 overflow-hidden">{renderScreen()}</div>

      {/* Bottom Navigation */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 safe-area-bottom transition-colors">
        <div className="flex justify-around">
          {[
            { id: "home", icon: Home, label: "Accueil" },
            { id: "transactions", icon: CreditCard, label: "Transactions" },
            { id: "notifications", icon: Bell, label: "Notifications" },
            { id: "settings", icon: Settings, label: "Paramètres" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg min-h-[44px] transition-colors ${
                activeTab === id
                  ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

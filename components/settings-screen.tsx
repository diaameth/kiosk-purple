"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Lock, Bell, LogOut, Phone, MapPin, Shield, Moon, Vibrate, Mail } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

interface SettingsScreenProps {
  onLogout: () => void
  onNavigate: (screen: string) => void
}

export default function SettingsScreen({ onLogout, onNavigate }: SettingsScreenProps) {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: true,
    vibration: true,
  })

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="h-full overflow-y-auto p-4 pb-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Paramètres</h1>

      {/* Profile Section */}
      <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white transition-colors">
            <User className="w-5 h-5" />
            <span>Profil</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-violet-600 dark:bg-violet-500 rounded-full flex items-center justify-center transition-colors">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white transition-colors">Agent Modou</h3>
              <p className="text-gray-600 dark:text-gray-300 transition-colors">ID: AGT001</p>
            </div>
          </div>

          <Separator className="dark:bg-gray-600" />

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">+221 77 324 56 78</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                Kiosque #K001 - Plateau, Dakar
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white transition-colors">
            <Shield className="w-5 h-5" />
            <span>Sécurité</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start h-12 bg-transparent dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => onNavigate("change-password")}
          >
            <Lock className="w-4 h-4 mr-3" />
            Changer le mot de passe
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors">
                  Authentification à deux facteurs
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Activée</p>
              </div>
            </div>
            <Switch checked={true} disabled />
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Notifications push</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                  Recevoir les notifications en temps réel
                </p>
              </div>
            </div>
            <Switch checked={notifications.push} onCheckedChange={() => handleNotificationChange("push")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Notifications email</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                  Recevoir un résumé par email
                </p>
              </div>
            </div>
            <Switch checked={notifications.email} onCheckedChange={() => handleNotificationChange("email")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Notifications SMS</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                  Recevoir les alertes importantes par SMS
                </p>
              </div>
            </div>
            <Switch checked={notifications.sms} onCheckedChange={() => handleNotificationChange("sms")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Vibrate className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Vibration</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
                  Vibrer lors des notifications
                </p>
              </div>
            </div>
            <Switch checked={notifications.vibration} onCheckedChange={() => handleNotificationChange("vibration")} />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white transition-colors">
            <Moon className="w-5 h-5" />
            <span>Apparence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400 transition-colors" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white transition-colors">Mode sombre</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">Activer le thème sombre</p>
              </div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={handleThemeToggle} />
          </div>
        </CardContent>
      </Card>

      {/* Logout Section */}
      <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardContent className="p-4">
          <Button
            onClick={onLogout}
            variant="destructive"
            className="w-full h-12 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors">
        <p>SMK Pay v1.0.0</p>
        <p>© 2025 SMK PAY INC</p>
      </div>
    </div>
  )
}

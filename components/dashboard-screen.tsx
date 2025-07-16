"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Banknote, ArrowDownLeft, ArrowUpRight, Package, Bell, Clock } from "lucide-react"

interface DashboardScreenProps {
  onNavigate: (screen: string) => void
}

export default function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const notifications = [
    {
      id: 1,
      title: "Approvisionnement UV approuvé",
      message: "Votre demande de 50 000 UV a été approuvée",
      time: "Il y a 2h",
      type: "success",
    },
    {
      id: 2,
      title: "Transaction échouée",
      message: "Retrait de 25 000 FCFA - Solde insuffisant",
      time: "Il y a 4h",
      type: "error",
    },
    {
      id: 3,
      title: "Nouveau message",
      message: "Mise à jour des tarifs disponible",
      time: "Il y a 1j",
      type: "info",
    },
  ]

  return (
    <div className="h-full overflow-y-auto p-4 pb-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Bonjour Modou Sylla</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors">Kiosque #K001 - Plateau</p>
        </div>
        <div className="w-10 h-10 bg-violet-600 dark:bg-violet-500 rounded-full flex items-center justify-center transition-colors">
          <span className="text-white font-semibold">M</span>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="w-5 h-5 text-violet-600 dark:text-violet-400 transition-colors" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors">
                UV Disponibles
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">125,000</p>
            <p className="text-xs text-green-600 dark:text-green-400 transition-colors">+5,000 aujourd'hui</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Banknote className="w-5 h-5 text-green-600 dark:text-green-400 transition-colors" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 transition-colors">
                Cash en caisse
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">850,000</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">FCFA</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white transition-colors">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => onNavigate("deposit")}
            variant="outline"
            className="w-full h-12 justify-start rounded-lg dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowDownLeft className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" />
            Dépôt client
          </Button>

          <Button
            onClick={() => onNavigate("withdraw")}
            variant="outline"
            className="w-full h-12 justify-start rounded-lg dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowUpRight className="w-5 h-5 mr-3 text-red-600 dark:text-red-400" />
            Retrait client
          </Button>

          <Button
            onClick={() => onNavigate("supply")}
            variant="outline"
            className="w-full h-12 justify-start rounded-lg dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Package className="w-5 h-5 mr-3 text-violet-600 dark:text-violet-400" />
            Demander appro
          </Button>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-gray-900 dark:text-white transition-colors">
            Notifications récentes
          </CardTitle>
          <Bell className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white transition-colors">
                    {notification.title}
                  </h4>
                  <Badge
                    variant={
                      notification.type === "success"
                        ? "default"
                        : notification.type === "error"
                          ? "destructive"
                          : "secondary"
                    }
                    className={`text-xs transition-colors ${
                      notification.type === "info"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                        : notification.type === "success"
                          ? "dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700"
                          : notification.type === "error"
                            ? "dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
                            : ""
                    }`}
                  >
                    {notification.type === "success" ? "Succès" : notification.type === "error" ? "Erreur" : "Info"}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 transition-colors">
                  {notification.message}
                </p>
                <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 transition-colors">
                  <Clock className="w-3 h-3 mr-1" />
                  {notification.time}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

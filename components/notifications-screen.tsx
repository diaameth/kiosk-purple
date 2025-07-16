"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info, Clock, MoreVertical, Check } from "lucide-react"

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Approvisionnement UV approuvé",
      message: "Votre demande de 50 000 UV a été approuvée et sera livrée dans les 2 heures",
      time: "Il y a 2h",
      type: "success",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      title: "Transaction échouée",
      message: "Retrait de 25 000 FCFA pour le client +225 05 98 76 54 32 - Solde insuffisant",
      time: "Il y a 4h",
      type: "error",
      read: false,
      priority: "high",
    },
    {
      id: 3,
      title: "Mise à jour système",
      message: "Une nouvelle version de l'application sera déployée ce soir à 22h00",
      time: "Il y a 6h",
      type: "info",
      read: true,
      priority: "medium",
    },
    {
      id: 4,
      title: "Rappel de fin de journée",
      message: "N'oubliez pas de faire votre rapport de caisse avant 18h00",
      time: "Il y a 8h",
      type: "warning",
      read: true,
      priority: "medium",
    },
    {
      id: 5,
      title: "Commission bonus",
      message: "Félicitations ! Vous avez atteint votre objectif mensuel. Bonus de 5000 FCFA ajouté",
      time: "Il y a 1j",
      type: "success",
      read: true,
      priority: "low",
    },
    {
      id: 6,
      title: "Maintenance programmée",
      message: "Maintenance des serveurs prévue dimanche de 02h00 à 04h00",
      time: "Il y a 2j",
      type: "info",
      read: true,
      priority: "low",
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 dark:border-l-red-400"
      case "medium":
        return "border-l-yellow-500 dark:border-l-yellow-400"
      case "low":
        return "border-l-green-500 dark:border-l-green-400"
      default:
        return "border-l-gray-300 dark:border-l-gray-600"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="h-full flex flex-col p-4 pb-20 overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors">
              {unreadCount} notification{unreadCount > 1 ? "s" : ""} non lue{unreadCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="text-violet-600 dark:text-violet-400 bg-transparent dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
          >
            <Check className="w-4 h-4 mr-2" />
            Tout marquer lu
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`cursor-pointer hover:shadow-md transition-all border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.read
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                : "dark:bg-gray-800 dark:border-gray-700"
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-3 flex-1">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3
                        className={`font-semibold transition-colors ${!notification.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-200"}`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-violet-600 dark:bg-violet-400 rounded-full"></div>
                      )}
                    </div>
                    <p
                      className={`text-sm transition-colors ${!notification.read ? "text-gray-700 dark:text-gray-200" : "text-gray-600 dark:text-gray-300"}`}
                    >
                      {notification.message}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-1 dark:hover:bg-gray-700 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  <Clock className="w-4 h-4" />
                  <span>{notification.time}</span>
                </div>
                <Badge
                  variant={
                    notification.priority === "high"
                      ? "destructive"
                      : notification.priority === "medium"
                        ? "default"
                        : "secondary"
                  }
                  className={`text-xs transition-colors ${
                    notification.priority === "low"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                      : notification.priority === "medium"
                        ? "dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700"
                        : "dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
                  }`}
                >
                  {notification.priority === "high"
                    ? "Urgent"
                    : notification.priority === "medium"
                      ? "Important"
                      : "Normal"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4 transition-colors" />
            <p className="text-gray-500 dark:text-gray-400 transition-colors">Aucune notification</p>
          </div>
        )}
      </div>
    </div>
  )
}

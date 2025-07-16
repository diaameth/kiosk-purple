"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Lock } from "lucide-react"

interface LoginScreenProps {
  onLogin: (phoneNumber: string) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber && password) {
      onLogin(phoneNumber)
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-violet-600 dark:bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">SMK Pay</h1>
        <p className="text-gray-600 dark:text-gray-300 transition-colors">Agent Kiosque</p>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-900 dark:text-white transition-colors">
            Connexion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-200 transition-colors">
                Numéro de téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+221 XX XXX XX XX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-200 transition-colors">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 rounded-lg transition-colors"
            >
              <Lock className="w-4 h-4 mr-2" />
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

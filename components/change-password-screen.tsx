"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Lock, Eye, EyeOff, Check, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ChangePasswordScreenProps {
  onBack: () => void
}

export default function ChangePasswordScreen({ onBack }: ChangePasswordScreenProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const passwordRequirements = [
    { text: "Au moins 8 caractères", met: newPassword.length >= 8 },
    { text: "Au moins une majuscule", met: /[A-Z]/.test(newPassword) },
    { text: "Au moins une minuscule", met: /[a-z]/.test(newPassword) },
    { text: "Au moins un chiffre", met: /\d/.test(newPassword) },
    { text: "Au moins un caractère spécial", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ]

  const isPasswordValid = passwordRequirements.every((req) => req.met)
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir votre mot de passe actuel",
        variant: "destructive",
      })
      return
    }

    if (!isPasswordValid) {
      toast({
        title: "Erreur",
        description: "Le nouveau mot de passe ne respecte pas les critères requis",
        variant: "destructive",
      })
      return
    }

    if (!passwordsMatch) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulation d'appel API
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès",
        className:
          "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
      })

      // Reset form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // Go back after success
      setTimeout(() => {
        onBack()
      }, 1500)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col p-4 bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="dark:hover:bg-gray-700 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
        </Button>
        <h1 className="text-xl font-bold ml-4 text-gray-900 dark:text-white transition-colors">
          Changer le mot de passe
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-6 mb-6">
          {/* Current Password */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2 text-gray-900 dark:text-white transition-colors">
                <Lock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <span>Mot de passe actuel</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="current" className="text-gray-700 dark:text-gray-200 transition-colors">
                  Mot de passe actuel
                </Label>
                <div className="relative">
                  <Input
                    id="current"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-12 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Password */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900 dark:text-white transition-colors">
                Nouveau mot de passe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new" className="text-gray-700 dark:text-gray-200 transition-colors">
                  Nouveau mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="new"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-gray-700 dark:text-gray-200 transition-colors">
                  Confirmer le nouveau mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div
                  className={`flex items-center space-x-2 text-sm transition-colors ${passwordsMatch ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {passwordsMatch ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  <span>
                    {passwordsMatch ? "Les mots de passe correspondent" : "Les mots de passe ne correspondent pas"}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Requirements */}
          {newPassword && (
            <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white transition-colors">
                  Critères du mot de passe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {passwordRequirements.map((requirement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 text-sm transition-colors ${requirement.met ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {requirement.met ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                      )}
                      <span>{requirement.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 rounded-lg transition-colors"
          disabled={!currentPassword || !isPasswordValid || !passwordsMatch || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Modification en cours...</span>
            </div>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Modifier le mot de passe
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

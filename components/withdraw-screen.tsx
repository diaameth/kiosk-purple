"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, QrCode, ArrowUpRight, Check, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WithdrawScreenProps {
  onBack: () => void
}

export default function WithdrawScreen({ onBack }: WithdrawScreenProps) {
  const [clientNumber, setClientNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { toast } = useToast()

  const cashBalance = 850000
  const requestedAmount = Number.parseInt(amount) || 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (clientNumber && amount) {
      if (requestedAmount > cashBalance) {
        toast({
          title: "Solde insuffisant",
          description: "Vous n'avez pas assez de cash en caisse",
          variant: "destructive",
        })
        return
      }
      setShowConfirmation(true)
    }
  }

  const handleConfirm = () => {
    toast({
      title: "Retrait effectué avec succès",
      description: `${amount} FCFA retiré pour le client ${clientNumber}`,
      className: "bg-green-50 border-green-200 text-green-800",
    })
    onBack()
  }

  const numpadButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"]

  const handleNumpadClick = (value: string) => {
    if (value === "⌫") {
      setAmount((prev) => prev.slice(0, -1))
    } else {
      setAmount((prev) => prev + value)
    }
  }

  if (showConfirmation) {
    return (
      <div className="h-full flex flex-col p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => setShowConfirmation(false)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold ml-4">Confirmation</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowUpRight className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl">Retrait client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Client</span>
                <span className="font-semibold">{clientNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Montant</span>
                <span className="font-semibold text-xl">{Number.parseInt(amount).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Commission</span>
                <span className="font-semibold">500 FCFA</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-lg">
                <span>Total à remettre</span>
                <span>{(Number.parseInt(amount) - 500).toLocaleString()} FCFA</span>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleConfirm} className="w-full h-12 bg-red-600 hover:bg-red-700 rounded-lg">
            <Check className="w-4 h-4 mr-2" />
            Confirmer le retrait
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Retrait client</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="client">Numéro client</Label>
            <div className="flex space-x-2">
              <Input
                id="client"
                type="tel"
                placeholder="+225 XX XX XX XX XX"
                value={clientNumber}
                onChange={(e) => setClientNumber(e.target.value)}
                className="h-12"
                required
              />
              <Button type="button" variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                <QrCode className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant (FCFA)</Label>
            <Input
              id="amount"
              type="text"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              className="h-12 text-xl font-semibold text-center"
              required
              readOnly
            />
          </div>
        </div>

        {/* Balance Warning */}
        {requestedAmount > cashBalance && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-800">Solde insuffisant</p>
              <p className="text-xs text-red-600">Cash disponible: {cashBalance.toLocaleString()} FCFA</p>
            </div>
          </div>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {numpadButtons.map((button) => (
            <Button
              key={button}
              type="button"
              variant="outline"
              className="h-12 text-lg font-semibold bg-transparent"
              onClick={() => handleNumpadClick(button)}
            >
              {button}
            </Button>
          ))}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-violet-600 hover:bg-violet-700 rounded-lg"
          disabled={!clientNumber || !amount || requestedAmount > cashBalance}
        >
          Continuer
        </Button>
      </form>
    </div>
  )
}

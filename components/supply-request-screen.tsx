"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Package, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SupplyRequestScreenProps {
  onBack: () => void
}

export default function SupplyRequestScreen({ onBack }: SupplyRequestScreenProps) {
  const [supplyType, setSupplyType] = useState<"uv" | "cash">("uv")
  const [quantity, setQuantity] = useState([10000])
  const [customAmount, setCustomAmount] = useState("")
  const { toast } = useToast()

  const currentStock = {
    uv: 125000,
    cash: 850000,
  }

  const maxRequest = {
    uv: 500000,
    cash: 2000000,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const requestAmount = customAmount ? Number.parseInt(customAmount) : quantity[0]

    toast({
      title: "Demande envoyée",
      description: `Demande d'approvisionnement de ${requestAmount.toLocaleString()} ${supplyType === "uv" ? "UV" : "FCFA"} envoyée`,
      className: "bg-green-50 border-green-200 text-green-800",
    })
    onBack()
  }

  const handleSliderChange = (value: number[]) => {
    setQuantity(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    if (value) {
      setQuantity([Number.parseInt(value) || 0])
    }
  }

  const currentAmount = customAmount ? Number.parseInt(customAmount) || 0 : quantity[0]

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold ml-4">Demande d'approvisionnement</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        {/* Type Selection */}
        <div className="flex space-x-2 mb-6">
          <Button
            type="button"
            variant={supplyType === "uv" ? "default" : "outline"}
            className="flex-1 h-12"
            onClick={() => setSupplyType("uv")}
          >
            UV
          </Button>
          <Button
            type="button"
            variant={supplyType === "cash" ? "default" : "outline"}
            className="flex-1 h-12"
            onClick={() => setSupplyType("cash")}
          >
            Cash
          </Button>
        </div>

        {/* Current Stock */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-violet-600" />
                <span className="font-medium">Stock actuel</span>
              </div>
              <span className="text-xl font-bold">
                {currentStock[supplyType].toLocaleString()} {supplyType === "uv" ? "UV" : "FCFA"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quantity Selection */}
        <div className="space-y-4 mb-6">
          <Label>Quantité demandée</Label>

          <div className="space-y-4">
            <Slider
              value={quantity}
              onValueChange={handleSliderChange}
              max={maxRequest[supplyType]}
              min={1000}
              step={supplyType === "uv" ? 1000 : 5000}
              className="w-full"
            />

            <div className="flex justify-between text-sm text-gray-500">
              <span>1,000</span>
              <span>{maxRequest[supplyType].toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="custom">Ou saisir un montant personnalisé</Label>
            <Input
              id="custom"
              type="number"
              placeholder={`Montant en ${supplyType === "uv" ? "UV" : "FCFA"}`}
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="h-12 text-center text-lg font-semibold"
              max={maxRequest[supplyType]}
              min={1000}
            />
          </div>
        </div>

        {/* Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Résumé de la demande</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Type</span>
              <span className="font-semibold">{supplyType === "uv" ? "Unités de Valeur" : "Cash"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantité</span>
              <span className="font-semibold text-lg">
                {currentAmount.toLocaleString()} {supplyType === "uv" ? "UV" : "FCFA"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stock après appro</span>
              <span className="font-semibold text-green-600">
                {(currentStock[supplyType] + currentAmount).toLocaleString()} {supplyType === "uv" ? "UV" : "FCFA"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full h-12 bg-violet-600 hover:bg-violet-700 rounded-lg"
          disabled={currentAmount === 0}
        >
          <Send className="w-4 h-4 mr-2" />
          Envoyer la demande
        </Button>
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowDownLeft, ArrowUpRight, Package, Calendar, Search } from "lucide-react"

export default function TransactionsScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "deposit" | "withdraw" | "supply">("all")

  const transactions = [
    {
      id: "TXN001",
      type: "deposit",
      amount: 50000,
      client: "+225 07 12 34 56 78",
      date: "2024-01-16 14:30",
      status: "completed",
      commission: 500,
    },
    {
      id: "TXN002",
      type: "withdraw",
      amount: 25000,
      client: "+225 05 98 76 54 32",
      date: "2024-01-16 13:15",
      status: "completed",
      commission: 500,
    },
    {
      id: "TXN003",
      type: "supply",
      amount: 100000,
      client: "Système",
      date: "2024-01-16 10:00",
      status: "pending",
      commission: 0,
    },
    {
      id: "TXN004",
      type: "deposit",
      amount: 75000,
      client: "+225 01 23 45 67 89",
      date: "2024-01-15 16:45",
      status: "failed",
      commission: 500,
    },
    {
      id: "TXN005",
      type: "withdraw",
      amount: 30000,
      client: "+225 09 87 65 43 21",
      date: "2024-01-15 15:20",
      status: "completed",
      commission: 500,
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />
      case "withdraw":
        return <ArrowUpRight className="w-5 h-5 text-red-600" />
      case "supply":
        return <Package className="w-5 h-5 text-violet-600" />
      default:
        return null
    }
  }

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "deposit":
        return "Dépôt"
      case "withdraw":
        return "Retrait"
      case "supply":
        return "Approvisionnement"
      default:
        return type
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Terminé</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En attente</Badge>
      case "failed":
        return <Badge variant="destructive">Échoué</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="h-full flex flex-col p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Historique des transactions</h1>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher par client ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              Tout
            </Button>
            <Button
              variant={filterType === "deposit" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("deposit")}
            >
              Dépôts
            </Button>
            <Button
              variant={filterType === "withdraw" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("withdraw")}
            >
              Retraits
            </Button>
            <Button
              variant={filterType === "supply" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("supply")}
            >
              Appros
            </Button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{getTransactionLabel(transaction.type)}</h3>
                    <p className="text-sm text-gray-600">{transaction.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{transaction.amount.toLocaleString()} FCFA</p>
                  {transaction.commission > 0 && (
                    <p className="text-xs text-green-600">+{transaction.commission} FCFA</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{transaction.date}</span>
                </div>
                {getStatusBadge(transaction.status)}
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">ID: {transaction.id}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Aucune transaction trouvée</p>
          </div>
        )}
      </div>
    </div>
  )
}

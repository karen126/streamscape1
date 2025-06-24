"use client"

import type React from "react"

import { useState } from "react"
import { TrialCheck } from "./trial-check"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [trialStartDate] = useState(() => {
    // En una aplicación real, esto vendría de la base de datos
    // Para esta demo, usamos una fecha 2 días antes de hoy para simular una prueba que está por expirar
    const date = new Date()
    date.setDate(date.getDate() - 2)
    return date
  })

  return <TrialCheck trialStartDate={trialStartDate}>{children}</TrialCheck>
}

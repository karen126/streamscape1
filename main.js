document.addEventListener("DOMContentLoaded", () => {
  // Inicializar demo de chat
  initChatDemo()

  // Configurar modal de videollamada
  setupVideoModal()
})

// Inicializar demo de chat
function initChatDemo() {
  const demoButton = document.getElementById("try-demo")
  const demoMessages = document.getElementById("demo-messages")

  if (!demoButton || !demoMessages) return

  // Mensajes para la demo
  const messages = [
    {
      text: "¡Hola! Vi que tenemos intereses similares en fotografía. ¿Qué tipo de cámara usas?",
      sender: "received",
    },
    {
      text: "¡Hola Jessica! Encantado de conocerte. Uso una Sony Alpha para la mayoría de mi trabajo. ¿También disfrutas de la fotografía de paisajes?",
      sender: "sent",
    },
    {
      text: "¡Sí! Los paisajes son mi favorito. He estado tratando de capturar algunas escenas de montaña últimamente.",
      sender: "received",
    },
    {
      text: "¡Eso suena increíble! Me encantaría ver tu trabajo alguna vez.",
      sender: "sent",
    },
  ]

  let currentStep = 2 // Comenzamos con los dos primeros mensajes ya mostrados

  demoButton.addEventListener("click", () => {
    if (currentStep >= messages.length) {
      // Reiniciar demo
      demoMessages.innerHTML = ""
      currentStep = 0
    }

    // Mostrar mensajes progresivamente
    showNextMessage()
  })

  function showNextMessage() {
    if (currentStep < messages.length) {
      const message = messages[currentStep]
      const messageElement = document.createElement("div")
      messageElement.className = `message ${message.sender}`
      messageElement.innerHTML = `<p>${message.text}</p>`
      demoMessages.appendChild(messageElement)

      currentStep++

      // Si hay más mensajes, programar el siguiente después de un retraso
      if (currentStep < messages.length) {
        setTimeout(showNextMessage, 1500)
      }
    }
  }
}

// Configurar modal de videollamada
function setupVideoModal() {
  const videoCallBtn = document.getElementById("video-call-btn")
  const videoModal = document.getElementById("video-modal")
  const closeModalBtn = document.querySelector(".close-modal")
  const endCallBtn = document.getElementById("end-call")

  if (!videoCallBtn || !videoModal) return

  videoCallBtn.addEventListener("click", () => {
    videoModal.classList.remove("hidden")
  })

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      videoModal.classList.add("hidden")
    })
  }

  if (endCallBtn) {
    endCallBtn.addEventListener("click", () => {
      videoModal.classList.add("hidden")
    })
  }

  // Cerrar modal al hacer clic fuera del contenido
  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      videoModal.classList.add("hidden")
    }
  })
}

// Código para la página de pago
if (document.getElementById("payment-form")) {
  document.addEventListener("DOMContentLoaded", async () => {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search)
    const planType = urlParams.get("plan") || "premium"

    // Configurar información del plan
    setupPlanInfo(planType)

    // Inicializar Stripe (simulado)
    console.log("Inicializando Stripe...")

    // Manejar envío del formulario
    const form = document.getElementById("payment-form")
    form.addEventListener("submit", async (event) => {
      event.preventDefault()

      // Obtener datos del formulario
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value

      // Verificar términos y condiciones
      const termsCheckbox = document.getElementById("terms")
      if (!termsCheckbox.checked) {
        const errorElement = document.getElementById("card-errors")
        errorElement.textContent = "Debes aceptar los términos y condiciones para continuar."
        return
      }

      // Deshabilitar botón y mostrar spinner
      setLoading(true)

      try {
        // Simular procesamiento de pago
        setTimeout(() => {
          // Mostrar mensaje de éxito
          document.getElementById("payment-form").classList.add("hidden")
          document.getElementById("success-message").classList.remove("hidden")

          // Guardar información en localStorage para simular una suscripción activa
          const subscription = {
            id: "sub_" + Math.random().toString(36).substr(2, 9),
            planType: planType,
            status: "active",
            currentPeriodStart: new Date().toISOString(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días
          }

          localStorage.setItem("activeSubscription", JSON.stringify(subscription))
        }, 2000) // Simular tiempo de procesamiento
      } catch (error) {
        console.error("Error:", error)
        const errorElement = document.getElementById("card-errors")
        errorElement.textContent = "Ocurrió un error al procesar el pago. Por favor, intenta de nuevo."
        setLoading(false)
      }
    })

    // Botón para ir al dashboard
    const dashboardBtn = document.getElementById("go-to-dashboard")
    if (dashboardBtn) {
      dashboardBtn.addEventListener("click", () => {
        window.location.href = "dashboard.html"
      })
    }
  })

  // Configurar información del plan
  function setupPlanInfo(planType) {
    const planInfo = {
      basic: {
        name: "Basic",
        price: "30.00",
        features: [
          "Mensajes de texto ilimitados",
          "5 horas de videollamadas al mes",
          "Personalización básica de perfil",
        ],
      },
      premium: {
        name: "Premium",
        price: "40.00",
        features: [
          "Mensajes de texto ilimitados",
          "20 horas de videollamadas al mes",
          "Personalización avanzada de perfil",
          "Emparejamiento prioritario",
        ],
      },
      ultimate: {
        name: "Ultimate",
        price: "45.00",
        features: [
          "Mensajes de texto ilimitados",
          "Videollamadas ilimitadas",
          "Personalización premium de perfil",
          "Emparejamiento prioritario",
          "Acceso a eventos exclusivos",
        ],
      },
      trial: {
        name: "Prueba Gratuita",
        price: "0.00",
        features: [
          "Mensajes de texto ilimitados",
          "5 horas de videollamadas",
          "Personalización básica de perfil",
          "Válido por 3 días",
        ],
      },
    }

    const plan = planInfo[planType] || planInfo.premium

    document.getElementById("planName").textContent = plan.name
    document.getElementById("planPrice").textContent = plan.price

    const featuresElement = document.getElementById("planFeatures")
    featuresElement.innerHTML = ""

    plan.features.forEach((feature) => {
      const li = document.createElement("li")
      li.textContent = feature
      featuresElement.appendChild(li)
    })

    // Actualizar texto del botón para prueba gratuita
    if (planType === "trial") {
      document.getElementById("button-text").textContent = "Iniciar Prueba Gratuita"
    }
  }

  // Mostrar/ocultar indicador de carga
  function setLoading(isLoading) {
    const submitButton = document.getElementById("submit-button")
    const buttonText = document.getElementById("button-text")
    const spinner = document.getElementById("spinner")

    if (isLoading) {
      submitButton.disabled = true
      buttonText.classList.add("hidden")
      spinner.classList.remove("hidden")
    } else {
      submitButton.disabled = false
      buttonText.classList.remove("hidden")
      spinner.classList.add("hidden")
    }
  }
}

// Código para la página de suscripción
if (document.getElementById("subscription-info")) {
  document.addEventListener("DOMContentLoaded", () => {
    // Inicializar gestor de suscripción
    const subscriptionManager = new SubscriptionManager()
    subscriptionManager.init()

    // Configurar modales
    setupModals()
  })

  class SubscriptionManager {
    constructor() {
      this.subscriptionInfo = document.getElementById("subscription-info")
    }

    init() {
      try {
        // Obtener información de suscripción (simulada desde localStorage)
        const subscription = this.getSubscriptionDetails()
        this.renderSubscriptionInfo(subscription)
        this.setupEventListeners()
      } catch (error) {
        console.error("Error al inicializar gestor de suscripción:", error)
        this.renderError()
      }
    }

    getSubscriptionDetails() {
      // En una implementación real, esto sería una llamada a tu API
      const storedSubscription = localStorage.getItem("activeSubscription")

      if (storedSubscription) {
        return JSON.parse(storedSubscription)
      }

      // Si no hay suscripción, devolver null
      return null
    }

    renderSubscriptionInfo(subscription) {
      if (!subscription) {
        this.subscriptionInfo.innerHTML = `
                    <div class="no-subscription">
                        <h3>No tienes una suscripción activa</h3>
                        <p>Elige un plan para comenzar a disfrutar de todas las funciones de StreamScape.</p>
                        <a href="pricing.html" class="btn btn-gradient">Ver Planes</a>
                    </div>
                `
        return
      }

      const endDate = new Date(subscription.currentPeriodEnd)
      const formattedEndDate = endDate.toLocaleDateString()

      let statusBadge = ""
      switch (subscription.status) {
        case "active":
          statusBadge = '<span class="badge badge-success">Activa</span>'
          break
        case "trialing":
          statusBadge = '<span class="badge badge-info">En prueba</span>'
          break
        case "past_due":
          statusBadge = '<span class="badge badge-warning">Pago pendiente</span>'
          break
        case "canceled":
          statusBadge = '<span class="badge badge-danger">Cancelada</span>'
          break
        default:
          statusBadge = `<span class="badge badge-secondary">${subscription.status}</span>`
      }

      this.subscriptionInfo.innerHTML = `
                <div class="subscription-card">
                    <div class="subscription-header">
                        <h3>Plan ${this.getPlanName(subscription.planType)}</h3>
                        ${statusBadge}
                    </div>
                    
                    <div class="subscription-details">
                        <div class="detail-row">
                            <span class="detail-label">Estado:</span>
                            <span class="detail-value">${this.getStatusText(subscription.status)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Próximo pago:</span>
                            <span class="detail-value">${formattedEndDate}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Precio:</span>
                            <span class="detail-value">$${this.getPlanPrice(subscription.planType)}/mes</span>
                        </div>
                    </div>
                    
                    <div class="subscription-actions">
                        ${
                          subscription.status === "canceled"
                            ? `<a href="pricing.html" class="btn btn-primary">Reactivar Suscripción</a>`
                            : `<button id="cancel-subscription" class="btn btn-outline" data-id="${subscription.id}">Cancelar Suscripción</button>`
                        }
                        <button id="update-payment" class="btn btn-secondary">Actualizar Método de Pago</button>
                    </div>
                </div>
                
                <div class="payment-history">
                    <h3>Historial de Pagos</h3>
                    <div id="transactions-list">
                        ${this.renderTransactions()}
                    </div>
                </div>
            `
    }

    renderTransactions() {
      // En una implementación real, esto sería una llamada a tu API
      // Aquí simulamos algunas transacciones
      const transactions = [
        {
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          amount: 40.0,
          status: "succeeded",
        },
        {
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
          amount: 40.0,
          status: "succeeded",
        },
      ]

      if (transactions.length === 0) {
        return `<p>No hay transacciones para mostrar.</p>`
      }

      let html = `
                <table class="transactions-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Monto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
            `

      transactions.forEach((transaction) => {
        const formattedDate = transaction.date.toLocaleDateString()

        let statusClass = ""
        switch (transaction.status) {
          case "succeeded":
            statusClass = "status-success"
            break
          case "failed":
            statusClass = "status-failed"
            break
          case "pending":
            statusClass = "status-pending"
            break
        }

        html += `
                    <tr>
                        <td>${formattedDate}</td>
                        <td>$${transaction.amount.toFixed(2)}</td>
                        <td><span class="status ${statusClass}">${this.getTransactionStatusText(transaction.status)}</span></td>
                    </tr>
                `
      })

      html += `
                    </tbody>
                </table>
            `

      return html
    }

    setupEventListeners() {
      // Cancelar suscripción
      const cancelButton = document.getElementById("cancel-subscription")
      if (cancelButton) {
        cancelButton.addEventListener("click", () => {
          // Mostrar modal de confirmación
          document.getElementById("cancel-modal").classList.remove("hidden")
        })
      }

      // Actualizar método de pago
      const updatePaymentButton = document.getElementById("update-payment")
      if (updatePaymentButton) {
        updatePaymentButton.addEventListener("click", () => {
          // Mostrar modal de actualización de pago
          document.getElementById("payment-modal").classList.remove("hidden")
        })
      }

      // Confirmar cancelación
      const confirmCancelButton = document.getElementById("confirm-cancel")
      if (confirmCancelButton) {
        confirmCancelButton.addEventListener("click", () => {
          this.cancelSubscription()
          document.getElementById("cancel-modal").classList.add("hidden")
        })
      }
    }

    cancelSubscription() {
      // En una implementación real, esto sería una llamada a tu API
      // Aquí simulamos la cancelación actualizando el estado en localStorage
      const subscription = this.getSubscriptionDetails()
      if (subscription) {
        subscription.status = "canceled"
        localStorage.setItem("activeSubscription", JSON.stringify(subscription))

        // Recargar la página para mostrar los cambios
        window.location.reload()
      }
    }

    renderError() {
      this.subscriptionInfo.innerHTML = `
                <div class="error-container">
                    <h3>No se pudo cargar la información de suscripción</h3>
                    <p>Ha ocurrido un error al obtener los detalles de tu suscripción. Por favor, intenta de nuevo más tarde.</p>
                    <button id="retry-load" class="btn btn-primary">Reintentar</button>
                </div>
            `

      document.getElementById("retry-load").addEventListener("click", () => {
        window.location.reload()
      })
    }

    getPlanName(planType) {
      const planNames = {
        basic: "Basic",
        premium: "Premium",
        ultimate: "Ultimate",
        trial: "Prueba Gratuita",
      }

      return planNames[planType] || planType
    }

    getPlanPrice(planType) {
      const planPrices = {
        basic: "30.00",
        premium: "40.00",
        ultimate: "45.00",
        trial: "0.00",
      }

      return planPrices[planType] || "0.00"
    }

    getStatusText(status) {
      const statusTexts = {
        active: "Activa",
        trialing: "En período de prueba",
        past_due: "Pago pendiente",
        canceled: "Cancelada (finaliza al término del período actual)",
        unpaid: "Impagada",
      }

      return statusTexts[status] || status
    }

    getTransactionStatusText(status) {
      const statusTexts = {
        succeeded: "Completado",
        failed: "Fallido",
        pending: "Pendiente",
      }

      return statusTexts[status] || status
    }
  }

  function setupModals() {
    // Cerrar modal de cancelación
    const cancelCancelBtn = document.getElementById("cancel-cancel")
    if (cancelCancelBtn) {
      cancelCancelBtn.addEventListener("click", () => {
        document.getElementById("cancel-modal").classList.add("hidden")
      })
    }

    // Cerrar modal de actualización de pago
    const closePaymentModalBtn = document.getElementById("close-payment-modal")
    if (closePaymentModalBtn) {
      closePaymentModalBtn.addEventListener("click", () => {
        document.getElementById("payment-modal").classList.add("hidden")
      })
    }

    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener("click", (event) => {
      const cancelModal = document.getElementById("cancel-modal")
      const paymentModal = document.getElementById("payment-modal")

      if (event.target === cancelModal) {
        cancelModal.classList.add("hidden")
      }

      if (event.target === paymentModal) {
        paymentModal.classList.add("hidden")
      }
    })
  }
}

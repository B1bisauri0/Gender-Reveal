import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, guess } = body

    if (!name || !guess) {
      return NextResponse.json(
        { error: "Faltan datos" },
        { status: 400 }
      )
    }

    const message = `✨ Nueva confirmación ✨

Nombre: ${name}
Predicción: ${guess === "niña" ? "Niña 💗" : "Niño 💙"}

Confirmó asistencia al gender reveal 🎉`

    const response = await fetch(process.env.WHATSAPP_API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": `Bearer ${process.env.WHATSAPP_API_KEY}`,
      },
      body: JSON.stringify({
        sessionName: process.env.WHATSAPP_SESSION,
        chatId: process.env.WHATSAPP_CHAT_ID,
        text: message,
      }),
    })

    const data = await response.text()
    if (!response.ok) {
      return NextResponse.json(
        { error: "Error WhatsApp", details: data },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("SERVER ERROR:", error)
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase()

  try {
    const body = await req.json().catch(() => ({} as any))
    const { name, guess } = body

    const missing = {
      name: !name || !String(name).trim(),
      guess: !guess,
    }

    if (missing.name || missing.guess) {
      return NextResponse.json(
        { message: "Campos requeridos faltantes", missing },
        { status: 400 }
      )
    }

    const cleanName = String(name).trim()
    const cleanGuess = String(guess).trim()

    const { error: insertError } = await supabase.rpc("insert_invitados", {
      p_name: cleanName,
      p_girl_boy: cleanGuess,
    })

    if (insertError) {
      return NextResponse.json(
        { message: "Error guardando RSVP", detail: insertError.message },
        { status: 500 }
      )
    }

    // 💌 Mensaje
    const message = `💌 Nueva confirmación

👤 Nombre: ${cleanName}
🎀 Predicción: ${cleanGuess === "niña" ? "Niña 💗" : "Niño 💙"}

✨ Confirmó asistencia al gender reveal`

    // 📲 WhatsApp
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
    console.log("WHATSAPP RESPONSE:", data)

    if (!response.ok) {
      return NextResponse.json(
        { message: "RSVP guardado pero falló WhatsApp", detail: data },
        { status: 500 }
      )
    }

    // ✨ (Opcional) Auditoría
    await supabase.from("audit_log").insert({
      action: "INSERT",
      entity: "RSVP",
      details: {
        name: cleanName,
        guess: cleanGuess,
      },
    })

    return NextResponse.json(
      {
        success: true,
        name: cleanName,
        guess: cleanGuess,
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("SERVER ERROR:", error)

    return NextResponse.json(
      { message: "Error interno" },
      { status: 500 }
    )
  }
}
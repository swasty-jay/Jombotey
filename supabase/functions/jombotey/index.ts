// supabase/functions/jombotey/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

serve(async (req) => {
  const { message } = await req.json()

  const apiKey = Deno.env.get("OPENAI_API_KEY")

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You be sharp street guy from Ghana. Anytime person message you, reply dem with Ghana Pidgin and add small Twi inside. Yarn dem like street padi wey dey give advice with swag. No speak English. No translate. Just yarn raw Ghana Pidgin with small Twi. Make the reply funny and real like how boys dey vibe for street corner."
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  })

  const data = await res.json()

  return new Response(
    JSON.stringify({
      reply: data.choices?.[0]?.message?.content,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  )
})

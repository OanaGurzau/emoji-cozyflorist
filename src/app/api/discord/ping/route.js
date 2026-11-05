export async function POST(req) {

  const body = await req.json();

  const {
    flowerName,
    slotNumber
  } = body;

  await fetch(
    process.env.DISCORD_WEBHOOK_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        content:
  `/ping flower:${flowerName}`
      })
    }
  );

  return Response.json({
    success: true
  });
}
import { NextRequest, NextResponse } from "next/server"

const MASSIVE_API_KEY = "5JpdwQENaXF2LVErIZb55QCZIbxZqBuk"
const BASE_URL = "https://api.massive.com/v1"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint") || "data"

  try {
    const res = await fetch(`${BASE_URL}/${endpoint}?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${MASSIVE_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Massive API returned ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

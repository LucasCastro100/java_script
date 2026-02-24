import { NextResponse } from "next/server";

const users = ["Lucas", "Kathelin", "Sara", "Laura"];

export async function GET(request: Request) {
  return NextResponse.json(
    { type: "success", msg: "Listagem completa dos usuarios", content: users },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.user) {
    return NextResponse.json(
      { type: "error", msg: "Faltou enviar 'user' no JSON" },
      { status: 400 }
    );
  }

  users.push(data.user);

  return NextResponse.json({ users });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const index = Number(searchParams.get("index"));

  if (isNaN(index)) {
    return NextResponse.json(
      { type: "error", msg: "Index inválido" },
      { status: 400 }
    );
  }

  const data = await request.json();

  if (!data.user) {
    return NextResponse.json(
      { type: "error", msg: "Envie 'user' no body" },
      { status: 400 }
    );
  }

  users[index] = data.user;

  return NextResponse.json({ users });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const index = Number(searchParams.get("index"));

  users.splice(Number(index), 1);

  return NextResponse.json({ users });
}

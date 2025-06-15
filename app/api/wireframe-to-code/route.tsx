import { WireframeToCodeTable } from "@/configs/schema";
import { db } from "@/configs/db";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm"; // ✅ Make sure this is imported

// --- POST: Save data to DB ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { description, imageUrl, model, uid, email } = body;

    // Basic validation
    if (!description || !imageUrl || !model || !uid || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into the database
    const result = await db
      .insert(WireframeToCodeTable)
      .values({
        uid,
        description,
        imageUrl,
        model,
        createdBy: email,
      })
      .returning({ id: WireframeToCodeTable.id });

    // Respond with success
    return NextResponse.json({
      success: true,
      insertedId: result[0]?.id || null,
    });
  } catch (error: any) {
    console.error("Error inserting wireframe:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// --- GET: Fetch data using uid ---
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    const result = await db
      .select()
      .from(WireframeToCodeTable)
      .where(eq(WireframeToCodeTable.uid, uid));

    if (result.length > 0) {
      return NextResponse.json(result[0]);
    }

    return NextResponse.json({ error: "No Record Found" }, { status: 404 });
  } catch (error: any) {
    console.error("Error fetching record:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

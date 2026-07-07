import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { selectedDishes, ...data } = body;

    // Validate required fields
    const requiredFields = [
      "restaurantName",
      "ownerName",
      "email",
      "phone",
      "address",
      "city",
      "district",
      "state",
      "pincode",
      "cuisineType",
      "restaurantType",
      "openingTime",
      "closingTime",
      "avgCostForTwo"
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Insert main registration
    const { data: reg, error: regError } = await supabaseAdmin
      .from("restaurant_registrations")
      .insert({
        restaurant_name: data.restaurantName,
        owner_name: data.ownerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        district: data.district,
        state: data.state,
        pincode: data.pincode,
        cuisine_type: data.cuisineType,
        restaurant_type: data.restaurantType,
        swiggy_url: data.swiggyUrl || null,
        zomato_url: data.zomatoUrl || null,
        opening_time: data.openingTime,
        closing_time: data.closingTime,
        avg_cost_for_two: parseInt(data.avgCostForTwo) || 0,
        gst_number: data.gstNumber || null,
        fssai_number: data.fssaiNumber || null,
        website: data.website || null,
      })
      .select("id")
      .single();

    if (regError) {
      console.error("Supabase insert error:", regError);
      return NextResponse.json(
        { success: false, error: regError.message || "Failed to register restaurant in database." },
        { status: 500 }
      );
    }

    if (!reg) {
      return NextResponse.json(
        { success: false, error: "Database insert returned empty record." },
        { status: 500 }
      );
    }

    // Insert dishes if provided
    if (Array.isArray(selectedDishes) && selectedDishes.length > 0) {
      const dishesToInsert = selectedDishes.map((dish: string) => ({
        restaurant_registration_id: reg.id,
        dish_name: dish,
      }));

      const { error: dishesError } = await supabaseAdmin
        .from("restaurant_dishes")
        .insert(dishesToInsert);

      if (dishesError) {
        console.error("Supabase dishes insert error:", dishesError);
        // Do not fail the request completely if only the dishes sub-insertion fails,
        // but return a warning or note.
      }
    }

    return NextResponse.json({ success: true, id: reg.id });
  } catch (error: unknown) {
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}

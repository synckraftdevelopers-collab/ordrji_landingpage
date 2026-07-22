/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    // Fetch all registrations joined with their dishes
    const { data: registrations, error } = await (supabaseAdmin as any)
      .from("restaurant_registrations")
      .select(`
        id,
        restaurant_name,
        owner_name,
        email,
        phone,
        address,
        city,
        district,
        state,
        cuisine_type,
        restaurant_type,
        logo_url,
        cover_image_url,
        swiggy_url,
        zomato_url,
        opening_time,
        closing_time,
        avg_cost_for_two,
        created_at,
        restaurant_dishes ( dish_name )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Normalise to the shape SearchRestaurantModal expects
    const restaurants = (registrations ?? []).map((r: any) => ({
      id: String(r.id),
      name: r.restaurant_name,
      cuisine: r.cuisine_type,
      type: r.restaurant_type as "veg" | "nonveg" | "both",
      city: r.city,
      area: r.district || r.city,
      ownerName: r.owner_name,
      phone: r.phone,
      email: r.email || "",
      address: r.address || "",
      logoUrl: r.logo_url || null,
      coverImageUrl: r.cover_image_url || null,
      swiggyUrl: r.swiggy_url || null,
      zomatoUrl: r.zomato_url || null,
      openingTime: r.opening_time,
      closingTime: r.closing_time,
      avgCost: r.avg_cost_for_two || 300,
      dishes: (r.restaurant_dishes ?? []).map((d: any) => d.dish_name),
      registeredAt: r.created_at,
      badge: "Registered",
      badgeColor: "#059669",
    }));

    return NextResponse.json({ success: true, restaurants });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

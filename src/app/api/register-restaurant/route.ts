/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

async function uploadBase64Image(base64Str: string, folder: "logos" | "covers") {
  const match = base64Str.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) throw new Error("Invalid image data format");
  const contentType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, "base64");
  
  let ext = "png";
  if (contentType === "image/jpeg" || contentType === "image/jpg") ext = "jpg";
  else if (contentType === "image/webp") ext = "webp";
  else if (contentType === "image/png") ext = "png";
  
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = `${folder}/${filename}`;

  const { error } = await supabaseAdmin.storage
    .from("restaurant-logos")
    .upload(path, buffer, {
      contentType,
      duplex: "half",
    });

  if (error) {
    console.error(`Supabase server upload error (${folder}):`, error);
    throw new Error(`Failed to upload ${folder} to storage: ${error.message}`);
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from("restaurant-logos")
    .getPublicUrl(path);

  return { path, publicUrl };
}

export async function POST(request: Request) {
  const uploadedPaths: string[] = [];
  try {
    const body = await request.json();
    const { 
      selectedDishes, 
      logoData, 
      logoName, 
      coverData, 
      coverName, 
      image1Data,
      image1Name,
      image2Data,
      image2Name,
      ...data 
    } = body;

    // Validate required fields
    const requiredFields = [
      "restaurantName",
      "ownerName",
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

    let finalLogoUrl = data.logoUrl || null;
    let finalCoverUrl = data.coverImageUrl || null;
    let finalImage1Url = null;
    let finalImage2Url = null;

    if (logoData) {
      const { path, publicUrl } = await uploadBase64Image(logoData, "logos");
      uploadedPaths.push(path);
      finalLogoUrl = publicUrl;
    }

    if (coverData) {
      const { path, publicUrl } = await uploadBase64Image(coverData, "covers");
      uploadedPaths.push(path);
      finalCoverUrl = publicUrl;
    }

    if (image1Data) {
      const { path, publicUrl } = await uploadBase64Image(image1Data, "covers");
      uploadedPaths.push(path);
      finalImage1Url = publicUrl;
    }

    if (image2Data) {
      const { path, publicUrl } = await uploadBase64Image(image2Data, "covers");
      uploadedPaths.push(path);
      finalImage2Url = publicUrl;
    }

    // Insert main registration
    const { data: reg, error: regError } = await (supabaseAdmin as any)
      .from("restaurant_registrations")
      .insert({
        restaurant_name: data.restaurantName,
        owner_name: data.ownerName,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
        city: data.city,
        district: data.district,
        state: data.state,
        pincode: data.pincode,
        cuisine_type: data.cuisineType,
        restaurant_type: data.restaurantType,
        logo_url: finalLogoUrl,
        cover_image_url: finalCoverUrl,
        restaurant_image_1_url: finalImage1Url,
        restaurant_image_2_url: finalImage2Url,
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
      
      // Cleanup uploaded files
      if (uploadedPaths.length > 0) {
        await supabaseAdmin.storage
          .from("restaurant-logos")
          .remove(uploadedPaths);
      }

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

      const { error: dishesError } = await (supabaseAdmin as any)
        .from("restaurant_dishes")
        .insert(dishesToInsert);

      if (dishesError) {
        console.error("Supabase dishes insert error:", dishesError);
        // Do not fail the request completely if only the dishes sub-insertion fails,
        // but return a warning or note.
      }
    }

    return NextResponse.json({ 
      success: true, 
      id: reg.id,
      logoUrl: finalLogoUrl,
      coverImageUrl: finalCoverUrl
    });
  } catch (error: unknown) {
    console.error("API route error:", error);
    
    // Cleanup uploaded files
    if (uploadedPaths.length > 0) {
      try {
        await supabaseAdmin.storage
          .from("restaurant-logos")
          .remove(uploadedPaths);
      } catch (cleanupErr) {
        console.error("Error during storage cleanup:", cleanupErr);
      }
    }

    const message = error instanceof Error ? error.message : "Internal server error.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

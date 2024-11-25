import Listing from "@/models/Listing";
import connect from "@/lib/dbConnect";
import mongoose from "mongoose";

connect();

// GET method to retrieve a specific listing by ID
export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return new Response(JSON.stringify({ error: "Listing not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ data: listing }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error retrieving listing" }), {
      status: 500,
    });
  }
}

// PUT method to update a specific listing by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const updatedData = await req.json();
    const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedListing) {
      return new Response(JSON.stringify({ error: "Listing not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ data: updatedListing }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating listing" }), {
      status: 500,
    });
  }
}

// DELETE method to remove a specific listing by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: "Invalid listing ID format" }),
        { status: 400 }
      );
    }
    try {
      const deletedListing = await Listing.findByIdAndDelete(id);
      if (!deletedListing) {
        return new Response(
          JSON.stringify({ error: "Listing not found" }),
          { status: 404 }
        );
      }
      return new Response(
        JSON.stringify({ message: "Listing deleted successfully" }),
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error deleting listing:", error);  
      return new Response(
        JSON.stringify({ error: "Error deleting listing", details: error.message }),
        { status: 500 }
      );
    }
  }

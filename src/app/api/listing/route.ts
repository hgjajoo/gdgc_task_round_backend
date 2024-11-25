import Listing from '@/models/Listing';
import connect from '@/lib/dbConnect';

connect();

// GET method to retrieve all listings
export async function GET() {
  try {
    const listings = await Listing.find({});
    if (listings.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No listings found' }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({ data: listings }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error retrieving listings:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while retrieving listings', details: error.message }),
      { status: 500 }
    );
  }
}

// POST method to create a new listing
export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.title || !data.description || !data.seller) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title, description, or seller' }),
        { status: 400 }
      );
    }
    const newListing = new Listing({
      title: data.title,
      description: data.description,
      seller: data.seller,
      rating: data.rating || 0,
    });
    await newListing.save();
    return new Response(
      JSON.stringify({ data: newListing }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating listing:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while creating the listing', details: error.message }),
      { status: 500 }
    );
  }
}

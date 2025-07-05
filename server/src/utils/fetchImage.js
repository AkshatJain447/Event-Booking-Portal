const enrichHotelWithImage = async (hotel) => {
  try {
    const url = `${hotel.main_photo_url}${process.env.UNSPLASH_ACCESS_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    const image = data.results[0]?.urls;

    if (image) {
      hotel.main_photo_url = image.small;
      hotel.max_photo_url = image.full;
    }
  } catch (error) {
    console.error(`Failed to fetch image for: ${hotel.hotel_name}`);
  }

  return hotel;
};

export default enrichHotelWithImage;

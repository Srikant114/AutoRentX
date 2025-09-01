import React, { useEffect, useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

// helper to format yyyy-mm-dd → dd/mm/yyyy
const formatDateToDDMMYYYY = (dateStr) => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
};

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [cityList, setCityList] = useState([]);

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate, axios } =
    useAppContext();
    
const handleSearch = (e) => {
    e.preventDefault();
    if (!pickupLocation || !pickupDate || !returnDate) return;

    // Encode the parameters
    const url = `/cars?pickupLocation=${encodeURIComponent(pickupLocation)}&pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}`;
    navigate(url);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get('/api/bookings/locations');
        if (data.success) {
          setCityList(data.locations);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    
    fetchLocations();
  }, [axios]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center">
      {/* ----- Hero Heading ----- */}
      <h1 className="text-4xl md:text-5xl font-semibold text-text-primary">
        Luxury Cars On Rent
      </h1>

      {/* ----- Booking Form Section ----- */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          {/* Pickup Location */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="pickup-location" className="text-text-primary text-sm">
              Pickup Location
            </label>
            <select
              id="pickup-location"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full md:w-48 px-3 py-2 text-sm text-text-secondary bg-white border border-borderColor rounded-md outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="">Select a location</option>
              {cityList?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="pickup-date" className="text-text-primary text-sm">
              Pick-up Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-text-secondary border border-borderColor rounded-md px-2 py-1"
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="return-date" className="text-text-primary text-sm">
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="text-sm text-text-secondary border border-borderColor rounded-md px-2 py-1"
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 px-9 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer"
        >
          <img src={assets?.search_icon} alt="search" className="brightness-300" />
          Search
        </button>
      </form>

      {/* Car Image */}
      <img src={assets?.main_car} alt="car" className="max-h-74" />
    </div>
  );
};

export default Hero;

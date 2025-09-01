import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { assets } from "../assets/assets";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDateParam = searchParams.get("pickupDate"); // yyyy-mm-dd
  const returnDateParam = searchParams.get("returnDate"); // yyyy-mm-dd

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const convertDateToDDMMYYYY = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const pickupDate = convertDateToDDMMYYYY(pickupDateParam);
  const returnDate = convertDateToDDMMYYYY(returnDateParam);

  const hasSearchParams = pickupLocation && pickupDate && returnDate;

  // Local search filter function
  const applyLocalFilter = (carsToFilter = cars) => {
    if (!input.trim()) {
      return carsToFilter;
    }
    
    const search = input.toLowerCase();
    return carsToFilter.filter(
      (c) =>
        c.brand?.toLowerCase().includes(search) ||
        c.model?.toLowerCase().includes(search) ||
        c.category?.toLowerCase().includes(search)
    );
  };

  // Fetch cars by availability (backend)
  const searchAvailability = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      
      if (data.success) {
        const locallyFilteredCars = applyLocalFilter(data.availableCars);
        setFilteredCars(locallyFilteredCars);
        
        if (!data.availableCars.length) {
          toast("No Cars Available");
        } else if (input && !locallyFilteredCars.length) {
          toast("No cars match your search criteria");
        }
      } else {
        toast.error(data.message || "Failed to check availability");
      }
    } catch (error) {
      console.error("SearchAvailability Error:", error.message);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasSearchParams) {
      searchAvailability();
    } else {
      // When there's no search params, apply local filter to all cars
      const results = applyLocalFilter();
      setFilteredCars(results);
    }
  }, [hasSearchParams, cars, pickupLocation, pickupDate, returnDate]);

  useEffect(() => {
    // Apply local filter whenever input changes
    if (hasSearchParams) {
      // If we have search params, filter the already filtered available cars
      const results = applyLocalFilter(filteredCars);
      setFilteredCars(results);
    } else {
      // If no search params, filter all cars
      const results = applyLocalFilter();
      setFilteredCars(results);
    }
  }, [input]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col items-center bg-light py-20 max-md:px-4">
        <Title
          title={hasSearchParams ? "Available Cars" : "All Cars"}
          subTitle={
            hasSearchParams 
              ? `Cars available in ${pickupLocation} from ${pickupDate} to ${returnDate}`
              : "Browse from our premium collection of rental cars across top Indian cities"
          }
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-3xl w-full h-12 rounded-full shadow border border-borderColor">
          <img src={assets?.search_icon} alt="search" className="w-4.5 h-4.5 mr-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by make, model or features"
            className="w-full h-full outline-none text-text-secondary placeholder:text-gray-400"
          />
          <img src={assets?.filter_icon} alt="filter" className="w-4.5 h-4.5 ml-2" />
        </div>
      </div>

      {/* Car listings */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-text-secondary xl:px-20 max-w-7xl mx-auto">
          Showing {filteredCars?.length} Cars
          {hasSearchParams && ` in ${pickupLocation}`}
        </p>
        
        {isLoading ? (
          <div className="col-span-full text-center py-20">
            <p className="text-text-secondary text-lg">Loading cars...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
            {filteredCars?.length > 0 ? (
              filteredCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-text-secondary text-lg">
                  {hasSearchParams 
                    ? `No cars available in ${pickupLocation} for the selected dates.` 
                    : "No cars found matching your search criteria."
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
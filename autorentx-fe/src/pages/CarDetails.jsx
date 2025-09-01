import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyCarData } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const {cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, currency} = useAppContext()

  const navigate = useNavigate();
  const [carData, setCarData] = useState(null);

    /* ------------------ Submit Booking ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate) {
      toast.error("Please select both pickup and return dates.");
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      toast.error("Return date must be after pickup date.");
      return;
    }

    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success("Booking created successfully!");
        navigate("/my-bookings");
      } else {
        toast.error(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking Error:", error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  /* ------------------ Fetch Car Data ------------------ */
  useEffect(() => {
    setCarData(cars?.find((car) => car?._id === id));
  }, [cars, id]);

  // If no data, show loader
  if (!carData) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-text-secondary hover:underline"
      >
        <img
          src={assets?.arrow_icon}
          alt="go-back"
          className="rotate-180 opacity-65"
        />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* LEFT: Car Image & Info */}
        <div className="lg:col-span-2">
          {/* Car Image */}
          <img
            src={carData?.image}
            alt="car"
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
          />

          {/* Car Details Section */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold">
                {carData?.brand} {carData?.model}
              </h1>
              <p className="text-text-secondary text-lg">
                {carData?.category} • {carData?.year}
              </p>
            </div>

            <hr className="border-borderColor my-6" />

            {/* Basic Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets?.users_icon,
                  text: `${carData?.seating_capacity} Seats`,
                },
                { icon: assets?.fuel_icon, text: carData?.fuel_type },
                { icon: assets?.car_icon, text: carData?.transmission },
                { icon: assets?.location_icon, text: carData?.location },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt={text} className="h-5 mb-2" />
                  <span className="text-sm text-text-secondary">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-text-secondary">{carData?.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360° Camera",
                  "Bluetooth Audio",
                  "GPS Navigation",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-text-secondary"
                  >
                    <img
                      src={assets?.check_icon}
                      alt="check"
                      className="h-4 mr-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-text-secondary border border-borderColor bg-white"
        >
          {/* Price Display */}
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency}
            {carData?.pricePerDay}
            <span className="text-base text-text-secondary font-normal">
              per day
            </span>
          </p>

          <hr className="my-6 border-borderColor" />

          {/* Pickup Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              value={pickupDate}
              onChange={(e)=>setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="border border-borderColor px-3 py-2 rounded-lg text-sm"
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              value={returnDate}
              onChange={(e)=>setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              required
              className="border border-borderColor px-3 py-2 rounded-lg text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
          >
            Book Now
          </button>

          {/* Note */}
          <p className="text-center text-sm text-text-secondary">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;

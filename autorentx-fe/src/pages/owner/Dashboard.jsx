import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { assets, dummyDashboardData } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // ✅ Motion import
import Loader from "../../components/Loader"; // ✅ Loader import

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  // Dashboard state
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const [loading, setLoading] = useState(false); // ✅ Loader state

  // Cards to display quick stats
  const dashboardCards = [
    {
      title: "Total Cars",
      value: data?.totalCars,
      icon: assets?.calendar_icon_colored,
    },
    {
      title: "Total Bookings",
      value: data?.totalBookings,
      icon: assets?.listIconColored,
    },
    {
      title: "Pending",
      value: data?.pendingBookings,
      icon: assets?.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data?.completedBookings,
      icon: assets?.listIconColored,
    },
  ];

  const fetchDashboardData = async () => {
    setLoading(true); // ✅ Start loading
    try {
      const res = await axios.get("/api/owner/dashboard");

      if (!res.status === 200 && res.data?.success === true) {
        toast.error(res.data?.message || "Failed to fetch dashboard data.");
        return false;
      }

      setData(res.data.dashboardData);
      return true;
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error(
          err?.response?.data?.message || "Not authorized. Please log in."
        );
      } else if (err?.response?.status === 403) {
        toast.error(
          err?.response?.data?.message ||
            "Access denied. Owner account required."
        );
      } else {
        toast.error(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch dashboard data."
        );
      }
      return false;
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      {/* Page Title */}
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* ✅ Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dashboard Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-2 items-center justify-between p-4 rounded-md border border-[var(--color-borderColor)]"
              >
                {/* Card Text */}
                <div>
                  <h1 className="text-xs text-[var(--color-text-secondary)]">
                    {card?.title}
                  </h1>
                  <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {card?.value}
                  </p>
                </div>

                {/* Card Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)]/10">
                  <img
                    src={card?.icon}
                    alt={`${card?.title} Icon`}
                    className="h-4 w-4"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Bookings & Monthly Revenue */}
          <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 md:p-6 border border-[var(--color-borderColor)] rounded-md max-w-lg w-full"
            >
              <h1 className="text-lg font-medium text-[var(--color-text-primary)]">
                Recent Bookings
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                Latest customer bookings
              </p>

              {data?.recentBookings?.map((booking, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mt-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {/* Icon Circle */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-primary)]/10">
                      <img
                        src={assets?.listIconColored}
                        alt="Booking Icon"
                        className="h-5 w-5"
                      />
                    </div>

                    {/* Booking Details */}
                    <div>
                      <p className="text-[var(--color-text-primary)]">
                        {booking?.car?.brand} {booking?.car?.model}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {booking?.createdAt?.split("T")[0]}
                      </p>
                    </div>
                  </div>

                  {/* Price + Status */}
                  <div className="flex items-center gap-2 font-medium">
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {currency}
                      {booking?.price}
                    </p>
                    <p className="px-3 py-0.5 border border-[var(--color-borderColor)] rounded-full text-sm">
                      {booking?.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Monthly Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 md:p-6 mb-6 border border-[var(--color-borderColor)] rounded-md w-full md:max-w-xs"
            >
              <h1 className="text-lg font-medium text-[var(--color-text-primary)]">
                Monthly Revenue
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                Revenue For Current Month
              </p>
              <p className="text-3xl mt-6 font-semibold text-[var(--color-primary)]">
                {currency} {data?.monthlyRevenue}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;

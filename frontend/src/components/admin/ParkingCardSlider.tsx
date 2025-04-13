import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "./Icons"; // Make sure path is correct
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ParkingSpot {
  id: number;
  image: string;
  location: string;
  availableSlots: number;
  totalSlots: number;
  price: string;
}

interface ParkingCardSliderProps {
  parkingSpots: ParkingSpot[];
  loading: boolean;
}

export const ParkingCardSlider: React.FC<ParkingCardSliderProps> = ({
  parkingSpots,
  loading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(loading);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpots, setFilteredSpots] =
    useState<ParkingSpot[]>(parkingSpots);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSpots(parkingSpots);
    } else {
      const filtered = parkingSpots.filter((spot) =>
        spot.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSpots(filtered);
      setCurrentIndex(0);
    }
  }, [searchQuery, parkingSpots]);

  const getCardsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < filteredSpots.length - cardsToShow) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      prevSlide();
    } else if (info.offset.x < -100) {
      nextSlide();
    }
  };

  const totalPages = Math.max(1, filteredSpots.length - cardsToShow + 1);
  const paginationDots = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-30 mt-30">
      <div className="mb-15 relative ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search parking locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300">
            <Search />
          </div>
        </div>
      </div>

      {filteredSpots.length === 0 && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <Skeleton variant="rounded" width={330} height={290} />
          <Skeleton variant="rounded" width={330} height={290} />
          <Skeleton variant="rounded" width={330} height={290} />
        </div>
      )}

      {filteredSpots.length > 0 && (
        <div className="relative">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-all ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= filteredSpots.length - cardsToShow}
            className={`absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-all ${
              currentIndex >= filteredSpots.length - cardsToShow
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>

          <div ref={sliderRef} className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="flex"
              style={{
                width: `${(filteredSpots.length / cardsToShow) * 100}%`,
                transform: `translateX(-${
                  (currentIndex * 100) / filteredSpots.length
                }%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {filteredSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="px-2"
                  style={{ width: `${100 / filteredSpots.length}%` }}
                >
                  <ParkingCard spot={spot} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {paginationDots.map((dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => goToSlide(dotIndex)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === dotIndex
                    ? "bg-teal-500 dark:bg-teal-400 w-6"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ParkingCardProps {
  spot: ParkingSpot;
}

const ParkingCard: React.FC<ParkingCardProps> = ({ spot }) => {
  const availabilityPercentage = (spot.availableSlots / spot.totalSlots) * 100;
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full transition-all duration-300 border border-gray-100 dark:border-gray-700 "
    >
      <div className="relative h-48">
        <img
          src={spot.image || "/placeholder.svg"}
          alt={`Parking at ${spot.location}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 font-bold px-3 py-1 rounded-full text-sm shadow-md">
          {spot.price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {spot.location}
        </h3>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Available Slots
            </span>
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {spot.availableSlots} / {spot.totalSlots}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                availabilityPercentage > 60
                  ? "bg-green-500"
                  : availabilityPercentage > 30
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${availabilityPercentage}%` }}
            ></div>
          </div>
        </div>

        <button
          className="w-full bg-teal-500
        hover:cursor-pointer
        hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          onClick={() => {
            navigate(`/admin/bookings/${spot.id}`);
          }}
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
};

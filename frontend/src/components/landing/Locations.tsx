import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { cities, City } from "../../utils/cities";

interface LocationsProps {
    currentCityIndex: number;
    setCurrentCityIndex: React.Dispatch<React.SetStateAction<number>>;
  }

export default function Locations({ currentCityIndex, setCurrentCityIndex }: LocationsProps) {
  const nextCity = (): void => setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
  const prevCity = (): void => setCurrentCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);

  return (
    <section id="locations" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Available Locations</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Find parking spots in these major cities and more</p>
        </motion.div>
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="flex justify-center">
              <div className="relative w-full max-w-4xl">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <img src={cities[currentCityIndex].image || "/placeholder.svg"} alt={cities[currentCityIndex].name} className="object-cover fill" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">{cities[currentCityIndex].name}</h3>
                    <div className="flex items-center mb-2">
                      <MapPin size={16} className="mr-1" />
                      <span>{cities[currentCityIndex].address}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(cities[currentCityIndex].rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
                          />
                        ))}
                      </div>
                      <span>{cities[currentCityIndex].rating.toFixed(1)}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="font-semibold">Featured Parking Lots:</p>
                      <ul>
                        {cities[currentCityIndex].parkingLots.map((lot: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="mr-2">•</span>
                            {lot}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <button onClick={prevCity} className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-100/80 hover:bg-white p-3 rounded-full shadow-lg z-10" aria-label="Previous city">
            <ChevronLeft size={24} className="text-black" />
          </button>
          <button onClick={nextCity} className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-100/80 hover:bg-white p-3 rounded-full shadow-lg z-10" aria-label="Next city">
            <ChevronRight size={24} className="text-black" />
          </button>
          <div className="flex justify-center mt-6 space-x-2">
            {cities.map((_: City, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentCityIndex(index)}
                className={`w-3 h-3 rounded-full ${index === currentCityIndex ? "bg-black dark:bg-white" : "bg-gray-300 dark:bg-gray-500"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
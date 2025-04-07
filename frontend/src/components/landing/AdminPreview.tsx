import { motion } from "framer-motion";
import Button from '@mui/material/Button';

export default function AdminPreview() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src="https://img.freepik.com/free-photo/person-preparing-get-driver-license_23-2150167566.jpg?ga=GA1.1.111555767.1744038035&semt=ais_country_boost&w=740"
              alt="Admin Dashboard"
              className="object-cover fill"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold">Admin Functionality</h2>
            <p className="text-xl text-gray-500">
              Our system provides powerful tools for parking administrators to manage spaces efficiently.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-black text-white p-2 rounded-full mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Book Slot on User Arrival</h3>
                  <p className="text-gray-500">
                    Admins can quickly book slots for users who arrive without a reservation
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-black text-white p-2 rounded-full mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Real-time Space Management</h3>
                  <p className="text-gray-500">Monitor and manage all parking spaces from a single dashboard</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-black text-white p-2 rounded-full mr-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Reporting & Analytics</h3>
                  <p className="text-gray-500">Generate detailed reports on usage, revenue, and occupancy rates</p>
                </div>
              </div>
            </div>

            <Button className="bg-black text-white hover:bg-gray-800">Learn More About Admin Features</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
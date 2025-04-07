import { motion } from "framer-motion";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { testimonials, Testimonial } from '../../utils/testimonials';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hear from people who have transformed their parking experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.33333 21.3333C7.86667 21.3333 6.66667 20.8 5.73333 19.7333C4.8 18.6667 4.33333 17.3333 4.33333 15.7333C4.33333 14 4.93333 12.2667 6.13333 10.5333C7.33333 8.8 9.06667 7.33333 11.3333 6.13333L12.6667 8.13333C11.0667 9 9.8 9.93333 8.86667 10.9333C7.93333 11.9333 7.46667 12.9333 7.46667 13.9333C7.46667 14.2667 7.53333 14.5333 7.66667 14.7333C7.8 14.9333 8 15.0667 8.26667 15.1333C8.53333 15.2 8.8 15.2 9.06667 15.1333C9.33333 15.0667 9.6 15 9.86667 14.9333C10.1333 14.8667 10.4 14.8 10.6667 14.7333C11.2 14.6 11.7333 14.6 12.2667 14.7333C12.8 14.8667 13.2667 15.1333 13.6667 15.5333C14.0667 15.9333 14.3333 16.4667 14.4667 17.1333C14.6 17.8 14.5333 18.4667 14.2667 19.1333C14 19.8 13.5333 20.3333 12.8667 20.7333C12.2 21.1333 11.4 21.3333 10.4667 21.3333H9.33333ZM21.3333 21.3333C19.8667 21.3333 18.6667 20.8 17.7333 19.7333C16.8 18.6667 16.3333 17.3333 16.3333 15.7333C16.3333 14 16.9333 12.2667 18.1333 10.5333C19.3333 8.8 21.0667 7.33333 23.3333 6.13333L24.6667 8.13333C23.0667 9 21.8 9.93333 20.8667 10.9333C19.9333 11.9333 19.4667 12.9333 19.4667 13.9333C19.4667 14.2667 19.5333 14.5333 19.6667 14.7333C19.8 14.9333 20 15.0667 20.2667 15.1333C20.5333 15.2 20.8 15.2 21.0667 15.1333C21.3333 15.0667 21.6 15 21.8667 14.9333C22.1333 14.8667 22.4 14.8 22.6667 14.7333C23.2 14.6 23.7333 14.6 24.2667 14.7333C24.8 14.8667 25.2667 15.1333 25.6667 15.5333C26.0667 15.9333 26.3333 16.4667 26.4667 17.1333C26.6 17.8 26.5333 18.4667 26.2667 19.1333C26 19.8 25.5333 20.3333 24.8667 20.7333C24.2 21.1333 23.4 21.3333 22.4667 21.3333H21.3333Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6 flex-grow">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
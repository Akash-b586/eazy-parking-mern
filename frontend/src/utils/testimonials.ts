export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export const testimonials : Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Regular Commuter",
      avatar: "https://mui.com/static/images/avatar/4.jpg",
      content:
        "This parking system has completely transformed my daily commute. No more circling around looking for spots!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Traveler",
      avatar: "https://mui.com/static/images/avatar/1.jpg",
      content:
        "As someone who travels for business frequently, having guaranteed parking in multiple cities is a game-changer.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Shopping Mall Manager",
      avatar: "https://mui.com/static/images/avatar/3.jpg",
      content:
        "Implementing this system in our mall has improved customer satisfaction and increased our parking revenue.",
    },
  ];
export interface City {
  id: number;
  name: string;
  image: string;
  parkingLots: string[];
  rating: number;
  address: string;
}

export const cities : City[] = [
    {
      id: 1,
      name: "New York",
      image: "https://img.freepik.com/premium-photo/downtown-sydney-skyline-australia-from-top-view-twilight_255553-208.jpg?w=2000",
      parkingLots: ["Central Park Garage", "Times Square Parking"],
      rating: 4.8,
      address: "Manhattan, NY",
    },
    {
      id: 2,
      name: "Los Angeles",
      image: "/placeholder.svg?height=400&width=600",
      parkingLots: ["Hollywood Parking", "Downtown LA Garage"],
      rating: 4.5,
      address: "Los Angeles, CA",
    },
    {
      id: 3,
      name: "Chicago",
      image: "/placeholder.svg?height=400&width=600",
      parkingLots: ["Millennium Park Garage", "Navy Pier Parking"],
      rating: 4.7,
      address: "Chicago, IL",
    },
    {
      id: 4,
      name: "Miami",
      image: "/placeholder.svg?height=400&width=600",
      parkingLots: ["South Beach Parking", "Downtown Miami Garage"],
      rating: 4.6,
      address: "Miami, FL",
    },
  ];
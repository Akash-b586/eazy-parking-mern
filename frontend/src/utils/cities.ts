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
      image: "https://images.pexels.com/photos/2833714/pexels-photo-2833714.jpeg?auto=compress&cs=tinysrgb&w=1200",
      parkingLots: ["Central Park Garage", "Times Square Parking"],
      rating: 4.8,
      address: "Manhattan, NY",
    },
    {
      id: 2,
      name: "Los Angeles",
      image: "https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=1200",
      parkingLots: ["Hollywood Parking", "Downtown LA Garage"],
      rating: 4.5,
      address: "Los Angeles, CA",
    },
    {
      id: 3,
      name: "Chicago",
      image: "https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=1200",
      parkingLots: ["Millennium Park Garage", "Navy Pier Parking"],
      rating: 4.7,
      address: "Chicago, IL",
    },
    {
      id: 4,
      name: "Miami",
      image: "https://images.pexels.com/photos/831475/pexels-photo-831475.jpeg?auto=compress&cs=tinysrgb&w=1200",
      parkingLots: ["South Beach Parking", "Downtown Miami Garage"],
      rating: 4.6,
      address: "Miami, FL",
    },
  ];
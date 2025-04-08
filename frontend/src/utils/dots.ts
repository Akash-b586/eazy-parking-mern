export interface Dot {
    start: {
      lat: number;
      lng: number;
      label?: string;
    };
    end: {
      lat: number;
      lng: number;
      label?: string;
    };
  }
  
  export const dots: Dot[] = [
    {
      start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
      end: { lat: 40.7128, lng: -74.0060, label: "New York" },
    },
    {
      start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
      end: { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
    },
    {
      start: { lat: 28.6139, lng: 77.2090, label: "Delhi" },
      end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" },
      end: { lat: 55.7558, lng: 37.6173, label: "Moscow" },
    },
    {
      start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
      end: { lat: -34.6037, lng: -58.3816, label: "Buenos Aires" },
    },
    {
      start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
      end: { lat: 13.7563, lng: 100.5018, label: "Bangkok" },
    },
    {
      start: { lat: 52.3676, lng: 4.9041, label: "Amsterdam" },
      end: { lat: 59.3293, lng: 18.0686, label: "Stockholm" },
    },
    {
      start: { lat: 19.4326, lng: -99.1332, label: "Mexico City" },
      end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
    },
    {
      start: { lat: 39.9042, lng: 116.4074, label: "Beijing" },
      end: { lat: 31.2304, lng: 121.4737, label: "Shanghai" },
    },
    {
      start: { lat: 41.9028, lng: 12.4964, label: "Rome" },
      end: { lat: 37.9838, lng: 23.7275, label: "Athens" },
    },
  ];

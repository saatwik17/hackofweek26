export interface Photo {
  id: number;
  url: string;
  title: string;
  location: string;
  aspectRatio: string; // 'portrait' | 'landscape' | 'square'
}

export const photos: Photo[] = [
  {
    id: 1,
    url: "https://picsum.photos/seed/architecture1/800/1200",
    title: "Urban Solitude",
    location: "Tokyo, Japan",
    aspectRatio: "portrait",
  },
  {
    id: 2,
    url: "https://picsum.photos/seed/nature2/1200/800",
    title: "Mist & Mountain",
    location: "Swiss Alps",
    aspectRatio: "landscape",
  },
  {
    id: 3,
    url: "https://picsum.photos/seed/portrait3/800/1000",
    title: "Silent Gaze",
    location: "Studio A",
    aspectRatio: "portrait",
  },
  {
    id: 4,
    url: "https://picsum.photos/seed/abstract4/1000/1000",
    title: "Geometric Shadows",
    location: "Berlin, Germany",
    aspectRatio: "square",
  },
  {
    id: 5,
    url: "https://picsum.photos/seed/street5/1200/800",
    title: "Night Lights",
    location: "Hong Kong",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    url: "https://picsum.photos/seed/fashion6/800/1200",
    title: "Ethereal Flow",
    location: "Paris, France",
    aspectRatio: "portrait",
  },
  {
    id: 7,
    url: "https://picsum.photos/seed/nature7/1200/800",
    title: "Golden Hour",
    location: "Tuscany, Italy",
    aspectRatio: "landscape",
  },
  {
    id: 8,
    url: "https://picsum.photos/seed/minimal8/1000/1000",
    title: "White Space",
    location: "Copenhagen, Denmark",
    aspectRatio: "square",
  },
  {
    id: 9,
    url: "https://picsum.photos/seed/travel9/800/1200",
    title: "Ancient Paths",
    location: "Kyoto, Japan",
    aspectRatio: "portrait",
  },
];

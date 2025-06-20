export const players = [
  { id: "1", image: "/lauti.png", x: 0, y: 0 },
  { id: "2", image: "/jero.png", x: 0, y: 0 },
  { id: "3", image: "/mati.png", x: 0, y: 0 },
  { id: "4", image: "/joaco.png", x: 0, y: 0 },
  { id: "5", image: "/giuli.png", x: 0, y: 0 },
  { id: "6", image: "/agus.png", x: 0, y: 0 },
  { id: "7", image: "/elias.png", x: 0, y: 0 },
  { id: "8", image: "/tima.png", x: 0, y: 0 },
  { id: "9", image: "/pepa.png", x: 0, y: 0 },
  { id: "10", image: "/emi.png", x: 0, y: 0 },
];
export type Player = (typeof players)[number];
export type Point = { x: number; y: number };

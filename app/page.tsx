"use client";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClassValue } from "clsx";
import { useEffect, useRef, useState } from "react";
import { players as data, Player, Point } from "./players";
export default function Home() {
  const [players, setPlayers] = useState(data);

  const draggedId = useRef<string | null>(null);
  const startPosition = useRef<Point>({
    x: 0,
    y: 0,
  });
  const prevPointPosition = useRef<Point>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function onMove(e: PointerEvent) {
      e.preventDefault();
      if (!draggedId.current) return;

      const dx = e.clientX - prevPointPosition.current.x;
      const dy = e.clientY - prevPointPosition.current.y;

      setPlayers((prev) => {
        const updated = prev.map((p) =>
          p.id === draggedId.current
            ? {
                ...p,
                x: startPosition.current.x + dx,
                y: startPosition.current.y + dy,
              }
            : p
        );
        localStorage.setItem("players", JSON.stringify(updated));
        return updated;
      });
    }

    window.addEventListener("pointermove", onMove, { passive: false });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const existingPlayers = localStorage.getItem("players");
    if (existingPlayers) {
      const parsedP = JSON.parse(existingPlayers);
      if (parsedP.length === 7) {
        setPlayers(players);
        return;
      }
      setPlayers(JSON.parse(existingPlayers));
    }
  }, []);

  const handleClick = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    if (draggedId.current === id) {
      draggedId.current = null;
      return;
    }

    draggedId.current = id;
    prevPointPosition.current = { x: e.clientX, y: e.clientY };
    const { x, y } = players.find((p) => p.id === id)!;
    startPosition.current = { x, y };
  };
  return (
    <div className="relative h-screen w-screen z-0 bg-contain bg-[url(/field.jpg)] bg-no-repeat bg-center rotate-90 md:rotate-0 flex items-center justify-center origin-center">
      {players &&
        players.map((player) => {
          return (
            <Avatar key={player.id} player={player} handleClick={handleClick} />
          );
        })}
    </div>
  );
}

function Avatar({
  player,
  handleClick,
}: {
  player: Player;
  handleClick: (e: React.PointerEvent<HTMLDivElement>, id: string) => void;
}) {
  return (
    <div
      key={player.id}
      onPointerDown={(e) => handleClick(e, player.id)}
      className={cn(
        "md:w-20 w-10 md:h-20 flex justify-center items-center  bg-center bg-cover bg-no-repeat  -translate-y-1/2 h-10 bg-red-400 rounded-full",
        "cursor-grab active:cursor-grabbing select-none",
        "touch-none",
        "-rotate-90 md:rotate-0"
      )}
      style={{
        transform: `translate(${player.x}px, ${player.y}px)`,
        backgroundImage: `url(${player.image})`,
      }}
    ></div>
  );
}
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

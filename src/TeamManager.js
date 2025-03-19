import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function TeamManager() {
  const [players, setPlayers] = useState([
    { id: "1", name: "Player 1", position: "Fullback" },
    { id: "2", name: "Player 2", position: "Wing" },
    { id: "3", name: "Player 3", position: "Centre" },
    { id: "4", name: "Player 4", position: "Halfback" },
    { id: "5", name: "Player 5", position: "Five-Eighth" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = players.findIndex((p) => p.id === active.id);
      const newIndex = players.findIndex((p) => p.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedPlayers = [...players];
        const [movedPlayer] = updatedPlayers.splice(oldIndex, 1);
        updatedPlayers.splice(newIndex, 0, movedPlayer);
        setPlayers(updatedPlayers);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">U10 Rugby League Team</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={players} strategy={verticalListSortingStrategy}>
          {players.map((player) => (
            <SortableItem key={player.id} id={player.id}>
              <div className="p-2 bg-white rounded-lg shadow-md flex justify-between items-center">
                <span>{player.name}</span>
                <span className="text-gray-500">{player.position}</span>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

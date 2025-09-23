'use client';

import React from 'react';
import GameCard from '../card/GameCard';

interface Game {
  id: number;
  playerName: string;
  playerAvatar: string;
  category: string;
  categoryEmoji: string;
  score: string;
  isOnline: boolean;
  borderColor: string;
  finished?: boolean;
  status?: 'your_turn' | 'opponent_turn' | 'finished';
  result?: 'win' | 'lose' | 'draw' | 'timeout_win' | 'timeout_lose';
}

interface GameSectionProps {
  title: string;
  icon: React.ReactNode;
  games: Game[];
  onGameClick: (gameId: number) => void;
  disabled?: boolean;
  className?: string;
}

export default function GameSection({
  title,
  icon,
  games,
  onGameClick,
  disabled = false,
  className = ''
}: GameSectionProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <section className={`mb-10 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-1">
        {React.cloneElement(icon as React.ReactElement, {
          className: 'h-7 w-7 text-brand-accent'
        })}
        {title}
      </h2>
      <div className="space-y-5">
        {games.map((game) => (
          <GameCard
            key={game.id}
            playerName={game.playerName}
            playerAvatar={game.playerAvatar}
            category={game.category}
            categoryEmoji={game.categoryEmoji}
            score={game.score}
            isOnline={game.isOnline}
            borderColor={game.borderColor}
            disabled={disabled}
            finished={game.finished}
            status={game.status}
            result={game.result}
            onClick={() => onGameClick(game.id)}
          />
        ))}
      </div>
    </section>
  );
}

export type { Game, GameSectionProps };
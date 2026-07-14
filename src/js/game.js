import Archer from './characters/Archer.js';
import Warrior from './characters/Warrior.js';
import Mage from './characters/Mage.js';
import Dwarf from './characters/Dwarf.js';
import Crossbowman from './characters/Crossbowman.js';
import Demiurge from './characters/Demiurge.js';

export function play(players) {
  let deadPlayers = [];
  while (deadPlayers.length < players.length - 1) {
    players.forEach(player => {
      player.turn(players);
    });
    players.forEach(player => {
      if (player.isDead() & !deadPlayers.includes(player)) {
        deadPlayers.push(player);
      }
    })
  }

  const winner = players.find(player => player.isDead() === false);
  return winner;
}

export const players = [
  new Warrior(0, "Воин"),
  new Archer(2, "Лучшик"),
  new Mage(10, "Волшебник")
];
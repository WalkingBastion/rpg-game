import './css/style.css';
import { play, players } from './js/game.js';

console.log(`На битву входят...`);
players.forEach(player => {
  console.log(`${player.name} - ${player.position}`);
})
console.log(`Начинаем!`);
let winner = play(players);
console.log(`Побеждает ${winner.name}!`);
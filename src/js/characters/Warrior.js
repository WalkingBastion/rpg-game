import Player from './Player.js';
import Sword from '../weapons/Sword.js';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 120;
    this.initLife = 120;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.weapon = new Sword;
  }

  takeDamage(damage) {
    if (this.life < (this.initLife * 0.5) & this.getLuck() > 0.8 & this.magic != 0) {
      this.magic -= damage;

      if (this.magic < 0) {
        this.life += this.magic;
      }
    } else {
      this.life -= damage;
    }

    if (this.life < 0) {
      this.life = 0;
    }
    if (this.magic < 0) {
      this.magic = 0;
    }
  }
}
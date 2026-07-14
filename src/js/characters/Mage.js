import Player from './Player.js';
import Staff from '../weapons/Staff.js';

export default class Mage extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 70;
    this.initLife = 70;
    this.magic = 100;
    this.initMagic = 100;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.weapon = new Staff;
  }

  takeDamage(damage) {
    if (this.magic > (this.initMagic * 0.5)) {
      this.life -= damage / 2;
      this.magic -= 12;
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
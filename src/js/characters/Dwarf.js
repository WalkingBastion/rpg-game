import Warrior from './Warrior.js';
import Axe from '../weapons/Axe.js';

export default class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);

    this.life = 130;
    this.initLife = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.weapon = new Axe;

    this.hitTakenCount = 0;
  }

  takeDamage(damage) {
    if (this.hitTakenCount % 6 == 0 & this.getLuck() > 0.5) {
      damage = damage / 2;
    }

    super.takeDamage(damage);

    this.hitTakenCount += 1;
  }
}
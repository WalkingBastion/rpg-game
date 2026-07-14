import Mage from './Mage.js';
import StormStaff from '../weapons/StormStaff.js';

export default class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);

    this.life = 80;
    this.initLife = 80;
    this.magic = 120;
    this.initMagic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.weapon = new StormStaff;
  }

  getDamage(distance) {
    let damage = super.getDamage(distance);

    if (this.magic > 0 & this.getLuck() > 0.6) {
      damage = damage * 1.5;
    }

    return damage;
  }
}
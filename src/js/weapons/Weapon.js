export default class Weapons {
  constructor(name, attack, durability, range) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.initDurability = durability;
    this.range = range;
  }

  takeDamage(damage) {
    this.durability -= damage;
    if (this.durability < 0) {
      this.durability = 0;
    }
  }

  getDamage() {
    if (this.durability == 0) {
      return 0;
    }

    if (this.durability >= (this.initDurability * 0.3)) {
      return this.attack;
    } else {
      return this.attack / 2;
    }
  }

  isBroken() {
    if (this.durability == 0) {
      return true;
    } else {
      return false;
    }
  }
}
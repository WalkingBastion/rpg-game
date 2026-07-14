import Player from './Player.js';
import Bow from '../weapons/Bow.js';

export default class Archer extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 80;
    this.initLife = 80;
    this.magic = 35;
    this.initMagic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow;
  }

  getDamage(distance) {
    const weaponDamage = this.weapon.getDamage();
    const weaponRange = this.weapon.range;

    if (distance > weaponRange) {
      return 0;
    } else {
      return (this.attack + weaponDamage) * this.getLuck() * distance / weaponRange;
    }
  }

  moveAtRange(enemy) {
    let distance = enemy.position - this.position;
    const weaponRange = this.weapon.range;

    if (distance >= 0) {
      this.move(-weaponRange + distance);
    } else {
      this.move(weaponRange + distance);
    }

    return distance;
  }

  turn(players) {
    if (!this.isDead()) {
      const enemy = this.chooseEnemy(players);
      if (this.weapon instanceof Bow) {
        let distance = this.moveAtRange(enemy);
        const weaponRange = this.weapon.range;

        if (Math.abs(distance) < weaponRange) {
          console.log(`${this.name} отбегает от ${enemy.name} (${this.name} - ${this.position}; ${enemy.name} - ${enemy.position})`);
        } else {
          console.log(`${this.name} подходит к ${enemy.name} (${this.name} - ${this.position}; ${enemy.name} - ${enemy.position})`);
        }
      } else {
        this.moveToEnemy(enemy);
        console.log(`${this.name} подходит к ${enemy.name} (${this.name} - ${this.position}; ${enemy.name} - ${enemy.position})`);
      }
      this.tryAttack(enemy);
    }
  }
}
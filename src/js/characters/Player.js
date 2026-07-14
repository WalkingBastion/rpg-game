import Arm from '../weapons/Arm.js';
import Knife from '../weapons/Knife.js';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.initLife = 100;
    this.magic = 20;
    this.initMagic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm;
    this.position = position;
    this.name = name;
  }

  getLuck() {
    const randomNumber = Math.random() * 100;
    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    const weaponDamage = this.weapon.getDamage();
    const weaponRange = this.weapon.range;

    if (distance > weaponRange) {
      return 0;
    } else {
      return (this.attack + weaponDamage) * this.getLuck() / distance;
    }
  }

  takeDamage(damage) {
    this.life -= damage;
    if (this.life < 0) {
      this.life = 0;
    }
  }

  isDead() {
    if (this.life == 0) {
      return true;
    } else {
      return false;
    }
  }

  moveLeft(distance) {
    this.position -= Math.min(distance, this.speed);
  }

  moveRight(distance) {
    this.position += Math.min(distance, this.speed);
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    if (this.getLuck() > ((100 - this.luck) / 100)) {
      return true;
    } else {
      return false;
    }
  }

  dodged() {
    if (this.getLuck() > ((100 - this.agility - this.speed * 3) / 100)) {
      return true;
    } else {
      return false;
    }
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      console.log(`${this.name} блокирует атаку! Его оружие ${this.weapon.name} получает ${damage} урона.`);
      this.checkWeapon();
    } else if (!this.dodged()) {
      this.takeDamage(damage);
      console.log(`${this.name} получает ${damage} урона.`);
    } else {
      console.log(`${this.name} уклоняется от атаки.`);
    }
  }

  checkWeapon() {
    if (this.weapon.isBroken() & !(this.weapon instanceof Knife)) {
      const oldWeaponName = this.weapon.name;
      this.weapon = new Knife;
      console.log(`Оружие ${oldWeaponName} у ${this.name} сломалось! Он берет в руки ${this.weapon.name}.`);
    } else if (this.weapon.isBroken()) {
      const oldWeaponName = this.weapon.name;
      this.weapon = new Arm;
      console.log(`Оружие ${oldWeaponName} у ${this.name} сломалось! У него остались только Руки.`);
    }
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);
    const weaponRange = this.weapon.range;

    if (weaponRange >= distance) {
      console.log(`${this.name} атакует ${enemy.name}!`);
      this.weapon.takeDamage(10 * this.getLuck());
      if (distance == 0) {
        enemy.moveRight(1);
        enemy.takeAttack(this.getDamage(1) * 2);
        console.log(`${enemy.name} отлетает!`);
      } else {
        enemy.takeAttack(this.getDamage(distance));
      }

      if (enemy.isDead()) {
        console.log(`${enemy.name} погибает!`);
      }
    } else {
      console.log(`${this.name} пытается атаковать ${enemy.name}, но не достает`);
    }
  }

  chooseEnemy(players) {
    let target;
    let minLife = 9999;

    players.forEach(enemy => {
      if (enemy !== this & enemy.life < minLife & !enemy.isDead()) {
        minLife = enemy.life;
        target = enemy;
      }
    })

    return target;
  }

  moveToEnemy(enemy) {
    this.move(enemy.position - this.position);
  }

  turn(players) {
    if (!this.isDead()) {
      const enemy = this.chooseEnemy(players);
      this.moveToEnemy(enemy);
      console.log(`${this.name} подходит к ${enemy.name} (${this.name} - ${this.position}; ${enemy.name} - ${enemy.position})`);
      this.tryAttack(enemy);
    }
  }
}
const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
      {
          "name": "Удар когтистой лапой",
          "physicalDmg": 3,           // физический урон
          "magicDmg": 0,              // магический урон
          "physicArmorPercents": 20,  // физическая броня
          "magicArmorPercents": 20,   // магическая броня
          "cooldown": 0               // ходов на восстановление
      },
      {
          "name": "Огненное дыхание",
          "physicalDmg": 0,
          "magicDmg": 4,
          "physicArmorPercents": 0,
          "magicArmorPercents": 0,
          "cooldown": 3
      },
      {
          "name": "Удар хвостом",
          "physicalDmg": 2,
          "magicDmg": 0,
          "physicArmorPercents": 50,
          "magicArmorPercents": 0,
          "cooldown": 2
      },
  ]
}

const hero = {
  name: "Боевой маг Евстафий",
  moves: [
    {
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 50,
        "cooldown": 0
    },
    {
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 4
    },
    {
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 3
    },
    {
        "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmorPercents": 100,
        "magicArmorPercents": 100,
        "cooldown": 4
    },
  ]
}

// Здоровье игрока
function getdifficulty() {
  hero.health = prompt("Выберите сложность (здоровье)");

  if (hero.health === null) alert("Отмена игры.");

  if (isNaN(Number(hero.health))) {
    alert("Введено некорректное значение здоровья. Здоровье приравнивается дефолтному значению - 10.");
    hero.health = 10;
  }
}

document.body.onload = getdifficulty;

let str = "";

document.getElementById("submit").onclick = function() {
  str = document.getElementById("input").value.toLocaleLowerCase();

  play();

  document.getElementById("input").value = "";
}

function getHeroMove() {

  if (str === "Удар боевым кадилом".toLocaleLowerCase()) {
    str = '0';
  }
  else if (str === "Вертушка левой пяткой".toLocaleLowerCase()) {
    str = '1';
  }
  else if (str === "Каноничный фаербол".toLocaleLowerCase()) {
    str = '2';
  }
  else if (str === "Магический блок".toLocaleLowerCase()) {
    str = '3';
  }

  if (Number(str) > 3 || Number(str) < 0 || isNaN(Number(str))) {
    alert("Действие недоступно");
    return undefined;
  }

  return Number(str);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Взаимное нанесение урона
function dealDamage(heroMove, monsterMove) {
  // Вычисление здоровья монстра
  monster.maxHealth -= (hero.moves[heroMove]["physicalDmg"] * (1-monster.moves[monsterMove]["physicArmorPercents"]/100)
                  + hero.moves[heroMove]["magicDmg"] * (1-monster.moves[monsterMove]["magicArmorPercents"]/100));
  
  // Вычисление здоровья героя
  hero.health -= (monster.moves[monsterMove]["physicalDmg"] * (1-hero.moves[heroMove]["physicArmorPercents"]/100)
              + monster.moves[monsterMove]["magicDmg"] * (1-hero.moves[heroMove]["magicArmorPercents"]/100));
}

function play() {
  let monsterMove = getRandomInt(0, monster.moves.length);  // Получаем номер действия Лютого
  let heroMove = getHeroMove();                             // Номер действия игрока

  if (heroMove === undefined) return null;

  dealDamage(heroMove, monsterMove);                        // Нанесение урона

  let pH = document.createElement("p");                     // Создаём информационные параграфы
  let pM = document.createElement("p");
  let healthMes = document.createElement("p");

  pH.style.marginTop = 50;

  pH.innerHTML = `Действие героя: ${hero.moves[heroMove]["name"]}`;
  pM.innerHTML = `Действие Лютого: ${monster.moves[monsterMove]["name"]}`;
  healthMes.innerHTML = `У героя осталось ${hero.health} здоровья, у Лютого - ${monster.maxHealth}`;

  document.body.appendChild(pH);
  document.body.appendChild(pM);
  document.body.appendChild(healthMes);

  // Завершение игры
  if (monster.maxHealth <= 0 && hero.health <= 0) {
    alert("Погибли оба");
    return 1;
  }
  else if (monster.maxHealth <= 0) {
    alert("Герой выйграл");
    return 1;
  }
  else if (hero.health <= 0) {
    alert("Монстр победил");
    return 1;
  }
}
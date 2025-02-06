#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const path = require('path');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arr = argv._;

console.log(
  '-------------------------Описание---------------------------- \n-------------------------------------------------------------'
);

console.log(
  'Запускаем игру коммандой luck. \nЕсли после команды написать имя файла (например log.txt), \nто в него будут записаны все Ваши ходы.'
);
console.log('машина загадывает орел или решку, Вы отгадываете');
console.log('играем 10 раундов');

let Log_file = path.join(__dirname, `./${arr[0]}`);
fs.writeFile(Log_file, new Date().toString(), (err) => {
  if (err) console.err(err);
});

let task_0;
let task;
let i = 0;
counter_machine = 0;
counter_player = 0;
let answer_corrected;
let isCorrect;

function answer_correction(answer) {
  answer = answer.toLowerCase();
  if (answer == 'решку') {
    answer = 'решка';
  }
  if (answer == 'орла') {
    answer = 'орел';
  }

  if (answer == 'решка' || answer == 'орел') {
    isCorrect = true;
  } else {
    isCorrect = false;
  }

  answer_corrected = answer;
}

function incorrectAnswer() {
  console.log(
    `неправильный ввод - принимаются ответы : \n орел, решка \n орла,решку \n можно заглавными буквами, можно строчными`
  );
}

function guess() {
  if (isCorrect == true) {
    task_0 = Math.random(1);
    if (task_0 <= 0.5) {
      task = 'орел';
    } else task = 'решка';
  }

  rl.question(
    `\nЯ загадала. Отгдайте, я загадала "орла" или "решку?" : `,
    (answer) => {
      answer_correction(answer);
      if (!isCorrect) {
        incorrectAnswer();
        guess();
      }
      if (answer_corrected == task && isCorrect) {
        counter_player++;
        if (counter_machine > counter_player) {
          console.log(
            `Верно! Счет: ${counter_player}:${counter_machine} в мою пользу `
          );
          fs.appendFile(
            Log_file,
            `\nВерно! Счет: ${counter_player}:${counter_machine} в мою пользу `,
            (err) => {
              if (err) console.err(err);
            }
          );
        }
        if (counter_machine < counter_player) {
          console.log(
            `Верно! счет: ${counter_player}:${counter_machine} в Вашу пользу `
          );
          fs.appendFile(
            Log_file,
            `\nВерно! Счет: ${counter_player}:${counter_machine} в Вашу пользу `,
            (err) => {
              if (err) console.err(err);
            }
          );
        }
        if (counter_machine == counter_player) {
          console.log(`Верно! счет: ${counter_player}:${counter_machine}  `);
          fs.appendFile(
            Log_file,
            `\nВерно! Счет: ${counter_player}:${counter_machine}  `,
            (err) => {
              if (err) console.err(err);
            }
          );
        }
      }
      if (answer_corrected !== task && isCorrect) {
        counter_machine++;
        if (counter_machine > counter_player) {
          console.log(
            `Неверно! Счет: ${counter_player}:${counter_machine} в мою пользу `
          );

          fs.appendFile(
            Log_file,
            `\nНеверно! Счет: ${counter_player}:${counter_machine} в мою пользу `,
            (err) => {
              if (err) console.err(err);
            }
          );
        }
        if (counter_machine < counter_player) {
          console.log(
            `Неверно! счет: ${counter_player}:${counter_machine} в Вашу пользу `
          );

          fs.appendFile(
            Log_file,
            `\nНеверно! Счет: ${counter_player}:${counter_machine} в Вашу пользу `,
            (err) => {
              if (err) console.err(err);
            }
          );
        }
        if (counter_machine == counter_player) {
          console.log(`Верно! счет: ${counter_player}:${counter_machine}  `);
          fs.appendFile(
            Log_file,
            `\nНеверно! Счет: ${counter_player}:${counter_machine} `,
            (err) => {
              if (err) console.err(err);
            }
          );
        }
      }
      if (i == 9) {
        console.log(`\n\n`);
        if (counter_machine > counter_player) {
          console.log(
            `Итоговый счет: ${counter_player}:${counter_machine} в пользу МАШИНЫ \n `
          );
          fs.appendFile(
            Log_file,
            `\nИтоговый счет: ${counter_player}:${counter_machine} в пользу МАШИНЫ`,
            (err) => {
              if (err) console.err(err);
              fs.appendFile(Log_file, `\n${new Date().toString()}`, (err) => {
                if (err) console.err(err);
              });
            }
          );
        }
        if (counter_machine < counter_player) {
          console.log(
            `Итоговый счет: ${counter_player}:${counter_machine} в пользу ЧЕЛОВЕКА \n `
          );
          fs.appendFile(
            Log_file,
            `\nИтоговый счет: ${counter_player}:${counter_machine} в пользу ЧЕЛОВЕКА`,
            (err) => {
              if (err) console.err(err);
              fs.appendFile(Log_file, `\n${new Date().toString()}`, (err) => {
                if (err) console.err(err);
              });
            }
          );
        }
        if (counter_machine == counter_player) {
          console.log(
            `Итоговый счет: НИЧЬЯ. ${counter_player}:${counter_machine} `
          );
          fs.appendFile(
            Log_file,
            `\nИтоговый счет: НИЧЬЯ. ${counter_player}:${counter_machine}`,
            (err) => {
              if (err) console.err(err);
              fs.appendFile(Log_file, `\n${new Date().toString()}`, (err) => {
                if (err) console.err(err);
              });
            }
          );
        }
        return rl.close();
      }
      if (isCorrect) {
        i++;
      }
      guess();
    }
  );
}

guess();

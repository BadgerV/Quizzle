import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from './question-model';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogicService {
  level = 0;
  selectLevelTimer: number = 10;
  selectLevelTimerChanged: Subject<number> = new Subject();
  scoreArray: number[] = [];
  questionInterval: any;
  noOfTimesOfSameAnswer: number[] = [];
  // scoreSubject: Subject<number> = new Subject();

  noOfMisses!: number;

  questionDuration: number = 15;
  anotherQuestionDuration: number = 15;
  questionTimerChanged: Subject<number> = new Subject();
  alertToChangeQuestion: Subject<boolean> = new Subject();

  countdownSubscription!: Subscription;

  listOfQuestions: Question[] = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'Berlin', 'Rome', 'London'],
      correctOption: 'Paris',
    },
    {
      question: 'Who wrote the play "Romeo and Juliet"?',
      options: [
        'William Shakespeare',
        'Charles Dickens',
        'Jane Austen',
        'Mark Twain',
      ],
      correctOption: 'William Shakespeare',
    },
    {
      question: 'What is the chemical symbol for water?',
      options: ['H2O', 'CO2', 'NaCl', 'O2'],
      correctOption: 'H2O',
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'Mount Kilimanjaro', 'K2', 'Kangchenjunga'],
      correctOption: 'Mount Everest',
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: [
        'Leonardo da Vinci',
        'Pablo Picasso',
        'Vincent van Gogh',
        'Michelangelo',
      ],
      correctOption: 'Leonardo da Vinci',
    },
    {
      question: 'What is the currency of Japan?',
      options: ['Yen', 'Euro', 'Dollar', 'Pound'],
      correctOption: 'Yen',
    },
    {
      question: 'Who discovered penicillin?',
      options: [
        'Alexander Fleming',
        'Louis Pasteur',
        'Marie Curie',
        'Robert Koch',
      ],
      correctOption: 'Alexander Fleming',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      correctOption: 'Mars',
    },
    {
      question: 'What is the largest mammal in the world?',
      options: ['Blue whale', 'Elephant', 'Giraffe', 'Hippopotamus'],
      correctOption: 'Blue whale',
    },
    {
      question: 'Who wrote "To Kill a Mockingbird"?',
      options: [
        'Harper Lee',
        'J.K. Rowling',
        'Stephen King',
        'F. Scott Fitzgerald',
      ],
      correctOption: 'Harper Lee',
    },
    {
      question: 'What is the smallest country in the world?',
      options: ['Vatican City', 'Monaco', 'San Marino', 'Maldives'],
      correctOption: 'Vatican City',
    },
    {
      question: 'Who was the first man to step on the moon?',
      options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'John Glenn'],
      correctOption: 'Neil Armstrong',
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: [
        'Pacific Ocean',
        'Atlantic Ocean',
        'Indian Ocean',
        'Arctic Ocean',
      ],
      correctOption: 'Pacific Ocean',
    },
    {
      question: 'What is the hardest natural substance on Earth?',
      options: ['Diamond', 'Graphite', 'Quartz', 'Corundum'],
      correctOption: 'Diamond',
    },
    {
      question: 'Who was the first woman to win a Nobel Prize?',
      options: [
        'Marie Curie',
        'Mother Teresa',
        'Rosalind Franklin',
        'Jane Goodall',
      ],
      correctOption: 'Marie Curie',
    },
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Fe', 'Hg'],
      correctOption: 'Au',
    },
    {
      question: 'Which country is famous for the Great Barrier Reef?',
      options: ['Australia', 'Brazil', 'Indonesia', 'Philippines'],
      correctOption: 'Australia',
    },
    {
      question: 'What is the largest organ in the human body?',
      options: ['Skin', 'Liver', 'Heart', 'Brain'],
      correctOption: 'Skin',
    },
    {
      question: 'Who painted the ceiling of the Sistine Chapel?',
      options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
      correctOption: 'Michelangelo',
    },
    {
      question: 'What is the chemical symbol for sodium?',
      options: ['Na', 'Sn', 'Si', 'Ne'],
      correctOption: 'Na',
    },
    {
      question: 'Who is known as the father of modern physics?',
      options: [
        'Albert Einstein',
        'Isaac Newton',
        'Galileo Galilei',
        'Max Planck',
      ],
      correctOption: 'Albert Einstein',
    },
    {
      question: 'What is the chemical symbol for oxygen?',
      options: ['O', 'O2', 'O3', 'H2O'],
      correctOption: 'O',
    },
    {
      question:
        'Which planet is known as the "Morning Star" or "Evening Star"?',
      options: ['Venus', 'Mars', 'Mercury', 'Jupiter'],
      correctOption: 'Venus',
    },
    {
      question: 'What is the boiling point of water in Celsius?',
      options: ['100°C', '0°C', '50°C', '-100°C'],
      correctOption: '100°C',
    },
    {
      question: 'Who invented the telephone?',
      options: [
        'Alexander Graham Bell',
        'Thomas Edison',
        'Nikola Tesla',
        'Guglielmo Marconi',
      ],
      correctOption: 'Alexander Graham Bell',
    },
    {
      question: 'What is the chemical symbol for silver?',
      options: ['Ag', 'Au', 'Si', 'Fe'],
      correctOption: 'Ag',
    },
    {
      question: 'Which country is famous for the pyramids of Giza?',
      options: ['Egypt', 'Greece', 'Italy', 'Turkey'],
      correctOption: 'Egypt',
    },
    {
      question: 'Who wrote the novel "1984"?',
      options: [
        'George Orwell',
        'F. Scott Fitzgerald',
        'Ernest Hemingway',
        'Aldous Huxley',
      ],
      correctOption: 'George Orwell',
    },
    {
      question: 'What is the capital of Brazil?',
      options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Buenos Aires'],
      correctOption: 'Brasília',
    },
    {
      question: "Which element is the most abundant in Earth's atmosphere?",
      options: ['Nitrogen', 'Oxygen', 'Carbon', 'Helium'],
      correctOption: 'Nitrogen',
    },
    {
      question: 'Who painted the famous painting "Starry Night"?',
      options: [
        'Vincent van Gogh',
        'Pablo Picasso',
        'Leonardo da Vinci',
        'Claude Monet',
      ],
      correctOption: 'Vincent van Gogh',
    },
    {
      question: 'What is the chemical symbol for iron?',
      options: ['Fe', 'Ir', 'In', 'Au'],
      correctOption: 'Fe',
    },
    {
      question: 'What is the largest organ in the human body?',
      options: ['Skin', 'Heart', 'Liver', 'Brain'],
      correctOption: 'Skin',
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ['Nitrogen', 'Oxygen', 'Carbon dioxide', 'Argon'],
      correctOption: 'Nitrogen',
    },
    {
      question: 'Who wrote the novel "The Great Gatsby"?',
      options: [
        'F. Scott Fitzgerald',
        'Ernest Hemingway',
        'William Faulkner',
        'John Steinbeck',
      ],
      correctOption: 'F. Scott Fitzgerald',
    },
    {
      question: 'What is the largest desert in the world?',
      options: ['Antarctica', 'Sahara', 'Arabian Desert', 'Gobi Desert'],
      correctOption: 'Antarctica',
    },
    {
      question: 'Which country is known as the "Land of the Rising Sun"?',
      options: ['Japan', 'China', 'South Korea', 'Vietnam'],
      correctOption: 'Japan',
    },
    {
      question: 'Who discovered penicillin?',
      options: [
        'Alexander Fleming',
        'Louis Pasteur',
        'Marie Curie',
        'Robert Koch',
      ],
      correctOption: 'Alexander Fleming',
    },
    {
      question: 'What is the longest river in the world?',
      options: ['Nile', 'Amazon', 'Mississippi', 'Yangtze'],
      correctOption: 'Nile',
    },
    {
      question: 'What is the chemical symbol for sodium?',
      options: ['Na', 'So', 'Sn', 'Nb'],
      correctOption: 'Na',
    },
  ];
  constructor() {}

  resetLevelTimer() {
    this.selectLevelTimer = 10;
  }

  startDifficultyCountdown() {
    const countdownInterval = interval(1000);
    let countdownSubscription: Subscription;

    countdownSubscription = countdownInterval.subscribe(() => {
      if (this.selectLevelTimer >= 0) {
        this.selectLevelTimerChanged.next(this.selectLevelTimer--);
      } else {
        this.level = 1;
        countdownSubscription.unsubscribe();
      }
    });
  }

  getDifficultyTimer() {
    return this.selectLevelTimer;
  }
  getRandomItemsFromArray(
    array: Question[],
    numberOfItems: number
  ): Question[] {
    const shuffledArray = array.sort(() => Math.random() - 0.5); // Shuffle the array
    return shuffledArray.slice(0, numberOfItems); // Take the first numberOfItems elements
  }

  getRandomQuestions() {
    const randomQuestions = this.getRandomItemsFromArray(
      this.listOfQuestions,
      15
    );

    return randomQuestions;
  }

  resetScore() {
    this.scoreArray = [];
  }

  checkForCorrectAnswer(
    question: Question,
    selectedOption: string,
    timeAnswered: number,
    level: number = this.anotherQuestionDuration
  ) {
    const timeBonus = 20 - timeAnswered;

    if (question.correctOption === selectedOption) {
      switch (level) {
        case 15:
          this.scoreArray.push(timeBonus * 5);
          break;
        case 10:
          this.scoreArray.push(timeBonus * 7);
          break;
        case 5:
          this.scoreArray.push(timeBonus * 9);
          break;
        case 3:
          this.scoreArray.push(timeBonus * 11);
          break;
        default:
          break;
      }
    } else {
      this.scoreArray.push(-10 * timeAnswered);
    }
  }

  temp: number = 0;

  checkForCheaters(i: number) {
    if (this.noOfTimesOfSameAnswer.length === 0) {
      this.noOfTimesOfSameAnswer.push(i);
    } else if (this.noOfTimesOfSameAnswer[0] === i) {
      this.noOfTimesOfSameAnswer.push(i);
    } else {
      this.noOfTimesOfSameAnswer.splice(0, this.noOfTimesOfSameAnswer.length);
    }

    if (this.noOfTimesOfSameAnswer.length >= 2) {
      this.scoreArray.push(-200);
    }
    console.log(this.noOfTimesOfSameAnswer);
  }
  increaseLevel() {
    this.level++;
  }

  getLevel() {
    return this.level;
  }

  getQuestionTimer() {
    return this.anotherQuestionDuration;
  }

  getScore() {
    return this.scoreArray.reduce((acc, prev) => acc + prev);
  }

  countDownAndProceed() {
    const countdownInterval = interval(100);

    this.countdownSubscription = countdownInterval.subscribe(() => {
      if (this.questionDuration >= 0.1) {
        this.questionDuration -= 0.1;
        this.questionTimerChanged.next(this.questionDuration);
      } else {
        this.alertToChangeQuestion.next(true);
        this.resetQuestionCountdown();
        this.scoreArray.push(-15);
      }
    });
  }

  resetQuestionCountdown() {
    clearInterval(this.questionInterval);
    this.questionDuration = this.anotherQuestionDuration;
  }

  setQuestionDuration(num: number): void {
    this.level = 1;
    this.questionDuration = num;
    this.anotherQuestionDuration = num;
  }

  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  unsubscribeFromCouter() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from './question-model';
import { interval, Subscription } from 'rxjs';
import { ApiService } from './api.service';

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

  constructor(private apiService: ApiService) {}

  noOfMisses!: number;

  questionDuration: number = 20;
  anotherQuestionDuration: number = 20;
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
    {
      question: 'What is the capital of Australia?',
      options: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
      correctOption: 'Canberra',
    },
    {
      question: 'Who wrote the novel "War and Peace"?',
      options: [
        'Leo Tolstoy',
        'Fyodor Dostoevsky',
        'Anton Chekhov',
        'Nikolai Gogol',
      ],
      correctOption: 'Leo Tolstoy',
    },
    {
      question: 'What is the chemical symbol for potassium?',
      options: ['K', 'P', 'Ko', 'Ka'],
      correctOption: 'K',
    },
    {
      question: 'What is the largest moon of Saturn?',
      options: ['Titan', 'Enceladus', 'Mimas', 'Rhea'],
      correctOption: 'Titan',
    },
    {
      question: 'Who painted the famous artwork "The Last Supper"?',
      options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
      correctOption: 'Leonardo da Vinci',
    },
    {
      question: 'What is the fastest land animal?',
      options: ['Cheetah', 'Lion', 'Gazelle', 'Leopard'],
      correctOption: 'Cheetah',
    },
    {
      question: 'Who is known as the "Father of Geometry"?',
      options: ['Euclid', 'Pythagoras', 'Archimedes', 'Aristotle'],
      correctOption: 'Euclid',
    },
    {
      question: 'What is the chemical symbol for nitrogen?',
      options: ['N', 'Ni', 'No', 'Ne'],
      correctOption: 'N',
    },
    {
      question: 'Which river is the longest in South America?',
      options: ['Amazon', 'Orinoco', 'Paraná', 'Magdalena'],
      correctOption: 'Amazon',
    },
    {
      question: 'Who wrote the novel "The Catcher in the Rye"?',
      options: [
        'J.D. Salinger',
        'Ernest Hemingway',
        'F. Scott Fitzgerald',
        'John Steinbeck',
      ],
      correctOption: 'J.D. Salinger',
    },
    {
      question: 'What is the largest planet in the solar system?',
      options: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
      correctOption: 'Jupiter',
    },
    {
      question: 'Who wrote the play "The Importance of Being Earnest"?',
      options: [
        'Oscar Wilde',
        'George Bernard Shaw',
        'Tennessee Williams',
        'Arthur Miller',
      ],
      correctOption: 'Oscar Wilde',
    },
    {
      question: 'What is the chemical symbol for tin?',
      options: ['Sn', 'Ti', 'Ta', 'Te'],
      correctOption: 'Sn',
    },
    {
      question: 'What is the capital of South Korea?',
      options: ['Seoul', 'Busan', 'Incheon', 'Daegu'],
      correctOption: 'Seoul',
    },
    {
      question: 'Who painted the famous artwork "The Scream"?',
      options: [
        'Edvard Munch',
        'Pablo Picasso',
        'Vincent van Gogh',
        'Claude Monet',
      ],
      correctOption: 'Edvard Munch',
    },
    {
      question: 'What is the fastest bird in the world?',
      options: [
        'Peregrine Falcon',
        'Golden Eagle',
        'Ostrich',
        'Emperor Penguin',
      ],
      correctOption: 'Peregrine Falcon',
    },
    {
      question: 'Who discovered the theory of general relativity?',
      options: [
        'Albert Einstein',
        'Isaac Newton',
        'Galileo Galilei',
        'Max Planck',
      ],
      correctOption: 'Albert Einstein',
    },
    {
      question: 'What is the chemical symbol for mercury?',
      options: ['Hg', 'Me', 'He', 'Ma'],
      correctOption: 'Hg',
    },
    {
      question: 'Which river is the longest in Europe?',
      options: ['Volga', 'Danube', 'Rhine', 'Thames'],
      correctOption: 'Volga',
    },
    {
      question: 'Who wrote the novel "One Hundred Years of Solitude"?',
      options: [
        'Gabriel García Márquez',
        'Mario Vargas Llosa',
        'Julio Cortázar',
        'Pablo Neruda',
      ],
      correctOption: 'Gabriel García Márquez',
    },
    {
      question: 'Who wrote the novel "The Adventures of Huckleberry Finn"?',
      options: [
        'Mark Twain',
        'Charles Dickens',
        'Jane Austen',
        'F. Scott Fitzgerald',
      ],
      correctOption: 'Mark Twain',
    },
    {
      question: 'What is the chemical symbol for lead?',
      options: ['Pb', 'Ld', 'Pl', 'Le'],
      correctOption: 'Pb',
    },
    {
      question: 'What is the currency of China?',
      options: ['Yuan', 'Yen', 'Euro', 'Dollar'],
      correctOption: 'Yuan',
    },
    {
      question: 'Who is often credited with discovering America?',
      options: [
        'Christopher Columbus',
        'Amerigo Vespucci',
        'Ferdinand Magellan',
        'Vasco da Gama',
      ],
      correctOption: 'Christopher Columbus',
    },
    {
      question: 'What is the chemical symbol for potassium?',
      options: ['K', 'P', 'Ko', 'Ka'],
      correctOption: 'K',
    },
    {
      question: 'Who painted the famous artwork "The Birth of Venus"?',
      options: [
        'Sandro Botticelli',
        'Leonardo da Vinci',
        'Michelangelo',
        'Raphael',
      ],
      correctOption: 'Sandro Botticelli',
    },
    {
      question: 'Which animal is known as the "King of the Jungle"?',
      options: ['Lion', 'Tiger', 'Leopard', 'Cheetah'],
      correctOption: 'Lion',
    },
    {
      question: 'What is the chemical symbol for silver?',
      options: ['Ag', 'Au', 'Pt', 'Sn'],
      correctOption: 'Ag',
    },
    {
      question: 'Who wrote the novel "Dracula"?',
      options: [
        'Bram Stoker',
        'Mary Shelley',
        'Edgar Allan Poe',
        'Oscar Wilde',
      ],
      correctOption: 'Bram Stoker',
    },
    {
      question: 'What is the largest planet in the solar system?',
      options: ['Jupiter', 'Saturn', 'Neptune', 'Uranus'],
      correctOption: 'Jupiter',
    },
    {
      question: 'What is the chemical symbol for potassium?',
      options: ['K', 'P', 'Ko', 'Ka'],
      correctOption: 'K',
    },
    {
      question: 'Who wrote the novel "The Picture of Dorian Gray"?',
      options: [
        'Oscar Wilde',
        'Jane Austen',
        'Emily Brontë',
        'F. Scott Fitzgerald',
      ],
      correctOption: 'Oscar Wilde',
    },
    {
      question: 'What is the capital of Brazil?',
      options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Buenos Aires'],
      correctOption: 'Brasília',
    },
    {
      question: 'Who painted the famous artwork "The Starry Night"?',
      options: [
        'Vincent van Gogh',
        'Pablo Picasso',
        'Leonardo da Vinci',
        'Claude Monet',
      ],
      correctOption: 'Vincent van Gogh',
    },
    {
      question: 'What is the chemical symbol for mercury?',
      options: ['Hg', 'Me', 'He', 'Ma'],
      correctOption: 'Hg',
    },
    {
      question: 'Which country is famous for the Great Barrier Reef?',
      options: ['Australia', 'Brazil', 'Indonesia', 'Philippines'],
      correctOption: 'Australia',
    },
    {
      question: 'Who is credited with the invention of the light bulb?',
      options: [
        'Thomas Edison',
        'Nikola Tesla',
        'Alexander Graham Bell',
        'James Watt',
      ],
      correctOption: 'Thomas Edison',
    },
    {
      question: 'What is the chemical symbol for oxygen?',
      options: ['O', 'O2', 'O3', 'H2O'],
      correctOption: 'O',
    },
    {
      question: 'Who wrote the novel "To Kill a Mockingbird"?',
      options: [
        'Harper Lee',
        'J.K. Rowling',
        'Stephen King',
        'F. Scott Fitzgerald',
      ],
      correctOption: 'Harper Lee',
    },
    {
      question: 'What is the largest desert in the world?',
      options: ['Antarctica', 'Sahara', 'Arabian Desert', 'Gobi Desert'],
      correctOption: 'Antarctica',
    },
    {
      question: 'What color is the sky on a clear day?',
      options: ['Blue', 'Red', 'Green', 'Yellow'],
      correctOption: 'Blue',
    },
    {
      question: 'How many days are in a week?',
      options: ['7', '5', '10', '12'],
      correctOption: '7',
    },
    {
      question: 'What is the opposite of "hot"?',
      options: ['Cold', 'Warm', 'Freezing', 'Cool'],
      correctOption: 'Cold',
    },
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      correctOption: 'Paris',
    },
    {
      question: 'Which animal is known as "man\'s best friend"?',
      options: ['Dog', 'Cat', 'Fish', 'Bird'],
      correctOption: 'Dog',
    },
    {
      question: 'How many continents are there on Earth?',
      options: ['7', '5', '3', '9'],
      correctOption: '7',
    },
    {
      question: 'What is the result of adding 2 and 2?',
      options: ['4', '5', '3', '6'],
      correctOption: '4',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Jupiter', 'Mars', 'Earth', 'Saturn'],
      correctOption: 'Jupiter',
    },
    {
      question: 'What is the primary language spoken in Japan?',
      options: ['Japanese', 'Chinese', 'Korean', 'Thai'],
      correctOption: 'Japanese',
    },
    {
      question: 'What color are bananas when they are ripe?',
      options: ['Yellow', 'Green', 'Red', 'Orange'],
      correctOption: 'Yellow',
    },
    {
      question: 'How many legs does a cat typically have?',
      options: ['4', '6', '8', '2'],
      correctOption: '4',
    },
    {
      question: 'What is the opposite of "day"?',
      options: ['Night', 'Morning', 'Afternoon', 'Evening'],
      correctOption: 'Night',
    },
    {
      question: 'What is the color of a ripe tomato?',
      options: ['Red', 'Green', 'Yellow', 'Orange'],
      correctOption: 'Red',
    },
    {
      question: 'Which season comes after winter?',
      options: ['Spring', 'Summer', 'Autumn', 'Winter again'],
      correctOption: 'Spring',
    },
    {
      question: 'What is the shape of a soccer ball?',
      options: ['Round', 'Square', 'Triangle', 'Oval'],
      correctOption: 'Round',
    },
    {
      question: 'What is the tallest animal on land?',
      options: ['Giraffe', 'Elephant', 'Lion', 'Zebra'],
      correctOption: 'Giraffe',
    },
    {
      question: 'What is the result of dividing 10 by 2?',
      options: ['5', '2', '8', '10'],
      correctOption: '5',
    },
    {
      question: 'Which direction does the sun rise from?',
      options: ['East', 'West', 'North', 'South'],
      correctOption: 'East',
    },
    {
      question: 'What is the main ingredient in bread?',
      options: ['Flour', 'Sugar', 'Salt', 'Water'],
      correctOption: 'Flour',
    },
    {
      question: 'What is the opposite of "big"?',
      options: ['Small', 'Large', 'Huge', 'Giant'],
      correctOption: 'Small',
    },
    {
      question: 'What is the capital of Canada?',
      options: ['Ottawa', 'Toronto', 'Montreal', 'Vancouver'],
      correctOption: 'Ottawa',
    },
    {
      question: 'Who is the author of "Pride and Prejudice"?',
      options: [
        'Jane Austen',
        'Charlotte Brontë',
        'Emily Dickinson',
        'Leo Tolstoy',
      ],
      correctOption: 'Jane Austen',
    },
    {
      question: 'What is the chemical symbol for helium?',
      options: ['He', 'H', 'Ha', 'Ho'],
      correctOption: 'He',
    },
    {
      question: 'Which planet is closest to the sun?',
      options: ['Mercury', 'Venus', 'Earth', 'Mars'],
      correctOption: 'Mercury',
    },
    {
      question: 'Who wrote the play "Macbeth"?',
      options: [
        'William Shakespeare',
        'Christopher Marlowe',
        'George Bernard Shaw',
        'Oscar Wilde',
      ],
      correctOption: 'William Shakespeare',
    },
    {
      question: 'What is the currency of the United Kingdom?',
      options: ['Pound Sterling', 'Euro', 'Dollar', 'Yen'],
      correctOption: 'Pound Sterling',
    },
    {
      question: 'Who discovered the theory of relativity?',
      options: [
        'Albert Einstein',
        'Isaac Newton',
        'Galileo Galilei',
        'Niels Bohr',
      ],
      correctOption: 'Albert Einstein',
    },
    {
      question: 'What is the chemical symbol for carbon?',
      options: ['C', 'Co', 'Ca', 'Cr'],
      correctOption: 'C',
    },
    {
      question: 'Which country is known as the "Land of the Rising Sun"?',
      options: ['Japan', 'China', 'South Korea', 'Thailand'],
      correctOption: 'Japan',
    },
    {
      question: 'Who painted the famous artwork "The Persistence of Memory"?',
      options: [
        'Salvador Dalí',
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
      ],
      correctOption: 'Salvador Dalí',
    },
    {
      question: "What is the world's population in 2024 (approximate)?",
      options: ['7.9 billion', '8.2 billion', '8.5 billion', '8.8 billion'],
      correctOption: '8.0 billion',
    },
    {
      question: 'What is the smallest planet in our solar system?',
      options: ['Mercury', 'Venus', 'Earth', 'Mars'],
      correctOption: 'Mercury',
    },
    {
      question: 'What is the largest mammal on Earth?',
      options: ['Blue Whale', 'African Elephant', 'Giraffe', 'Hippopotamus'],
      correctOption: 'Blue Whale',
    },
    {
      question: 'What is the tallest building in the world?',
      options: [
        'Burj Khalifa',
        'Shanghai Tower',
        'Abraj Al-Bait Clock Tower',
        'Makkah Royal Clock Tower Hotel',
      ],
      correctOption: 'Burj Khalifa',
    },
    {
      question: 'What is the longest river in the world?',
      options: [
        'Nile River',
        'Amazon River',
        'Yangtze River',
        'Mississippi River',
      ],
      correctOption: 'Nile River',
    },
    {
      question: 'What is the most populated city in the world?',
      options: ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo'],
      correctOption: 'Tokyo',
    },
    {
      question:
        'What year did the Wright brothers achieve the first sustained, controlled flight?',
      options: ['1901', '1903', '1905', '1907'],
      correctOption: '1903',
    },
    {
      question: 'What is the chemical element with the atomic number 6?',
      options: ['Carbon', 'Oxygen', 'Nitrogen', 'Boron'],
      correctOption: 'Carbon',
    },
    {
      question: 'What is the capital of Italy?',
      options: ['Rome', 'Milan', 'Naples', 'Turin'],
      correctOption: 'Rome',
    },
    {
      question: 'Which artist painted the Mona Lisa?',
      options: [
        'Leonardo da Vinci',
        'Michelangelo',
        'Raphael',
        'Sandro Botticelli',
      ],
      correctOption: 'Leonardo da Vinci',
    },
    {
      question: 'What is the capital city of Japan?',
      options: ['Tokyo', 'Kyoto', 'Osaka', 'Seoul'],
      correctOption: 'Tokyo',
    },
    {
      question: 'Which country is known for its tango dance?',
      options: ['Argentina', 'Brazil', 'Spain', 'Italy'],
      correctOption: 'Argentina',
    },
    {
      question: 'What is the longest river in the world?',
      options: ['Nile', 'Amazon', 'Mississippi', 'Yangtze'],
      correctOption: 'Nile',
    },
    {
      question: 'Which continent is the Sahara Desert located in?',
      options: ['Africa', 'Asia', 'South America', 'Australia'],
      correctOption: 'Africa',
    },
    {
      question: 'What is the largest country in South America?',
      options: ['Brazil', 'Argentina', 'Colombia', 'Peru'],
      correctOption: 'Brazil',
    },
    {
      question:
        'Which European country is known for its windmills and tulip fields?',
      options: ['Netherlands', 'France', 'Germany', 'Italy'],
      correctOption: 'Netherlands',
    },
    {
      question: 'Which river runs through Paris?',
      options: ['Seine', 'Thames', 'Danube', 'Rhine'],
      correctOption: 'Seine',
    },
    {
      question: 'What is the largest desert in Africa?',
      options: ['Sahara', 'Kalahari', 'Namib', 'Libyan Desert'],
      correctOption: 'Sahara',
    },
    {
      question: 'Which country is famous for the Great Wall?',
      options: ['China', 'India', 'Japan', 'Korea'],
      correctOption: 'China',
    },
    {
      question: 'What is the official language of Brazil?',
      options: ['Portuguese', 'Spanish', 'English', 'French'],
      correctOption: 'Portuguese',
    },
    {
      question: 'Which country is known for its pyramids?',
      options: ['Egypt', 'Greece', 'Mexico', 'Italy'],
      correctOption: 'Egypt',
    },
    {
      question: 'What is the largest island in the world?',
      options: ['Greenland', 'Australia', 'Borneo', 'Madagascar'],
      correctOption: 'Greenland',
    },
    {
      question: 'Which river is the longest in Europe?',
      options: ['Volga', 'Danube', 'Rhine', 'Thames'],
      correctOption: 'Volga',
    },
    {
      question: 'What is the largest lake in Africa?',
      options: ['Lake Victoria', 'Lake Tanganyika', 'Lake Malawi', 'Lake Chad'],
      correctOption: 'Lake Victoria',
    },
    {
      question: 'Which continent is known as the "Land Down Under"?',
      options: ['Australia', 'Africa', 'South America', 'Antarctica'],
      correctOption: 'Australia',
    },
    {
      question: 'What is the national flower of India?',
      options: ['Lotus', 'Rose', 'Tulip', 'Sunflower'],
      correctOption: 'Lotus',
    },
    {
      question: 'Which country is famous for its maple syrup production?',
      options: ['Canada', 'Sweden', 'Switzerland', 'Finland'],
      correctOption: 'Canada',
    },
    {
      question: 'Which city is known as the "City of Love"?',
      options: ['Paris', 'Rome', 'Venice', 'Barcelona'],
      correctOption: 'Paris',
    },
    {
      question: 'What is the national animal of Australia?',
      options: ['Kangaroo', 'Koala', 'Emu', 'Platypus'],
      correctOption: 'Kangaroo',
    },
    {
      question:
        'Which river forms the border between the United States and Mexico?',
      options: ['Rio Grande', 'Mississippi', 'Colorado', 'Columbia'],
      correctOption: 'Rio Grande',
    },
    {
      question: 'What is the tallest mountain in Africa?',
      options: [
        'Mount Kilimanjaro',
        'Mount Kenya',
        'Mount Elgon',
        'Mount Stanley',
      ],
      correctOption: 'Mount Kilimanjaro',
    },
    {
      question: 'Which continent is known for its penguins?',
      options: ['Antarctica', 'Africa', 'Australia', 'South America'],
      correctOption: 'Antarctica',
    },
    {
      question: 'What is the national sport of Canada?',
      options: ['Lacrosse', 'Ice Hockey', 'Curling', 'Basketball'],
      correctOption: 'Ice Hockey',
    },
    {
      question: 'Which country is known for its Bollywood film industry?',
      options: ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka'],
      correctOption: 'India',
    },
    {
      question: 'What is the capital city of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      correctOption: 'Paris',
    },
    {
      question: 'Which river flows through Baghdad?',
      options: ['Tigris', 'Euphrates', 'Nile', 'Jordan'],
      correctOption: 'Tigris',
    },
    {
      question: 'Which country is known for its fjords?',
      options: ['Norway', 'Sweden', 'Finland', 'Denmark'],
      correctOption: 'Norway',
    },
    {
      question: 'What is the largest city in Africa by population?',
      options: ['Lagos', 'Cairo', 'Kinshasa', 'Johannesburg'],
      correctOption: 'Lagos',
    },
    {
      question: 'Which continent is the least populated?',
      options: ['Antarctica', 'Australia', 'South America', 'Africa'],
      correctOption: 'Antarctica',
    },
    {
      question: 'What is the national dish of Italy?',
      options: ['Pizza', 'Pasta', 'Risotto', 'Lasagna'],
      correctOption: 'Pizza',
    },
    {
      question: 'Which river flows through London?',
      options: ['Thames', 'Seine', 'Danube', 'Rhine'],
      correctOption: 'Thames',
    },
    {
      question: 'What is the smallest country in the world by land area?',
      options: ['Vatican City', 'Monaco', 'San Marino', 'Maldives'],
      correctOption: 'Vatican City',
    },
    {
      question: 'Which country is known for its ancient city of Petra?',
      options: ['Jordan', 'Egypt', 'Syria', 'Iraq'],
      correctOption: 'Jordan',
    },
    {
      question: 'What is the national animal of China?',
      options: ['Giant Panda', 'Red Panda', 'Tiger', 'Snow Leopard'],
      correctOption: 'Giant Panda',
    },
    {
      question: 'Which continent is the most linguistically diverse?',
      options: ['Africa', 'Asia', 'Europe', 'Oceania'],
      correctOption: 'Africa',
    },
    {
      question: 'What is the national sport of Japan?',
      options: ['Sumo Wrestling', 'Judo', 'Karate', 'Baseball'],
      correctOption: 'Sumo Wrestling',
    },
    {
      question: 'Which river is known as the "Mother of Rivers" in India?',
      options: ['Ganges', 'Yamuna', 'Brahmaputra', 'Godavari'],
      correctOption: 'Ganges',
    },
    {
      question: 'What is the national instrument of Scotland?',
      options: ['Bagpipes', 'Harp', 'Fiddle', 'Accordion'],
      correctOption: 'Bagpipes',
    },
    {
      question: 'Which country is known for its fjords?',
      options: ['Norway', 'Sweden', 'Finland', 'Denmark'],
      correctOption: 'Norway',
    },
    {
      question: 'What is the largest city in South America by population?',
      options: ['São Paulo', 'Buenos Aires', 'Rio de Janeiro', 'Lima'],
      correctOption: 'São Paulo',
    },
    {
      question: 'Which country is known for its Maasai people?',
      options: ['Kenya', 'Nigeria', 'Ghana', 'South Africa'],
      correctOption: 'Kenya',
    },
    {
      question: 'What is the national symbol of Australia?',
      options: ['Kangaroo', 'Koala', 'Emu', 'Platypus'],
      correctOption: 'Kangaroo',
    },
    {
      question: 'Which river is the longest in Asia?',
      options: ['Yangtze', 'Yellow River', 'Mekong', 'Ganges'],
      correctOption: 'Yangtze',
    },
    {
      question: 'What is the capital city of South Korea?',
      options: ['Seoul', 'Busan', 'Incheon', 'Daegu'],
      correctOption: 'Seoul',
    },
    {
      question: 'Which country is known for its fjords?',
      options: ['Norway', 'Sweden', 'Finland', 'Denmark'],
      correctOption: 'Norway',
    },
    {
      question: 'What is the highest mountain in Africa?',
      options: [
        'Mount Kilimanjaro',
        'Mount Kenya',
        'Mount Elgon',
        'Mount Stanley',
      ],
      correctOption: 'Mount Kilimanjaro',
    },
    {
      question: 'Which continent is the largest by land area?',
      options: ['Asia', 'Africa', 'North America', 'South America'],
      correctOption: 'Asia',
    },
    {
      question: 'What is the national animal of Canada?',
      options: ['Beaver', 'Moose', 'Polar Bear', 'Bison'],
      correctOption: 'Beaver',
    },
    {
      question:
        'Which river forms the border between the United States and Canada?',
      options: ['St. Lawrence', 'Columbia', 'Yukon', 'Niagara'],
      correctOption: 'St. Lawrence',
    },
    {
      question: 'What is the largest city in Europe by population?',
      options: ['Istanbul', 'Moscow', 'London', 'Paris'],
      correctOption: 'Istanbul',
    },
    {
      question: 'Which country is known for its Angkor Wat temple complex?',
      options: ['Cambodia', 'Vietnam', 'Laos', 'Thailand'],
      correctOption: 'Cambodia',
    },
    {
      question: 'What is the national dish of Thailand?',
      options: ['Pad Thai', 'Green Curry', 'Tom Yum Goong', 'Massaman Curry'],
      correctOption: 'Pad Thai',
    },
    {
      question: 'Which river is known as the "River of Gold"?',
      options: ['Amazon', 'Nile', 'Yangtze', 'Mekong'],
      correctOption: 'Nile',
    },
    {
      question: 'What is the smallest continent in the world?',
      options: ['Australia', 'Europe', 'Antarctica', 'North America'],
      correctOption: 'Australia',
    },
    {
      question:
        'Which country is known for its famous Inca ruins of Machu Picchu?',
      options: ['Peru', 'Chile', 'Ecuador', 'Bolivia'],
      correctOption: 'Peru',
    },
    {
      question: 'What is the national flower of France?',
      options: ['Lily', 'Rose', 'Sunflower', 'Daisy'],
      correctOption: 'Lily',
    },
    {
      question: 'Which country is known for its Pharaohs and ancient pyramids?',
      options: ['Egypt', 'Sudan', 'Algeria', 'Morocco'],
      correctOption: 'Egypt',
    },
    {
      question: 'What is the largest desert in the world?',
      options: ['Sahara', 'Arabian Desert', 'Gobi Desert', 'Kalahari'],
      correctOption: 'Sahara',
    }, // Famous Historical Figures
    {
      question: 'Who was the first President of the United States?',
      options: [
        'George Washington',
        'Thomas Jefferson',
        'Abraham Lincoln',
        'John Adams',
      ],
      correctOption: 'George Washington',
    },
    {
      question: 'Who wrote "The Communist Manifesto"?',
      options: [
        'Karl Marx',
        'Friedrich Engels',
        'Vladimir Lenin',
        'Joseph Stalin',
      ],
      correctOption: 'Karl Marx',
    },
    {
      question:
        'Who was the first female Prime Minister of the United Kingdom?',
      options: [
        'Margaret Thatcher',
        'Theresa May',
        'Queen Elizabeth II',
        'Indira Gandhi',
      ],
      correctOption: 'Margaret Thatcher',
    },
    {
      question: 'Who was the founder of Buddhism?',
      options: ['Siddhartha Gautama', 'Confucius', 'Laozi', 'Muhammad'],
      correctOption: 'Siddhartha Gautama',
    },
    {
      question: 'Who was the first Emperor of Rome?',
      options: ['Augustus', 'Julius Caesar', 'Nero', 'Caligula'],
      correctOption: 'Augustus',
    },
    {
      question: 'Who was the first female Pharaoh of ancient Egypt?',
      options: ['Hatshepsut', 'Cleopatra', 'Nefertiti', 'Hatchepsut'],
      correctOption: 'Hatshepsut',
    },
    {
      question: 'Who was the first man to walk on the moon?',
      options: ['Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'John Glenn'],
      correctOption: 'Neil Armstrong',
    },
    {
      question:
        'Who was the leader of the Indian independence movement against British rule?',
      options: [
        'Mahatma Gandhi',
        'Jawaharlal Nehru',
        'Subhas Chandra Bose',
        'Indira Gandhi',
      ],
      correctOption: 'Mahatma Gandhi',
    },
    {
      question: 'Who was the first female scientist to win a Nobel Prize?',
      options: [
        'Marie Curie',
        'Rosalind Franklin',
        'Dorothy Hodgkin',
        'Barbara McClintock',
      ],
      correctOption: 'Marie Curie',
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

    // World Religions
    {
      question: 'Who is the founder of Christianity?',
      options: ['Jesus Christ', 'Moses', 'Muhammad', 'Siddhartha Gautama'],
      correctOption: 'Jesus Christ',
    },
    {
      question: 'Who is the central figure of Islam?',
      options: ['Muhammad', 'Abraham', 'Moses', 'Jesus Christ'],
      correctOption: 'Muhammad',
    },
    {
      question: 'Who is the founder of Judaism?',
      options: ['Abraham', 'Moses', 'King David', 'Solomon'],
      correctOption: 'Abraham',
    },
    {
      question: 'Who is the founder of Sikhism?',
      options: [
        'Guru Nanak',
        'Guru Gobind Singh',
        'Guru Granth Sahib',
        'Guru Tegh Bahadur',
      ],
      correctOption: 'Guru Nanak',
    },
    {
      question: 'Who is the founder of Hinduism?',
      options: [
        'There is no single founder',
        'Mahatma Gandhi',
        'Buddha',
        'Krishna',
      ],
      correctOption: 'There is no single founder',
    },
    {
      question: 'Who is the founder of Buddhism?',
      options: ['Siddhartha Gautama', 'Confucius', 'Laozi', 'Muhammad'],
      correctOption: 'Siddhartha Gautama',
    },
    {
      question: 'Who is the central figure of Buddhism?',
      options: ['Buddha', 'Mahavira', 'Bodhisattva', 'Dalai Lama'],
      correctOption: 'Buddha',
    },
    {
      question: 'Who is the founder of Taoism?',
      options: ['Laozi', 'Confucius', 'Buddha', 'Siddhartha Gautama'],
      correctOption: 'Laozi',
    },
    {
      question: 'Who is the founder of Jainism?',
      options: ['Mahavira', 'Buddha', 'Laozi', 'Jesus Christ'],
      correctOption: 'Mahavira',
    },
    {
      question: 'Who is the central figure of Christianity?',
      options: ['Jesus Christ', 'Moses', 'Muhammad', 'Abraham'],
      correctOption: 'Jesus Christ',
    },

    // Natural Wonders of the World
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      correctOption: 'Mount Everest',
    },
    {
      question: 'Where is the Grand Canyon located?',
      options: ['United States', 'Australia', 'Brazil', 'South Africa'],
      correctOption: 'United States',
    },
    {
      question: 'What is the largest coral reef system in the world?',
      options: [
        'Great Barrier Reef',
        'Belize Barrier Reef',
        'Red Sea Coral Reef',
        'Palawan Barrier Reef',
      ],
      correctOption: 'Great Barrier Reef',
    },
    {
      question: 'What is the deepest trench in the world?',
      options: [
        'Mariana Trench',
        'Puerto Rico Trench',
        'Java Trench',
        'Tonga Trench',
      ],
      correctOption: 'Mariana Trench',
    },
    {
      question: 'Which waterfall is the widest in the world?',
      options: [
        'Victoria Falls',
        'Niagara Falls',
        'Iguazu Falls',
        'Angel Falls',
      ],
      correctOption: 'Niagara Falls',
    },
    {
      question: 'Where is the Amazon Rainforest located?',
      options: ['South America', 'Africa', 'Asia', 'Australia'],
      correctOption: 'South America',
    },
    {
      question: 'What is the largest desert in the world?',
      options: ['Antarctica', 'Sahara', 'Arabian Desert', 'Gobi Desert'],
      correctOption: 'Antarctica',
    },
    {
      question: 'What is the largest river in the world by discharge?',
      options: [
        'Amazon River',
        'Nile River',
        'Yangtze River',
        'Mississippi River',
      ],
      correctOption: 'Amazon River',
    },
    {
      question: 'Where is Mount Kilimanjaro located?',
      options: ['Tanzania', 'Kenya', 'Uganda', 'Rwanda'],
      correctOption: 'Tanzania',
    },
    {
      question: 'What is the largest salt flat in the world?',
      options: [
        'Salar de Uyuni',
        'Bonneville Salt Flats',
        'Chott el Djerid',
        'Etosha Pan',
      ],
      correctOption: 'Salar de Uyuni',
    },
  ];

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
          this.scoreArray.push(timeBonus * 10);
          break;
        case 5:
          this.scoreArray.push(timeBonus * 25);
          break;
        case 3:
          this.scoreArray.push(timeBonus * 40);
          break;
        default:
          break;
      }
    } else {
      this.scoreArray.push(-2 * timeAnswered);
    }

  }

  temp: number = 0;

  timeCheaterArray: number[] = [];
  checkForCheaters(i: number, time: number) {
    let realTime = this.anotherQuestionDuration - time;

    if (realTime > 1) {
      this.timeCheaterArray.splice(0, this.timeCheaterArray.length);
    }

    if (realTime < 1) {
      this.timeCheaterArray.push(1);
    }

    if (realTime < 0.5) {
      this.timeCheaterArray = [...this.timeCheaterArray, 1, 2];
    }
    if (realTime < 0.3) {
      this.timeCheaterArray = [...this.timeCheaterArray, 1, 2, 3, 4, 5, 6, 7];
    }

    if (this.timeCheaterArray.length >= 10) {
      this.scoreArray.splice(0, this.scoreArray.length);
      this.timeCheaterArray.splice(0, this.timeCheaterArray.length);
    }
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
    console.log(this.scoreArray);
    let score = 0;
    if (this.scoreArray.length > 0) {
      score = this.scoreArray.reduce((acc, prev) => acc + prev);
    }
    this.apiService.storeScoreInDB(score.toString());
    return score;
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

    this.resetQuestionCountdown();
  }
}

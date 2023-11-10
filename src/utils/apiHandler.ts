import axios from "axios";

const catApi = axios.create({
  baseURL: "https://cataas.com",
});

const dogApi = axios.create({
  baseURL: "https://dog.ceo/api",
});

const winnerCatchphrases = [
  "u fw me?",
  "meow?",
  "i'm tired...",
  "i love u!",
  "don't ch*de me!",
  "low low...",
  "i'm sleepy...",
  "meow meow meow...",
  "can we merge?",
  "i'm bored...",
  "do u love me?",
  "mblhm...",
  "i'm hungry...",
  "kiss pls!",
  "make a wish!",
  "i'm h'd...",
  "i'm just d!",
  "wanna gym?",
  "do u hate me?",
  "booboo baby!",
  "good job bubba",
  "can we cuddle?...",
  "1, 2, 3, jump!",
];

const loserCatchphrases = [
  "oh noes!",
  "better luck next time!",
  "oopsie daisy!",
  "womp womp...",
  "try again, champ!",
  "close but no cigar!",
  "fiddlesticks!",
  "not your day, huh?",
  "aw, shucks!",
  "nice try, buttercup!",
  "keep smiling!",
  "almost there!",
  "gotta brush it off!",
  "no worries, amigo!",
  "the struggle is real!",
  "well, shoot!",
  "you'll get 'em next time!",
  "chin up!",
  "patience, young grasshopper!",
  "another one bites the dust!",
  "no harm, no foul!",
  "keep the faith!",
  "it's just a game, after all!",
];

const getRandomElement = (arr: any[]) =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined;

export function getRandomCat({ loser }: { loser: boolean }) {
  const catchphrase = loser
    ? getRandomElement(loserCatchphrases)
    : getRandomElement(winnerCatchphrases);
  return catApi.get("/cat/says/" + encodeURIComponent(catchphrase), {
    params: { fontColor: "white", fontSize: 20, type: "square" },
    responseType: "blob",
  });
}

export function getRandomDog() {
  return dogApi.get("/breeds/image/random");
}

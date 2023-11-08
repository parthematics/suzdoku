import axios from "axios";

const api = axios.create({
  baseURL: "https://cataas.com",
});

const catchphrases = [
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
];

const getRandomElement = (arr: any[]) =>
  arr.length ? arr[Math.floor(Math.random() * arr.length)] : undefined;

export function getRandomCat() {
  const catchphrase = getRandomElement(catchphrases);
  return api.get("/cat/says/" + encodeURIComponent(catchphrase), {
    params: { fontColor: "white", fontSize: 20, type: "square" },
    responseType: "blob",
  });
}

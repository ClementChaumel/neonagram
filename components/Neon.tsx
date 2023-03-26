import styles from "@/styles/main.module.css";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Neon({
  word = "spectaculaire",
}: {
  word?: string | string[];
}) {
  const { data, error } = useSWR("/api/french-words", fetcher);
  const [currentWord, setCurrentWord] = useState<boolean[]>([]);
  const [previousWord, setPreviousWord] = useState<boolean[]>([]);
  const [foundWords, setFoundWords] = useState<boolean[][]>([]);

  // remove accents from the word
  const normalisedWord = (word + "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  // turn word into an array of letters
  const letters = normalisedWord.split("");

  // create an array the same length as letters
  const lettersState = Array.from({ length: letters.length }, () => false);

  // turn on the first letter
  lettersState[0] = true;

  // check if any word in the data can be found in the word
  useEffect(() => {
    if (data) {
      normalisedWord.split("").forEach((letter: string, index: number) => {
        data.forEach((word: string) => {
          if (word.startsWith(letter)) {
            const turnedOnLetters = Array.from(
              { length: normalisedWord.length },
              () => false
            );

            let turnedOnLettersIndex = index;

            word.split("").forEach((current: string, currentIndex: number) => {
              for (
                let i = turnedOnLettersIndex;
                i < turnedOnLetters.length;
                i++
              ) {
                if (current === normalisedWord[i]) {
                  turnedOnLetters[i] = true;
                  turnedOnLettersIndex = i;
                  break;
                }
              }
            });

            // if numbers of letters in turnedOnLetters is equal to the number of letters in the word then push it to the foundWords array
            if (
              turnedOnLetters.filter((letter) => letter).length === word.length
            ) {
              setFoundWords((prev) => [...prev, turnedOnLetters]);
              console.log("found ", word);
            }
          }
        });
      });

      // if normalisedWord is not in the data then push it to the foundWords array
      if (data.indexOf(normalisedWord) === -1) {
        console.log("not found ", normalisedWord);
        const fullOnLetters = Array.from(
          { length: normalisedWord.length },
          () => true
        );
        setFoundWords((prev) => [...prev, fullOnLetters]);
      }
    }
  }, [data, normalisedWord, word]);

  const getNewRandomWord = () => {
    // set the current word to a random word from the foundWords array
    let randomWord: boolean[] = [];

    do {
      randomWord = foundWords[Math.floor(Math.random() * foundWords.length)];
    } while (randomWord === previousWord);

    setPreviousWord(currentWord);
    setCurrentWord(randomWord);
  };

  useInterval(
    () => {
      // Your custom logic here
      getNewRandomWord();
    },
    // Delay in milliseconds or null to stop it
    3000
  );

  useEffect(() => {
    console.log("currentWord: ", currentWord);
  }, [currentWord]);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    <h1 className={styles.neon}>
      {letters.map((letter: string, index: number) => (
        <span
          key={index}
          className={currentWord?.[index] ? styles.on : styles.off}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}

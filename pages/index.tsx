import styles from "@/styles/main.module.css";
import Neon from "@/components/Neon";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [word, setWord] = useState("spectaculaire");
  const [minLength, setMinLenght] = useState(2);

  const handleClick = () => {
    router.push(`result?word=${word}&min=${minLength}`);
  };

  const handleWordChange = (e: any) => {
    setWord(e?.currentTarget?.value || "spectaculaire");
  };

  const handleMinChange = (e: any) => {
    setMinLenght(e?.currentTarget?.value || 2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.index}>
        <Neon word={"Spectaculaire"} />
        <input
          type="text"
          placeholder="spectaculaire"
          className={styles.input}
          onChange={handleWordChange}
        ></input>
        <div>
          <label>Longueur minimum des mots </label>
          <input
            type="number"
            placeholder="2"
            className={styles.input}
            onChange={handleMinChange}
          ></input>
        </div>
        <button onClick={handleClick} className={styles.creer}>
          Créer
        </button>
      </div>
    </div>
  );
}

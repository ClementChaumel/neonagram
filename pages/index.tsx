import styles from "@/styles/main.module.css";
import Neon from "@/components/Neon";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import wall from "images/theatre-de-la-cite.jpg";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

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
    setMinLenght(e?.currentTarget?.value > 2 ? e?.currentTarget?.value : 2);
  };

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ff65bd",
        contrastText: "#ff2483",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Image
        alt="wall"
        src={wall}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className={styles.container}>
        <div className={styles.index}>
          <Neon word={"Spectaculaire"} min={3} />
          <div className={styles.inputwrapper}>
            <TextField
              id="outlined-basic"
              placeholder="Spectaculaire"
              label="Votre mot"
              variant="outlined"
              onChange={handleWordChange}
            />
            <Button onClick={handleClick} variant="outlined">
              Créer
            </Button>
          </div>
          <div>
            <TextField
              type="number"
              id="outlined-basic"
              placeholder="2"
              label="Longueur minimum des mots"
              variant="outlined"
              onChange={handleMinChange}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

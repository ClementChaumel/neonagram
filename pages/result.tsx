import styles from "@/styles/main.module.css";
import { useRouter } from "next/router";
import Neon from "@/components/Neon";

export default function Result() {
  const router = useRouter();
  const word = router.query?.word;
  const min = router.query?.min;

  return (
    <div className={styles.container}>
      {word && min ? <Neon word={word} min={Number(min)} /> : null}
    </div>
  );
}

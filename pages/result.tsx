import styles from "@/styles/main.module.css";
import { useRouter } from "next/router";
import Neon from "@/components/Neon";

export default function Result() {
  // get the data from the query string
  const router = useRouter();
  const word = router.query?.word;

  return (
    <div className={styles.container}>
      <Neon word={word} />
    </div>
  );
}

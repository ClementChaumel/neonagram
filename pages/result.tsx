import styles from "@/styles/main.module.css";
import { useRouter } from "next/router";
import Neon from "@/components/Neon";
import Image from "next/image";
import wall from "images/wall.jpg";

export default function Result() {
  const router = useRouter();
  const word = router.query?.word;
  const min = router.query?.min;

  return (
    <>
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
        {word && min ? <Neon word={word} min={Number(min)} /> : null}
      </div>
    </>
  );
}

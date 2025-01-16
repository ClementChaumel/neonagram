import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";
import eyes from "images/eyes.png";

import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "../fonts/Night Vibes Free Version.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
      <a
        className="credit"
        href="https://showme-agency.fr/"
        target="_blank"
        rel="noreferrer"
      >
        Créé à Toulouse par
        <Image
          alt="Show Me"
          src={eyes}
          placeholder="blur"
          quality={100}
          fill
          sizes="100px"
          style={{
            objectFit: "cover",
          }}
        />
        <span>Show Me</span>
      </a>
    </main>
  );
}

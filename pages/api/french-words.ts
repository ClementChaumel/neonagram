import path from "path";
import { promises as fs } from "fs";

export default async function handler(req: any, res: any) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "words");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/larousse.txt",
    "utf8"
  );
  // remove accents from the word
  const normalisedFileContents = (fileContents + "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  const array = normalisedFileContents.split("\n");

  //remove words that are too short
  const filteredArray = array.filter((word) => word.length >= 3);

  //Return the content of the data file in json format
  res.status(200).json(array);
}

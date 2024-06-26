import { ICharacter } from "../entities/Character";
import { CharacterShuffle } from "../models/CharacterShuffle";

export function shuffle(array: ICharacter[] | CharacterShuffle[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

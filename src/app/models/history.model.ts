import { Tile } from "./tile.model";

export interface History {
    userId: string,
    selectedTiles: string,
    generatedSentence: string,
    creationDate: Date
}
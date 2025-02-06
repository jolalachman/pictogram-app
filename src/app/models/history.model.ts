import { Tile } from "./tile.model";

export interface HistoryModel {
    userId: string,
    selectedTiles: string,
    generatedSentence: string,
    creationDate: Date
}
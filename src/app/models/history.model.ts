import { Timestamp } from "firebase/firestore";

export interface HistoryModel {
    userId: string,
    selectedTiles: string,
    generatedSentence: string,
    creationDate: Timestamp,
    isSelected?: boolean,
}
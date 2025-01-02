export interface Tile {
    id: string;
    label: string;
    iconUrl?: string;
    isCustom: boolean;
    isSelected: boolean;
    category?: string;
}
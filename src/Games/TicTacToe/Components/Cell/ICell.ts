import { TicTacToePiece } from "../../Enums/TicTacToePiece";

export interface ICellProps {
    row: number;
    column: number;
    mark?: TicTacToePiece;
    onClick: (row: number, column: number) => void;
}

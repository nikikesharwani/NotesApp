import { Note } from "../models/note";
import { Action } from "@ngrx/store";

export function notesReducer(state: Array<Note> = [], action: Action) : Note[] {
    switch (action.type) {
        case 'ADD_NOTES':
            return action.payload;
        case 'CREATE_NOTE': 
            return [...state, action.payload];
        case 'UPDATE_NOTE':
            return state.map(note => {
                return note.id === action.payload.id ? Object.assign({}, note, action.payload): note;
            });
        case 'DELETE_NOTE': 
            return state.filter(note => {
                return note.id !== action.payload.id;
            });
        default: 
            return state;
    }
}
import { Injectable, EventEmitter } from '@angular/core';

import { AppStore } from '../app.store';
import { Note } from '../models/note';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NoteService {

  notes: Observable<Array<Note>>;
  addNewNote = new Subject<boolean>();
  noteList = new Subject<Note[]>();
  selectedNote = new EventEmitter<Note>();
  editNote = new Subject<boolean>();
  searchText = new Subject<string>();
  successToastr = new Subject<string>();
  errorToastr = new Subject<string>();

  // loading notes from App store and sending it to components to subscribe
  constructor(private store: Store<AppStore>) {
    this.loadNotes();
    this.notes = store.select( storeData => storeData.notes);
  }

  // load notes from localstorage and adding it to App store to manage application state
  loadNotes()  {
    let notes: Note[] = [];
    if (localStorage.getItem('notes') !== null) {
      notes = JSON.parse(localStorage.getItem('notes'));
    } else {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
    this.store.dispatch({ type: 'ADD_NOTES', payload: notes});
  }

  // add New note to localstorage as well as update application state in App store
  addNote(note: Note) {
    this.updateLocalStorage(1, note);
    this.store.dispatch({ type: 'CREATE_NOTE', payload: note });
  }

  // update existing note to localstorage as well as update application state in App store
  updateNote(note: Note) {
    this.updateLocalStorage(2, note);
    this.store.dispatch({ type: 'UPDATE_NOTE', payload: note });
  }

  // delete note to localstorage as well as update application state in App store
  deleteNote(notes: Note[]) {
    notes.forEach((note: Note) => {
      this.updateLocalStorage(3, note);
      this.store.dispatch({ type: 'DELETE_NOTE', payload: note });
    });
  }

  // update localstorage on add, update and delete notes
  updateLocalStorage(action: number, note: Note) {
    const notes: Note[] = JSON.parse(localStorage.getItem('notes'));
    if (action === 1) {
      notes.push(note);
    } else if ( action === 2) {
      notes.splice(notes.findIndex(item => item.id === note.id), 1, note);
    } else {
      notes.splice(notes.findIndex(item => item.id === note.id), 1);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  // show success toastr messages
  showSuccessMessage(message: string) {
    this.successToastr.next(message);
  }

  // show error toastr messages
  showErrorMessage(message: string) {
    this.errorToastr.next(message);
  }

}

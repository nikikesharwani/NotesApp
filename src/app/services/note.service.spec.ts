import { TestBed, inject } from '@angular/core/testing';

import { NoteService } from './note.service';
import { StoreModule, Store } from '@ngrx/store';
import { notesReducer } from '../reducers/note.reducer';
import { Note } from '../models/note';

describe('NoteService', () => {
  let service: NoteService;
  let store = {};
  beforeEach(() => {
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    TestBed.configureTestingModule({
      providers: [NoteService],
      imports: [
        StoreModule.provideStore({
          notes: notesReducer
        }),
      ]
    });

    service = TestBed.get(NoteService);
    // mockStore  = TestBed.get(Store);

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', inject([NoteService], (noteService: NoteService) => {
    expect(noteService).toBeTruthy();
  }));

  describe('#loadNotes', () => {
    it('should store the note from localStorage',
      () => {
        service.loadNotes();
        expect(localStorage.getItem('notes')).toBe(JSON.stringify([]));
    });
  });

  describe('#addNote', () => {
    it('should store the note in localStorage',
      () => {
        localStorage.setItem('notes', JSON.stringify([]));
        const note: Note = { id: 'note1' , title: 'demo', desc: 'demo test', timeStamp: new Date()};
        const result = JSON.stringify([{ id: 'note1' , title: 'demo', desc: 'demo test', timeStamp: new Date()}]);
        service.updateLocalStorage(1, note);
        expect(localStorage.getItem('notes')).toBe(result);
    });
  });

  describe('#updateNote', () => {
    it('should update stored note to localStorage',
      () => {
        const note: Note = { id: 'note1' , title: 'demo111', desc: 'demo test', timeStamp: new Date()};
        const result = JSON.stringify([{ id: 'note1' , title: 'demo111', desc: 'demo test', timeStamp: new Date()}]);
        service.updateLocalStorage(2, note);
        expect(localStorage.getItem('notes')).toBe(result);
    });
  });

  describe('#deleteNote', () => {
    it('should delete stored note from localStorage',
      () => {
        const note: Note = { id: 'note1' , title: 'demo', desc: 'demo test', timeStamp: new Date()};
        const result = JSON.stringify([]);
        service.updateLocalStorage(3, note);
        expect(localStorage.getItem('notes')).toBe(result);
    });
  });

});

import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Subscription } from 'rxjs/Subscription';
import { Note } from '../models/note';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  noteListSubscription: Subscription;
  selectedNoteSubscription: Subscription;
  notes: Note[];
  selectedNote: Note;
  searchText: string;
  toggleSearch: boolean;

  // initalizing variables and subscribing to noteList and selectedNote to perform delete and edit operation
  constructor(private noteService: NoteService) {
    this.searchText = '';
    this.toggleSearch = false;
    this.notes = [];
    this.noteListSubscription = this.noteService.noteList.subscribe(notes => {
      this.notes = notes;
    });

    this.selectedNoteSubscription = this.noteService.selectedNote.subscribe(note => {
      this.selectedNote = note;
    });
  }

  ngOnInit() {

  }

  // sending data to addNewNote Subject so that note component will subscribe it to add new note and update App store
  addNote() {
    this.noteService.addNewNote.next(true);
    if (this.toggleSearch) {
      this.noteService.addNewNote.next(false);
    }
  }

  // sending data to deleteNote Subject so that sidebar component will subscribe it to delete selected notes and update App store
  deleteNote() {
    this.noteService.deleteNote(this.notes);
    this.noteService.showSuccessMessage('Note(s) deleted successfully');
  }

  // sending data to editNote Subject so that note component will subscribe it to update selected note and update App store
  editNote() {
    if (this.selectedNote) {
      this.noteService.editNote.next(true);
    }
  }

  // sending search data to searchText Subject so that sidebar component will subscribe it to filter and highlight notes
  triggerSearch() {
    this.noteService.searchText.next(this.searchText);
  }

  // unsubscribing to subjects or observables on destroying component
  ngOnDestroy() {
    this.noteListSubscription.unsubscribe();
    this.selectedNoteSubscription.unsubscribe();
  }

}

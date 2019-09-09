import { Component, OnInit, OnDestroy, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../models/note';
import { Subscription } from 'rxjs/Subscription';
import { NoteService } from '../services/note.service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  selectedIndex: number;
  toggleSearch: boolean;
  notes: Observable<Array<Note>>;
  notesList: Note[] = [];
  selectedNote: Note;
  firstLoad: boolean;
  noteSubscription: Subscription;
  searchSubscription: Subscription;
  searchText: string;

  // initailizing variables and subscribing to search text entered in header to filter and highlight notes
  constructor(private noteService: NoteService) {
      this.toggleSearch = false;
      this.notes = this.noteService.notes;
      this.firstLoad = true;
      this.searchText = '';

      this.searchSubscription = this.noteService.searchText.subscribe(search => {
        this.searchText = search;
        if (this.selectedNote && !this.searchText) {
          this.selectedIndex = this.notesList.findIndex(item => item.id === this.selectedNote.id);
        } else if (this.searchText) {
          const filterData = this.filterNoteList();
          this.selectedNote = filterData[0];
          this.selectedIndex = 0;
        } else if (!this.selectedNote && !this.searchText) {
          this.selectedIndex = 0;
          this.selectedNote = this.notesList[0];
        }
      });
  }

  // subscribing to notes list from note service
  ngOnInit() {
    this.noteSubscription = this.notes
    .subscribe(
        notes => {
          this.notesList = notes;
          if (this.notesList.length > 0) {
            this.onNoteSelect(0, this.notesList[0]);
            if (this.firstLoad) {
              const notesArray: Note[] = [];
              this.notesList.forEach((note: Note) => {
                if (note.checked) {
                  notesArray.push(note);
                }
              });
              this.firstLoad = false;
              this.noteService.noteList.next(notesArray);
            }
          } else {
            this.selectedNote = null;
          }
        },
        error => {
          this.noteService.showErrorMessage(error);
        }
      );
    }

  // initializing sidebar collapse and expand event on window resize and on clicking collapse icon
  ngAfterViewInit() {
    // Hide submenus
    $('#body-row .collapse').collapse('hide');
    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-angle-double-left');
    // Collapse click
    $('[data-toggle=sidebar-colapse]').click(function() {
        SidebarCollapse();
    });

    function SidebarCollapse () {
        $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
        $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
        if ($('#sidebar-container').hasClass('sidebar-expanded')){
          $("#emptyNotes p").css('display', 'block');
        } else {
          $("#emptyNotes p").css('display', 'none');
        }
    }

    // expand and collapse sidebar on window resize
    const angularComp = this;
    $(window).resize(function() {
      const bodyWidth = $(this).width();
      angularComp.expandCollapseSidebar(bodyWidth);
    });

    const windowWidth = $(window).width();
    this.expandCollapseSidebar(windowWidth);

  }

  // expand and collapse sidebar based on window width
  expandCollapseSidebar(width: number) {
    if (width < 768) {
      $('#sidebar-container').removeClass('sidebar-expanded');
      $('#sidebar-container').addClass('sidebar-collapsed');
      $("#emptyNotes p").css('display', 'none');
    } else {
      $('#sidebar-container').addClass('sidebar-expanded');
      $('#sidebar-container').removeClass('sidebar-collapsed');
      $("#emptyNotes p").css('display', 'block');
    }
  }

  // On Selecting note emit event so that header will get it
  onNoteSelect(index: number, note: Note) {
    this.selectedIndex = index;
    this.selectedNote = note;
    this.noteService.selectedNote.emit(note);
  }

  // On selecting or unselecting checbox acknowledge header to delete selected notes if clicked on delete icon
  onNoteChecked(note: Note) {
    if (!note.checked) {
      note.checked = true;
    } else {
      note.checked = false;
    }
    this.noteService.updateNote(note);
    this.noteService.noteList.next(this.notesList.filter(item => item.checked === true));
  }

  // render only new items to list using *ngFor
  trackByFn(index, item) {
    return index;
  }

  // filter notelist to change selectedNote and selectedIndex property on search
  filterNoteList() {
    return this.notesList.filter( item => {
      return item.title.toLowerCase().includes(this.searchText) || item.desc.toLowerCase().includes(this.searchText);
    });
  }

  // unsubcribing to events, subjects or observables on component destroy
  ngOnDestroy() {
    this.noteSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
}

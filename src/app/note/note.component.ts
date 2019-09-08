import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, OnDestroy {

  @Input() 
  selectedNote: Note;

  noteForm: FormGroup;
  formSubscription: any;
  formErrors: any;
  validationMessages: any;
  generateIdfunc: any;
  editableNote: boolean;
  addNoteSubscription: Subscription;
  editNoteSubscription: Subscription;
  currentDate: Date;
  dataFound: Note;

  // initializing variables and subscribing to add note and edit note subjects to perform corresponding operation
  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
    this.editableNote = false; 
    this.currentDate = new Date();
    this.formErrors =  {'title': '', 'desc': ''};
    this.validationMessages = {
      "title": { 
        required: "Note Title is required",
      },
      "desc": { 
        required: "Description is required"
      }
    }; 

    if (localStorage.getItem('notes') !== null) {
      let notes = JSON.parse(localStorage.getItem('notes'));
      this.generateIdfunc = this.generateId('note', notes.length+1);
    } else {
      this.generateIdfunc = this.generateId('note', 1);
    }
     
    this.addNoteSubscription = this.noteService.addNewNote.subscribe(add => {
      this.editableNote = add;
      this.dataFound = null;
      this.noteForm.reset();
    });

    this.editNoteSubscription = this.noteService.editNote.subscribe(edit => {
      this.editableNote = true;
      this.dataFound = this.selectedNote;
      this.noteForm.patchValue(this.selectedNote);
    });
  }

  // build note form for validations
  ngOnInit() {
    this.buildForm();
  }

  // initializing as well as creating form controls for note form and subscribing to changes on form
  buildForm() {
    this.noteForm = this.formBuilder.group({
      id: ['', []],
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      timeStamp: ['', []]
    });

    this.formSubscription = this.noteForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
 
    this.onValueChanged();

  }

  // on form value changes bind error messages to form controls to display in template
  onValueChanged(data?: any) {
    if (!this.noteForm) { return; }

    const form = this.noteForm;

    for (const field in this.formErrors)
    {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid)
      {
        let label1 = '';
        let validationMessage: any = {};
        label1 = this.validationMessages[field];
           validationMessage = label1;
        for (const key in control.errors)
        {
          this.formErrors[field] += validationMessage[key] + ' ';
        }
      }
    }
  }

  // generate specific ids for new notes
  generateId(prefix, start) {
    var i = start || 0;
    return function() {
        return prefix + i++;
    }
  }

  // add new note as well as update existing note if form is valid
  submitNote(formData) {
    formData.timeStamp = new Date();
    formData['checked'] = false;
    if (!this.dataFound) {
      formData.id = this.generateIdfunc();
      this.noteService.addNote(formData);
    } else {
      this.noteService.updateNote(formData);
    } 
    this.editableNote = false;
    this.dataFound = null;
  }

  // unsubscribing t0 form and subjects on destroying component
  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
    this.addNoteSubscription.unsubscribe();
    this.editNoteSubscription.unsubscribe();
  }

}

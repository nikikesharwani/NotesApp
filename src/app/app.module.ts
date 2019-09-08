import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoteComponent } from './note/note.component';
import { notesReducer } from './reducers/note.reducer';
import { NoteService } from './services/note.service';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { FilterdataPipe } from './pipes/filterdata.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NoteComponent,
    HighlighterPipe,
    FilterdataPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore({ 
      notes: notesReducer
    })
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

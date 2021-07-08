import { Component, OnInit } from '@angular/core';
import {NoteModel} from '../Models/note.model';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {
  notes: NoteModel[] = [];
  noteName!: string;
  noteText!: string;
  noteTags!: string;
  filterTerm!: string;
  visible = false;
  constructor() { }

  ngOnInit(): void {
    if (localStorage){
      const item = JSON.parse(localStorage.getItem('allEntries') as string);
      if (item != null){
        this.notes =  item;
      }
      const tags = this.noteTags?.split(' ').map(n => n?.split('')
        .splice(0, 0, '#'));
      // console.log(tags);
    }
  }
  addNewNote(): void {
    // tslint:disable-next-line:triple-equals
    if (this.noteName) {
      const tags = this.noteText.toLowerCase().split(/[\s\n]+/);
      console.log(tags);
      const result = tags.filter(word => /^#/.test(word));
      console.log(result);
      const tag = tags.map(n => /^#/.test(n) ? n.substr(1) : n);
      console.log(tag);
      const res = result.join(' ');
      // @ts-ignore
      let val = document.getElementById('textarea').value;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < val.length; j++) {
        val = val.replace('#', '');
      }
      const note: NoteModel = {
        noteName: this.noteName,
        noteText: val,
        noteDate: Date.now(),
        id: Math.random(),
        noteTags: this.noteTags.concat(' ' + res)
      };
      let existingEntries = JSON.parse(localStorage.getItem('allEntries') as string);
      if (existingEntries == null) {
        existingEntries = [];
      }
      localStorage.setItem('entry', JSON.stringify(note));
      this.notes.push(note);
      existingEntries.push(note);
      localStorage.setItem('allEntries', JSON.stringify(existingEntries));
    }
    const main = document.getElementById('back');
    if (main) {
      main.style.display = 'none';
    }
    this.visible = false;
  }
  removeNote(noteElem: NoteModel, note: NoteModel): void {
    const confirm = window.confirm('Do you really want to delete a note?');
    if (confirm) {
      const elemIds = this.notes?.map((el: any) => el.id);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < elemIds?.length; i++) {
        if (elemIds) {
          const elementId = elemIds[i];
          // tslint:disable-next-line:triple-equals
          if (note.id == elementId) {
            console.log(note.id + ' = ' + elementId);
            const index = this.notes.indexOf(note);
            if (index > -1) {
              this.notes.splice(index, 1);
            }
            localStorage.setItem('allEntries', JSON.stringify(this.notes));
          }
        }
      }
      const main = document.getElementById('back');
      if (main) {
        main.style.display = 'none';
      }
    }
  }
  confirmNote(noteElement: NoteModel, note: NoteModel): void {
    const elemIds = this.notes?.map((el: any) => el.id);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < elemIds?.length; i++) {
      if (elemIds) {
        const elementId = elemIds[i];
        // tslint:disable-next-line:triple-equals
        if (note.id == elementId) {
          console.log(note.id + ' = ' + elementId);
          const index = this.notes.indexOf(note);
          if (index > -1) {
            this.notes.splice(index, 1, noteElement);
          }
          localStorage.setItem('allEntries', JSON.stringify(this.notes));
        }
      }
    }
  }
  matchVal(event: KeyboardEvent): void {
    // console.log(event);
    const value = (event?.target as HTMLInputElement).value;
    if (event.target) {
    this.filterTerm = '#' + value.slice(1).match(/^[A-Za-zА-Яа-яЁё0-9]{0,15}/g);
    }
  }
  hashtag(): void {
    // @ts-ignore
    const hashtag = document.getElementById('tagId').value;
    // @ts-ignore
    document.getElementById('tagId').value = '#' + hashtag
      .slice(1)
      .match(/^[A-Za-zА-Яа-яЁё0-9]{0,15}/g);
  }
  show(): void {
    this.visible = true;
    const main = document.getElementById('back');
    if (main) {
      main.style.display = 'block';
      main.style.position = 'fixed';
      main.style.width = '100%';
      main.style.height = '100%';
      main.style.backgroundColor = 'gray';
      main.style.opacity = '0.7';
      main.style.zIndex = '5';
    }
  }
  hide(): void {
    this.visible = false;
    const main = document.getElementById('back');
    if (main) {
      main.style.display = 'none';
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteModel} from '../Models/note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note!: NoteModel;
  @Output() removeNote = new EventEmitter<NoteModel>();
  @Output() confirmNote = new EventEmitter<NoteModel>();
  notes: NoteModel[] = [];
  visible = false;
  noteName?: string;
  noteText?: string;
  noteTags?: string;
  noteId?: number | string | undefined;
  noteDate?: string;
  text?: string;
  visibleNote = false;
  visibleButtons = true;
  visibleDelete = false;
  ifBigNote = false;
  bigNote = {
    width: '50%',
    height: '90%',
    translate: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '6'
  };
  constructor() { }

  ngOnInit(): void {
    console.log(this.note.id);
    const text = this.note.noteText?.split('');
    this.text = text?.slice(0, 3).concat('...').join('');

  }
  deleteNote(): void {
    const noteElem: NoteModel = {
      noteName: this.note.noteName,
      noteText: this.note.noteText,
      noteDate: this.note.noteDate,
      id: this.note.id,
      noteTags: this.note.noteTags

    };

    this.removeNote.emit(
      noteElem
    );
  }
  showNote(): void {
    this.visibleNote = true;
    this.visibleDelete = true;
    this.ifBigNote = true;
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
  hideNote(): void {
    this.visibleNote = false;
    this.visibleDelete = false;
    this.ifBigNote = false;
    const main = document.getElementById('back');
    if (main) {
      main.style.display = 'none';
    }
  }
  changeNote(): void {
    this.visible = true;
    this.noteName = this.note.noteName;
    this.noteText = this.note.noteText;
    this.noteTags = this.note.noteTags;
    this.noteId = this.note.id;
    this.noteDate = this.note.noteDate;
    console.log(this.note.id);
    this.visibleButtons = false;
  }

  confirm(note: NoteModel): void {
    if (this.noteText) {
      // @ts-ignore
    const filterTags = this.noteText.toLowerCase().split(/[\s\n]+/);
    console.log(filterTags);
    const result = filterTags.filter(word => /^#/.test(word));
    console.log(result);
    const tag = filterTags.map(n => /^#/.test(n) ? n.substr(1) : n);
    console.log(tag);
    const res = result.join(' ');
    const val = this.noteText;
    console.log(val.length + ' value length');
    let value = val;
      // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < value.length; j++) {
        value = value.replace('#', '');
      }
    // console.log(value + ' this value');

    const noteElement = {
        noteName: this.noteName,
        noteText: value,
        noteTags: this.noteTags?.concat(' ' + res),
        id: this.noteId,
        noteDate: this.noteDate
      };
    const main = document.getElementById('back');
    if (main) {
        main.style.display = 'none';
      }
    this.note.noteName = this.noteName;
    this.note.noteText = this.noteText;
    this.note.noteTags = this.noteTags;

    this.confirmNote.emit(
        noteElement
      );
    }
    this.visible = false;
    this.visibleButtons = true;
  }
  close(): void {
    this.visible = false;
    this.visibleButtons = true;
  }
}

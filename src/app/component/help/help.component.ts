import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  @Input()
  public field: FormControl = null;

  @Input()
  public messages: { [key: string]: string; } = null;


  constructor() { }

  ngOnInit() {
  }

  get isError(): boolean {
    if (this.field == null) {
      console.log('not ready', this.field);
      return false;
    }
    // Modifié
    return (this.field.touched || this.field.dirty) &&
      // et invalide
      this.field.errors !== null;
  }

  get errors() {
    if (this.messages === null || this.field === null){
      return [];
    }
    // construction liste de message
    return Object.keys(this.messages)
        .filter((key: string) => {
          return this.field.errors[key] !== undefined;
        })
        .map((key: string) =>{
          return this.messages[key];
        });
  }

}

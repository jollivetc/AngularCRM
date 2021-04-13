import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'crm-help',
  templateUrl: './help.component.html'
})
export class HelpComponent {

  @Input()
  public field?: AbstractControl;

  @Input()
  public messages?: { [key: string]: string; };

  isError(): boolean{
    return !!this.field && this.field.touched && !this.field.valid
  }

  get errors(): string[] {
    return Object.keys((this.field?.errors as object)).map((key) => {
      return this.messages?.[key] ? this.messages?.[key]: 'Il manque un message!';
    });
  }
}

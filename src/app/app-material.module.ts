import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';

const importExport = [MatButtonModule, MatToolbarModule, MatSelectModule,
  MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule];

@NgModule({
  imports: importExport,
  exports: importExport,
})
export class AppMaterialModule {
}

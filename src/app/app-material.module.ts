import {NgModule} from '@angular/core';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';

const importExport = [MatButtonModule, MatToolbarModule, MatSelectModule,
  MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule];

@NgModule({
  imports: importExport,
  exports: importExport,
})
export class AppMaterialModule {
}

import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule, MatSelectModule,
  MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule } from '@angular/material';

const importExport = [MatButtonModule, MatToolbarModule, MatSelectModule,
      MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule];

@NgModule({
  imports: importExport,
  exports: importExport,
})
export class AppMaterialModule { }

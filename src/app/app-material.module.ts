import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSelectModule,
  MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule],
})
export class AppMaterialModule { }

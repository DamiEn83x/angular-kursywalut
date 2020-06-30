import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WalutyService } from './services/waluty.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BodyComponent } from './body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ChartComponent } from './widgets/chart/chart.component'
import { ChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';
import { CheckBoxListComponent } from './widgets/check-box-list/check-box-list.component';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MyDatePickerComponent } from './widgets/my-date-picker/my-date-picker.component';
import { MAT_LABEL_GLOBAL_OPTIONS, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProgressSpinnerModule,ProgressSpinnerComponent } from './widgets/progress-spinner/progress-spinner.module';
import { AppOverlayModule } from './widgets/overlay/overlay.module';
import { MessageBoxComponent } from './widgets/message-box/message-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TechnologyBarComponent } from './technology-bar/technology-bar.component';
import { WalutyexternalService } from './services/walutyexternal.service';

@NgModule({
  imports:      [ GoogleChartsModule,BrowserModule,MatDatepickerModule, MatFormFieldModule,FormsModule, HttpClientModule,ChartsModule,MatNativeDateModule, MatMomentDateModule,MatFormFieldModule,MatInputModule,BrowserAnimationsModule,  AppOverlayModule,ProgressSpinnerModule,NgbModule],
  declarations: [ AppComponent, HelloComponent, TopBarComponent, BodyComponent, ChartComponent, CheckBoxListComponent, MyDatePickerComponent, MessageBoxComponent, TechnologyBarComponent ],
  bootstrap:    [ AppComponent ],
  providers: [WalutyService,DatePipe, WalutyexternalService]
})
export class AppModule { }

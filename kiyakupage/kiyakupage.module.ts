import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KiyakupagePageRoutingModule } from './kiyakupage-routing.module';

import { KiyakupagePage } from './kiyakupage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KiyakupagePageRoutingModule
  ],
  declarations: [KiyakupagePage]
})
export class KiyakupagePageModule {}

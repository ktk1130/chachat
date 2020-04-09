import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KiyakupagePage } from './kiyakupage.page';

const routes: Routes = [
  {
    path: '',
    component: KiyakupagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KiyakupagePageRoutingModule {}

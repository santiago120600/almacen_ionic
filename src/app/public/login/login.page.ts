import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RegisterModalPage } from '../../modals/register-modal/register-modal.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    user = {
        "pEmail":"",
        "pPassword":""
    };

  constructor(
    private restService : RestService,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {

  }

  do_login(){
    console.log(this.user);
    this.restService.login(this.user);
  }

  async register(){
    const modal = await this.modalController.create({
      component: RegisterModalPage
    });
    return await modal.present();
  };

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { RestService } from '../../services/rest.service';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.page.html',
  styleUrls: ['./register-modal.page.scss'],
})
export class RegisterModalPage implements OnInit {
  public registerForm: FormGroup;
  form_sent = false;
  carreras_list =  [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private restService : RestService,
  ) { 
    this.registerForm = this.formBuilder.group({
      pName: new FormControl("", Validators.compose([Validators.required])),
      pLastname: new FormControl("", Validators.compose([Validators.required])),
      pGenre: new FormControl("", Validators.compose([Validators.required])),
      pEmail: new FormControl("", Validators.compose([Validators.required])),
      pIdentifier: new FormControl("", Validators.compose([Validators.required])),
      pPhone: new FormControl("", Validators.compose([Validators.required])),
      pRole: new FormControl("", Validators.compose([Validators.required])),
      pCareer: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.restService.get_method('catalogs/api/careers','').subscribe(result=>{
      this.carreras_list= result.data;
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  registrar(){
    this.form_sent = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.restService.post_method('users/api/mobile_users', this.registerForm.value).subscribe(result =>{
        if(result.status=="success"){
          this.show_toast(`Tu contraseña es: ${result.data.key_password}`, "success",4000); 
          let login_data = {
            pEmail :  this.registerForm.value['pEmail'],
            pPassword : result.data.key_password
          }
          this.restService.login(login_data);
          this.dismiss();
        }else{
          this.show_toast(result.message, "danger",2000); 
        }
      })
    }
  }

  async show_toast(_message, _color,_duration) {
    const toast = await this.toastController.create({
      message: _message,
      duration: _duration,
      color: _color
    });
    toast.present();
  }

}

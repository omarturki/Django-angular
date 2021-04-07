import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/services/user.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public activeModal: NgbActiveModal;
  users:any;
  name='';
  showMoadl=false;


  addUserForm:FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username:['',[Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    verifPassword: ['', Validators.required],

}, {
    validator: this.MustMatch('password', 'verifPassword')
});
user = {
  email : this.addUserForm.value.email,
  password: this.addUserForm.value.password,
  username: this.addUserForm.value.username,
}
updateForm:FormGroup = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  username:['',[Validators.required]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  verifPassword: ['', Validators.required],

}, {
  validator: this.MustMatch('password', 'verifPassword')
});

userUpdated = {
  id : 0 ,
  email : this.updateForm.value.email,
  password: this.updateForm.value.password,
  username: this.updateForm.value.username,
}
  constructor(  private formBuilder:FormBuilder,
    private userService: UserService,
    private toastService:ToastrService
    ) { }

  ngOnInit(): void {
    this.userService.listUsers().subscribe((s)=>{
      this.users = s;
      console.log(s)
    })
  }
  MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];

          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }

          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }

    signup(){
      if(this.addUserForm.controls.email.errors || this.addUserForm.controls.password.errors || this.addUserForm.controls.verifPassword.errors){
        if(this.addUserForm.controls.email.hasError('required') ){
          this.toastService.error("email est obligatoire !!!");
        }
          if(this.addUserForm.controls.email.hasError('email')){
        this.toastService.error("email invalide  !!!");
          }
        if(this.addUserForm.controls.password.hasError('required')){
          this.toastService.error("password est obligatoire !!!");
        }
        if(this.addUserForm.controls.password.hasError('minLength')){
          this.toastService.error("Password doit cntenir au moins 8 caractéres !!!");
        }
        if(this.addUserForm.controls.verifPassword.hasError('required')){
          this.toastService.error("Vous devez confirmer votre password !!!");
        }

        if(this.addUserForm.controls.verifPassword.hasError('mustMatch')){
          this.toastService.error("Password incompatible!!!");
        }


      }
      if(this.addUserForm.valid){
        this.toastService.success("Inscription avec succes");
        console.log(this.user)
        this.userService.addUsers(this.user).subscribe(
          (s)=>{
              this.users.push(s)
        },
        (err)=>{
          console.log(err)
        }
        )
    }
    }
  open() {
      this.showMoadl = true;
  }
  showM(){
    return this.showMoadl = !this.showMoadl;
}
deleteUsers(id){
   this.userService.deleteUsers(id).subscribe((s)=>{
    this.users = this.users.filter(function(value, index, arr){
      return value.id !=  id;
  });
     console.log("supprimer")
   })
}
 updateUser() {

  this.userService.updateUsers(this.userUpdated).subscribe((data) => {

    console.log(data);
  });
}
}





import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LoginService } from 'src/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login=true;



  loginForm= new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
      Validators.email
      ]),
    password: new FormControl(
      '',[
        Validators.required
      ]
      )
  })

  signupForm:FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    verifPassword: ['', Validators.required],
}, {
    validator: this.MustMatch('password', 'verifPassword')
});

user = {
  email : this.signupForm.value.email,
  password: this.signupForm.value.email
}
userlogin = {
  email : this.loginForm.value.email,
  password: this.loginForm.value.email
}
  constructor(private loginService:LoginService,
    private formBuilder:FormBuilder,
    private toastService:ToastrService,private router: Router) { }

  ngOnInit(): void {
    console.log(this.loginService.isAuthenticated())
    if(this.loginService.isAuthenticated()){
      this.router.navigateByUrl("/listuser")
    }
  }



  authenticate(userlogin){
      console.log(this.loginForm.valid)
        if(this.loginForm.controls.email.errors || this.loginForm.controls.password.errors ){
          if(this.loginForm.controls.email.hasError('required') ){
            this.toastService.error("email est obligatoire !!!");
          }
            if(this.loginForm.controls.password.errors){
          this.toastService.error("email invalide  !!!");
          }
        }

  if(this.loginForm.valid){
    this.toastService.success("connexion avec succes");
        this.router.navigateByUrl('/listuser');
    this.loginService.authenticate(this.userlogin).subscribe(
      (s)=>{

        console.log(s);
       },
    (err)=>{
      console.log(err)
    }
    )
}

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
    if(this.signupForm.controls.email.errors || this.signupForm.controls.password.errors || this.signupForm.controls.verifPassword.errors){
      if(this.signupForm.controls.email.hasError('required') ){
        this.toastService.error("email est obligatoire !!!");
      }
        if(this.signupForm.controls.email.hasError('email')){
      this.toastService.error("email invalide  !!!");
        }
      if(this.signupForm.controls.password.hasError('required')){
        this.toastService.error("password est obligatoire !!!");
      }
      if(this.signupForm.controls.password.hasError('minLength')){
        this.toastService.error("Password doit cntenir au moins 8 caractéres !!!");
      }
      if(this.signupForm.controls.verifPassword.hasError('required')){
        this.toastService.error("Vous devez confirmer votre password !!!");
      }

      if(this.signupForm.controls.verifPassword.hasError('mustMatch')){
        this.toastService.error("Password incompatible!!!");
      }


    }
    if(this.signupForm.valid){
      this.toastService.success("Inscription avec succes");
      this.login=true;
      this.signupForm.reset();
      this.loginService.signup(this.user).subscribe(
        (s)=>{
            console.log(s)
      },
      (err)=>{
        console.log(err)
      }
      )
  }
  }


}

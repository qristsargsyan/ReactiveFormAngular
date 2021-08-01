import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './CustomValidation/match-validation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  items!: FormArray;  

  constructor(private formBuilder: FormBuilder) { };

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          title: ['', Validators.required],
          firstName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
          lastName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
          email: ['', [Validators.required, Validators.email,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue],
          items:this.formBuilder.array([this.createItem()]), 
       
      }),    
      
      {
          validator: MustMatch('password', 'confirmPassword')
      };
    }     

    addForm(): void {
      this.items = this.registerForm.get('items') as FormArray;
      this.items.push(this.createItem());
    }

    createItem(): FormGroup {
      return this.formBuilder.group({});
    }

      get f() { return this.registerForm.controls; }

      onSubmit() {
          this.submitted = true;
  
          if (this.registerForm.invalid) {
              return;
          }
  
          alert('SUCCESS!!\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      }
  
      onReset() {
          this.submitted = false;
          this.registerForm.reset();
      }

      delete(index:any){
        this.items.removeAt(index);
      }
}

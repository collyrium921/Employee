import { Component, OnInit } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms'
import { SKILLS } from '../../constants/skills'
import { ErrorStateMatcher } from '@angular/material/core'
import { DESIGNATION_LIST } from 'src/constants/designation'
import { AppService } from '../app.service'
import { Router } from '@angular/router'
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    )
  }
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  skills = SKILLS;
  designationList= DESIGNATION_LIST;
  public companyForm!: FormGroup
  matcher = new MyErrorStateMatcher()
  constructor(private fb: FormBuilder, private appService: AppService,
  private router: Router) {
    
  }
  ngOnInit(): void {
    this.companyForm = this.fb.group({
      id:'',
      companyName: ['', [Validators.required, Validators.maxLength(50)]],
      address: [''],
      email: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(15)]],
      empInfo: this.fb.array([]),
    })
    this.addEmployee();
  }

  empInfo(): FormArray {
    return this.companyForm.get('empInfo') as FormArray
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      empName: ['', [Validators.required, Validators.maxLength(25)]],
      designation: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber:['', [Validators.required, Validators.maxLength(15)]],
      skillInfo: this.fb.array([]),
      educationInfo: this.fb.array([]),
    })
  }

  addEmployee() {
    this.empInfo().push(this.newEmployee())
  }

  employeeSkills(empIndex: number): FormArray {
    return this.empInfo().at(0).get('skillInfo') as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
      skillRating: ['', [Validators.required]],
    });
  }

  employeeEducation(empIndex: number): FormArray {
    return this.empInfo().at(0).get('educationInfo') as FormArray
  }

  newEductation(): FormGroup {
    return this.fb.group({
      instituteName: ['', [Validators.required, Validators.maxLength(50)]],
      courseName: ['', [Validators.required, Validators.maxLength(25)]],
      completedYear: ['', [Validators.required]],
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(0).push(this.newSkill())
  }

  addEmployeeEducation(empIndex: number) {
    this.employeeEducation(0).push(this.newEductation())
  }

  addCompany() {
    this.companyForm.value.id = new Date().getTime()
    console.log(this.companyForm.value)
    this.appService.addCompany(this.companyForm.value).subscribe(res => {
        this.router.navigateByUrl('')
    })
  }

  //validation
  validationFunction(inputField: string) {
    return (
      this.companyForm.controls[inputField]?.invalid &&
      (this.companyForm.controls[inputField]?.dirty ||
        this.companyForm.controls[inputField]?.dirty)
    )
  }
  validationMessage(errorInput: string, displayInput: string) {
    if (this.validationFunction(errorInput)) {
      if (this.companyForm.get(errorInput)?.hasError('required')) {
        return displayInput + ' is required'
      } else if (this.companyForm.get(errorInput)?.hasError('maxlength')) {
        return 'Character limit reached'
      } else if (this.companyForm.get(errorInput)?.hasError('pattern')) {
        return 'Invalid ' + displayInput
      } else return ''
    } else return ''
  }
}

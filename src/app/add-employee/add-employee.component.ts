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
import { MatSnackBar } from '@angular/material/snack-bar'
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
  //variable declaration
  skills = SKILLS
  designationList = DESIGNATION_LIST
  public companyForm!: FormGroup
  matcher = new MyErrorStateMatcher()

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    //define the fields of form group
    this.companyForm = this.fb.group({
      id: '',
      companyName: ['', [Validators.required, Validators.maxLength(50)]],
      address: [''],
      email: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(15)]],
      empInfo: this.fb.array([]),
    })
    this.addEmployee()
  }

  //get employee controls as formArray
  empInfo(): FormArray {
    return this.companyForm.get('empInfo') as FormArray
  }

  //new employee data
  newEmployee(): FormGroup {
    return this.fb.group({
      empName: ['', [Validators.required, Validators.maxLength(25)]],
      designation: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(15)]],
      skillInfo: this.fb.array([]),
      educationInfo: this.fb.array([]),
    })
  }

  //add employee to the company form in empInfo array
  addEmployee() {
    this.empInfo().push(this.newEmployee())
  }

  //get skills as formArray
  employeeSkills(empIndex: number): FormArray {
    return this.empInfo().at(empIndex).get('skillInfo') as FormArray
  }

  //new skill information data
  newSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
      skillRating: ['', [Validators.required]],
    })
  }

  //get employee information as formArray
  employeeEducation(empIndex: number): FormArray {
    return this.empInfo().at(0).get('educationInfo') as FormArray
  }

  //new employee information data
  newEductation(): FormGroup {
    return this.fb.group({
      instituteName: ['', [Validators.required, Validators.maxLength(50)]],
      courseName: ['', [Validators.required, Validators.maxLength(25)]],
      completedYear: ['', [Validators.required]],
    })
  }

  //add employee skill to the array
  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill())
  }

  // add employee education to array
  addEmployeeEducation(empIndex: number) {
    this.employeeEducation(empIndex).push(this.newEductation())
  }

  //add company data to the local json file
  addCompany() {
    this.companyForm.value.id = new Date().getTime()
    console.log(this.companyForm.value)
    this.appService.addCompany(this.companyForm.value).subscribe((res) => {
      this.snackBar.open('Delete successful', 'Close', {
        duration: 1000,
        panelClass: ['snack-notification'],
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
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

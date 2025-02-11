import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/components/services/admin.service';
import { SnackbarService } from 'src/app/components/services/snackbar.service';
import { numbersOnlyValidator } from './numbersOnlyValidator';
import { DatePipe } from '@angular/common';
import { UserWorkingCacheService } from 'src/app/components/services/user-workingcache.service';

@Component({
  selector: 'sbx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
userID: any;

  constructor(private adminservice:AdminService, private snackbarservice: SnackbarService,
    private datePipe: DatePipe){}

  showEditProfile: boolean = false;
  showUserTable: boolean = false;
  data: any = [];

  isCloneChecked: boolean = false;
  adminForm!: FormGroup;
  cloneForm!: FormGroup;
  currentUserForm!: FormGroup;

  // Show Clone Status
  cloneStatus:any = '';
  currentUser: any;
  date: any;
  activationDate = this.getNowUTC();

  cloneData:any = [];
  showCloneUserTable: boolean = false;
  currentCloneUser: any;
  username: any;
  isLoading = false;

  // role list
  userRoleNGroup: any = {};

  // CloneUser
  showCloneUser:boolean = false;
  cloneUserForm:any;

  // generateUTCDate
  private getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      username:  new FormControl('', [Validators.required, Validators.email])
    });
    this.cloneForm = new FormGroup({
      cloneUser: new FormControl('', [Validators.required, Validators.email]),
    });
    // creating current UserForm
    this.currentUserForm = new FormGroup({
      userID: new FormControl(),
      userName: new FormControl(),
      firstName: new FormControl(),
      lastName:new FormControl(),
      email: new FormControl(),
      roleID: new FormControl('', [Validators.required, numbersOnlyValidator()]),
      clientGroupID: new FormControl('', [Validators.required, numbersOnlyValidator()]),
      isInvestor: new FormControl(),
      isActive: new FormControl(),
      createdDate: new FormControl(),
      createdBy: new FormControl(),
      modifiedDate: new FormControl(),
      modifiedBy: new FormControl(),
      auditState: new FormControl(),
      permissions: new FormControl(),
      userEmailAddress: new FormControl('')
    });

    if(this.currentUserForm.controls["isInvestor"].value){
      this.currentUserForm.controls["isInvestor"].addValidators([Validators.required, Validators.email]);
      this.currentUserForm.updateValueAndValidity();
    }
    else{
      this.currentUserForm.controls["userEmailAddress"].setValue("");
    }


    this.adminservice.fetchDropdownValues().subscribe((res:any) =>{
      console.log(res);
      this.userRoleNGroup.clientGroups = res.clientGroups;
      this.userRoleNGroup.roles = res.roles;
      this.userRoleNGroup.filteredRoles = res.filteredRoles;
      //console.log(`Filtered Roles:`, this.userRoleNGroup);
      this.userRoleNGroup.filteredRoles = res.filteredRoles;

    });
  }

  // setErrorClientEmail
  setErrorClientEmail(){
    this.currentUserForm.controls["isInvestor"].setErrors({'incorrect': true});
  }

  // get Graph User List
  onSubmit() {
    this.showCloneUser = false;
    this.currentCloneUser, this.currentUser = '';
    this.currentUserForm.reset();
    this.data = [];
    this.showEditProfile = false

    // graph API call
    if(this.adminForm.valid){
      this.adminservice.graphSearchUser(this.adminForm.value.username).subscribe((result:any) => {
        this.isLoading = true;
        result ? (this.data.push(result), setTimeout(() => {
          if (this.data !== null && this.data.length >= 1)
            this.showUserProfile(0);

          this.isLoading = false;
        }, 300)) : this.data = [] ;
      },
      (error:any) => {
        console.log(error);
        this.snackbarservice.error(`Unable to find User ${this.adminForm.value.username}`);
        //this.adminForm.reset()
      })
    }
  }

  // new user profile update
  updateCurrentUserFormSubmit(form: FormGroup){
    let userdata = {userInfo: form.value}
    this.adminservice.updateUser(userdata).subscribe((res:any)=>{
      this.isLoading = true;
      const message = (res == null ? 'User Updated Successfully!' : '');
      this.snackbarservice.success(message);
      setTimeout(() => {
        this.adminservice.getUserDetailsByEmail(userdata.userInfo.email).subscribe((res:any) => {
          this.currentUser.userID = res.userInfo.userID;
          this.setCurrentUserForm(res.userInfo);
        });
        this.isLoading = false;
      },300);
    },
    (error:any)=>{
      this.snackbarservice.error(error);
    }
    )
  }

  // show user profile
  showUserProfile(item:any){
    this.currentUserForm.reset();
    this.currentUser = this.data[item];
    console.log(`mail:${this.currentUser.mail} userPrincipalName:${this.currentUser.userPrincipalName}`);
    this.adminservice.userEmailExists(this.currentUser.userPrincipalName).subscribe((res:any) =>{
      this.isLoading = true;
      res ? this.adminservice.getUserDetailsByEmail(this.currentUser.userPrincipalName).subscribe((res:any) => {
        // debugger;
        this.currentUser.userID = res.userInfo.userID;
        this.setCurrentUserForm(res.userInfo);
      })
      : this.setCurrentUserForm({userID: 0, isActive: true, isInvestor: false, roleID: '', clientGroupID: '',
        createdBy: '', modifiedBy: '',
        auditState: '', permissions:'',
        createdDate: new Date(),
        modifiedDate: new Date()});

      this.showEditProfile = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    })
  }

  setCurrentUserForm(userInfo:any){
    console.log(userInfo);
    this.currentUserForm.setValue({
      userID: userInfo.userID,
      //userName: this.currentUser.givenName + '.' + this.currentUser.surname,
      userName: UserWorkingCacheService.isNullOrEmptyString(userInfo.userName) ?
        this.currentUser.givenName + '.' + this.currentUser.surname : userInfo.userName,
      firstName: this.currentUser.givenName,
      lastName:this.currentUser.surname,
      email: this.currentUser.userPrincipalName,
      roleID: userInfo.roleID,
      clientGroupID: userInfo.clientGroupID,
      isInvestor: userInfo.isInvestor,
      isActive: userInfo.isActive,
      createdDate: userInfo.createdDate,//this.datePipe.transform(userInfo.createdDate, 'yyyy-MM-dd HH:mm:ss'),
      createdBy: userInfo.createdBy,
      modifiedDate: userInfo.modifiedDate,//this.datePipe.transform(userInfo.modifiedDate, 'yyyy-MM-dd HH:mm:ss'),
      modifiedBy: userInfo.modifiedBy,
      auditState: userInfo.auditState,
      permissions: userInfo.permissions,
      userEmailAddress: userInfo.userEmailAddress ? userInfo.userEmailAddress : ''
    });
  }

  // clone wrapper toggle
  toggleCloneWrapper(event:any){
    this.isCloneChecked = event.target.checked;
  }

  // checking isInvestor is checked
  // isInvestorChecked(event:any){
  //   this.cloneForm.reset();
  //   this.currentCloneUser = '';
  //   this.showCloneUser = false;
  // }

  // clone User API call
  fetchCloneUser(){
    if(this.cloneForm.valid){
      this.adminservice.getUserDetailsByEmail(this.cloneForm.value.cloneUser, true).subscribe((response:any)=>{
        this.isLoading = true;
        this.showCloneUser = false;
        this.currentCloneUser = response.userInfo;

        // created role and group name to clone from user
        let role = this.userRoleNGroup.roles.filter((role:any) => { return response.userInfo.roleID == role.roleId; });
        let group = this.userRoleNGroup.clientGroups.filter((group:any) => { return response.userInfo.clientGroupID == group.id; });
        let filteredRoles = this.userRoleNGroup.filteredRoles.filter((role:any) => {return response.userInfo.roleID == role.roleId});

        this.currentCloneUser.role = role[0].roleName;
        this.currentCloneUser.group = group[0].name;
        this.currentCloneUser.filteredRoles = role[0].roleName;
        this.currentUser.isInvestor = this.currentCloneUser.isInvestor;
        this.currentUserForm.controls["isInvestor"].setValue(this.currentUser.isInvestor);

        setTimeout(() => {
          this.showCloneUserDetails(this.currentCloneUser);
          this.isLoading = false;
        }, 500);
      },
      (error:any) => {
        console.error('Error fetching data:', error);
      })
    }
    else{
      return;
    }
  }

  showCloneUserDetails(user:any){
    this.showCloneUser = true;
  }

  sendCloneData(){
    this.currentUserForm.value.permissions = this.currentCloneUser.permissions;

    //set the RoleID/GroupID to numeric value for correct conversion for datatype for API
    if (this.currentUserForm.value.roleID === '')
      this.currentUserForm.value.roleID = 0;
    if (this.currentUserForm.value.clientGroupID === '')
      this.currentUserForm.value.clientGroupID = 0;

    let cloneObject = {
      "fromUser": this.currentCloneUser,
      "toUser": this.currentUserForm.value,
    }
    console.log("toandFrom user :" + cloneObject);
    console.log(cloneObject);
    this.adminservice.cloneUser(cloneObject).subscribe((res:any) =>{
      this.isLoading = true;
      console.log(res.userInfo);

      setTimeout(() => {
        this.snackbarservice.success(`Successfully Clone user id: ${res.userInfo.userID}`);
        this.setCurrentUserFormValues(res);
        this.isLoading = false;
        this.isCloneChecked = false;
        this.currentUser = res.userInfo;
        this.cloneForm.reset();
        this.currentCloneUser = '';
        // [hidden]="currentUser.userID"
      }, 1000);
    },
    ((error:any) => {
      this.snackbarservice.error(error);
    }))
  }

  private setCurrentUserFormValues(res: any) {
    this.currentUserForm.setValue({
      userID: res.userInfo.userID,
      userName: res.userInfo.userName,
      firstName: res.userInfo.firstName,
      lastName: res.userInfo.lastName,
      email: res.userInfo.email,
      roleID: res.userInfo.roleID,
      clientGroupID: res.userInfo.clientGroupID,
      isInvestor: res.userInfo.isInvestor,
      isActive: res.userInfo.isActive,
      createdDate: res.userInfo.createdDate,
      createdBy: res.userInfo.createdBy,
      modifiedDate: res.userInfo.modifiedDate,
      modifiedBy: res.userInfo.modifiedBy,
      auditState: res.userInfo.auditState,
      permissions: res.userInfo.permissions,
      userEmailAddress: res.userInfo.userEmailAddress,
    });
  }

  addUser() {
    this.currentUserForm.value.permissions = [];
    // debugger;
    if (this.currentUserForm.valid) {
      this.adminservice.addUser(this.currentUserForm.value).subscribe((res:any)=>{
        this.isLoading = true;
        const message = (res == null ? 'User Added Successfully!' : '');
        this.snackbarservice.success(message);
        let item : any = 0;
        this.showUserProfile(item);
        setTimeout(() => {
          this.isLoading = false;
        }, 200);
      },
      (error:any)=>{
        this.snackbarservice.error(error);
      }
      )
    }
  }

  deleteUser(userId: any){
    this.adminservice.deletUser(userId).subscribe((res:any)=>{
      this.isLoading = true;
      const message = (res == null ? `Successfully Deleted User: ${this.currentUser.userPrincipalName}!` : '');
      this.snackbarservice.success(message);
      this.showEditProfile = false;
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
      this.currentUserForm.reset();
    },
    (error:any)=>{
      this.snackbarservice.error(error);
    }
    )
  }

}

import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase : AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form =  new FormGroup({
    $key : new FormControl(null),
    fullname : new FormControl('', Validators.required),
    companyname :  new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    Password :  new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  getCustomers(){
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  //insert
  insertCustomer(customer){
    this.customerList.push({
      fullname : customer.fullname,
      companyname : customer.companyname,
      email : customer.email,
      Password : customer.Password
    });
  }

  populateForm(customer){
    this.form.setValue(customer);
  }

  updateCustomer(customer){
    this.customerList.update(customer.$key,{
      fullname : customer.fullname,
      companyname : customer.companyname,
      email : customer.email,
      Password : customer.Password
    });
  }
  deleteCustomer($key:string){
    this.customerList.remove($key);
  }
}

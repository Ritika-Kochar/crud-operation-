import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService : CustomerService) { }
  customerArray = [];
  showDeletedMessage : boolean;

  searchText : string  = "";

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      list => {
        this.customerArray = list.map(item => {
          return {
              $key : item.key,
            ...item.payload.val() // three dots index come from latest jaavscript & it will unpack values;
            // all properties will be in this object without $key display;
          };
        });
      });
  }
  onDelete($key){
    if(confirm('Are you sure to delete this record?'))
    this.customerService.deleteCustomer($key);
    this.showDeletedMessage = true; 
    
    setTimeout(() => this.showDeletedMessage = false, 3000);
   
    
  }

  filterCondition(customer){
    return customer.fullname.toLowerCase().indexOf(this.searchText.toLowerCase()) ! == 0;
  }
}

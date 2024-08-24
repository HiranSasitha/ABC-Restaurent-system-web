import {Component, OnInit} from '@angular/core';
import {BranchService} from "../../service/admin/branch.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements  OnInit{

  branch: any[] = [];
  showBranches: any[] = [];
  constructor(private branchService:BranchService,private route:Router) {
  }
  ngOnInit(): void {
    this.getAllActiveBranches();
  }

  getAllActiveBranches(){

    this.branchService.getAllActive().subscribe(
      (data:any)=>{
        this.branch = data;
        this. showBranchesOneByOne();


      }
    );

  }
  showBranchesOneByOne(): void {
    this.branch.forEach((branch:any, index:any) => {
      setTimeout(() => {
        this.showBranches.push(branch);
      }, index * 500);
    });
  }


  selectBranch(bra: any) {

    this.route.navigate(['/order-category'], { state: { selectedBranch: bra } });
  }
}

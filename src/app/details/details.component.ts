import { Component, OnInit } from '@angular/core';
import { WindmillService } from '../service/windmill.service';
import { Note, Wtgs } from '../models/wtgs.model';
import { ActivatedRoute } from '@angular/router';
import { Inspection } from '../models/inspection.model';
import { CatColors } from '../catColors'
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import {FormGroup , FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(public dialog: MatDialog,private breakpointObserver: BreakpointObserver,private windmillService: WindmillService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {
  }

  data: any = []
  loadArray: any = []
  listA: any;
  listB: any;
  listC: any;
  wtg_idList: string[] = [];
  wtg_dateList: string[] = [];
  filterId: string = "";
  filterDate: string = "";
  dateSelected:string=""
  idselected:string=""
  imageIndex:number=1
  sidenavOpen:boolean=false;
  notes:Note[]=[];
  JSON=JSON;
  index:number=0;
  editIndex:number=0;
  dialogeForm=new FormGroup({
  note:new FormControl('',Validators.required)
})


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.data = params
      // console.log(this.data)
      this.onLoadRow()
      this.setFilter()
      this.filterId = this.data.id;
      this.filterDate = this.data.date;
    })
  }
  rowDataList: Wtgs[] = JSON.parse(
    JSON.stringify(this.windmillService.wtgsList)
  );
  inspectionDataList: Inspection[] = JSON.parse(JSON.stringify(this.windmillService.inspectionList))

  dialogeBox(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
         width: '500px',
         height:'250px'
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
 
    });
}
dialogeBoxEdit(templateRef: any) {
  let dialogRef = this.dialog.open(templateRef, {
       width: '500px',
       height:'250px'
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

  });
}


  onLoadRow() {
    this.rowDataList.forEach((element) => {
      if (this.data.id == element.wtg_id) {
        JSON.stringify(this.loadArray.push(element))
      }
      this.inspectionDataList.forEach((ele) => {
        if (this.data.id == ele.blade_id.slice(0, 4) && this.data.date == ele.inspection_date.slice(0, 10)) {
          if ("A" == ele.blade_id.slice(5, 6)) {
            this.listA = ele
            console.log(this.listA)
          }
          if ("B" == ele.blade_id.slice(5, 6)) {
            this.listB = ele
            // console.log(this.listB)
          }
          if ("C" == ele.blade_id.slice(5, 6)) {
            // console.log(ele.blade_id)
            this.listC = ele
            // console.log(this.listC)
          }
        }
      })
    })
  }

  getImgSrc(imageCat: any): string {
    let imageSrc = '../../assets/images/blade-';
    const cat = imageCat.validated ?? imageCat.auto;
    imageSrc += CatColors[cat];

    const isValidated = imageCat.validated != null;
    imageSrc += isValidated ? '-filled.png' : '-unfilled.png';
    return imageSrc;
  }
  private setFilter(): void {
    const wtg_idList: string[] = []
    const wtg_dateList: string[] = []
    this.rowDataList.forEach((element) => {
      wtg_idList.push(element.wtg_id)
      wtg_dateList.push(element.inspection_date.slice(0, 10))
    })
    wtg_idList.sort((a, b) => {
      const lowerA = a.trim().toLowerCase();
      const lowerB = b.trim().toLowerCase();
      return lowerA === lowerB ? 0 : lowerA > lowerB ? 1 : -1


    })
    wtg_dateList.sort((a: any, b: any) => {
      var val1: any = new Date(a.inspection_date).getTime();
      var val2: any = new Date(b.inspection_date).getTime();
      return val1 > val2 ? 1 : -1

    })
    this.wtg_dateList = Array.from(new Set(wtg_dateList))
    this.wtg_idList = Array.from(new Set(wtg_idList))

  }

  onToggleFilter(e: MatSelectChange): void {
    this.router.navigate(['details', this.filterId, this.filterDate])
    this.loadArray = []
    this.listA = ''
    this.listB = ''
    this.listC = ''
  }
  bladeClick(notes:Note[],label:string){
    this.sidenavOpen=true;
    this.notes=notes;
    this.idselected=label;
    

  }
  imageClick(date:string,id:string,j:number,notes:Note[]){
    this.dateSelected=date
  this.idselected=id
  this.imageIndex=j+1
  this.sidenavOpen=true;
  this.notes=notes;

  }
  save(){
    let date=new Date().getTime()
    let note:Note={text:this.dialogeForm.controls["note"].value,date:date}
    this.notes.push(note)
    this.dialogeForm.reset()
  }
  cancel(){
    (document.getElementById('notes') as HTMLInputElement).value=''
    this.dialogeForm.reset()
  }
  
  edit(editIndex:number){
    this.editIndex=editIndex
    console.log(this.notes[editIndex].text);
  this.dialogeForm.patchValue({
  note:this.notes[editIndex].text,
    
})
this.dialogeForm.reset()

}
  editNote(){
    this.notes[this.editIndex].text=this.dialogeForm.controls["note"].value
    this.dialogeForm.reset();
    (document.getElementById('notes')as HTMLInputElement).value='';
  }

  delete(index:number){
    this.index=index
   }

  deleteNote(){
    if(this.index>-1){
      this.notes.splice(this.index,1)
    }
  }
  
}
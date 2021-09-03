import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  Inspection } from '../models/inspection.model';
import { WindmillService } from '../service/windmill.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatColors } from '../catColors';

@Component({
  selector: 'app-compare-image',
  templateUrl: './compare-image.component.html',
  styleUrls: ['./compare-image.component.scss']
})
export class CompareImageComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CompareImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private windmillService: WindmillService,
  ) {
    
  }
  
  compareImage: any[] = this.data.imageDetails;

  listA:any=this.data.listA;
  listB:any=this.data.listB;
  listC:any=this.data.listC;
  bladeid:string="";
  index:number=1;

  ngOnInit(): void {
    
    this.compareImage.forEach(item=>{
      this.listA.images.forEach((element:any) => {
        if(element.image_hash === item.image_hash){
          this.bladeid="A"
          this.index = this.listA.images.map(function (img:any) { return img.image_hash; }).indexOf(item.image_hash);
        }

      });
      this.listB.images.forEach((element:any) => {
        if(element.image_hash === item.image_hash){
          this.bladeid= "B"
          this.index = this.listB.images.map(function (img:any) { return img.image_hash; }).indexOf(item.image_hash);

        }
      });
      this.listC.images.forEach((element:any) => {
        if(element.image_hash === item.image_hash){
          this.bladeid= "C"
          this.index = this.listC.images.map(function (img:any) { return img.image_hash; }).indexOf(item.image_hash);

        }
      });
    })
    console.log(this.bladeid)
    console.log(this.index)
  }

  inspectionDataList: Inspection[] = JSON.parse(
    JSON.stringify(this.windmillService.inspectionList)
  );
 
  getImgSrc(imageCat: any): string {
    let imageSrc = '../../assets/images/blade-';
    const cat = imageCat.validated ?? imageCat.auto;
    imageSrc += CatColors[cat];

    const isValidated = imageCat.validated != null;
    imageSrc += isValidated ? '-filled.png' : '-unfilled.png';
    return imageSrc;
  }
}

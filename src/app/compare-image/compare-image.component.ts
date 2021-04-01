import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { Inspection } from '../models/inspection.model';
import { WindmillService } from '../service/windmill.service';
import { Wtgs } from '../models/wtgs.model';
import { CatColors } from '../catColors';

@Component({
  selector: 'app-compare-image',
  templateUrl: './compare-image.component.html',
  styleUrls: ['./compare-image.component.scss']
})
export class CompareImageComponent implements OnInit {
  constructor(private router: Router,
    public dialogRef: MatDialogRef<CompareImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private windmillService: WindmillService,
  ) {
  }
  compareImage:any[]=this.data;

  ngOnInit(): void {
    console.log(this.compareImage)
  }
  
  
  rowDataList: Wtgs[] = JSON.parse(
    JSON.stringify(this.windmillService.wtgsList)
  );

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

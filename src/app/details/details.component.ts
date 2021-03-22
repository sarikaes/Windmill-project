import { Component, OnInit } from '@angular/core';
import { WindmillService } from '../service/windmill.service';
import { Wtgs } from '../models/wtgs.model';
import { ActivatedRoute } from '@angular/router';
import { Inspection } from '../models/inspection.model';
import {CatColors} from '../catColors'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private windmillService: WindmillService,
    private activatedRoute: ActivatedRoute) {
  }

  data: any = []
  loadArray: any = []
  listA: any;
  listB:any;
  listC:any;

  ngOnInit(): void {
    this.data = JSON.parse(JSON.stringify(this.activatedRoute.snapshot.params))
    this.onLoadRow()
  }

  rowDataList: Wtgs[] = JSON.parse(
    JSON.stringify(this.windmillService.wtgsList)
  );
  inspectionDataList: Inspection[] = JSON.parse(JSON.stringify(this.windmillService.inspectionData))

  onLoadRow() {
    this.rowDataList.forEach((element) => {
      if (this.data.id == element.wtg_id) {
        JSON.stringify(this.loadArray.push(element))
      }
    this.inspectionDataList.forEach((ele) => {
      if (this.data.id == ele.blade_id.slice(0,4) && this.data.date == ele.inspection_date.slice(0,10)){
        // console.log(ele.blade_id)
        if("A" == ele.blade_id.slice(5,6)){
          // console.log(ele.blade_id)
          this.listA=ele
          console.log(this.listA)
        }
        if("B" == ele.blade_id.slice(5,6)){
          // console.log(ele.blade_id)
          this.listB=ele
          // console.log(this.listB)
        }
        if("C" == ele.blade_id.slice(5,6)){
          // console.log(ele.blade_id)
          this.listC=ele
          // console.log(this.listC)
        }


      }})
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
}

import { Component, OnInit } from '@angular/core';
import { WindmillService } from '../service/windmill.service';
import { Wtgs } from '../models/wtgs.model';
import { ActivatedRoute } from '@angular/router';

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

  ngOnInit(): void {
    this.data = JSON.parse(JSON.stringify(this.activatedRoute.snapshot.params))
    this.onLoadRow()
  }
  rowDataList: Wtgs[] = JSON.parse(
    JSON.stringify(this.windmillService.wtgsList)
  );
  onLoadRow() {
    this.rowDataList.forEach((element) => {
      if (this.data.id == element.wtg_id) {
        JSON.stringify(this.loadArray.push(element))
      }
    })
    console.log(this.loadArray)
  }
}

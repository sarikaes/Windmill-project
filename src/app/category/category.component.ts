import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CatColors } from '../catColors'
import { Category } from '../models/inspection.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category = {} as Category;
  @Input() isBlade: boolean = false;
  @Input() bladeLabel: string = '';
  @Input() isChange: boolean = false;
  @Output() catEvent = new EventEmitter<{
    bladeType: string;
  }>();
  @Output() turbineEvent = new EventEmitter<{
    bladeId: string;
  }>();
  isClicked: boolean = false;
  imageSrc: string = '';
  cat: number = -1;
  constructor() {}

  ngOnInit(): void {}

  getImgSrc(imageCat: Category, isChange: boolean): string {
    if (this.isBlade == true) {
      this.imageSrc = '../../assets/images/turbine-';
    } else {
      this.imageSrc = '../../assets/images/blade-';
    }

    this.cat = imageCat.validated ?? imageCat.auto;
    this.imageSrc += CatColors[this.cat];
    const isValidated = imageCat.validated != null;
    this.imageSrc += isValidated ? '-filled.png' : '-unfilled.png';
    return this.imageSrc;
  }

  getImgSrcCat(imageCat: Category): string {
    let imageSrc = '../../assets/images/category-';

    this.cat = imageCat.validated ?? imageCat.auto;
    imageSrc += CatColors[this.cat];
    const isValidated = imageCat.validated != null;
    imageSrc += isValidated ? '-unfilled.png' : '-unfilled.png';

    return imageSrc;
  }

  OnCatClick() {
    this.isClicked = !this.isClicked;
  }

  catColorClick(bladeID: string, color: number) {
    this.isClicked = false;
    this.category.validated = color;
    const bladeType = bladeID.slice(5, 6);
    const bladeId=bladeID.slice(0,4)
    console.log(bladeId)
    this.catEvent.emit({
      bladeType: bladeType,
    });
    this.turbineEvent.emit({
      bladeId: bladeId,
    });
  }

  resetCat(imageCat: Category) {
    this.isClicked = false;
    imageCat.validated = null;
  }
}
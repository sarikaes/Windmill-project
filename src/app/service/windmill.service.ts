import { Injectable } from '@angular/core';
import { Wtgs } from '../models/wtgs.model';
import { wtgsList } from '../appHelper';

@Injectable({
  providedIn: 'root'
})
export class WindmillService {
  wtgsList: Wtgs[] = wtgsList;
  constructor() { }
}

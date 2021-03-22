import { Injectable } from '@angular/core';
import { Wtgs } from '../models/wtgs.model';
import { wtgsList } from '../appHelper';
import { Inspection } from '../models/inspection.model';
import { inspectionData } from '../inspectionData'

@Injectable({
  providedIn: 'root'
})
export class WindmillService {
  wtgsList: Wtgs[] = wtgsList;
  inspectionData: Inspection[] = inspectionData;
  constructor() { }
}

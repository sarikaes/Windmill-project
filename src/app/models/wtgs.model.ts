export interface Wtgs {
  wtg_id: string;
  wtg_class: string;
  wtg_model: string;
  farm: string;
  blade_model: string;
  inspection_date: string;
  next_inspection: string;
  notes: Note[];
  WTG_cat: Category;
  blades: Blade[];
}

export interface Note {
  text: string;
  date: Date;
}

export interface Category {
  auto: number;
  validated: number;
}

export interface Blade {
  label: string;
  notes: Note[];
  blade_id: string;
  serial_number: string;
  blade_cat: Category;
}



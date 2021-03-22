export interface Inspection {
    blade_id: string;
    inspection_date: string;
    blade_serial_number: string;
    blade_cat: Category;
    notes: Note[];
    images: Image[];
}
export interface Note {
    text: string;
    date: Date;
}
export interface Image {
    image_cat: string;
    image_hash: string;
    notes: Note;
    URI: string;
}
export interface Category {
    auto: number;
    validated: number;
}
export class Itemd {
    id: string;
    status: string;
    owner: string;
    created_on: string;
    documents_id: string;
}

export interface Item {
    id: string;
    status: string;
    owner: string;
    created_on: string;
    title: string;
    url: string;
    redirectMode?: string;
}

export interface Category {
    id?: string;
    title?: string;
    subtitle?: string;
    subtitleList?: [Subtitle];
    redirectMode?: string;
}
  
export interface Subtitle {
    id?: string;
    title?: string;
    subtitle?: string;
    url?: string;
    item?: Item;
    itemList?: [Item];    
}
export class Itemd {
    id: string;
    status: string;
    owner: string;
    // tslint:disable-next-line: variable-name
    created_on: string;
    // tslint:disable-next-line: variable-name
    documents_id: string;
}

export interface Item {
    id: string;
    status: string;
    owner: string;
    created_on: string;
    documents_id?: string;
    fotos_id?: string;
    size?: string;
    title: string;
    description?: string;
    url: string;
    full_url?: string;
    redirectMode?: string;
    filename_download?: string;
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

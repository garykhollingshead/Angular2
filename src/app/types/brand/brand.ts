import {Headers} from "@angular/http";

export interface Brand {
  id?: number;
  name: string;
  code: string;
  description: string;
  displayName: string;
  incommBrandIdentifier: string;
  imageUrl: string;
  parentBrand: any;
}

export interface BrandWithHeaders {
  data: Brand[];
  headers: Headers;
}

export interface DescriptionBlock {
  title: string;
  text: string[];
}

// Fields shared by phones.json, tablets.json and accessories.json
export interface ProductDetails {
  id: string;
  // numeric id and release year come from products.json (see getAllDetails)
  productId: number;
  year: number;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  // camera and zoom exist only for phones and tablets
  camera?: string;
  zoom?: string;
  cell: string[];
}

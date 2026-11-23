export interface DescriptionBlock {
  title: string;
  text: string[];
}

// Fields shared by phones.json, tablets.json and accessories.json
export interface ProductDetails {
  id: string;
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
  cell: string[];
}

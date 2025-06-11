
export interface ImageData {
  file: File;
  title: string;
  tags: string[];
  url: string;
  favorite?: boolean;
}

export interface TagCount {
  tag: string;
  count: number;
}

///////////
// Airtable

export interface BaseRecord {
  id: string;
  createdTime: string;
}

export interface Document {
  id:         string;
  url:        string;
  filename:   string;
  size:       number;
  type:       string;
  thumbnails: Thumbnails;
}

export interface Thumbnails {
  small: Full;
  large: Full;
  full?: Full;
}

export interface Full {
  url:    string;
  width:  number;
  height: number;
}

//////////////
// Domain data

export type Category = string
// "collective bargaining" |
// "demonstration" |
// "meeting" |
// "open letter" |
// "strike" |
// "union" |
// "worker organising"

export interface SolidarityAction extends BaseRecord {
  fields: {
    Name:       string;
    Location?:  string;
    Summary?:   string;
    Date:       string;
    Link?:      string;
    Country:    string;
    "Added by"?: string;
    Category?:  Category[],
    Document?:  Document[];
    Notes?:     string;
    Public:     true; // We can't accept records that haven't been marked for publication
  }
}
export interface BlogPost extends BaseRecord {
  fields: {
    Slug: string;
    Title:       string;
    Summary:   string;
    Body:   string;
    Date:       string;
    "Added by"?: string;
    Public:     true; // We can't accept records that haven't been marked for publication
  }
}
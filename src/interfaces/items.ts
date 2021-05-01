
export interface Weapon {
  _id: any;
  name: string;
  description: string;
  image: string;
  grid: {
    x: number;
    y: number;
  }
  weight: number | null;
  class: string;
  ergonomics: number;
  accuracy: number;
  recoil: {
    horizontal: number;
    vertical: number;
  };
  velocity: number;
  range: number;
  firemodes: {
    single: boolean,
    burst: boolean,
    auto: boolean
  },
  rpm: number;
  calibre: any;
  fields: {
    _id?: any;
    name: string;
    vital: boolean;
    attachments: any[];
  }[],
  builds: {
    _id?: any;
    name: string;
    image: string;
    attachments: any[];
    prices: {
      _id?: any;
      trader: string;
      currency: string;
      level: number;
      value: number;
    }[];
    tradeups: {
      _id?: any;
      trader: string;
      level: number;
      items: {
        _id?: any;
        count: number;
        item: any;
      }[];
    }[];
  }[];
}


export interface Attachment {
  _id: any;
  name: string;
  description: string;
  image: string;
  grid: {
    x: number;
    y: number;
  }
  weight: number | null;
  class: string;
  ergonomics: number;
  accuracy: number;
  recoil: number;
  barrel?: number;
  velocity: number;
  expand?: {
    direction: string;
    size: number;
  }
  moddable: boolean;
  magazine: number;
  range: number;
  fields: {
    _id?: any;
    name: string;
    vital: boolean;
    attachments: any[];
  }[];
  prices: {
    _id?: any;
    trader: string;
    currency: string;
    level: number;
    value: number;
  }[];
  tradeups: {
    _id?: any;
    trader: string;
    level: number;
    items: {
      _id?: any;
      count: number;
      item: any;
    }[];
  }[];
}

export interface Ammo {
  _id: any;
  name: string;
  description: string;
  image: string;
  weight: number;
  velocity: number;
  damage: number;
  penetration: number;
  recoil: number;
  accuracy: number;
  tracer: boolean;
  prices: {
    trader: string;
    currency: string;
    level: number;
    value: number;
  }[],
  tradeups: {
    trader: string;
    level: number;
    items: {
      count: number;
      item: any;
    }[];
  }[];
}[];

export interface Calibre {
  _id: any;
  name: string;
  description: string;
  image: string;
  ammo: Ammo[];
}

export interface Armor {
  _id: any;
  name: string;
  description: string;
  image: string;
  grid: {
    x: number;
    y: number;
  }
  weight: number;
  material: string;
  class: string;
  level: number;
  hitpoints: number;
  movement: number;
  turn: number;
  ergonomics: number;
  ricochet?: string;
  zones: string[];
  fields: {
    _id?: any;
    name: string;
    vital: boolean;
    attachments: any[];
  }[];
  prices: {
    _id?: any;
    trader: string;
    currency: string;
    level: number;
    value: number;
  }[];
  tradeups: {
    _id?: any;
    trader: string;
    level: number;
    items: {
      _id?: any;
      count: number;
      item: any;
    }[];
  }[];
}


export interface Rig {
  _id: any;
  name: string;
  description: string;
  image: string;
  grid: {
    x: number;
    y: number;
  }
  weight: number;
  internal: number;
  armored: boolean;
  prices: {
    _id?: any;
    trader: string;
    currency: string;
    level: number;
    value: number;
  }[];
  tradeups: {
    _id?: any;
    trader: string;
    level: number;
    items: {
      _id?: any;
      count: number;
      item: any;
    }[];
  }[];
}


export interface Backpack {
  _id: any;
  name: string;
  description: string;
  image: string;
  grid: {
    x: number;
    y: number;
  }
  weight: number;
  internal: number;
  prices: {
    _id?: any;
    trader: string;
    currency: string;
    level: number;
    value: number;
  }[];
  tradeups: {
    _id?: any;
    trader: string;
    level: number;
    items: {
      _id?: any;
      count: number;
      item: any;
    }[];
  }[];
}

export interface ShoppingAttachment extends Attachment {
  include: boolean;
}


export interface BuildField {
  field: any;
  attachment: any;
  include: boolean;
  fields: BuildField[] 
}

export interface WeaponBuild {
  name: string;
  weapon: any;
  loadout?: any;
  fields: BuildField[];
}

export interface TraderLevel {
  trader: string;
  level: number;
}

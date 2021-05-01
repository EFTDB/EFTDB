export enum WEAPONCLASSES {
  'Assault Rifle',
  'Assault Carbine',
  'Submachine Gun',
  'Sniper Rifle',
  'Marksman Rifle',
  'Shotgun',
  'Handgun',
  'Light Machine Gun'
}

export enum ATTACHMENTCLASSES {
  MAGAZINE = 'Magazine',
  PISTOL_GRIP = 'Pistol Grip',
  STOCK = 'Stock',
  FOREGRIP = 'Foregrip',
  GAS_MOD = 'Gas Mod',
  CHARGE = 'Charge',
  DUST_COVER = 'Dust Cover',
  OPTIC = 'Optic',
  SIGHT = 'Sight',
  MUZZLE = 'Muzzle',
  TACTICAL = 'Tactical',
  MOUNT = 'Mount',
  HANDGUARD = 'Handguard',
  BARREL = 'Barrel',
  RECEIVER = 'Receiver',
  BIPOD = 'Bipod',
  OTHER = 'Other',
  AUXILIARY = 'Auxiliary'
}

export enum CALIBRECLASSES {
  '9x18',
  '9x19',
  '9x21',
  '9x39',
  '.366',
  '5.45x39',
  '5.56x45',
  '7.62x25',
  '7.62x39',
  '7.62x51',
  '7.62x54R',
  '12x70',
  '20x70',
  '4.6x30',
  '.45',
  '5.7x28',
  '40x46',
  '12.7x55'
}

export enum TRADERS {
  PRAPOR = 'Prapor',
  THERAPIST = 'Therapist',
  SKIER = 'Skier',
  PEACEKEEPER = 'Peacekeeper',
  MECHANIC = 'Mechanic',
  RAGMAN = 'Ragman',
  JAEGER = 'Jaeger',
  FENCE = 'Fence'
}

export enum CURRENCY {
  ROUBLE = 'R',
  EURO = 'E',
  DOLLAR = 'D'
};

export enum DIRECTION {
  LEFT = 'Left',
  RIGHT = 'Right',
  UP = 'Up',
  DOWN = 'Down'
}


export enum SERVICE_WORKER_STATUS {
  INACTIVE = 0,
  REGISTERED = 2,
  ACTIVE = 1,
  UPDATING = 2,
  UPDATED = 3,
}
export class Languages {
  id?: string;
  name: string;
  desc: string;
  icon: string;
  orders: number = 1;
  created: { by: string; at: Date };
  updated: { by: string; at: Date };
  deleted: { by: string; at: Date };
  flag: number = 1;
}

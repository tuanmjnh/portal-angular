export class ContractEnterprise {
  contract_enterprise_id: string = '';
  app_key: string = '';
  local_id: number = 0;
  group_id: number = 0;
  contract_code: string = '';
  customer_name: string = '';
  customer_address: string = '';
  tax_code: string = '';
  start_at: Date = new Date();
  end_at: Date = null;
  quantity: number = 1;
  price: number = 0;
  details: string = '';
  contents: string = '';
  attach: string = '';
  created_by: string = '';
  created_at: Date = new Date();
  updated_by: string = '';
  updated_at: Date = null;
  deleted_by: string = '';
  deleted_at: Date = null;
  flag: number = 1;
}

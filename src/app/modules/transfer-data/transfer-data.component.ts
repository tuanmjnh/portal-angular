import { Component, OnInit } from '@angular/core';
import { TransferDataService } from './shared/transfer-data.service';
@Component({
  selector: 'app-transfer-data',
  templateUrl: './transfer-data.component.html',
  styleUrls: ['./transfer-data.component.css']
})
export class TransferDataComponent implements OnInit {
  table: string = '';
  constructor(public transferDataService: TransferDataService) {}

  ngOnInit() {}
  transfer() {
    this.transferDataService.transfer(this.table);
  }
}

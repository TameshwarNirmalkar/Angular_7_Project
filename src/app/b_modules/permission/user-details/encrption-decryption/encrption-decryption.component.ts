import { Component, Input } from '@angular/core';
import { ENCRYPTION_DECRYPTION_DATA, ENC_DEC_LABEL } from '../../service/service.constant';

@Component({
  selector: 'app-encrption-decryption',
  templateUrl: './encrption-decryption.component.html',
  styleUrls: ['./encrption-decryption.component.scss']
})
export class EncrptionDecryptionComponent {
  public selectedData = null;
  public tableData: any[] = ENCRYPTION_DECRYPTION_DATA;
  public labelForEncDec = ENC_DEC_LABEL;
  public encDecAll: boolean = false;
  public encDecSwitchAll: boolean = false;

  constructor() { }

  get popupData(): string {
    return this.selectedData;
  }

  @Input() set popupData(val) {
    this.selectedData = val;
    this.groupSwitchEnableDisable();
    this.enableDisableSwitchAll();
  }

  switchAll(data) {
    this.tableData.forEach(item => item.encrypted = data.checked);
    // this.selectedData = this.tableData;
  }

  switchSingle(eventData, rowData) {
    // const findItem = this.selectedData.currentSelect.enc_dec_list.find(ele => ele.code === rowData.code);
    // if (findItem) {
    //   findItem.encrypted = eventData.checked;
    // } else {
    //   rowData.encrypted = eventData.checked;
    //   this.selectedData.currentSelect.enc_dec_list.push(rowData);
    // }
    // this.enableDisableSwitchAll();
  }

  checkedUncheckedAll(checked) {
    this.tableData.forEach(item => item.has_checkbox = checked);
    // this.selectedData.currentSelect.enc_dec_list = this.tableData;
  }

  singleCheckedUnchecked(checked, rowData) {
    const hasCheckedCount = this.tableData.filter(item => item.has_checkbox).length;
    this.encDecAll = (hasCheckedCount === this.tableData.length) ? true : false;
  }

  enableDisableSwitchAll() {
    const hasCheckedCount = this.tableData.filter(item => item.has_checkbox).length;
    this.encDecAll = (hasCheckedCount === this.tableData.length) ? true : false;
    const encryptedCount = this.selectedData.currentSelect.enc_dec_list.filter(item => item.encrypted).length;
    this.encDecSwitchAll = (encryptedCount === this.tableData.length) ? true : false;
  }

  groupSwitchEnableDisable() {
    this.tableData.forEach(item => {
      const findItem = this.selectedData.currentSelect.enc_dec_list.find(ele => ele.code === item.code);
      if (findItem) {
        item.encrypted = findItem.encrypted;
        item.has_checkbox = true;
      } else {
        item.encrypted = false;
        item.has_checkbox = false;
      }
    });
  }

  editEncDec(data) {
    console.log('encDecButtonGroup', this.tableData );
  }

}

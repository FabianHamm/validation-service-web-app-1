import { Component, OnInit, Input } from '@angular/core';
import { FileReport } from 'src/app/shared/model/file-report.model';
import { SelectItem } from 'primeng/api';
import { ChecksPage } from 'src/app/shared/model/checks.model';
import { ReportsService } from '../../reports.service';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-file-report-viewer',
  templateUrl: './file-report-viewer.component.html',
  styleUrls: ['./file-report-viewer.component.css']
})
export class FileReportViewerComponent implements OnInit {

  @Input() fileReport: FileReport;

  displayIndex = 0;

  options: SelectItem[];
  option: string;

  failedCount = 0;

  checksPage: ChecksPage;

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    console.log(this.fileReport)
    this.failedCount = this.fileReport.failedFitsChecks + this.fileReport.failedNameChecks + (this.fileReport._embedded['verapdf-result'] ? this.fileReport._embedded['verapdf-result'].failedPolicyChecks : 0);
    this.options = [
      {label: 'All (' + this.failedCount + ')', value :'all', disabled: this.failedCount == 0},
      {label: 'File Name Checks (' + this.fileReport.failedNameChecks + ')', value :'name', disabled: this.fileReport.failedNameChecks == 0},
      {label: 'Fits Result Checks (' + this.fileReport.failedFitsChecks + ')', value :'fits', disabled: this.fileReport.failedFitsChecks == 0},
      {label: 'VeraPDF Policy (' + (this.fileReport._embedded['verapdf-result'] ? this.fileReport._embedded['verapdf-result'].failedPolicyChecks : 0) + ')',
        value :'verapdf', disabled: this.fileReport._embedded['verapdf-result'] && this.fileReport._embedded['verapdf-result'].failedPolicyChecks == 0}
    ]

    if(this.failedCount > 0) {
      this.reportsService.getChecksPage(Util.getHrefForRel(this.fileReport, 'checks')).subscribe(
        (checksPage: ChecksPage) => {
          this.checksPage = checksPage;
        },
        (error) => {
          console.log(error);
        }

      );
    }

  }

  onChangeCheckTypeFilter() {
    console.log('called');
    this.reportsService.getChecksPage(Util.getHrefForRel(this.fileReport, 'checks'), this.option).subscribe(
      (checksPage: ChecksPage) => {
        this.checksPage = checksPage;
      },
      (error) => {
        console.log(error);
      }

    );
  }

}

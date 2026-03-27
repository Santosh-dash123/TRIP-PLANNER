import { Component } from '@angular/core';
import { expensesService } from '../../Core/Services/expenses.service';
import { AuthService } from '../../Core/Services/auth.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member',
  imports: [CommonModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {
  tripId: number;
  constructor(
    private expenseService: expensesService,
    private authservice: AuthService,
  ) {
    this.tripId = this.authservice.getTripId()!;
  }

  summaryList: any[] = [];
  totalPayable: number = 0;

  ngOnInit(): void {
    this.loadSummary();
  }
  loadSummary() {
    this.expenseService.getTripSummary(this.tripId).subscribe({
      next: (res: any) => {
        this.summaryList = res;
        this.totalPayable = this.summaryList.reduce(
          (sum, x) => sum + (x.perPersonAmount || 0),
          0,
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  downloadPDF() {
    if (this.summaryList.length < 1) {
      Swal.fire(
        'Warning',
        'There is no expense item to generated PDF.',
        'warning',
      );
      return;
    }
    const data = document.getElementById('pdfContent');

    if (!data) return;

    html2canvas(data, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('TripSummary.pdf');
    });
  }
}

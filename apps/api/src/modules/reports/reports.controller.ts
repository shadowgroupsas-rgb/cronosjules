import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {

  @Get('overtime')
  @ApiOperation({ summary: 'Get consolidated overtime report' })
  getOvertimeReport(@Query() query: any) {
    return { data: 'Overtime Report Stub' };
  }

  @Get('export/pdf')
  @ApiOperation({ summary: 'Export report to PDF' })
  exportPdf() {
    return 'PDF Download Stub';
  }

  @Get('export/excel')
  @ApiOperation({ summary: 'Export report to Excel' })
  exportExcel() {
    return 'Excel Download Stub';
  }
}

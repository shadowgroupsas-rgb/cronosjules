import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('export/pdf')
  @ApiOperation({ summary: 'Export report to PDF' })
  async exportPdf(@Res() res: Response) {
    return this.reportsService.generatePdf(res);
  }

  @Get('export/excel')
  @ApiOperation({ summary: 'Export report to Excel' })
  async exportExcel(@Res() res: Response) {
    return this.reportsService.generateExcel(res);
  }
}

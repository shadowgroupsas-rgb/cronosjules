import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Roles('super_admin', 'director')
  @ApiOperation({ summary: 'Create department' })
  @ApiResponse({ status: 201, description: 'Department created' })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Roles('super_admin', 'director', 'dept_admin', 'rh')
  @ApiOperation({ summary: 'List departments' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @Roles('super_admin', 'director', 'dept_admin', 'rh')
  @ApiOperation({ summary: 'Get department by id' })
  findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles('super_admin', 'director')
  @ApiOperation({ summary: 'Update department' })
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Roles('super_admin', 'director')
  @ApiOperation({ summary: 'Delete department' })
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('zones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  @Roles('super_admin', 'director')
  @ApiOperation({ summary: 'Create zone' })
  @ApiResponse({ status: 201, description: 'Zone created' })
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @Get()
  @Roles('super_admin', 'director', 'dept_admin', 'rh')
  @ApiOperation({ summary: 'List zones' })
  findAll() {
    return this.zonesService.findAll();
  }

  @Get('check')
  @ApiOperation({ summary: 'Check which zone a point is in' })
  check(@Query('lat') lat: string, @Query('lng') lng: string) {
    return this.zonesService.checkZone(parseFloat(lat), parseFloat(lng));
  }

  @Get(':id')
  @Roles('super_admin', 'director', 'dept_admin', 'rh')
  @ApiOperation({ summary: 'Get zone by id' })
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(id);
  }

  @Patch(':id')
  @Roles('super_admin', 'director')
  @ApiOperation({ summary: 'Update zone' })
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(id, updateZoneDto);
  }

  @Delete(':id')
  @Roles('super_admin', 'director')
  @ApiOperation({ summary: 'Delete zone' })
  remove(@Param('id') id: string) {
    return this.zonesService.remove(id);
  }
}

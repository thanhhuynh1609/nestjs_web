import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../types/user';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './order.dto';
import { SellerGuard } from 'src/guards/seller.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  listOrders(@User() { id }: UserDocument) {
    return this.orderService.listOrdersByUser(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@Body() order: CreateOrderDTO, @User() { id }: UserDocument) {
    return this.orderService.createOrder(order, id);
  }

  @Get('seller-orders')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async listOrdersForSeller(@User() { id }: UserDocument) {
    return await this.orderService.listOrdersForSeller(id);
  }
}

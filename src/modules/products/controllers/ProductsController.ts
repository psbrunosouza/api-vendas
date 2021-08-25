import { Request, Response } from 'express';
import { ListProductService } from '../services/ListProductService';
import { ShowProductService } from '../services/ShowProductService';
import Product from '../typeorm/entities/Product';

export default class ProductController {
  public async index(request: Request, response: Response) {
    const listProductService = new ListProductService();
    const products = listProductService.execute();
    return response.json(products);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;
    const showProductService = new ShowProductService();
    const product = showProductService.execute({ id });
    return response.json(product);
  }
}

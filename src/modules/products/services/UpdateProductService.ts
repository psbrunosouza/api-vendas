import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne({ where: { id } });
    const productExists = await productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const productUpdated = productsRepository.create({
      id,
      name,
      price,
      quantity,
    });

    await productsRepository.save(productUpdated);

    return productUpdated;
  }
}

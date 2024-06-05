import { CartItem } from './cart-item';
import { Product } from './product';

describe('CartItem', () => {
  it('should create an instance', () => {
    const mockProduct: Product = {
      id: '123',
      name: 'Sample Product',
      imageUrl: 'http://example.com/image.jpg',
      unitPrice: 100
    };

    expect(new CartItem(mockProduct)).toBeTruthy();
  });
});

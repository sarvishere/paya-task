import ProductDetailClient from '@/features/productDetails/component/ProductDetail';

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `محصول ${id}`,
    description: `صفحه جزئیات محصول شماره ${id}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailClient productId={id} />
    </div>
  );
}
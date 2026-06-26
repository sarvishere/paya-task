interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  
  // حالا محصول رو با این id از دیتابیس یا API بگیر
//   const product = await getProduct(id);

  return (
    <div>
      <h1>محصول {id}</h1>
      {/* <p>{product?.name}</p> */}
    </div>
  );
}
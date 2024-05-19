import ProductCardHorizontal from "../../components/product/ProductCardHorizontal.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ProductCardFlag } from "../../flags/multivariate/productCardFlag.ts";

export interface Props {
  products: ProductCardFlag;
  title?: string;
  maxSize:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  animateImage?: boolean;
}

function HorizontalProductCard({
  products,
  title,
  maxSize,
  animateImage,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div
      class={`${maxSize} w-full container py-8 flex flex-col gap-6 lg:py-10`}
    >
      <Header
        title={title || ""}
      />

      <div
        id={id}
      >
        {products?.map((product, index) => (
          <ProductCardHorizontal
            product={product}
            itemListName={title}
            platform={platform}
            index={index}
            animateImage={animateImage}
          />
        ))}
      </div>
    </div>
  );
}

export default HorizontalProductCard;

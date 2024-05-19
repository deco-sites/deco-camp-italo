import type { Platform } from "../../apps/site.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import LikeCount from "../../islands/LikeCount.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  platform?: Platform;
  animateImage: boolean;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCardHorizontal({
  product,
  preload,
  itemListName,
  platform,
  index,
  animateImage,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const relativeUrl = relative(url);

  return (
    <div
      id={id}
      class={`bg-secondary flex flex-col md:flex-row p-2.5 gap-6`}
      data-deco="view-product"
    >
      <figure class=" w-full md:w-1/4">
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <div class="aspect-square bg-base-100 col-span-full row-span-full rounded w-full p-4">
            <div
              className={`overflow-hidden rounded ${
                animateImage
                  ? "hover:scale-110 transition-transform duration-300"
                  : ""
              }`}
            >
              <Image
                src={front.url!}
                alt={front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                className={`w-full h-full object-cover`}
                sizes="(max-width: 640px) 50vw, 20vw"
                preload={preload}
                loading={preload ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          </div>
        </a>
      </figure>

      <div class="flex-auto flex flex-col md:flex-row p-2 gap-6 lg:gap-2 w-full md:w-3/4">
        <div class="flex flex-col gap-0 md:w-3/4">
          <h2
            class="truncate text-base lg:text-lg text-base-content uppercase font-normal"
            dangerouslySetInnerHTML={{ __html: name ?? "" }}
          />
          <div
            class="truncate text-sm lg:text-sm"
            dangerouslySetInnerHTML={{ __html: description ?? "" }}
          />
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col gap-2 md:w-1/4">
            <div
              class={`line-through text-base-300 text-xs font-light`}
            >
              {formatPrice(listPrice, offers?.priceCurrency)}
            </div>
            <div class="text-base-content lg:text-sm font-light">
              {formatPrice(price, offers?.priceCurrency)}
            </div>
          </div>
          <AddToCartButtonVTEX
            eventParams={{
              items: [{
                item_url: product.url,
                quantity: 1,
                item_name: product.name!,
              }],
            }}
            productID={product.productID}
            seller={"1"}
          />
        </div>
        <div class="">
          <LikeCount productid={productID} />
        </div>
      </div>
    </div>
  );
}

export default ProductCardHorizontal;

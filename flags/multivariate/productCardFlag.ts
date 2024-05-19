export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import type { Product } from "apps/commerce/types.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";

export type ProductCardFlag = Product[] | null;

export default function productCardFlag(
  props: MultivariateProps<ProductCardFlag>,
): MultivariateFlag<ProductCardFlag> {
  return multivariate(props);
}

import { invoke } from "deco-sites/deco-camp-italo/runtime.ts";

// Define um tipo para os parâmetros do produto
interface ProductParams {
  productId: string;
}

// Define a função getProductLikes
export const getProductLikes = ({ productId }: ProductParams) =>
  invoke["deco-sites/deco-camp-italo"].loaders.LikesForProduct(
    { productId } as Props,
  );

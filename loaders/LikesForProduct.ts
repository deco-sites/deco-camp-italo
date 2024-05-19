export interface Props {
  product: number;
  productId: string;
}

const loader = async (
  props: Props,
  _req: Request,
  _ctx: unknown,
): Promise<LikesForProduct> => {
  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.productId.productid}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "deco-camp-italo",
      },
    },
  );
  const likes = await response.json() as Props;
  return likes.product;
};

export default loader;

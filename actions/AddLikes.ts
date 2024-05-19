export interface Props {
  productId: string;
}

export default async function AddLikes(
  props: Props,
  _req: Request,
  _ctx: unknown,
): Promise<Result> {
  try {
    const response = await fetch("https://camp-api.deco.cx/event", {
      method: "POST",
      headers: {
        "x-api-key": "deco-camp-italo",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "productId": props.productId }),
    });

    if (response.ok) {
      const data = await response.json();
      const resp = "ok";
      return resp;
    } else {
      throw new Error("Erro ao registrar like");
    }
  } catch (error) {
    console.log("error-------------------------------");
    console.log(error);
    console.error("Erro:", error.message);
    return null;
  }
}

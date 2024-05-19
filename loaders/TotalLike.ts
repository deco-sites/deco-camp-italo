export interface TotalLike {
  total: number;
}

const loader = async (): Promise<TotalLike> => {
  const headers = {
    "x-api-key": "deco-camp-italo",
    "Content-Type": "application/json",
  };
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: headers,
  });

  const likes = await response.json();

  return { total: likes.total };
};

export default loader;

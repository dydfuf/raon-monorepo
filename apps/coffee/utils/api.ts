export const getCoffeeInfoListData = async () => {
  const response = await fetch("https://coffee.raonc.dev/api/coffee/list");
  return response.json();
};

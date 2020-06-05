const useFetch = (url, options) => {
  const fetchData = async () => {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  };
  const response = fetchData();
  return response;
};

export default useFetch;

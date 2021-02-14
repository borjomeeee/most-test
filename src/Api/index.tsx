import { getDogBreeds } from '../Utils';

const makeRequest = async (url: string) => {
  const data = await fetch(url, {});
  return { status: data.status, data: await data.json() };
};

//get request returns all breeds and sub-breeds
export const getAllBreeds = async () => {
  const url = 'https://dog.ceo/api/breeds/list/all';

  const { data } = await makeRequest(url);
  return getDogBreeds(data.message);
};

export const getImages = async (breedName: string) => {
  const url = `https://dog.ceo/api/breed/${breedName}/images`;

  const { data } = await makeRequest(url);
  return data.message;
};

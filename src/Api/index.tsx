import { getDogTypes } from "../Utils";

const makeRequest = async (url: string) => {
  const data = await fetch(url, {});
  return { status: data.status, data: await data.json() };
};

//get request returns all breeds and sub-breeds
export const getAllBreeds = () => {
  const url = 'https://dog.ceo/api/breeds/list/all';

  //send request
};

export const getAllBreedTypes = async () => {
  const url = 'https://dog.ceo/api/breeds/list/all';

  const {data} = await makeRequest(url)
  return getDogTypes(data.message)
};

export const getImages = (breedName: string) => {
  const url = `https://dog.ceo/api/breed/${breedName}/images`;

  //send request
};

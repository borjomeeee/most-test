type Dogs = { [key: string]: string[] };
export type DogBreed = string;

export interface IDogBreed {
  type: DogBreed;
  subType?: DogBreed;

  name: string;
}

export interface IDog {
  id: string;
  imagePath: string;
}

export class Dog {
  static getIdFromUrl(url: string) {
    const [image, dir] = url.split('/').reverse();
    return [image, dir].join('_');
  }

  static getDogFromBreedWithImage(dog: IDogBreed, img: string): IDog {
    const id = this.getIdFromUrl(img);
    return {
      id,
      imagePath: img,

      ...dog,
    };
  }
}

export const getDogBreeds = (dogs: Dogs): IDogBreed[] => {
  return Object.keys(dogs)
    .map((dogType: DogBreed, _: number): IDogBreed | IDogBreed[] => {
      if (!Array.isArray(dogs[dogType]) || dogs[dogType].length === 0)
        return { type: dogType, name: dogType };
      else
        return [
          { type: dogType, name: dogType },
          ...dogs[dogType].map((type) => {
            const name = `${dogType} (${type})`;
            return { type: dogType, subType: type, name: name };
          }),
        ];
    })
    .flat();
};

export const adminProps: {
  id: string;
  name: string;
  email: string;
  numCurrentRescues: number;
  numTotalRescues: number;
  numHouseholdPets: number;
  favorite: string[];
  image: string;
};

export function getAdminCard(): JSX.Element;

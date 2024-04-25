export type AdminProps = {
  id: string;
  username: string;
  name: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  numCurrentRescues: number;
  numTotalRescues: number;
  numHouseholdPets: number;
  numHouseholdPeople: number;
  favorite: string[];
  type: string;
  role: string;
  hasBackgroundCheck: boolean;
  image: string;
  bio: string;
};

export const adminProps: AdminProps[];

export function getAdminCards(): JSX.Element;

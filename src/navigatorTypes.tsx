export type LandingStackParamList = {
  Options: undefined;
  Login: undefined;
  Register: undefined;
  MainContent: undefined;
};

export type DrawerStackParamList = {
  ItemList: undefined;
  MyProfile: undefined;
  Feedback: undefined;
}

export type ItemStackParamList = {
  ItemList: undefined;
  ItemView: {
    id: string;
  };
  CreateItemForm: undefined;
  EditItemForm: {
    id: string;
  };
}

export type UserStackParamList = {
  MyProfile: undefined;
  EditProfileForm: undefined;
}
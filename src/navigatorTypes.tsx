export type LandingStackParamList = {
  Options: undefined;
  Login: undefined;
};

export type DrawerStackParamList = {
  ItemList: undefined;
  MyProfile: undefined;
}

export type ItemStackParamList = {
  ItemList: undefined;
  ItemView: {
    id: number;
  };
  EditItemForm: {
    id: number;
  };
}
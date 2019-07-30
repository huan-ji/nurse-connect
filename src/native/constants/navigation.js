import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'white' },
    titleStyle: {
      color: Colors.textColor,
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: false,
    activeBackgroundColor: 'lightgrey',
    inactiveBackgroundColor: 'white',
    tabBarStyle: {
      backgroundColor: Colors.brandPrimary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
  },

  icons: {
    style: { color: 'black', height: 30, width: 30 },
  },
};

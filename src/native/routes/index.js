import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { Image } from 'react-native';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import { Actions } from 'react-native-router-flux';

import RecipesContainer from '../../containers/Recipes';
import RecipeListingComponent from '../components/Recipe/Listing';
import RecipeSingleComponent from '../components/Recipe/Single';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/User/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/User/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/User/Profile';

import Discover from '../components/Discover';
import FirstScreen from '../FirstScreen'
import PostWithComments from '../components/Discover/PostWithComments'
import NewPost from '../components/Discover/NewPost'
import NewComment from '../components/Discover/NewComment'
import FriendList from '../components/Friends/FriendList'
import FriendChat from '../components/Friends/FriendChat'

const styles = {
  tabIcon: {
  }
}

const Index = (
  <Stack hideNavBar>
    <Scene component={FirstScreen} />
    
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        tabBarPosition="bottom"
        type="replace"
        showLabel={false}
        tabBarOnPress={ ({ navigation, defaultHandler }) => {
          const { key } = navigation.state;
          if (key === 'addPost') {
            Actions.newPost();
            return;
          }
          
          defaultHandler()
        }}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="home"
          title="Nurse Connect"
          icon={() => <Image source={require('../../images/discover-icon.png')} />}
          {...DefaultProps.navbarProps}
        >
          <Scene hideNavBar component={Discover} />
        </Stack>
        
        <Stack
          key="jobs"
          title="RECIPES"
          icon={() => <Image source={require('../../images/work-icon.png')} />}
          {...DefaultProps.navbarProps}
        >
          <Scene component={UpdateProfileContainer} Layout={UpdateProfileComponent} />
        </Stack>
        
        <Scene
          key="addPost"
          icon={() => <Icon name="ios-add-circle-outline" />}
          {...DefaultProps.navbarProps}
          component={NewPost}
        />

        <Stack
          key="tickets"
          title="RECIPES"
          icon={() => <Image source={require('../../images/ticket-icon.png')} />}
          {...DefaultProps.navbarProps}
        >
          <Scene component={RecipesContainer} Layout={RecipeListingComponent} />
        </Stack>

        <Stack
          key="friends"
          title="Friends"
          hideNavBar
          icon={() => <Image source={require('../../images/user-icon.png')} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="profileHome" component={FriendList} />
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="postWithComments"
      title="Post Details"
      {...DefaultProps.navbarProps}
      component={PostWithComments}
    />
  
    <Scene
      back
      clone
      key="newPost"
      title="New Post"
      hideTabBar
      {...DefaultProps.navbarProps}
      component={NewPost}
    />
  
    <Scene
      back
      clone
      key="addComment"
      title="New Comment"
      hideTabBar
      {...DefaultProps.navbarProps}
      component={NewComment}
    />
  
    <Scene
      back
      clone
      key="friendChat"
      hideTabBar
      hideNavBar
      {...DefaultProps.navbarProps}
      component={FriendChat}
    />
  </Stack>
);

// <Stack
//   key="friends"
//   title="Friends"
//   icon={() => <Icon name="contacts" {...DefaultProps.icons} />}
//   {...DefaultProps.navbarProps}
// >
//   <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} />
//   <Scene
//     back
//     key="forgotPassword"
//     title="FORGOT PASSWORD"
//     {...DefaultProps.navbarProps}
//     component={ForgotPasswordContainer}
//     Layout={ForgotPasswordComponent}
//   />
//   <Scene
//     back
//     key="updateProfile"
//     title="UPDATE PROFILE"
//     {...DefaultProps.navbarProps}
//     component={UpdateProfileContainer}
//     Layout={UpdateProfileComponent}
//   />
// </Stack>

export default Index;

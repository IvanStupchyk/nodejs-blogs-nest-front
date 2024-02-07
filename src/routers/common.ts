import HomePageContainer from '../containers/HomePageContainer/HomePageContainer'
import PostsPageContainer from '../containers/PostsPageContainer/PostsPageContainer'
import NotFound from '../pages/NotFound/NotFound'
import { URLS } from '../constants/apiRouter'
import BlogsPageContainer from "../containers/BlogsPageContainer/BlogsPageContainer";
import SignInFormContainer from "../containers/SignInPageContainer/SignInPageContainer";
import RegistrationFormContainer from "../containers/RegistrationFormContainer/RegistrationFormContainer";
import EmailConfirmPopupContainer from "../containers/EmailConfirmContainer/EmailConfirmContainer";
import PasswordRecoveryContainer from "../containers/PasswordRecoveryContainer/PasswordRecoveryContainer";
import ForgotPasswordContainer from "../containers/ForgotPasswordContainer/ForgotPasswordContainer";
import ProfileSettingsPageContainer from "../containers/ProfileSettingsPageContainer/ProfileSettingsPageContainer";
import CreateElementsPageContainer from "../containers/CreateElementsPageContainer/CreateElementsPageContainer";
import UpdateBlogContainer from "../containers/UpdateBlogContainer/UpdateBlogContainer";

type RouteType = {
  path: string
  id: string
  component: any
  isAuth: boolean
}

const HOME_PAGE: RouteType = {
  path: URLS.Home_Route,
  id: URLS.Home_Route,
  component: HomePageContainer,
  isAuth: false,
}

const POSTS_PAGE: RouteType = {
  path: URLS.Posts_Route,
  id: URLS.Posts_Route,
  component: PostsPageContainer,
  isAuth: false,
}

const BLOGS_PAGE: RouteType = {
  path: URLS.Blogs_Route,
  id: URLS.Blogs_Route,
  component: BlogsPageContainer,
  isAuth: true,
}

const BLOG_EDIT_PAGE: RouteType = {
  path: URLS.Blog_Edit_Route,
  id: URLS.Blog_Edit_Route,
  component: UpdateBlogContainer,
  isAuth: true,
}

const SIGN_IN_PAGE: RouteType = {
  path: URLS.Sign_In,
  id: URLS.Sign_In,
  component: SignInFormContainer,
  isAuth: false,
}

const REGISTRATION_PAGE: RouteType = {
  path: URLS.Registration,
  id: URLS.Registration,
  component: RegistrationFormContainer,
  isAuth: false,
}

const EMAIL_CONFIRM_PAGE: RouteType = {
  path: URLS.Registration_confirm,
  id: URLS.Registration_confirm,
  component: EmailConfirmPopupContainer,
  isAuth: false,
}

const PASSWORD_RECOVERY_PAGE: RouteType = {
  path: URLS.Password_recovery,
  id: URLS.Password_recovery,
  component: PasswordRecoveryContainer,
  isAuth: false,
}

const FORGOT_PASSWORD_PAGE: RouteType = {
  path: URLS.Forgot_password,
  id: URLS.Forgot_password,
  component: ForgotPasswordContainer,
  isAuth: false,
}

const PROFILE_SETTINGS_PAGE: RouteType = {
  path: URLS.Profile_settings,
  id: URLS.Profile_settings,
  component: ProfileSettingsPageContainer,
  isAuth: false,
}

const CREATE_ELEMENTS_PAGE: RouteType = {
  path: URLS.Create_Elements_Route,
  id: URLS.Create_Elements_Route,
  component: CreateElementsPageContainer,
  isAuth: false,
}

const NOT_FOUND_PAGE: RouteType = {
  path: URLS.Page_Not_Found_Route,
  id: URLS.Page_Not_Found_Route,
  component: NotFound,
  isAuth: false,
}

export const ALL_ROUTES = [
  HOME_PAGE,
  POSTS_PAGE,
  BLOGS_PAGE,
  SIGN_IN_PAGE,
  REGISTRATION_PAGE,
  EMAIL_CONFIRM_PAGE,
  PASSWORD_RECOVERY_PAGE,
  FORGOT_PASSWORD_PAGE,
  PROFILE_SETTINGS_PAGE,
  CREATE_ELEMENTS_PAGE,
  BLOG_EDIT_PAGE,
  NOT_FOUND_PAGE,
]

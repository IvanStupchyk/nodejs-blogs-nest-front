import HomePageContainer from '../containers/HomePageContainer/HomePageContainer'
import PostsPageContainer from '../containers/PostsPageContainer/PostsPageContainer'
import NotFound from '../pages/NotFound/NotFound'
import { URLS } from '../constants/apiRouter'
import BlogsPageContainer from "../containers/BlogsPageContainer/BlogsPageContainer";

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
  NOT_FOUND_PAGE,
]

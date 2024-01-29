import { URLS } from '../constants/apiRouter'

type SideLinkType = {
  title: string
  id: string
  url: string
  permission: Array<string>
}

const POSTS: SideLinkType = {
  title: 'Posts',
  id: 'posts',
  url: URLS.Posts_Route,
  permission: ['ALL'],
}

const BLOGS: SideLinkType = {
  title: 'Blogs',
  id: 'blogs',
  url: URLS.Blogs_Route,
  permission: ['ALL'],
}


export const ASIDE_ROUTES = [
  BLOGS,
  POSTS
]

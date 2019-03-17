// let us import our CSS files
declare module '*.pcss' {
  const css: string;
  export default css;
}

// @types/marked is out of date and inaccurate
declare module 'marked' {
  export default function marked(src: string): string;
}

type Option<T> = T | undefined;
type Nullable<T> = T | null;

type APIData<T = unknown> =
  // 'create' does not exist on type APIThread
  | (T extends APIThread ? never : Create<T> & { action: 'create' })
  | Update<T> & { action: 'update' }
  | Delete<T> & { action: 'delete' };
type Create<T> = T;
type Update<T> = Partial<T> & { id: number };
type Delete<T> = { [K in keyof T]: never } & { id: number };

type APIEvent = {
  id: number;
  posted: boolean;
  in_thread_id: number;
  cols: (string | number)[];
};

type APISection = {
  id: number;
  is_events_section: boolean;
  name: string;
  content: string;
  lock_held_by_user_id: number | null;
  in_thread_id: number;
  lock_assigned_at_utc: number;
};

type APIThread = {
  id: number;
  thread_name: string;
  display_name: string;
  post_id: string | null;
  subreddit: string | null;
  space__t0: number | null;
  youtube_id: string | null;
  spacex__api_id: string | null;
  created_by_user_id: number;
  sections_id: number[];
  events_id: number[];
  event_column_headers: string[];
  space__utc_col_index: number | null;
};

type APIFullThread = {
  id: number;
  thread_name: string;
  display_name: string;
  post_id: string | null;
  subreddit: string | null;
  space__t0: number | null;
  youtube_id: string | null;
  spacex__api_id: string | null;
  created_by_user_id: number;
  sections_id: number[];
  events_id: number[];
  event_column_headers: string[];
  space__utc_col_index: number | null;

  created_by_user: APIUser;
  sections: APISection[];
  events: APIEvent[];
};

type APIUser = {
  id: number;
  reddit_username: string;
  lang: string;
  is_global_admin: boolean;
  spacex__is_admin: boolean;
  spacex__is_mod: boolean;
  spacex__is_slack_member: boolean;
};

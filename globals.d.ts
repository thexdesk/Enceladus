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

type ID = {
  id: number;
};

type APIData<T = unknown> =
  // 'create' does not exist on type APIThread
  | (T extends APIThreadData ? never : Create<T> & { action: 'create' })
  | Update<T> & { action: 'update' }
  | Delete<T> & { action: 'delete' };
type Create<T> = T & ID;
type Update<T> = Partial<T> & ID;
type Delete<T> = { [K in keyof T]: never } & ID;

type APIEventData<joins extends boolean = false> = ID & {
  posted: boolean;
  message: string;
  terminal_count: string;
  utc: number;
  in_section_id: joins extends false ? number : undefined;
  in_section: joins extends true ? APISectionData<joins> : undefined;
};

type APIPresetEventData = ID & {
  holds_clock: boolean;
  message: string;
  name: string;
};

type APISectionData<joins extends boolean = false> = ID & {
  content: string;
  name: string;
  lock_held_by_user_id: joins extends false ? Nullable<number> : undefined;
  lock_held_by_user: joins extends true ? Nullable<APIUserData> : undefined;
  in_thread_id: joins extends false ? number : undefined;
  in_thread: joins extends true ? APIThreadData<joins> : undefined;
  events_id: joins extends false ? number[] : undefined;
  events: joins extends true ? APIEventData<joins>[] : undefined;
};

type APIThreadData<joins extends boolean = false> = ID & {
  thread_name: string;
  launch_name: string;
  post_id: Nullable<string>;
  subreddit: string;
  t0: Nullable<number>;
  take_number: number;
  youtube_id: Nullable<string>;
  spacex__api_id: Nullable<string>;
  created_by_user_id: joins extends false ? number : undefined;
  created_by_user: joins extends true ? APIUserData : undefined;
  sections_id: joins extends false ? number[] : undefined;
  sections: joins extends true ? APISectionData<joins>[] : undefined;
};

type APIUserData = ID & {
  reddit_username: string;
  lang: string;
  is_global_admin: boolean;
  spacex__is_admin: boolean;
  spacex__is_mod: boolean;
  spacex__is_slack_member: boolean;
};

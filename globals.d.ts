declare module 'fetchival'; // pending @types/fetchival

type Option<T> = T | undefined;
type Nullable<T> = T | null;

type CUD<T> =
  | Create<T> & { action: 'create' }
  | Update<T> & { action: 'update' }
  | Delete<T> & { action: 'delete' };
type Create<T> = T;
type Update<T> = Partial<T> & { id: number };
type Delete<T> = { id: number };

type APIEvent<joins extends boolean = false> = {
  id: number;
  posted: boolean;
  message: string;
  terminal_count: string;
  utc: number;
  in_section_id: joins extends false ? number : undefined;
  in_section: joins extends true ? APISection<joins> : undefined;
};

type APIPresetEvent = {
  id: number;
  holds_clock: boolean;
  message: string;
  name: string;
};

type APISection<joins extends boolean = false> = {
  id: number;
  content: string;
  name: string;
  lock_held_by_user_id: joins extends false ? Nullable<number> : undefined;
  lock_held_by_user: joins extends true ? Nullable<APIUser> : undefined;
  in_thread_id: joins extends false ? number : undefined;
  in_thread: joins extends true ? APIThread<joins> : undefined;
  events_id: joins extends false ? number[] : undefined;
  events: joins extends true ? APIEvent<joins>[] : undefined;
};

type APIThread<joins extends boolean = false> = {
  id: number;
  thread_name: string;
  launch_name: string;
  post_id: Nullable<string>;
  subreddit: string;
  t0: Nullable<number>;
  take_number: number;
  youtube_id: Nullable<string>;
  spacex__api_id: Nullable<string>;
  created_by_user_id: joins extends false ? number : undefined;
  created_by_user: joins extends true ? APIUser : undefined;
  sections_id: joins extends false ? number[] : undefined;
  sections: joins extends true ? APISection<joins>[] : undefined;
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

declare namespace JSX {
  interface IntrinsicElements {
    section: Partial<HTMLElement & IntrinsicAttributes>;
    link: Partial<HTMLLinkElement & IntrinsicAttributes>;
    div: Partial<HTMLDivElement & IntrinsicAttributes>;
    h1: Partial<HTMLHeadingElement & IntrinsicAttributes>;
    a: Partial<HTMLAnchorElement & IntrinsicAttributes>;
    header: Partial<HTMLElement & IntrinsicAttributes>;
    iframe: Partial<HTMLIFrameElement & IntrinsicAttributes>;

    'x-countdown': Partial<HTMLElement & IntrinsicAttributes>;
    'x-event': Partial<HTMLElement & IntrinsicAttributes>;
    'x-header': Partial<HTMLElement & IntrinsicAttributes>;
    'x-links': Partial<HTMLElement & IntrinsicAttributes>;
    'x-section': Partial<HTMLElement & IntrinsicAttributes>;
    'x-twitter': Partial<HTMLElement & IntrinsicAttributes>;
    'youtube-video': Partial<HTMLElement & IntrinsicAttributes>;
  }

  interface IntrinsicAttributes {
    class?: string;
    role?: string;
  }
}

import { Header } from './custom-elements/x-header';
import { YouTube } from './custom-elements/youtube-video';
import { Links } from './custom-elements/x-links';
import { Sections } from './custom-elements/x-sections';
import { Events } from './custom-elements/x-events';
import { InitModal } from './custom-elements/modals/init-modal';

export const header_elem = document.querySelector<Header>('x-header')!;
export const youtube_elem = document.querySelector<YouTube>('youtube-video')!;
export const links_elem = document.querySelector<Links>('x-links')!;
export const sections_elem = document.querySelector<Sections>('x-sections')!;
export const events_elem = document.querySelector<Events>('x-events')!;
export const init_modal_elem = document.querySelector<InitModal>('init-modal')!;

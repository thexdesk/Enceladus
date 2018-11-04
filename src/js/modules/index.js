import './custom-elements/x-header';
import './custom-elements/youtube-video';

const header = document.querySelector('x-header');
header.launch_name = 'CRS-16';
header.t0 = 1_600_000_000;

const youtube = document.querySelector('youtube-video');
youtube.id = 'xybp6zLaGx4';

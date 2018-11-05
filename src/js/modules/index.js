import './custom-elements/x-header.jsx';
import './custom-elements/youtube-video.jsx';
// import './custom-elements/x-twitter.jsx';
import './custom-elements/x-section.jsx';

import createElement from './createElement';

const header = document.querySelector('x-header');
header.launch_name = 'Falcon Heavy Test Flight';
header.t0 = 1_517_949_900;

const youtube = document.querySelector('youtube-video');
youtube.id = 'wbSwFU6tY1c';

const sections = document.querySelector('section.sections');

const primary_sec = sections.appendChild(<x-section db-id='0'/>);
const secondary_sec = sections.appendChild(<x-section db-id='1'/>);

primary_sec.header = 'Primary Mission: Get Hype';
primary_sec.body
  = '<p>As this is a demonstration launch for a new vehicle, the risk associated '
  + 'with the launch is higher than that to which we have become accustomed '
  + 'with standard Falcon 9 launches. As such, there are no paying customers '
  + 'entrusting an unproven vehicle with their billion-dollar payloads. This '
  + 'mission\'s mission (heh) is simply to prove that the launch vehicle '
  + 'works.</p><p>This requires a lot of things to go correctly in a very short '
  + 'space of time. We need 27 engines to ignite almost simultaneously and not '
  + 'blow the vehicle apart with the acoustics of it all. Then we need the '
  + 'vehicle to survive the huge forces of launch, through Max-Q, to booster '
  + 'separation. Maximum pucker factor on booster separation, as the two side '
  + 'boosters will depart from the vehicle and begin heading back to the '
  + 'launch site. After this, the core stage is on for another minute or so '
  + 'until core separation. From this point on, the mission should closely '
  + 'resemble a Falcon 9 launch to LEO for the upper stage.</p>';

secondary_sec.header = 'Secondary Mission: Landing Attempt(s!)';
secondary_sec.body =
  '<p>After the boosters separate, they will immediately flip and initiate a '
  + 'boostback burn to return to LZ-1 and LZ-2, a few miles south of the '
  + 'launch site.</p><p>The core stage will also perform a boostback after '
  + 'separation, however it will not have sufficient fuel to return to dry '
  + 'land. The purpose of its boostback burn is simply to reduce the downrange '
  + 'component of its velocity so it can gracefully fall towards the '
  + 'Autonomous Spaceport Drone Ship, or ASDS, nicknamed Of Course I Still '
  + 'Love You, positioned 342km downrange from the launch site in the Atlantic '
  + 'Ocean.</p><p>The upper stage still hasn\'t gotten the memo that SpaceX '
  + 'are pursuing full reusability.</p>';

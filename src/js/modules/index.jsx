import './custom-elements/x-header.jsx';
import './custom-elements/youtube-video.jsx';
// import './custom-elements/x-twitter.jsx';
import './custom-elements/x-section.jsx';
import './custom-elements/x-event.jsx';

import createElement from './createElement';

const header = document.querySelector('x-header');
header.launch_name = 'Falcon Heavy Test Flight';
header.t0 = 1_517_949_900;

// const youtube = document.querySelector('youtube-video');
// youtube.id = 'wbSwFU6tY1c';

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
secondary_sec.body
  = '<p>After the boosters separate, they will immediately flip and initiate a '
  + 'boostback burn to return to LZ-1 and LZ-2, a few miles south of the '
  + 'launch site.</p><p>The core stage will also perform a boostback after '
  + 'separation, however it will not have sufficient fuel to return to dry '
  + 'land. The purpose of its boostback burn is simply to reduce the downrange '
  + 'component of its velocity so it can gracefully fall towards the '
  + 'Autonomous Spaceport Drone Ship, or ASDS, nicknamed Of Course I Still '
  + 'Love You, positioned 342km downrange from the launch site in the Atlantic '
  + 'Ocean.</p><p>The upper stage still hasn\'t gotten the memo that SpaceX '
  + 'are pursuing full reusability.</p>';

const events = document.querySelector('section.updates');

[
  ['21:13', 'T+28:52', '2nd stage engine cutoff (SECO-2) success'],
  ['21:13', 'T+28:22', '2nd stage engine restarts'],
  ['20:57', 'T+12:28', 'SpaceX Webcast ends'],
  ['20:53', 'T+8:31', '2nd stage engine cutoff (SECO-1)'],
  ['20:53', 'T+8:19', 'Center core landing not successful'],
  ['20:53', 'T+8:14', 'Side core landings success'],
  ['20:52', 'T+7:10', 'Center core begins entry burn'],
  ['20:51', 'T+6:41', 'Side cores begin entry burn'],
  ['20:49', 'T+4:01', 'Fairing deployment'],
  ['20:48', 'T+3:44', 'Center core begins boostback burn'],
  ['20:48', 'T+3:35', '2nd stage engine starts'],
  ['20:48', 'T+3:26', 'Center core and 2nd stage separate confirmed'],
  ['20:48', 'T+3:20', 'Center core engine shutdown/main engine cutoff (MECO)'],
  ['20:48', 'T+3:14', 'Side cores begin boostback burn'],
  ['20:47', 'T+2:43', 'Side cores separate from center core'],
  ['20:47', 'T+2:40', 'Booster engine cutoff (BECO)'],
  ['20:46', 'T+1:12', 'Max Q (moment of peak mechanical stress on the rocket)'],
  ['20:45', 'T+0:00', 'Falcon Heavy liftoff'],
  ['20:44', 'T-0:03', 'Engine controller commands center core engine ignition sequence to start'],
  ['20:44', 'T-0:05', 'Engine controller commands side booster engine ignition sequence to start'],
  ['20:44', 'T-0:11', 'SpaceX Launch Director verifies go for launch. FH is GO FOR LAUNCH'],
  ['20:44', 'T-1:00', 'Flight computer commanded to begin final prelaunch checks & Propellant tank pressurization to flight pressure begins'],
  ['20:43', 'T-1:28', 'FH is on internal power'],
].forEach(([utc, terminal_count, message]) => {
  const event = events.appendChild(<x-event/>);
  event.utc = utc;
  event.terminal_count = terminal_count;
  event.message = message;
});

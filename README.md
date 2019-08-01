# Enceladus

![Build]
![License]
![FOSSA Status]

[build]: https://img.shields.io/travis/com/r-spacex/Enceladus
[fossa status]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fr-spacex%2FEnceladus.svg?type=shield
[license]: https://img.shields.io/badge/license-GPL--3.0-blue

## Development

To develop locally,
run the following.

```bash
git clone --recursive git@github.com:r-spacex/Enceladus.git
cd Enceladus
npm i
npm run watch # or `npm run build` for a one-off build
```

At this point, you can open the `localhost:5000` in your browser,
which will contain the current build of the interface.

## Host interface

To access the host interface,
add the queryparam `host` to the end of the URL.
No value needs to be set.

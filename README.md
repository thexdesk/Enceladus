# Enceladus LTI

![Build]
![License]
![FOSSA Status]

[build]: https://img.shields.io/travis/r-spacex/Enceladus-LTI.svg?style=flat-square
[fossa status]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fr-spacex%2FEnceladus-LTI.svg?type=shield
[license]: https://img.shields.io/github/license/r-spacex/Enceladus-LTI.svg?style=flat-square

## Development

To develop locally,
run the following.

```bash
git clone git@github.com:r-spacex/Enceladus-LTI.git
cd Enceladus-LTI
npm i
npm run watch # or `npm run build` for a one-off build
```

At this point, you can open the `localhost:5000` in your browser,
which will contain the current build of the LTI.

## Host interface

To access the host interface,
add the queryparam `host` to the end of the URL.
No value needs to be set.

# Enceladus LTI

![License]
![FOSSA Status]

[fossa status]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fr-spacex%2FEnceladus-LTI.svg?type=shield
[license]: https://img.shields.io/github/license/r-spacex/Enceladus-LTI.svg?style=flat-square

## Development

_It is not currently necessary to be running the API during development.
This will change in the future._

To develop locally,
run the following.

```bash
git clone git@github.com:r-spacex/Enceladus-LTI.git
cd Enceladus-LTI
yarn
yarn watch # or `yarn build` for a one-off build
```

At this point, you can open the `dist/index.html` file in your browser,
which will contain the current build status of the LTI.

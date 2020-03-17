# BPMN Visu JS
A JavaScript library to visualize process execution data. Diagrams are displayed from BPMN files. With additional display
options for execution data (highlight some transitions, counters, and more). With interactive capacities (mouse hover,
click).

[![Build](https://github.com/bonitasoft-labs/bpmn-visu-js/workflows/Build/badge.svg)](https://github.com/bonitasoft-labs/bpmn-visu-js/actions)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/bonitasoft-labs/bpmn-visu-js?color=orange&include_prereleases)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)


**Supported Browsers**: Chrome, Firefox, Safari, Edge


# Demos

You currently must build the project prior to use it (see bellow).

If you need BPMN examples, you can use resources from the from [BPMN Model Interchange Working Group (BPMN MIWG)](http://www.omgwiki.org/bpmn-miwg)
- https://github.com/bpmn-miwg/bpmn-miwg-test-suite
- https://github.com/bpmn-miwg/bpmn-miwg-demos


# Roadmap

`BPMN Visu JS` is in early development stages and is subject to changes until the `1.0.0` version is released.

We are currently focusing on the [BPMN support](docs/bpmn-support-roadmap.adoc) to be able to render most of the BPMN
elements.

Then, we will work on BPMN extensions, library extension points.


# Development

To build the project, see the [Contributing guide](CONTRIBUTING.md#Build) :slightly_smiling_face:

## Release

## Issues and milestones update

Milestone names are based on version
- Clean the opened milestone if some issues are still opened (move them to a new one or discard milestone from them)
- Close the milestone
- Clean the [Day to Day Board](https://github.com/bonitasoft-labs/bpmn-visu-js/projects/1): archive all cards of the
`Done` column related to the milestone


## Git Tag

- Ensures you’re on master and don’t have local, un-commited changes: `git checkout master && git pull --tags`
- Bumps the version number in package.json based on major, minor or patch (see https://docs.npmjs.com/cli/version, type:
 [new-version | major | minor | patch]): `npm version [type] --message "[RELEASE] %s"`
- Push to GitHub: `git push && git push --tags`

## GitHub update

- Ensure the latest closed milestone matches the name of the tag/version that has just been pushed
- Create a new GitHub release
  - Open [github releases](https://github.com/bonitasoft-labs/bpmn-visu-js/releases)
  - Create a new release based on the newly created tags. Check `This is a pre-release`
  - In the description, at least add a link to the related milestone


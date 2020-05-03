## Noter Desktop

This project uses https://github.com/electron-react-boilerplate/electron-react-boilerplate


## Install

First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/Sami-Sh99/Noter.git your-project-name
cd your-project-name
yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```



## Folder Structure

### The top-level directory layout

    .
    ├── configs                 # Configuration files for [Webpack](https://webpack.js.org/concepts/)
    ├── internals               # Script files for running, building, and testing the project
    ├── app                     # Source files
    ├── test                    # Automated tests (`spec`)
    ├── resources               # Assets directory

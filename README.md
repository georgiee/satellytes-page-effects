# Satellytes Effects
A collection of effects we lazy load
to run on our website (www.satellytes.com).

Currently the following effects are included.

+ [Star Wars Effect](packages/effects/effect-star-wars)
+ [Turbulence with Perlin Noise (SVG + CSS filter)](packages/effect-svg-perlin-noise)

## Develop

```
yarn bootstrap
```

This will run lerna bootstrap to install all dependencies and cross link all packages.

```
# initially build all packages
yarn build

# start the playground
yarn playground

# you can also switch into the playground folder
cd packages/playground
yarn start
```

If you want to continue developing on an effect you have to start the build & watch task.
You can start all packages in development mode with:

```
yarn develop
```

THis will use `lerna run` to run the task `develop` in all packages.
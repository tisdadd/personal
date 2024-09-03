> [Up One Level](../readme.md)

# src

The main source code of the application.

- [components/](components/readme.md) - Components used in more than one section of the application.
- [contexts/](contexts/readme.md) - Custom contexts used inside of the application belong here.
- [pages/](pages/readme.md) - That which is served to users - both the api and the final routes come from here. Eventually, the app directory will be used instead, but at time of this project was not yet in a recommended production state. Note that, if you used the command line option to not use src, [pages will be one level up instead](../pages/readme.md), and you may safely delete this comment.
- [styles/](styles/readme.md) - Global style modules go here. If initialized without using src directory, [this folder is inside of root instead](../styles/readme.md) - you may delete this line.
- [views/](views/readme.md) - Views (could be the content of a screen or modal - something with stand along functionality) used in the application belong here.
- env.js - For allowing environment variables to be simulated after build, uses [react-inject-env](https://github.com/codegowhere/react-inject-env).
> [Up One Level](../readme.md)

# Pages

This is where what is finally rendered to the users go. Recommendation of keeping the View object separated out of most pages, since we can't have other components along side the pages, and in case of wanting to reroute, or not knowing final routes it can still be in active development and viewed with storybook. Check out the [../src/views/](../src/views/) folder for an example. This will also help to keep the transition easy later to the app folder.

If you are unused to Next, please check out [NextJS Pages Overview](https://nextjs.org/docs/basic-features/pages).

- [api/](api/readme.md) - Api routes go here.
- [_app.tsx](https://nextjs.org/docs/advanced-features/custom-app) - The entry point that wraps page components. We inject context here.
- [_document.tsx](https://nextjs.org/docs/advanced-features/custom-document) - Ability to go through the direct html/body tags.
- index.tsx - The home page served at `/`. Note that meta information about the page is kept in the component, the rest goes to the view, we would pass on props if we had generated any.
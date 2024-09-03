> [Up One Level](../readme.md)

# Log Provider

The Context Provider for logging. This provider will pass on functions needed, as well as keep track of if the logging should be happening. Per project, this should be updated to go into the logging system used, not just being the console logging.

- [util/](util/readme.md) - Utility functions for this logger.
- index.js - For easier import elsewhere
- LogProvider.tsx - The actual Context Provider Wrapper
- LogProvider.defaultState.ts - A default state for this provider
- LogProvider.propTypes.ts - The Prop Types for this provider
- LogProvider.test.ts - Tests for this provider

# Prep Notes

These are notes to prep for the future creation of multiple platforms for others to consume, as well as importing the data into those platforms.

## Scaling Concerns

- How often will we be updating the data?
  - How often does source system usually have updates?
- Is there a way to notify of changed records easily?
- Should we be updating our process?
  - We need an idea of how many records we will update at one time to know if we should continue using functions, or perhaps dedicate a small always on app to this, or something else.
    - Potentially a system to query for updates, push updated record ids to search into a queue, then pull from that queue? If doing that way, we can handle a lot of small records/not be worried about timing out.
- What indices should be created? (Upsert in particular is slow on homesite right now, as not doing real upsert, but find/replace)
  - Are we limiting searchable fields?
- Will we expect enough data to be concerned about auto-incremented IDs?
  - If so, how far in the future is that?
- Rather than only sending errors to the UI, do we want to log them somewhere on the backend? Then we can get a full context of what is happening, and respond before users report hopefully.
- Pagination on both backend and UI should be added.
  - As part of this, filtering to the data that is needed on the screen only? Or at least allowing that.
  - May need to make other endpoints for screens
  - No longer fetching all records
    - Make full use of the [`react-query`](https://react-query.tanstack.com/) library AJ brought in
    - Get updated records only (assuming we have an updatedAt time, which most of ours do)
    - Pagination vs Infinite scrolling (already in existing table)
- Will we need a reporting library/pattern?
  - For large sets of data, functions may take too long.
- Is it ok to change the underlying data table display library?
  - See features being requested and developed that already exist in other underlying ones
    - Sorting (library shows how to implement a sorting method)
    - Grouping/Drilldown (already exists in underlying library)
    - Add an entity (in any table...)
  - Actual logic appears to be in the Data Table Provider, as is appropriate
  - When we get to sorting thousands/millions of items and pagination, custom logic for that is doable, but annoying
  - The table itself is already an abstracted class
  - Responsiveness?
  - Filtering data coming in
- Reports/Data export
  - Do we need a new system set up as we have more data?
    - Utilize an existing product such as [Power BI](https://azure.microsoft.com/en-us/services/developer-tools/power-bi/#features) or roll our own?
  - Will we want to disable the raw database export, except for specific individuals?
    - Liability of angry employee dumping database, and leaving?
  - Other ways to display data - should we be proactive about this, just linking to examples (let Alan pick his favorite's?)
    - If we are doing a foundational ui library, including some chart availability maybe? Potentially heat maps with drilldown's could be useful as this is related to different community locations
    - Maybe find out what kind of reports are being done with this data, and integrate some into the tool?
- What other Azure security database things will we run into besides no querying against `INFORMATION_SCHEMA`? 
  - Is there a limit to how many things can be pulled at one time.
- Caching, caching everywhere! 
  - For real though, figure out caching strategy.

## Data Unity

- We have been using auto-generated id, Lennar has their own IDs being imported. Should we utilize those instead?
- Boolean data should be represented as a Boolean data type.
- Should we allow duplicate hsNum? 
  - Is it unique, or unique to a community? 
  - Part of it is the community number, but in our new system with people making things themselves, will we enforce that?
- When using the `get` methods, the filtering parameters should convert to the right type from string
- Prisma allows creating nested components (due to the graphQL nature) - do we want to keep those from coming through with middleware, or make all of the middlewares unify things across all nested objects?
  - Example: One could create a community with all the homesites attached if they wanted to right now. If we are not utilizing graphQL endpoints, is it wise to leave that open, or should we be in a more traditional setup?
- Need to (very often) convert data to match the prisma schema. This can be done in several ways, should there just be a middleware attached for each model so that it is not easy to forget?
  - Development pattern then is Prisma Update -> Prisma Middleware Update instead of Prisma Update -> Method create sanitizer
  - Mostly comes up in the CSV imports, but could make UI more seamless in backend updates as well.
- Should we remove errorReport? We have feedback and error reports.
- Do we want to allow front end to pass in updatedBy/createdBy and not override it?
- Eventually clean up filtered elements ["COMM", "9999"] once API's/CDM no longer are putting it in.
- Where to keep/update data dictionary.
- We have deletes and archives available - Should we only do soft deletes?
  - Should this be enforced via a middleware?
- What if a user archives a community, and the data import wants to pull it again. Should it be brought in?
- How do we handle a user wanting to add an already existing community?
- For required data in an added entity (homesite, community, note, whatever), what should we do to ensure that multiple people don't give same unique value, or are alerted if they do?
  - Example - two people adding community at once, one will fail
  - Could state what is already there - should we 
  - Someone archives a record, and someone else wants to create with same keys, what should we do?
- Should we set up way to easily unarchive, or a temporary undo for archiving?
- Unified schema type to generate the others?
  - If so, which one?
    - Prisma
    - Joi
    - OpenAPI
    - JSON Schema

## Library/Service API

- Do we plan to give for the API an actual library that calls the API directly, or simply the REST API?
  - If we do this, is it Javascript only, or also others?
- Prisma is designed to work with graphQL queries - is that something we want to take advantage of, and offer a graphQL endpoint?
- Our API is following fairly consistent standards, however should we consider following an open standard?
  - [Example from Microsoft](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design#define-api-operations-in-terms-of-http-methods): (PATCH for merge, PUT for complete object replacement, we are doing PUT for merges, not doing get a RESOURCE/ID but with a where id = instead.)
- Business logic on the Backend
  - What is in the Data Table Provider?

## Devops

- Get the testing into Devops.
  - Should we enforce local testing before check-in?

## Change History

- Do we need to have a [ledger database](https://docs.microsoft.com/en-us/azure/azure-sql/database/ledger-overview)?
  - Potentially a simple [temporal table](https://www.sqlshack.com/track-history-data-changes-using-sql-server-2016-system-versioned-temporal-tables/), though that does have the ability to [turn off/on](https://docs.microsoft.com/en-us/sql/relational-databases/tables/stopping-system-versioning-on-a-system-versioned-temporal-table?view=sql-server-ver15)...?
- Aside from the approvals process, what else should have an immutable record?
- Are we concerned about raw database access?

## Database Update Strategies

- Boolean field conversions
  - Add new field with boolean values
  - Have API return/update those values instead of the original
    - Should it temporary send original value as well for easy check.

## Developer Sanity Checks

- Should we have a freeze change window, or rolling release branch? 
  - Release branch that may be different from what is in the dev branch, but only has the ready to move to prod ones?
  - Does our current flow follow [git flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- Link PR's to Slack?
- More async communication habits?
  - Maker vs Manager Time
  - Deep Work Wednesday?
- On Friday Releases - Michael plans to do many weeks in the summer with four ten hour days, so that Friday's he may enjoy checking out neighborhood sales with his wife looking for strange and unique items, and forcing him out of the house. So - he will not be available every Friday.
  - Check with both sides about deployment times, with more than a day's notice if the time is going to change
  - Real go/no-go time
- As we are moving past the MVP, and considering how to make this sustainable not only for our team but also as a platform for others to use, what habits and expectations should we form or drop?
  - What is everyone's preferred communication method?
    - Email
    - Slack Message
    - Slack Call
    - Slack channel
  - For overall productivity, what could we do better?
  - What is the expected turn around time on a pull request?
    - We mentioned everyone reviewing at start of day, but then get pressured to push through quickly. If there are questions/concerns/comments, should the expectation then be that it is ok until start of next day to respond?
    - What steps need to be completed for something to be considered part of the next release cycle? (Hopefully having a QA person will help this to always ensure a few sets of eyes have seen things)
- Proper backlog grooming and estimates.
  - Karl mentioned this was coming - if it can be done in an asynchronous manner long term, that would be wonderful.

## Karl Sanity Checks

- What needs to be done for Karl to feel like he can go on a full vacation, and not need to be reachable?

## Others

- Front end active directory emulation - have two versions going right now (fakeuser for if dev environment, else emulated user - practically the same thing - but backend picks it up from the emulated user).
- Converting to REM units instead of pixels.
- Updating node modules strategy
  - Security checks - npm audit shows over 30 high vulnerabilities on frontend.
  - Quality of Life
  - Depreciated
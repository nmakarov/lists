# lists
Lists API server and React app tutorial


## Steps

### Step 1
Get'em started
something that works - countries list
adding filter and count

### Step 2
More data - adjectives
more filters
what about getting common adjective suffixes?
and what if I want just a flat list of those suffixes?
how long does it take to generate the response?

### Step 3
getting closer to the product (internal checks etc)
housekeeping: make linter happy
split code into modules
tests up and running
commands in package.js
making sure we have good coverage and eslint is happy with test definitions

### Step 4
Very important – leap from a code to the product
Params validation
More tests
Error handling
Logger

### Step 5
Deployment

### To come


### Development

#### Linter
npm run lint

#### Tests
npm run test:unit

#### version bump
after `git commit` do `npm version patch` or `npm version minor` and then `git push`

#### deployment
npx shipit production deploy

## Data sources

### Countries
https://gist.github.com/keeguon/2310008
https://github.com/samayo/country-json
https://github.com/icyrockcom/country-capitals/blob/master/data/country-list-with-ids.json

### Adjectives
https://www.enchantedlearning.com/wordlist/adjectives.shtml
https://patternbasedwriting.com/elementary_writing_success/list-4800-adjectives/


### Constellations
http://www.astro.wisc.edu/~dolan/constellations/constellation_list.html

## Todo

### Add these datasets:
- Mayan gods
- Greek gods

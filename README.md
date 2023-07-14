# PDB - Products Data Base

Application allows to scan barcode using camera, or enter it manually using form, search for products information in the external database, update and save it to your local database. No more `.xls` files.

## How to use
- Use ```start/stop scan``` button to run/stop camera scanner or enter code manualy using form below.
- Afer full product's infromation is loaded, update it using form and save.

## Features
- Product's information is taken from "external" database ```db.json``` and saved to "internal" ```db-internal.json```.
- If product's field `requires_best_before_date` is equal to `true`, `best_before_date` field is included in full product's form and is required.

- Before storing product in internal database:
  - leading zeros from `code` are removed.
  - unicode characters that require parcing are parced.
  - `trade_item_descriptor` name transformed to `trade_item_unit_descriptor`.

## Setup and run:
##### docker:
```
$ docker compose up --build
```
##### or npm:
```
$ npm i
$ npm run dev:db
```

##### Preview:
```
http://localhost:3000
```

##### Api url:
```
http://localhost:3001
```

##### Run tests
```
$ npm run test
```

## Possible improvements:
#### Identify products by code + type
- using scanner: `type` can be obtained from quagga's response
- using form: add switcher `gtin <-> plu`
- add `type` to request when feching data

#### UX/UI
- add responsive
- improve accessibility 
- disable `code` form when scanner is `on`
- clear button for `code` form
- skeletons for content while loading
- replace “select” for booleans with iOS like switcher
- change form labels (remove underscores)
- check which fields are may be also required
- tooltips for form field explaining what  is that field for

#### Code
- fetch:
  - add error messages for user (not only in console)
  - create reusable fetch function
  - add loading during fetching
  - check if `response.ok`
- add default values to useState
- <ChakraProvider> move to top parent
- `onChange{(e)=>f(e)}` function call may be omitted
- use store (redux, context)
- TypeSript: avoid using `any`
- TypeSript: better type setting
- more tests
  
## Useful resources
- Library for barcode scanning [QuaggaJS](https://github.com/ericblade/quagga2)
- Generate barcodes for testing [barcode.tec-it.com](https://barcode.tec-it.com/de/EAN13?data=978020137962)
- [Next.js docs](https://nextjs.org/docs).
- UI Library [Chakra](https://chakra-ui.com/getting-started).
- [docker docs](https://docs.docker.com/language/nodejs/).




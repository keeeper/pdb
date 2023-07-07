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

## Setup and run
##### docker:
```
$ docker compose up --build
$ docker compose up 
```
##### npm:
```
$ npm i
$ npm run dev:db
```

##### Preview:
```
$ localhost:3000
```
##### Run tests
```
$ npm run test
```

### Useful resources
- Library for barcode scanning [QuaggaJS](https://github.com/ericblade/quagga2)
- Generate barcodes for testing [barcode.tec-it.com](https://barcode.tec-it.com/de/EAN13?data=978020137962)
- [Next.js docs](https://nextjs.org/docs).
- UI Library [Chakra](https://chakra-ui.com/getting-started).
- [docker docs](https://docs.docker.com/language/nodejs/).




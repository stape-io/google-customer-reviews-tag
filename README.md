# Google Customer Reviews Tag for Google Tag Manager Web

The **Google Customer Reviews Tag** is a tag template for Google Tag Manager (GTM) Web Container that facilitates the display of [Google's opt-in survey banner](https://support.google.com/merchants/answer/14628991?hl=en) for customers after they complete a purchase.

This banner prompts customers to leave reviews for their recent purchases, helping you gather valuable feedback and improve your business.

## How to Use the Google Customer Reviews Tag

1. **Add the tag** to your GTM web container.
2. **Configure the required and optional fields** to ensure proper functionality.
3. **Set up triggers** to fire the tag on the appropriate page (e.g., order confirmation page).
4. **Publish changes** in GTM to enable the opt-in banner on your website.

## Required Fields

- **Google Merchant ID** – Your Google Merchant Center ID. You can find this ID in the top right of your [Merchant Center account](https://merchants.google.com/).
- **Order ID** – A unique identifier for the order.
- **Customer Email** – The customer's email address, in the format `name@example.com`.
- **Country Code** – The two-letter country code where the order will be delivered ([ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), e.g., `US`).
- **Estimated Delivery Date** – The expected delivery date in `YYYY-MM-DD` format (e.g.,  `2025-12-31`).

## Optional Fields

- **Opt-in Banner Position** – Controls where the banner appears (`Center`, `Bottom Right`, `Bottom Left`, `Top Right`, `Top Left`, `Bottom Tray`). Default is `Center`.
- **Enable Product Review Collection** – Allows collection of product reviews for items with a [GTIN](https://support.google.com/merchants/answer/6219078?hl=en). [Learn more](https://support.google.com/merchants/answer/14632920?hl=en).
  - **Data Source** – Choose between `Data Layer` or `Custom` for GTIN data.
    - **Data Layer**
      - **Data Layer property name** – Specify the data layer property that contains the items list (e.g., `ecommerce`).
      - **GTIN property name** – Specify the property within each item object that contains the GTIN information (e.g., `gtin`, `item_id`, `ean`).
    - **Custom Array** – Provide an array of objects, with each object containing only the `gtin` property
- **Opt-in Banner Display Language** – Define the language of the banner. If left blank, the browser language is used. [List of supported languages](https://support.google.com/merchants/answer/14629205?hl=en).

## Implementation Notes

- Make sure that the Merchant Center store is claimed and verified. [Learn more](https://support.google.com/merchants/answer/11586344?hl=en).

## Open Source

The **Google Customer Reviews Tag** for GTM Web is developed and maintained by [Stape Team](https://stape.io/) under the Apache 2.0 license.

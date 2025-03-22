const getUrl = require('getUrl');
const setInWindow = require('setInWindow');
const callInWindow = require('callInWindow');
const copyFromDataLayer = require('copyFromDataLayer');
const getType = require('getType');
const makeString = require('makeString');
const injectScript = require('injectScript');

/****************************************************************************************************/

const url = getUrl();
if (url && url.lastIndexOf('https://gtm-msr.appspot.com/', 0) === 0) {
  return data.gtmOnSuccess();
}

injectScript(
  'https://apis.google.com/js/platform.js',
  () => {
    setBannerLanguage();
    renderBanner();
    data.gtmOnSuccess();
  },
  data.gtmOnFailure,
  'googleCustomerReviewTag'
);

/****************************************************************************************************/

/**
 * Renders the Google Customer Reviews banner by calling the `gapi.surveyoptin.render` method.
 */
function renderBanner() {
  callInWindow('gapi.load', 'surveyoptin', () => {
    callInWindow('gapi.surveyoptin.render', getBannerConfiguration());
  });
}

/**
 * Overrides the banner default language with the language provided in the template.
 */
function setBannerLanguage() {
  const bannerLanguage = data.bannerLanguage;
  if (bannerLanguage) {
    setInWindow('___gcfg', {}, true);
    setInWindow('___gcfg.lang', bannerLanguage, true);
  }
}

/**
 * Generates the configuration object for the Google Customer Reviews banner.
 * @returns {Object} The configuration object for the banner.
 */
function getBannerConfiguration() {
  const configuration = {
    merchant_id: data.merchantId,
    order_id: data.orderId,
    email: data.customerEmail,
    delivery_country: data.countryCode,
    estimated_delivery_date: data.estimatedDeliveryDate,
    opt_in_style: data.bannerDisplayStyle
  };

  if (data.enableProductReviewCollection) {
    const products = getProductsWithGtin();
    if (products && products.length) configuration.products = products;
  }

  return configuration;
}

/**
 * Retrieves product GTINs based on the configured data source.
 * @returns {Array} An array of product objects with GTINs.
 */
function getProductsWithGtin() {
  let products = [];
  switch (data.itemsGtinDataSource) {
    case 'dataLayer':
      const itemsPropertyName = data.itemsPropertyName;
      const items = copyFromDataLayer(itemsPropertyName, 1); // version 1 to avoid recursive merge.
      if (getType(items) === 'array') {
        const gtinPropertyName = data.gtinPropertyName;
        items.forEach((item) => {
          const gtin = makeString(item[gtinPropertyName] || '');
          if (gtin) products.push({ gtin: gtin });
        });
      }
      break;
    case 'custom':
      products = data.itemsGtinCustomArray;
      break;
  }

  return products;
}

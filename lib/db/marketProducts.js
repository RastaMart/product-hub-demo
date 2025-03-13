const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

/**
 * Get all internet products for a specific market
 * @param {string} marketKey - The market key
 * @returns {Promise<Array>} - Array of internet products
 */
async function getInternetProductsByMarket(marketKey) {
  try {
    const products = await sql`
      SELECT ip.*
      FROM internet_products ip
      JOIN market_internet_product mip ON ip.key = mip.internet_product_key
      WHERE mip.market_key = ${marketKey}
      ORDER BY ip.download_speed ASC
    `;
    return products;
  } catch (error) {
    console.error('Error fetching internet products by market:', error);
    throw error;
  }
}

/**
 * Get all markets for a specific internet product
 * @param {string} productKey - The internet product key
 * @returns {Promise<Array>} - Array of markets
 */
async function getMarketsByInternetProduct(productKey) {
  try {
    const markets = await sql`
      SELECT m.*
      FROM markets m
      JOIN market_internet_product mip ON m.key = mip.market_key
      WHERE mip.internet_product_key = ${productKey}
      ORDER BY m.label ASC
    `;
    return markets;
  } catch (error) {
    console.error('Error fetching markets by internet product:', error);
    throw error;
  }
}

/**
 * Add a relationship between a market and an internet product
 * @param {string} marketKey - The market key
 * @param {string} productKey - The internet product key
 * @returns {Promise<void>}
 */
async function addMarketProductRelation(marketKey, productKey) {
  try {
    await sql`
      INSERT INTO market_internet_product (market_key, internet_product_key)
      VALUES (${marketKey}, ${productKey})
      ON CONFLICT (market_key, internet_product_key) DO NOTHING
    `;
  } catch (error) {
    console.error('Error adding market-product relation:', error);
    throw error;
  }
}

/**
 * Remove a relationship between a market and an internet product
 * @param {string} marketKey - The market key
 * @param {string} productKey - The internet product key
 * @returns {Promise<void>}
 */
async function removeMarketProductRelation(marketKey, productKey) {
  try {
    await sql`
      DELETE FROM market_internet_product
      WHERE market_key = ${marketKey} AND internet_product_key = ${productKey}
    `;
  } catch (error) {
    console.error('Error removing market-product relation:', error);
    throw error;
  }
}

module.exports = {
  getInternetProductsByMarket,
  getMarketsByInternetProduct,
  addMarketProductRelation,
  removeMarketProductRelation
};

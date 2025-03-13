const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

/**
 * Get all internet products for a specific market
 * @param {string} marketId - The market ID
 * @returns {Promise<Array>} - Array of internet products
 */
async function getInternetProductsByMarket(marketId) {
  try {
    const products = await sql`
      SELECT ip.*
      FROM internet_products ip
      JOIN market_internet_product mip ON ip.id = mip.internet_product_id
      WHERE mip.market_id = ${marketId}
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
 * @param {string} productId - The internet product ID
 * @returns {Promise<Array>} - Array of markets
 */
async function getMarketsByInternetProduct(productId) {
  try {
    const markets = await sql`
      SELECT m.*
      FROM markets m
      JOIN market_internet_product mip ON m.id = mip.market_id
      WHERE mip.internet_product_id = ${productId}
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
 * @param {string} marketId - The market ID
 * @param {string} productId - The internet product ID
 * @returns {Promise<void>}
 */
async function addMarketProductRelation(marketId, productId) {
  try {
    await sql`
      INSERT INTO market_internet_product (market_id, internet_product_id)
      VALUES (${marketId}, ${productId})
      ON CONFLICT (market_id, internet_product_id) DO NOTHING
    `;
  } catch (error) {
    console.error('Error adding market-product relation:', error);
    throw error;
  }
}

/**
 * Remove a relationship between a market and an internet product
 * @param {string} marketId - The market ID
 * @param {string} productId - The internet product ID
 * @returns {Promise<void>}
 */
async function removeMarketProductRelation(marketId, productId) {
  try {
    await sql`
      DELETE FROM market_internet_product
      WHERE market_id = ${marketId} AND internet_product_id = ${productId}
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

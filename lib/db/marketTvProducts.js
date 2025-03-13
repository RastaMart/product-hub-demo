const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

/**
 * Get all TV products for a specific market
 * @param {string} marketKey - The market key
 * @returns {Promise<Array>} - Array of TV products
 */
async function getTvProductsByMarket(marketKey) {
  try {
    const products = await sql`
      SELECT tp.*
      FROM tv_products tp
      JOIN market_tv_product mtp ON tp.key = mtp.tv_product_key
      WHERE mtp.market_key = ${marketKey}
      ORDER BY tp.monthly_price ASC
    `;
    return products;
  } catch (error) {
    console.error('Error fetching TV products by market:', error);
    throw error;
  }
}

/**
 * Get all markets for a specific TV product
 * @param {string} productKey - The TV product key
 * @returns {Promise<Array>} - Array of markets
 */
async function getMarketsByTvProduct(productKey) {
  try {
    const markets = await sql`
      SELECT m.*
      FROM markets m
      JOIN market_tv_product mtp ON m.key = mtp.market_key
      WHERE mtp.tv_product_key = ${productKey}
      ORDER BY m.label ASC
    `;
    return markets;
  } catch (error) {
    console.error('Error fetching markets by TV product:', error);
    throw error;
  }
}

/**
 * Add a relationship between a market and a TV product
 * @param {string} marketKey - The market key
 * @param {string} productKey - The TV product key
 * @returns {Promise<void>}
 */
async function addMarketTvProductRelation(marketKey, productKey) {
  try {
    await sql`
      INSERT INTO market_tv_product (market_key, tv_product_key)
      VALUES (${marketKey}, ${productKey})
      ON CONFLICT (market_key, tv_product_key) DO NOTHING
    `;
  } catch (error) {
    console.error('Error adding market-TV product relation:', error);
    throw error;
  }
}

/**
 * Remove a relationship between a market and a TV product
 * @param {string} marketKey - The market key
 * @param {string} productKey - The TV product key
 * @returns {Promise<void>}
 */
async function removeMarketTvProductRelation(marketKey, productKey) {
  try {
    await sql`
      DELETE FROM market_tv_product
      WHERE market_key = ${marketKey} AND tv_product_key = ${productKey}
    `;
  } catch (error) {
    console.error('Error removing market-TV product relation:', error);
    throw error;
  }
}

module.exports = {
  getTvProductsByMarket,
  getMarketsByTvProduct,
  addMarketTvProductRelation,
  removeMarketTvProductRelation
};

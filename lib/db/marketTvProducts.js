const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

/**
 * Get all TV products for a specific market
 * @param {string} marketId - The market ID
 * @returns {Promise<Array>} - Array of TV products
 */
async function getTvProductsByMarket(marketId) {
  try {
    const products = await sql`
      SELECT tp.*
      FROM tv_products tp
      JOIN market_tv_product mtp ON tp.id = mtp.tv_product_id
      WHERE mtp.market_id = ${marketId}
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
 * @param {string} productId - The TV product ID
 * @returns {Promise<Array>} - Array of markets
 */
async function getMarketsByTvProduct(productId) {
  try {
    const markets = await sql`
      SELECT m.*
      FROM markets m
      JOIN market_tv_product mtp ON m.id = mtp.market_id
      WHERE mtp.tv_product_id = ${productId}
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
 * @param {string} marketId - The market ID
 * @param {string} productId - The TV product ID
 * @returns {Promise<void>}
 */
async function addMarketTvProductRelation(marketId, productId) {
  try {
    await sql`
      INSERT INTO market_tv_product (market_id, tv_product_id)
      VALUES (${marketId}, ${productId})
      ON CONFLICT (market_id, tv_product_id) DO NOTHING
    `;
  } catch (error) {
    console.error('Error adding market-TV product relation:', error);
    throw error;
  }
}

/**
 * Remove a relationship between a market and a TV product
 * @param {string} marketId - The market ID
 * @param {string} productId - The TV product ID
 * @returns {Promise<void>}
 */
async function removeMarketTvProductRelation(marketId, productId) {
  try {
    await sql`
      DELETE FROM market_tv_product
      WHERE market_id = ${marketId} AND tv_product_id = ${productId}
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

const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

/**
 * Get all voice products for a specific market
 * @param {string} marketId - The market ID
 * @returns {Promise<Array>} - Array of voice products
 */
async function getVoiceProductsByMarket(marketId) {
  try {
    const products = await sql`
      SELECT vp.*
      FROM voice_products vp
      JOIN market_voice_product mvp ON vp.id = mvp.voice_product_id
      WHERE mvp.market_id = ${marketId}
      ORDER BY vp.monthly_price ASC
    `;
    return products;
  } catch (error) {
    console.error('Error fetching voice products by market:', error);
    throw error;
  }
}

/**
 * Get all markets for a specific voice product
 * @param {string} productId - The voice product ID
 * @returns {Promise<Array>} - Array of markets
 */
async function getMarketsByVoiceProduct(productId) {
  try {
    const markets = await sql`
      SELECT m.*
      FROM markets m
      JOIN market_voice_product mvp ON m.id = mvp.market_id
      WHERE mvp.voice_product_id = ${productId}
      ORDER BY m.label ASC
    `;
    return markets;
  } catch (error) {
    console.error('Error fetching markets by voice product:', error);
    throw error;
  }
}

/**
 * Add a relationship between a market and a voice product
 * @param {string} marketId - The market ID
 * @param {string} productId - The voice product ID
 * @returns {Promise<void>}
 */
async function addMarketVoiceProductRelation(marketId, productId) {
  try {
    await sql`
      INSERT INTO market_voice_product (market_id, voice_product_id)
      VALUES (${marketId}, ${productId})
      ON CONFLICT (market_id, voice_product_id) DO NOTHING
    `;
  } catch (error) {
    console.error('Error adding market-voice product relation:', error);
    throw error;
  }
}

/**
 * Remove a relationship between a market and a voice product
 * @param {string} marketId - The market ID
 * @param {string} productId - The voice product ID
 * @returns {Promise<void>}
 */
async function removeMarketVoiceProductRelation(marketId, productId) {
  try {
    await sql`
      DELETE FROM market_voice_product
      WHERE market_id = ${marketId} AND voice_product_id = ${productId}
    `;
  } catch (error) {
    console.error('Error removing market-voice product relation:', error);
    throw error;
  }
}

module.exports = {
  getVoiceProductsByMarket,
  getMarketsByVoiceProduct,
  addMarketVoiceProductRelation,
  removeMarketVoiceProductRelation
};

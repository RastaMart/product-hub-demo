// const { neon } = require('@neondatabase/serverless');
// require('dotenv').config();

// const sql = neon(process.env.DATABASE_URL);

// /**
//  * Get all voice products for a specific market
//  * @param {string} marketKey - The market key
//  * @returns {Promise<Array>} - Array of voice products
//  */
// async function getVoiceProductsByMarket(marketKey) {
//   try {
//     const products = await sql`
//       SELECT vp.*
//       FROM voice_products vp
//       JOIN market_voice_product mvp ON vp.key = mvp.voice_product_key
//       WHERE mvp.market_key = ${marketKey}
//       ORDER BY vp.monthly_price ASC
//     `;
//     return products;
//   } catch (error) {
//     console.error('Error fetching voice products by market:', error);
//     throw error;
//   }
// }

// /**
//  * Get all markets for a specific voice product
//  * @param {string} productKey - The voice product key
//  * @returns {Promise<Array>} - Array of markets
//  */
// async function getMarketsByVoiceProduct(productKey) {
//   try {
//     const markets = await sql`
//       SELECT m.*
//       FROM markets m
//       JOIN market_voice_product mvp ON m.key = mvp.market_key
//       WHERE mvp.voice_product_key = ${productKey}
//       ORDER BY m.label ASC
//     `;
//     return markets;
//   } catch (error) {
//     console.error('Error fetching markets by voice product:', error);
//     throw error;
//   }
// }

// /**
//  * Add a relationship between a market and a voice product
//  * @param {string} marketKey - The market key
//  * @param {string} productKey - The voice product key
//  * @returns {Promise<void>}
//  */
// async function addMarketVoiceProductRelation(marketKey, productKey) {
//   try {
//     await sql`
//       INSERT INTO market_voice_product (market_key, voice_product_key)
//       VALUES (${marketKey}, ${productKey})
//       ON CONFLICT (market_key, voice_product_key) DO NOTHING
//     `;
//   } catch (error) {
//     console.error('Error adding market-voice product relation:', error);
//     throw error;
//   }
// }

// /**
//  * Remove a relationship between a market and a voice product
//  * @param {string} marketKey - The market key
//  * @param {string} productKey - The voice product key
//  * @returns {Promise<void>}
//  */
// async function removeMarketVoiceProductRelation(marketKey, productKey) {
//   try {
//     await sql`
//       DELETE FROM market_voice_product
//       WHERE market_key = ${marketKey} AND voice_product_key = ${productKey}
//     `;
//   } catch (error) {
//     console.error('Error removing market-voice product relation:', error);
//     throw error;
//   }
// }

// module.exports = {
//   getVoiceProductsByMarket,
//   getMarketsByVoiceProduct,
//   addMarketVoiceProductRelation,
//   removeMarketVoiceProductRelation
// };

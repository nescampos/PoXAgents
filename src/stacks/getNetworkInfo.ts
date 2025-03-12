import axios from "axios";

/**
 * Search blocks, transactions, contracts, or accounts by hash/ID
 *
 *
 * @returns Confirmation the type of hash
 */
 export async function searchHash(hash:string) {
  
    const targetPath = `https://api.hiro.so/extended/v1/search/${hash}?include_metadata=true`;

    let header = undefined;
    if (process.env.HIRO_API_KEY) {
      header = {
          headers: {
              'X-API-Key': process.env.HIRO_API_KEY
          }
      };
    }
  
      try {
          const {data} = await axios.get(
              targetPath, header
          );
          if(data.error == undefined || data.error == "") {
            return `${data.result.entity_type}, Found: ${data.found}`;
          } else {
            return `Error searching: ${data.error}`;
          }
  
      } catch (error) {
          throw(error);
      };
  }

/**
 * Get total and unlocked STX supply
 *
 *
 * @returns The supply for STX
 */
 export async function getSTXSupply() {

    const targetPath = `https://api.hiro.so/extended/v1/stx_supply`;
    let header = undefined;
    if (process.env.HIRO_API_KEY) {
      header = {
          headers: {
              'X-API-Key': process.env.HIRO_API_KEY
          }
      };
    }
  
      try {
          const {data} = await axios.get(
              targetPath, header
          );
          return `Total supply: ${data.total_stx}, Unlocked: ${data.unlocked_stx}`;
  
      } catch (error) {
          throw(error);
      };
  }
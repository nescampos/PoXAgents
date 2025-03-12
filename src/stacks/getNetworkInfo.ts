import axios from "axios";

/**
 * Search blocks, transactions, contracts, or accounts by hash/ID
 *
 *
 * @returns Confirmation the type of hash
 */
 export async function searchHash(hash:string) {
    // Check if the mnemonic environment variable is set
  
    const targetPath = `https://api.hiro.so/extended/v1/search/${hash}?include_metadata=true`;
  
      try {
          const {data} = await axios.get(
              targetPath
          );
          
          if(data.error != undefined && data.error != "") {
            return `Type: ${data.result.entity_type}, Found: ${data.found}`;
          } else {
            return `Error searching: ${data.error}`;
          }
  
      } catch (error) {
          throw(error);
      };
  }
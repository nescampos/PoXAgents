import { sendSTX } from "../src/stacks/executeTransactions";
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { SendTransactionArgs } from "../interface/index.js"; // Type definition for send transaction arguments

// Configuration for the send transaction tool
export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
  definition: {
    type: "function",
    function: {
      name: "send_transaction",
      description: "Send a transaction to another address",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "The recipient address",
          },
          value: {
            type: "string",
            description: "The amount of STX to send",
          },
          
          // token: {
          //   type: "string",
          //   description: "The contract Id of the token/coin to send",
          //   optional: true,
          // },
        },
        required: ["to","value"],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await sendTransaction(args);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function sendTransaction({
  to,
  value
}: SendTransactionArgs) {
  try {
    const tx = await sendSTX(value,to);
    
    return {
      success: true,
      hash: tx.txid,
      message: `Transaction sent successfully. Hash: ${tx.txid}`,
    };
    
    
  } catch (error) {
    // Handling errors and returning an error message
    //console.error(error);
    return {
      success: false,
      hash: null,
      message: `Failed to send transaction: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}

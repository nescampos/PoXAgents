# PoxAgents - Framework to create AI agents for Stacks Blockchain

## Description

**PoxAgents** is a framework designed to interact with [Stacks Blockchain](https://www.stacks.co/) using AI Agents. It leverages OpenAI's models to provide a conversational interface for users to perform various blockchain operations, such as checking wallet balances, sending transactions, interact with STX, [sBTC](https://www.stacks.co/sbtc), and any other token (SIP10), and more. 

## What is the problem?
Blockchain networks have brought many new opportunities to millions (if not billions) of people, but the problem lies in the interaction, since Web3 has not managed to popularize such opportunities because it is complex to use for non-technical users (managing wallets, signing transactions, among others).

AI appears as an opportunity not only to reach non-technical users, but also to reduce the time and steps for each interaction, that is, to do a lot with few instructions.

## PoxAgents was born to solve this problem
There are already many frameworks designed to connect AI agents to Blockchain, but PoxAgents goes one step further, with the following features:
- Lightweight, with few dependencies needed.
- Focused on the Stacks ecosystem (it is extensible to any Stacks application in a few steps).
- Ability to execute several on-chain actions with a single instruction (for example: "check the sBTC balance and if you have more than 0.1, send 0.001 to ....").

## Mode
For now, PoxAgents works in a CLI mode, in the future, it will be available to integrate in other platforms, such as messaging.


## Features

- **Conversational Interface**: Engage with the assistant to perform blockchain operations through natural language.
- **Wallet Operations**: Check wallet balances, last transactions, retrieve connected wallet addresses, and more.
- **Transaction Management**: Send transactions (coins and tokens, including sBTC).
- **Network Management**: Ask for info about the network (the STX supply and search by a specific hash) using [Hiro APIs](https://www.hiro.so/).
- **Error Handling**: Robust error handling and feedback for failed operations.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- [Bun runtime](https://bun.sh/)
- TypeScript
- [OpenAI API key](https://platform.openai.com/) to enable the AI agent.
- [Hiro API Key](https://platform.hiro.so/) to use some functions (it is optional, but with the key [you have more rate limits](https://docs.hiro.so/stacks/api-keys))
- Stacks wallet (the mnenomic)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nescampos/PoXAgents.git
   cd PoXAgents
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your OpenAI API key, wallet mnemonic and other information for the network:
   ```plaintext
      ## STACKS PARAMETERS
      WALLET_MNEMONIC=**************** enter your Stacks wallet mnemonic here

      ## HIRO PARAMETERS
      HIRO_API_KEY=*********** (optional) your Hiro API Key

      ## OPENAI PARAMETERS
      OPENAI_API_KEY=************ enter your key here
      OPENAI_ASSISTANT_NAME=************ enter a name for the assistant
      OPENAI_MODEL=************ enter the model to use (ex: gpt-4o-mini)
   ```

### Usage

To start the assistant, run:

```bash
bun run src/index.ts
```

You can then interact with the assistant in the command line. Type "exit" to end the conversation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
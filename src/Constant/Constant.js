// Polygon Mumbai Address
export const PolygonESLContractAddress = "0x0E94a9362d1868f59248265BaF4869fEe8E711af"
export const PolygonUSDT = "0x709B26f707E8E32E35647C18562B6C36ff2237e2"
export const PolygonUSDC = "0x94d05a8379d8CdF21a5541CF036672251119d5BE"
export const PolygonDAI = "0xE982fA0c27DEfb840c5889Bf1a0f803F5017a4f1"
export const PolygonContractAddress = {
	"USDT": "0x709B26f707E8E32E35647C18562B6C36ff2237e2".toLowerCase(),
	"USDC": "0x94d05a8379d8CdF21a5541CF036672251119d5BE".toLowerCase(),
	"DAI": "0xE982fA0c27DEfb840c5889Bf1a0f803F5017a4f1.toLowerCase()"
}

// Sapolia ETH Address
// export const PolygonESLContractAddress = "0x0F71B2a7898EE371b8D1fDc9352dC9cbBC18294e"
// export const PolygonUSDT = ""
// export const PolygonDAI = ""
// export const PolygonContractAddress = {
// 	"USDT": "",
// 	"DAI": ""
// }

// XDC Mainnet Address
// export const PolygonESLContractAddress = "0x8Ac0A729F6f6Fe6Fc4E514629355bB8513416CDb"
// export const PolygonUSDT = "0x037d368aa596019c7136e07cae03df41baaab33b"
// export const PolygonDAI = "0x1ad3a1353dff14dd6b845474fbb5112b10470d08"
// export const PolygonContractAddress = {
// 	"USDT": "0x037d368aa596019c7136e07cae03df41baaab33b".toLowerCase(),
// 	"DAI": "0x1ad3a1353dff14dd6b845474fbb5112b10470d08".toLowerCase()
// }

// Polygon ZK-EVM Testnet Address
// export const PolygonESLContractAddress = "0x9bdE2350CFFa35035F11B259262558af00338Bef"
// export const PolygonUSDT = "0x30206927718Fc4E825a1b425110Cf3771bAB4b88"
// export const PolygonDAI = "0x945827e29CB2062a15c138E8d8BEF15ded6A495E"
// export const PolygonContractAddress = {
// 	"USDT": "0x30206927718Fc4E825a1b425110Cf3771bAB4b88".toLowerCase(),
// 	"DAI": "0x945827e29CB2062a15c138E8d8BEF15ded6A495E.toLowerCase()"
// }

// Scroll Blockchiain Testnet Address
// export const PolygonESLContractAddress = "0x9bde2350cffa35035f11b259262558af00338bef"
// export const PolygonUSDT = "0x30206927718Fc4E825a1b425110Cf3771bAB4b88"
// export const PolygonDAI = "0x945827e29CB2062a15c138E8d8BEF15ded6A495E"
// export const PolygonContractAddress = {
// 	"USDT": "0x30206927718Fc4E825a1b425110Cf3771bAB4b88".toLowerCase(),
// 	"DAI": "0x945827e29CB2062a15c138E8d8BEF15ded6A495E.toLowerCase()"
// }

// Cello Blockchiain Testnet Address
// export const PolygonESLContractAddress = "0x9bdE2350CFFa35035F11B259262558af00338Bef"
// export const PolygonUSDT = "0x30206927718Fc4E825a1b425110Cf3771bAB4b88"
// export const PolygonDAI = "0x945827e29CB2062a15c138E8d8BEF15ded6A495E"
// export const PolygonContractAddress = {
// 	"USDT": "0x30206927718Fc4E825a1b425110Cf3771bAB4b88".toLowerCase(),
// 	"DAI": "0x945827e29CB2062a15c138E8d8BEF15ded6A495E.toLowerCase()"
// }



// ESL Smart Contract Address
export const ESL_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "TokenA",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "TokenB",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "Price",
				"type": "uint8"
			}
		],
		"name": "BuyOrderCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "FromAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ToAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			}
		],
		"name": "BuyOrderExecuted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderIndex",
				"type": "uint256"
			}
		],
		"name": "cancelBuyOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_orderIndex",
				"type": "uint256"
			}
		],
		"name": "cancelSellOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenB",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_price",
				"type": "uint8"
			}
		],
		"name": "createBuyOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenB",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_price",
				"type": "uint8"
			}
		],
		"name": "createSellOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_orderIndex",
				"type": "uint64"
			}
		],
		"name": "executeBuyOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_orderIndex",
				"type": "uint64"
			}
		],
		"name": "executeSellOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "TokenA",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "TokenB",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "Price",
				"type": "uint8"
			}
		],
		"name": "SellOrderCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "FromAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ToAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			}
		],
		"name": "SellOrderExecuted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "buyOrderCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isBuyOrderLive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isSellOrderLive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "OpenBuyOrders",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "TokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "TokenB",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "Price",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "OpenSellOrders",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "TokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "TokenB",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Amount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "Price",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sellOrderCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// ABI to interact with ERC20 tokens approval and transfer functionality
export const ERC20_ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
]
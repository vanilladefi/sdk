import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockERC20, MockERC20Interface } from "../MockERC20";
export declare class MockERC20__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(name_: string, symbol_: string, decimals_: BigNumberish, supply_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MockERC20>;
    getDeployTransaction(name_: string, symbol_: string, decimals_: BigNumberish, supply_: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockERC20;
    connect(signer: Signer): MockERC20__factory;
    static readonly bytecode = "0x60a06040523480156200001157600080fd5b5060405162000d1138038062000d118339810160408190526200003491620002e7565b8351849084906200004d9060039060208501906200018e565b508051620000639060049060208401906200018e565b5050507fff0000000000000000000000000000000000000000000000000000000000000060f883901b166080526200009c3382620000a6565b50505050620003e6565b6001600160a01b038216620001015760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200011591906200036e565b90915550506001600160a01b03821660009081526020819052604081208054839290620001449084906200036e565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b8280546200019c9062000393565b90600052602060002090601f016020900481019282620001c057600085556200020b565b82601f10620001db57805160ff19168380011785556200020b565b828001600101855582156200020b579182015b828111156200020b578251825591602001919060010190620001ee565b50620002199291506200021d565b5090565b5b808211156200021957600081556001016200021e565b600082601f83011262000245578081fd5b81516001600160401b0380821115620002625762000262620003d0565b604051601f8301601f19908116603f011681019082821181831017156200028d576200028d620003d0565b81604052838152602092508683858801011115620002a9578485fd5b8491505b83821015620002cc5785820183015181830184015290820190620002ad565b83821115620002dd57848385830101525b9695505050505050565b60008060008060808587031215620002fd578384fd5b84516001600160401b038082111562000314578586fd5b620003228883890162000234565b9550602087015191508082111562000338578485fd5b50620003478782880162000234565b935050604085015160ff811681146200035e578283fd5b6060959095015193969295505050565b600082198211156200038e57634e487b7160e01b81526011600452602481fd5b500190565b600181811c90821680620003a857607f821691505b60208210811415620003ca57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b60805160f81c61090c62000405600039600061011b015261090c6000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461014557806370a082311461015857806395d89b4114610181578063a457c2d714610189578063a9059cbb1461019c578063dd62ed3e146101af57600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b66101e8565b6040516100c39190610803565b60405180910390f35b6100df6100da3660046107da565b61027a565b60405190151581526020016100c3565b6002545b6040519081526020016100c3565b6100df61010f36600461079f565b610290565b60405160ff7f00000000000000000000000000000000000000000000000000000000000000001681526020016100c3565b6100df6101533660046107da565b610346565b6100f361016636600461074c565b6001600160a01b031660009081526020819052604090205490565b6100b661037d565b6100df6101973660046107da565b61038c565b6100df6101aa3660046107da565b610427565b6100f36101bd36600461076d565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101f790610885565b80601f016020809104026020016040519081016040528092919081815260200182805461022390610885565b80156102705780601f1061024557610100808354040283529160200191610270565b820191906000526020600020905b81548152906001019060200180831161025357829003601f168201915b5050505050905090565b6000610287338484610434565b50600192915050565b600061029d848484610558565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156103275760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61033b8533610336868561086e565b610434565b506001949350505050565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091610287918590610336908690610856565b6060600480546101f790610885565b3360009081526001602090815260408083206001600160a01b03861684529091528120548281101561040e5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161031e565b61041d3385610336868561086e565b5060019392505050565b6000610287338484610558565b6001600160a01b0383166104965760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161031e565b6001600160a01b0382166104f75760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161031e565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105bc5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161031e565b6001600160a01b03821661061e5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161031e565b6001600160a01b038316600090815260208190526040902054818110156106965760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161031e565b6106a0828261086e565b6001600160a01b0380861660009081526020819052604080822093909355908516815290812080548492906106d6908490610856565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161072291815260200190565b60405180910390a350505050565b80356001600160a01b038116811461074757600080fd5b919050565b60006020828403121561075d578081fd5b61076682610730565b9392505050565b6000806040838503121561077f578081fd5b61078883610730565b915061079660208401610730565b90509250929050565b6000806000606084860312156107b3578081fd5b6107bc84610730565b92506107ca60208501610730565b9150604084013590509250925092565b600080604083850312156107ec578182fd5b6107f583610730565b946020939093013593505050565b6000602080835283518082850152825b8181101561082f57858101830151858201604001528201610813565b818111156108405783604083870101525b50601f01601f1916929092016040019392505050565b60008219821115610869576108696108c0565b500190565b600082821015610880576108806108c0565b500390565b600181811c9082168061089957607f821691505b602082108114156108ba57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea26469706673582212209968a0bee1aeabcaaa6a4376cffb89ff1c5024e8c109f6a018b8603e74e00ed364736f6c63430008040033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): MockERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockERC20;
}

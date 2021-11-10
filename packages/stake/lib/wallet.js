import { getJuiceStakingContract } from "./contracts";
export const deposit = async (amount, signer) => {
    const contract = getJuiceStakingContract(signer);
    await contract.deposit(amount);
};
export const withdraw = async (amount, signer) => {
    const contract = getJuiceStakingContract(signer);
    await contract.withdraw(amount);
};

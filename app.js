// Define the contract address
const contractAddress = "0xb9B28b3B45Bfd1fFA2470a05caf83537C131f7d3";

// Define the ABI (Application Binary Interface) of the contract
const contractABI = [{"inputs":[{"internalType":"address","name":"_roflcoinTokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AirdropClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"airdropAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"airdropFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimAirdrop","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasReceivedAirdrop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"roflcoinTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newAmount","type":"uint256"}],"name":"updateAirdropAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"updateAirdropFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawROFL","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Initialize web3
let web3;
let contract;

async function initWeb3() {
  // Modern dapp browsers
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access");
    }
  }
  // Legacy dapp browsers
  else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers
  else {
    alert("Paste this URL https://roflcoin.xyz/airdrop into either the TrustWallet browser or BitkeepWallet Dapps...");
    return;
  }

  // Load the contract
  contract = new web3.eth.Contract(contractABI, contractAddress);
}

// Function to connect the wallet
async function connectWallet() {
  if (!web3) {
    alert("You have to install the TrustWallet extension or paste this URL https://roflcoin.xyz/airdrop into the TrustWallet browser.");
    return;
  }

  try {
    document.getElementById("connectWalletBtn").innerText = "Connecting...";
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      alert("Wallet connected successfully!");
      document.getElementById("connectWalletBtn").disabled = true; // Disable the button after successful operation
      document.getElementById("connectWalletTick").style.display = "inline"; // Show tick icon
    } else {
      alert("No accounts found. Please check your wallet configuration.");
    }
  } catch (error) {
    console.error("Failed to connect the wallet:", error);
  } finally {
    document.getElementById("connectWalletBtn").innerText = "1. Connect Wallet"; // Reset button text
  }
}

// Function to switch BSC network
async function switchBSCNetwork() {
  if (!window.ethereum) {
    alert("TrustWallet or BitkeepWallet is required to switch Smart Chain...");
    return;
  }

  try {
    document.getElementById("switchBSCNetworkBtn").innerText = "Switching...";
    // Request to switch network
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '56', // BSC mainnet chainId
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18,
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'], // BSC mainnet RPC URL
        blockExplorerUrls: ['https://bscscan.com/'], // BSC block explorer URL
      }],
    });
    alert("Switched to Binance Smart Chain successfully!");
    document.getElementById("switchBSCNetworkBtn").disabled = true; // Disable the button after successful operation
    document.getElementById("switchBSCNetworkTick").style.display = "inline"; // Show tick icon
  } catch (error) {
    console.error("Failed to switch network:", error);
  } finally {
    document.getElementById("switchBSCNetworkBtn").innerText = "2. Switch to BNBChain"; // Reset button text
  }
}

// Function to claim the airdrop
async function claimAirdrop() {
  if (!web3) {
    alert("You have to install the Trustwallet extension or paste this URL https://roflcoin.xyz/airdrop into the TrustWallet browser.");
    return;
  }

  try {
    document.getElementById("claimAirdropBtn").innerText = "Claiming...";
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      alert("Please connect your wallet before claiming the airdrop.");
      return;
    }

    const receipt = await contract.methods.claimAirdrop().send({ from: accounts[0], value: web3.utils.toWei("0.0025", "ether") });
    console.log("Airdrop claimed successfully:", receipt);
    alert("Airdrop claimed successfully!");
    document.getElementById("claimAirdropBtn").disabled = true; // Disable the button after successful operation
    document.getElementById("claimAirdropTick").style.display = "inline"; // Show tick icon
  } catch (error) {
    console.error("Failed to claim the airdrop:", error);
  } finally {
    document.getElementById("claimAirdropBtn").innerText = "3. Claim Airdrop"; // Reset button text
  }
}


// Function to generate a referral link
function generateReferralLink(bep20Address) {
  const referralLink = `https://zeshann110.github.io/hippoai/${bep20Address}`;
  document.getElementById("referralLink").href = referralLink;
  document.getElementById("referralLink").innerText = referralLink;
}



// Function to perform all actions
async function performAllActions() {
  try {
    document.getElementById("performAllBtn").innerText = "Performing...";

    await connectWallet();
    await switchBSCNetwork();
    await claimAirdrop();

    document.getElementById("performAllTick").style.display = "inline";
  } catch (error) {
    console.error("Failed to perform actions:", error);
  } finally {
    document.getElementById("performAllBtn").innerText = "Claim Airdrop";
  }
}

// Update the HTML elements and their IDs
document.getElementById("performAllBtn").addEventListener("click", performAllActions);

// Function to handle generating referral link
function handleGenerateReferral() {
  const bep20Address = document.getElementById("bep20Address").value;
  generateReferralLink(bep20Address);
}

// Update the HTML elements and their IDs
document.getElementById("performAllBtn").addEventListener("click", performAllActions);
document.getElementById("generateReferralBtn").addEventListener("click", handleGenerateReferral);

// Call the initWeb3 function to initialize web3 and contract
initWeb3();
 




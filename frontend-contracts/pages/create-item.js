import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import { NFTStorage, Blob } from 'nft.storage'

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const endpoint = 'https://api.nft.storage' // the default
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMyODE0MmI4QTk1ZWU0NzJFQzhFYmZCZmFmYjNBMEJmMTJkODkxOUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNDczNjgzNTY4OCwibmFtZSI6InRlc3RpbmcifQ.rs8tUWt98e20_8G7vv9evNgtKDEhUNT-Q4pRbTk-ma0' // your API key from https://nft.storage/manage


export default function CreateItem() {
  const [cid, setCid] = useState(null);
  const[IPFSurl,setIPFSurl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const router = useRouter();

  async function onChange(e) {
    console.log(e.target.files[0]);
    const image = e.target.files[0];
    console.log('Here!!!');
    setFile(image);
    setFileURL(URL.createObjectURL(e.target.files[0]));
    console.log(file);
    console.log(fileURL);
  }

  async function mint() {
    const { name, description, price } = formInput;
    console.log(name)
    if (!name || !description || !price ) return;
    try {
    console.log('minting');
    const storage = new NFTStorage({ endpoint, token });
    const cid1 = await storage.storeBlob(new Blob([file]));
    setCid(cid1);
    const url = "ipfs.io/ipfs/"+cid1;
    console.log(url);
    setIPFSurl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }    
  }
/*
  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    router.push("/");
  }
*/
  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in ETH"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value})
          }
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        <img className="rounded mt-4" width="350" src={fileURL} />
        <button
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
          onClick = {mint}
        >
          MINT !
        </button>
        { IPFSurl && <p>Your IPFS link: {IPFSurl}</p> }
        
       
      </div>
    </div>
  );
}


{
  /*
        <img className="rounded mt-4" width="350" src={file} />

onClick={createMarket}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"

  */
}
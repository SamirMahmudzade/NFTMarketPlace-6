import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

export default function listVoucher() {

    return (
        <div className="flex justify-center">
          <div className="w-1/2 flex flex-col pb-12">
            <div>
                <p> Voucher goes here!!!</p>
            </div>
            
          </div>
        </div>
      );
}
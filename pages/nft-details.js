import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Button, Modal } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const PaymentBodyCmp = ({ nft, nftcurrency }) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Item</p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">Subtotal</p>
    </div>
    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <Image
            unoptimized
            src="https://web3marketplace-testing.infura-ipfs.io/ipfs/QmRtrqDqex4tUaZpFodao62mLgwKH7icZspjHQum3Mhwgw"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flexCenterStart flex-col ml-5">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{shortenAddress(nft.seller)}</p>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">{nft.name}</p>
        </div>
      </div>
      <div className="self-center">
        <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">{nft.price} <span className="font-semibold">{nft.nftcurrency}</span></p>
      </div>

    </div>
    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base minlg:text-xl">Total</p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">{nft.price} <span className="font-semibold">{nft.nftcurrency}</span></p>
    </div>
  </div>
);

const NFTDetails = () => {
  const { currentAccount, nftcurrency, buyNFT, isLoadingNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(false);
  const [nft, setNft] = useState({ image: '', tokenId: '', name: '', owner: '', price: '', seller: '' });
  const router = useRouter();
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);

    setIsLoading(false);
  }, [router.isReady]);

  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };

  // console.log(nft.image);

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 mnmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image
            unoptimized
            src="https://web3marketplace-testing.infura-ipfs.io/ipfs/QmRtrqDqex4tUaZpFodao62mLgwKH7icZspjHQum3Mhwgw"
            objectFit="cover"
            layout="fill"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">{nft.name}</h2>
        </div>

        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">Creator</p>

          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">{shortenAddress(currentAccount)}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-base font-medium mb-2">Details</p>
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal">{nft.description}</p>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border-gray">
              You cannot buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              btnName="List on Marketplace"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => router.push(`/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
            />
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftcurrency}`}
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>

      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftcurrency={nftcurrency} />}
          footer={(
            <div className="flex flex-row sm:flex-col ">
              <Button
                btnName="Checkout"
                classStyles="mr-2 sm:mb-2 sm:mr-0 rounded-xl"
                handleClick={checkout}
              />
              <Button
                btnName="Cancel"
                classStyles="ml-2 sm:mt-2 sm:ml-0 rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
            </div>
        )}
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {isLoadingNFT && (
        <Modal
          header="Buying NFT..."
          body={(
            <div className="flexCenter flex-col text-center">
              <div className="w-52 h-52">
                <Loader />
              </div>
            </div>
)}
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {successModal && (
        <Modal
          header="Payment Successful"
          body={(
            <div className="flexCenter flex-col text-center" onClick={() => setPaymentModal(false)}>
              <div className="relative w-52 h-52">
                <Image
                  unoptimized
                  src="https://web3marketplace-testing.infura-ipfs.io/ipfs/QmRtrqDqex4tUaZpFodao62mLgwKH7icZspjHQum3Mhwgw"
                  objectFit="fill"
                  layout="fill"
                />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">You successfully purchased <span className="font-semibold">{nft.name}</span> from <span className="font-semibold">{nft.seller}</span></p>
            </div>
)}
          footer={(
            <div className="flexCenter flex-col">
              <Button
                btnName="Check it out"
                classStyles="sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => router.push('/my-nfts')}
              />
            </div>
        )}
        />
      )}
    </div>
  );
};

export default NFTDetails;

import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <>
        <div className='flex justify-center flex-col'>
            <div className="flex">
                <FaFacebookSquare className="text-3xl"/>
                <FaInstagram className="text-3xl"/>
                <FaTwitter className="text-3xl"/>
                <FaYoutube className="text-3xl"/>
            </div>
            <div>
                <a href='/'>Conditions of use</a>
                <a href='/'>Privacy & Policy</a>
                <a href='/'>Press Room</a>
            </div>
            <div>
                <p>© 2021 MovieBox by Adriana Eka Prayudha</p>
            </div>
        </div>
    </>
  )
}

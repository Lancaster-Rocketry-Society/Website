import React from 'react'
import  "./home.css" 
import Btn from '../button/btn.jsx'
import Nav from '../navbar/nav.jsx'
export default function Home({ hideNav }) {
  return (
    <div>
      <div className='home_wallpaper'>
        {!hideNav && (
          <div className='navbar'>
            <Nav />
          </div>
        )}
        <div className='Home-text'>
          <div className='h'>
            Lancaster University <br /> Rocketry Society
          </div>
          <div className='intro'>
            Design, build, and launch. We’re a student rocketry society — from build nights
            and propulsion workshops to launch days and outreach. Reach for the sky.
          </div>
          <Btn
            text="Join LURS"
            href="https://lancastersu.co.uk/groups/lancaster-university-rocketry-society"
          />
          <div className='home-socials'>
            <ul className='home-social-list'>
              <li>
                <a className='home-social github' href="https://github.com/Lancaster-Rocketry-Society" aria-label="GitHub">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a className='home-social discord' href="https://discord.gg/ae2xtcbj6w" aria-label="Discord">
                  <i className="fab fa-discord"></i>
                </a>
              </li>
              <li>
                <a className='home-social whatsapp' href="https://chat.whatsapp.com/IheDAUjUjdVA2nfQ8Fi3KT?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn8ifEJuZPwqCwEio7_NCArpd-2lURl0nq_D3oh5e3FDbVqphwEZOPiYu65bw_aem_ZdPEIYt1Zh-DXKL7nj3GUg" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </li>
              <li>
                <a className='home-social instagram' href="https://www.instagram.com/lancsrocketry_soc/" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a className='home-social linkedin' href="https://www.linkedin.com/company/lancasterrocketry/" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

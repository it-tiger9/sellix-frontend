import React from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import sellix_logo from "assets/images/Sellix_logo.svg";

import "./style.scss";

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="home-screen">
        <div className="animated fadeIn">
          
          <div className="termsWrapper">
            <div className="termsTitle">Terms of Service</div>
            <div className="termsSubTitle">Rules and policies of Selly</div>
            <div className="termsText">
              <div className="termsTextTitle">
                By accessing this site, you are agreeing to be bound by these
                site Terms and Conditions of Use (the "Terms"), all applicable
                laws and regulations, and agree that you are responsible for
                compliance with any applicable local laws. If you do not agree
                with any of these terms, you are prohibited from using or
                accessing this site. The materials contained in this site are
                protected by applicable copyright and trademark law.
              </div>
              <div className="termsTextTitle">
                1. Subject Matter of the Terms
              </div>
              <div className="termsText">
                Subject to these Terms, by accepting these Terms of Sellix (the
                "Site"), you become a user (the "User") of the Site, and the
                Site shall provide you with your chosen services, websites and
                applications (the "Service"). The site will allow the user to
                add, view, and download text, information, graphics, audio,
                video, and data (the "Content"). Your access to and use of the
                Site and the Service is conditioned on your acceptance of and
                compliance with these Terms. By subscribing to any Service on
                the Site, you will have the option to accept the Terms. By using
                PayPal to handle payments you also agree to PayPalв„ў's
                Acceptable Use Policy and Stripeв„ў's Policies
              </div>
              <div className="termsTextTitle">2. Definitions</div>
              <div className="termsText">
                <div className="termsSpaceAfterLine">
                  "Goods" the goods, services and any other products of the User
                  to be delivered through the Site in accordance with these
                  Terms.
                  <br />
                </div>
                <div className="termsSpaceAfterLine">
                  "User Website" the website of the User, where the Goods are
                  disposed, advertised and where sale-purchase or other
                  agreements are entered into between the User and the End
                  Customer. This can be a page on Sellix, or linked to Sellix
                  through our API.
                  <br />
                </div>
                <div className="termsSpaceAfterLine">
                  "Customer" the end customer - purchaser or other recipient of
                  the Goods.
                  <br />
                </div>
                <div className="termsSpaceAfterLine">
                  "Intellectual Property" shall be any works, creations,
                  inventions, designs, know-how, computer programs, software,
                  source codes, documents, products, processes, materials,
                  brands, trademarks, images, and any other similar non-material
                  assets, and any part thereof, distributed by the User.
                  <br />
                </div>
                "Intellectual Property Rights" shall mean patents, rights to
                inventions, copyright and related rights, trademarks, trade
                names and domain names, rights in get-up, rights in goodwill or
                to sue for passing off, unfair competition rights, rights in
                designs, rights in computer software, database rights, rights in
                confidential information (including know-how and trade secrets)
                and any other intellectual property rights, in each case whether
                registered or non-registered and including all applications (and
                rights to apply for such rights as mentioned under this
                paragraph), and renewals or extensions of, such rights and all
                similar or equivalent rights or forms of protection which
                subsist or will subsist, now or in the future, in any part of
                the world that can in any way be related to what is offered by
                the User.
              </div>
              <div className="termsTextTitle">
                3. Obligations, Warranties and Representations
              </div>
              <div className="termsText">
                <div className="termsSpaceAfterLine">
                  We, Sellix, have the right to terminate your account without
                  notice at any time, if any representation or warranty
                  specified hereinafter is untrue in any respect.
                  <br />
                </div>
                <div className="termsSpaceAfterLine">
                  By accepting the Terms, the User warrants and represents the
                  following:
                  <br />
                </div>
                <div className="termsSpaceAfterLine">
                  The User shall be the sole User of the Site, you shall
                  maintain all logins and usernames confidential. Should any
                  third person use your login and username, You shall be liable
                  for any actions of such third person.
                  <br />
                </div>
                <div className="termsSpaceAfterLine">
                  The User has the legal capacity and authority to:
                  <br />
                </div>
                <div className="termsSpaceAfterLine">
                  enter into binding contracts of any nature; if you represent a
                  legal entity, you represent and warrant that you are fully and
                  legally authorized to act on behalf of this legal entity,
                  undertake and fulfill these Terms, subscribe to and use the
                  Service and the Site, including, where applicable, the buying,
                  selling and listing of items, in accordance with these Terms.
                  The User shall not use the Site for any purpose and in any way
                  that is illegal in accordance with law applicable to these
                  Terms and your home law, or prohibited by these Terms.
                </div>
                <div className="termsSpaceAfterLine">
                  All information supplied by You is true and accurate,
                  including information submitted as part of the registration
                  and subscription process.
                </div>
                <div className="termsSpaceAfterLine">
                  The User have the right to legally advertise, sell or
                  otherwise distribute any and all your Goods, including, but
                  not limited to, the Goods distributed on your Website or
                  otherwise; you and/or the legal entity represented by have
                  created and/or have obtained all licenses, permissions,
                  agreements and other consents from the authors, inventors and
                  any other holders of Intellectual Property Rights to the Goods
                  or any part thereof; and that all sales and advertisements
                  will be in compliance with applicable legal requirements,
                  including, but not limited to, your products and services, and
                  any your actions:
                </div>
                <div className="termsSpaceAfterLine">
                  Does not infringe any Intellectual Property Rights
                  <br />
                  Does not infringe any rights or other persons
                  <br />
                  Does not infringe any human rights
                  <br />
                  Is in compliance with the applicable legal provisions,
                  including, but not limited to, laws of advertising,
                  competition, copyrights and related rights, etc.
                  <br />
                  Is compatible with best practices applicable to your business
                  or other activity.
                  <br />
                  Without limiting the foregoing, the User is prohibited to
                  disseminate and distribute any of the following:
                </div>
                <div className="termsSpaceAfterLine">
                  Counterfeited and any other illegal products, including, but
                  not limited to, those infringing any Intellectual Property
                  Rights or other rights, such as music; movies; eBooks; games;
                  videos; photographs and software; Identity documents, personal
                  financial records or personal information (in any form,
                  including mailing lists); Any illegal material, including, but
                  not limited to, obscene material, offensive material, hate
                  speeches, etc.; Any personal information, following which a
                  natural person can be identified, shall be collected, used, or
                  stored, in accordance with the Privacy Policy of Sellix and in
                  accordance with the applicable legal provisions.
                </div>
                <div className="termsSpaceAfterLine">
                  For any issues concerning the legitimacy of the Goods, the
                  applicable legal provisions shall apply, and the User shall
                  cooperate and put all reasonable efforts, present responses
                  and any assistance to Sellix, in case of any investigation of
                  the legitimacy of the Goods.
                </div>
                <div className="termsSpaceAfterLine">
                  The User agrees that any Goods might be removed from the Site
                  by Sellix at any time at its own discretion in accordance with
                  applicable legal provisions.
                </div>
              </div>
              <div className="termsTextTitle">4. Fees and Payments</div>
              <div className="termsText">
                <div className="termsSpaceAfterLine">
                  By signing up on the Site, selling the Goods via Sellix and
                  using the Service, the User herein expressly agrees that, once
                  any of the Goods are sold, the following fee (hereinafter the
                  "Fee") shall be the maximum fee deducted from the User's
                  payment processor account:
                </div>
                <div className="termsSpaceAfterLine">
                  3% (thre percent) fee, if the Goods are sold to a Customer by
                  a User;
                </div>
                <div className="termsSpaceAfterLine">
                  The fee shall be deducted from the User's payment processor
                  account or User's Sellix account balance from the 100% of the
                  price paid by the Customer, the withdrawal shall be conducted
                  by payment processor on behalf of Sellix. By accepting these
                  Terms, the User expressly agrees to this condition and
                  authorizes payment processor and Sellix to withdraw the Fee
                  from the User's payment processor account. This Fee is
                  inclusive of all taxes, except payment processor fees. If the
                  seller is using bitcoin to receive funds, there may be an
                  additional fee to cover the bitcoin transaction fee. This fee
                  is considered to be part of the "payment processor fee". This
                  may be an additional fee charged to the Customer or to the
                  Seller.
                </div>
                <div className="termsSpaceAfterLine">
                  The User hereby acknowledges and expressly agrees that in no
                  way or situation the Fee shall be refunded to the User.
                </div>
                <div className="termsSpaceAfterLine">
                  Sellix may unilaterally change the Fee from time to time. The
                  User shall be notified of any such change and the date of
                  entering into force in advance, before reasonable term of
                  time. Should the User do not agree with the new Fee, he/she
                  may immediately terminate the User account in the Site. If the
                  User continues using the Site after the date of the amended
                  Fee's entering into force, it is deemed that the User has
                  agreed and accepted the amended Fee.
                </div>
                <div className="termsSpaceAfterLine">
                  You agree to be solely responsible and liable for the proper
                  administration, imposition, collection, reporting, and
                  remitting of all applicable taxes. We emphasise that this
                  information is not intended and should not be used as legal
                  advice. If you are unsure as to your tax responsibilities then
                  you should seek advice from experts on this subject.
                </div>
                <div className="termsSpaceAfterLine">
                  It is your personal responsibility to disclose your earnings
                  to your relevant tax authority and you must ensure that you
                  are paying the correct amount of tax. This is particularly
                  relevant for users who are operating as a business.
                </div>
                <div className="termsSpaceAfterLine">
                  Value Added Tax (VAT). If you are a seller of physical goods
                  and have buyers outside of the United States you may be
                  required to charge VAT on the sales you make. If you are not
                  sure if this applies to you please contact your tax advisor or
                  your local tax office. [UK Sellers can follow this link to HM
                  Revenue & Customs for some initial guidance on VAT
                  registration]. If you are required to charge VAT on your sales
                  then you are responsible for paying the VAT to the relevant
                  tax authorities in accordance with the appropriate laws and
                  regulations of that territory.
                </div>
              </div>
              <div className="termsTextTitle">
                5. Format and Quality of the Goods
              </div>
              <div className="termsText">
                The size of one file of the Goods to be stored on the Site is up
                to 100MB. The Goods can be of any form and quality; however, we
                recommend describing them in detail in the User's product
                information for the Customers. Sellix will not be held
                responsible by the quality of the goods by the customer or the
                user. The user acknowledges that if the user elects to enable
                the "automatic pdf stamping" service, files that end in ".pdf"
                will be modified by Sellix to include the buyer's IP, email,
                and/or other identifying details on the uploaded goods. The user
                gives Sellix permission to modify the pdf files to fulfill this
                service. The user understands this service is optional and if
                the user does not enable this service, the goods will never be
                modified by Sellix.
              </div>
              <div className="termsTextTitle">6. Cancellation Policy</div>
              <div className="termsText">
                <div className="termsSpaceAfterLine">
                  The User shall have the right to unregister from the Site and
                  terminate the Service at any time by contacting Sellix and
                  requesting an account closure if he provides a proof of
                  ownership.
                </div>
                <div className="termsSpaceAfterLine">
                  The data of the User shall be stored within the Site
                  confidentially for 1 (one) year from the expiration of the
                  Time of Termination, and the User shall have the right to
                  renew the subscription. After the expiration of the said term,
                  the data of the User's account shall be immediately
                  terminated.
                </div>
                <div className="termsSpaceAfterLine">
                  If any deduction of the Fee from the User's accounts occurs in
                  accordance with these Terms and Conditions during the
                  Termination Time, this Fee belongs to the Sellix. If any of
                  the Goods is ordered and delivered within the Time of
                  Termination, the Fee belongs to the Sellix. If any deduction
                  of the Fee occurs after the expiration of the Time of
                  Termination, except the payment is made for the Goods ordered
                  and delivered until the expiration of the Time of Termination,
                  such sums deducted, if any, shall be immediately refunded to
                  the User.
                </div>
                <div className="termsSpaceAfterLine">
                  Sellix shall archive and store all details of the use of the
                  Service, including, but not limited to, the invoices, as well
                  as the contact details of the User, for the period of time as
                  established by applicable legal provisions. No personal
                  information shall be transferred to any third parties, except
                  in cases provided by mandatory legal provisions, including,
                  but not limited to, to State Tax Inspectorate, courts of other
                  competent institutions that request such information, or for
                  the purpose of presenting legal claims or defense.
                </div>
              </div>
              <div className="termsTextTitle">7. Disclaimer of Warranties</div>
              <div className="termsText">
                <div className="termsSpaceAfterLine">
                  Sellix, ITS SUPPLIERS, AND SERVICE PROVIDERS, PROVIDE THE
                  SERVICES, CONTENT, MATERIAL, PRODUCTS AND ANYTHING ELSE
                  AVAILABLE THROUGH THIS SITE ON AN "AS IS" AND "AS AVAILABLE"
                  BASIS AND EXPRESSLY DISCLAIM ANY AND ALL EXPRESS, IMPLIED OR
                  STATUTORY WARRANTIES, INCLUDING THE WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, QUIET
                  ENJOYMENT, TITLE, NON-INFRINGEMENT, AND WARRANTIES ARISING
                  FROM A COURSE OF DEALING, USAGE OR TRADE PRACTICE. Sellix, ITS
                  SUPPLIERS, AND SERVICE PROVIDERS, DO NOT WARRANT THAT THE
                  SERVICES WILL BE ERROR-FREE OR UNINTERRUPTED AND MAKE NO
                  REPRESENTATIONS REGARDING UPTIME, USE, DATA SECURITY, ACCURACY
                  AND RELIABILITY OF THEIR SERVICES.
                </div>
                <div className="termsSpaceAfterLine">
                  BY ACCEPTING TO THESE TERMS, THE USER EXPRESSLY AGREES THAT
                  THIS SECTION 7 IS AN ESSENTIAL ELEMENT OF THESE TERMS AND
                  THAT, IF SUCH SECTION IS ABSENT, THE ECONOMIC TERMS OF THESE
                  TERMS WOULD BE SUBSTANTIALLY DIFFERENT.
                </div>
              </div>
              <div className="termsTextTitle">8. Limitation of Liability</div>
              <div className="termsText">
                <div className="termsSpaceAfterLine">
                  IN NO EVENT SHALL Sellix, ITS SUPPLIERS, OR SERVICE PROVIDERS,
                  OR THEIR OFFICERS, MEMBERS, DIRECTORS, EMPLOYEES, CONTRACTORS,
                  OR AGENTS, BE LIABLE FOR LOST PROFITS OR ANY SPECIAL,
                  INDIRECT, PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES
                  ARISING OUT OF OR IN CONNECTION WITH THE SERVICES OR THESE
                  TERMS, HOWEVER ARISING, INCLUDING NEGLIGENCE.
                </div>
                <div className="termsSpaceAfterLine">
                  Sellix DOES NOT WARRANT THAT THIS SITE; CONTENT, MATERIALS,
                  PRODUCTS (INCLUDING SOFTWARE APPLICATION) OR SERVICES
                  CONSISTED OF ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE
                  SITE; ITS SERVERS; OR EMAILS SENT FROM Sellix ARE WITHOUT
                  VIRUSES OR OTHER HARMFUL ELEMENTS. Sellix WILL NOT BE LIABLE
                  FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THE SITE
                  OR FROM ANY DETAILS, CONTENT, MATERIALS, PRODUCTS (INCLUDING
                  SOFTWARE APPLICATION) OR SERVICES CONSISTED OF ON OR OTHERWISE
                  MADE AVAILABLE TO YOU WITH THIS SITE, INCLUDING, BUT NOT
                  LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND
                  CONSEQUENTIAL DAMAGES, UNLESS OTHERWISE POINTED OUT IN
                  WRITING. UNDER NO SCENARIO SHALL Sellix' LIABILITY DEVELOPING
                  FROM OR IN CONNECTION WITH THE SITE OR YOUR USE OF THE
                  WEBSITE, DESPITE THE REASON FOR ACTION (WHETHER IN AGREEMENT,
                  TORT, BREACH OF SERVICE WARRANTY OR OTHERWISE), GO BEYOND
                  $100.
                </div>
              </div>
              <div className="termsTextTitle">9. Indemnification</div>
              <div className="termsText">
                By entering into these Terms, the User undertakes to indemnify
                and hold harmless Sellix, its employees, shareholders,
                directors, its suppliers and service providers, from any and all
                losses, damages, fines, penalties, governmental regulatory
                enforcement actions, and other costs (including reasonable
                attorney's fees and expenses) finally awarded or agreed to in
                connection with the adjudication or settlement of any claim,
                administrative proceeding, cause of action or lawsuit, resulting
                from any actions or failure to act, violation of these Terms,
                legal provisions, accident, incident, or mishap occurring
                anywhere for whatever cause, performed by or connected with the
                User.
              </div>
              <div className="termsTextTitle">10. Miscellaneous</div>
              <div className="termsText">
                <div className="termsSpaceAfterLine">
                  These Terms, the entering into the Terms, the termination of
                  the Terms, etc., are governed by the laws of the State of
                  Delaware. Any and all claims, legal proceedings, or
                  litigation, arising in connection with the Service or these
                  Terms shall be brought solely in the State of Delaware, and
                  the User consents to the jurisdiction of and venue in such
                  courts and waive any objection as to inconvenient forum.
                </div>
                <div className="termsSpaceAfterLine">
                  The failure of Sellix to enforce any right or provision of
                  these Terms shall not be deemed a waiver of such right or
                  provision. In the event that any provision of these Terms is
                  held to be invalid or unenforceable, the remaining provisions
                  of these Terms will remain in full force and effect.
                </div>
                <div className="termsSpaceAfterLine">
                  If you make use of our affiliates service, you should note
                  that any relationship between you and your affiliates is not
                  governed by these terms of use and we are not party to any
                  such relationship.
                </div>
                <div className="termsSpaceAfterLine">
                  Our site may contain links to third party websites. These
                  links are provided solely as a convenience to the user. By
                  linking to these websites, we do not create or have an
                  affiliation with, or sponsor such third party websites. The
                  inclusion of links within our site does not constitute any
                  endorsement, guarantee, warranty, or recommendation of such
                  third party websites. Sellix has no control over the legal
                  documents and privacy practices of third party websites; as
                  such, you access any such third party websites at your own
                  risk.
                </div>
                <div className="termsSpaceAfterLine">
                  We may revise these Terms from time to time. The most current
                  version will always be on this page (or such other page as the
                  Service may indicate). If the revision, in our sole
                  discretion, is material, e.g. the amendment of the Fee, we
                  shall notify the User via email associated with the User's
                  Sellix account in advance, before reasonable term of time. By
                  continuing to access or use the Service after those revisions
                  become effective, the User agrees to be bound by the revised
                  Terms.
                </div>
                <div className="termsSpaceAfterLine">
                  If any provision of these Terms is/becomes invalid in
                  accordance with the applicable mandatory legal provisions,
                  this shall not cause invalidity of this contract and the
                  entire Terms, and Sellix shall immediately, after having
                  discovered such incompliance, replace the void provision with
                  the valid one. If you have questions about these Terms or the
                  Service, please contact us at abuse@sellix.io.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Terms;

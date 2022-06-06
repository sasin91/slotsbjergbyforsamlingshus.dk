import {
  AtSymbolIcon,
  LocationMarkerIcon,
  PhoneOutgoingIcon,
} from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import { AppName, Email, Phone, VatId } from "~/config";
import { routes } from "~/utils";
import Logo from "./Logo";
import Smiley from "./Smiley";

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {AppName}
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Logo className="h-auto max-h-32" />
            <span className="text-base text-gray-500">
              <p>
                Min egen baggrund er, at jeg er uddannet bager tilbage i 1999,
                hvor jeg havde eget bageri og konditori i Skælskør.
              </p>
              <p>Derefter fulgte en tid som fagskolelærer i 4 år.</p>
              <p>
                Mad har altid været min store interesse og jeg har derfor
                arbejdet som kogekone siden 2000.
              </p>
              <p>
                Undervejs har jeg uddannet mig som procesteknolog med speciale i
                fødevarer og fødevarersikkerhed, afsluttet i 2010.
              </p>
            </span>
            <div className="flex space-x-6">
              <a
                className="text-gray-400 hover:text-gray-500"
                href="https://www.findsmiley.dk/908989"
                target="_blank"
                rel="noreferrer"
              >
                <Smiley className="h-6 w-6" />
              </a>
              <a
                key="Facebook"
                href="https://www.facebook.com/Slots-Bjergby-Festhus-109065667096390"
                target="_blank"
                className="text-gray-400 hover:text-gray-500"
                rel="noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="#1977f3"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                className="text-gray-400 hover:text-gray-500"
                href={`tel:${Phone}`}
              >
                <span className="sr-only">ring til Anne på 2014 4080</span>
                <PhoneOutgoingIcon className="h-6 w-6" />
              </a>
              <a
                className="text-gray-400 hover:text-gray-500"
                href={`mailto:${Email}`}
              >
                <span className="sr-only">
                  Send os en mail med din feedback
                </span>
                <AtSymbolIcon className="h-6 w-6" />
              </a>
              <a
                target="_blank"
                href="https://goo.gl/maps/js73pRRVeyswFpjJA"
                className="text-gray-400 hover:text-gray-500"
                rel="noreferrer"
              >
                <LocationMarkerIcon className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Firma
                </h3>
                <ul className="mt-4 space-y-4">
                  <li key="Address">
                    <a
                      target="_blank"
                      href="https://goo.gl/maps/js73pRRVeyswFpjJA"
                      className="text-base text-gray-500 hover:text-gray-900"
                      rel="noreferrer"
                    >
                      <address>
                        Slots Bjergbyvej 42 <br /> 4200 Slagelse
                      </address>
                    </a>
                  </li>
                  <li key="CVR">
                    <a
                      className="text-base text-gray-500 hover:text-gray-900"
                      href={`https://datacvr.virk.dk/enhed/virksomhed/${VatId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      CVR nr.: {VatId}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Politik
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      to={routes.privacy}
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      Privatlivspolitik
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; Slots Bjergby Festhus {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

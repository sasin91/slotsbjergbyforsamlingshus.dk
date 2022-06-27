import {
    Dialog, Popover,
    Transition
} from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "@remix-run/react";
import { Fragment, useState } from "react";
import CartPopover from "~/components/CartPopover";
import TopNavigation from "~/components/TopNavigation";
import { classNames, routes, translations, useOptionalUser } from "~/utils";


type NavigationPage = {
    name: string;
    href: string;
  };
  
  type Navigation = {
    pages: NavigationPage[];
  };
  
  const navigation: Navigation = {
    pages: [
      { name: translations.routes.index, href: routes.index },
      { name: translations.routes.menu, href: routes.menu },
      { name: translations.routes.arrangements, href: routes.arrangements },
    ],
  };


  export default function Navbar () {

  const user = useOptionalUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      return (
        <div>
        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Luk menu</span>
                      <XIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <NavLink
                          to={page.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive ? "border-b-2 border-indigo-500" : "",
                              "-m-2 block p-2 font-medium text-gray-900"
                            )
                          }
                        >
                          {page.name}
                        </NavLink>
                      </div>
                    ))}
                  </div>

                  {/* <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                    <div className="flow-root">
                      <a
                        href="#"
                        className="block p-2 -m-2 font-medium text-gray-900"
                      >
                        Create an account
                      </a>
                    </div>
                    <div className="flow-root">
                      <a
                        href="#"
                        className="block p-2 -m-2 font-medium text-gray-900"
                      >
                        Sign in
                      </a>
                    </div>
                  </div> */}

                  {/* <CurrencySelector /> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative">
          <nav aria-label="Top">
            {/* Top navigation */}
            <TopNavigation user={user} />

            {/* Secondary navigation */}
            <div className="bg-white shadow-sm">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                      <div className="flex justify-center h-full space-x-8">
                        {navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            to={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex items-center flex-1 lg:hidden">
                    <button
                      type="button"
                      className="p-2 -ml-2 text-gray-400 bg-white rounded-md"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex items-center justify-end flex-1">
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium text-gray-700 sr-only"
                    >
                      Søg efter produkter eller arrangementer
                    </label>
                    <div className="relative flex items-center mt-1">
                      <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Søg..."
                        className="block w-full pr-12 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd className="inline-flex items-center px-2 font-sans text-sm font-medium text-gray-400 border border-gray-200 rounded">
                          ⌘K
                        </kbd>
                      </div>
                    </div>

                    <div className="flex items-center lg:ml-8">
                      {/* Cart */}
                      <div className="flow-root ml-4 lg:ml-8">
                        <CartPopover />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      )
  }
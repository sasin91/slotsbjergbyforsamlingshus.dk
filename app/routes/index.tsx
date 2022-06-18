import { Dialog, Transition } from "@headlessui/react";
import {
  AtSymbolIcon,
  MenuIcon,
  PhoneOutgoingIcon,
  XIcon,
} from "@heroicons/react/outline";
import type { Post } from "@prisma/client";
import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { marked } from "marked";
import { Fragment, useState } from "react";
import CartPopover from "~/components/CartPopover";
import Footer from "~/components/Footer";
import { IntlDate } from "~/components/IntlDate";
import TopNavigation from "~/components/TopNavigation";
import { AppName, Email, Phone } from "~/config";
import banner from "~/images/borddaekning1.jpg";
import { getPosts } from "~/models/post.server";
import { classNames, routes, translations, useOptionalUser } from "~/utils";

const navigation = {
  pages: [
    { name: translations.routes.index, href: routes.index },
    { name: translations.routes.menu, href: routes.menu },
    { name: translations.routes.arrangements, href: routes.arrangements },
  ],
};
type LoaderData = {
  posts: Post[];
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return json<LoaderData>({ posts });
};

export default function Index() {
  const user = useOptionalUser();
  const { posts } = useLoaderData<LoaderData>();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50">
      {/* Mobile Menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Luk menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <div className="mt-2">
                  {navigation.pages.map((page) => (
                    <NavLink
                      key={page.name}
                      to={page.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive ? "border-b-2 border-indigo-500" : "",
                          "flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        )
                      }
                    >
                      {page.name}
                    </NavLink>
                  ))}
                </div>
                {user ? (
                  <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                    <div className="flow-root">
                      <NavLink
                        to={routes.dashboard}
                        className={({ isActive }) =>
                          classNames(
                            isActive ? "border-b-2 border-indigo-500" : "",
                            "text-sm font-medium text-white hover:text-gray-100"
                          )
                        }
                      >
                        {translations.routes.dashboard}
                      </NavLink>
                      <Form action={routes.signOut} method="post">
                        <button
                          type="submit"
                          className="px-4 py-2 text-blue-100 rounded bg-slate-600 hover:bg-blue-500 active:bg-blue-600"
                        >
                          {translations.routes.signOut}
                        </button>
                      </Form>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                    <div className="flow-root">
                      <NavLink
                        to={routes.signUp}
                        className={({ isActive }) =>
                          classNames(
                            isActive ? "border-b-2 border-indigo-500" : "",
                            "text-sm font-medium text-white hover:text-gray-100"
                          )
                        }
                      >
                        {translations.routes.signUp}
                      </NavLink>
                    </div>
                    <div className="flow-root">
                      <NavLink
                        to={routes.signIn}
                        className={({ isActive }) =>
                          classNames(
                            isActive ? "border-b-2 border-indigo-500" : "",
                            "text-sm font-medium text-white hover:text-gray-100"
                          )
                        }
                      >
                        {translations.routes.signIn}
                      </NavLink>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src={banner}
            alt=""
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        <header className="relative z-10">
          <nav aria-label="Top">
            <TopNavigation user={user} />

            {/* Secondary Navigation */}
            <div className="bg-white ">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="hidden h-full lg:flex">
                    <div className="mt-2 ml-8">
                      <div className="flex px-4 -mb-px space-x-8">
                        {navigation.pages.map((page) => (
                          <NavLink
                            key={page.name}
                            to={page.href}
                            className={({ isActive }) =>
                              classNames(
                                isActive ? "border-b-2 border-indigo-500" : "",
                                "flex-1 whitespace-nowrap px-1 py-4 text-base font-medium text-gray-700 hover:border-b"
                              )
                            }
                          >
                            {page.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex items-center flex-1 lg:hidden">
                    <button
                      type="button"
                      className="p-2 -ml-2 text-gray-400 bg-white rounded-md"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex items-center justify-end flex-1">
                    <div className="flex items-center lg:ml-8 lg:space-x-2">
                      {/* Help */}
                      <a
                        className="p-2 text-gray-700 lg:hidden"
                        href={`tel:${Phone}`}
                      >
                        <span className="sr-only">
                          ring til Anne på 2014 4080
                        </span>
                        <PhoneOutgoingIcon className="w-6 h-6" />
                      </a>
                      <a
                        href={`tel:${Phone}`}
                        className="hidden text-sm font-medium text-gray-700 lg:flex lg:justify-evenly lg:space-x-1"
                      >
                        <PhoneOutgoingIcon className="w-6 h-6" />
                        <span>{Phone}</span>
                      </a>

                      <a
                        className="p-2 text-gray-700 lg:hidden"
                        href={`email:${Email}`}
                      >
                        <AtSymbolIcon className="w-6 h-6" />
                      </a>
                      <a
                        href={`email:${Email}`}
                        className="hidden text-sm font-medium text-gray-700 lg:flex lg:justify-evenly lg:space-x-1"
                      >
                        <AtSymbolIcon className="w-6 h-6" />
                        <span>{Email}</span>
                      </a>

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

        <div className="relative flex flex-col items-center max-w-3xl px-6 py-32 mx-auto text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
            {AppName}
          </h1>
          <p className="mt-4 text-xl text-white">
            danner rammen om mange store private fester såvel som til lokale
            arrangementer. Det er plads til 80 gæster, samt et mindre
            selskabslokale med plads til 30 gæster. Lokalerne udlejes til alle i
            forbindelse med køb af mad og drikke i Festhuset. Her tænkes
            specielt fester, møder, kurser, generalforsamlinger, receptioner,
            begravelsesarrangementer, barnedåb, take-away - ja hvad som helst!
            Anne Mortensen er klar med råd og vejledning, så man sammen kan
            udfærdige forslag til netop dit kommende arrangement! Huset ligger i
            et smukt og aktivt lokalområde, tæt på Slagelse bygrænse, motorvej
            og bus. Brug vores online booking - eller{" "}
            <a href="tel:+4520144080">ring til Anne på 2014 4080</a>{" "}
            <a href="mailto:kontakt@slotsbjergbyfesthus.dk">
              Email: kontakt@slotsbjergbyfesthus.dk
            </a>
          </p>
        </div>
      </div>

      <main>
        <section aria-labelledby="trending-heading">
          <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
            <div className="md:flex md:items-center md:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-extrabold tracking-tight text-gray-900"
              >
                {translations.routes.news}
              </h2>
              <Link
                to={routes.news}
                className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
              >
                Flere nyheder<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>

            <div className="px-4 pt-16 pb-20 bg-white sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
              <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
                <div className="grid gap-16 pt-10 mt-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
                  {posts.map((post) => (
                    <div key={post.title}>
                      <p className="text-sm text-gray-500">
                        <IntlDate date={post.createdAt} />
                      </p>
                      <div className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">
                          {post.title}
                        </p>
                        <div
                          className="mt-3 text-base text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: marked(post.markdown),
                          }}
                        ></div>
                      </div>
                      <div className="mt-3">
                        <Link
                          to={`/posts/${post.slug}`}
                          className="text-base font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          læs hele artiklen
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

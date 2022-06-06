import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  AtSymbolIcon,
  MenuIcon,
  PhoneOutgoingIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import type { Category, Post } from "@prisma/client";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { marked } from "marked";
import React, { Fragment, useState } from "react";
import { IntlDate } from "~/components/IntlDate";
import takeAway from "~/images/annemedkolde.jpg";
import dinnerParty from "~/images/borddaekning1.jpg";
import cakes from "~/images/fotokager.jpg";
import banner from "~/images/borddaekning1.jpg";
import { getPosts } from "~/models/post.server";
import { useOptionalUser, routes, translations } from "~/utils";
import Footer from "~/components/Footer";
import { AppName, Email, Phone } from "~/config";
import { getCategories } from "~/models/category.server";

const collections = [
  {
    name: "Take away",
    featured: [
      {
        name: "Take away",
        href: routes.order,
        imageSrc: takeAway,
        imageAlt: "Anne med ”Take Away”",
        description:
          "Anne laver også den lækreste ”Take Away” mad og har mange tilbud for alle Slots Bjergby borgere - og alle andre selvfølgelig! Derfor, hold øje med Annes hjemmeside – og endelig lad dig friste over evne!",
      },
      {
        name: "Kager ud af huset",
        href: routes.order,
        imageSrc: cakes,
        imageAlt: "Kage kollage",
        description: "Anne er altid klar til at lave din egne personlige kage.",
      },
    ],
  },
  {
    name: "Book festhuset",
    featured: [
      {
        name: "Hold dit arrangement hos os",
        href: routes.book,
        imageSrc: dinnerParty,
        imageAlt: "Festlige omgivelser",
        description:
          "Vi sørger for de beste omgivelser for dit møde eller arrangement",
      },
      {
        name: "En fest hos os?",
        href: routes.book,
        imageSrc: dinnerParty,
        imageAlt: "Festlige omgivelser",
        description:
          "Lad os stå for en uforglemmelig dag i festlige omgivelser",
      },
    ],
  },
];

const navigation: { categories: { name: string; href: string }[] } = {
  categories: [
    // {
    //   name: "Arrangementer",
    //   featured: [
    //     { name: "Casual", href: "#" },
    //     { name: "Boxers", href: "#" },
    //     { name: "Outdoor", href: "#" },
    //   ],
    //   collection: [
    //     { name: "Everything", href: "#" },
    //     { name: "Core", href: "#" },
    //     { name: "New Arrivals", href: "#" },
    //     { name: "Sale", href: "#" },
    //   ],
    //   categories: [
    //     { name: "Artwork Tees", href: "#" },
    //     { name: "Pants", href: "#" },
    //     { name: "Accessories", href: "#" },
    //     { name: "Boxers", href: "#" },
    //     { name: "Basic Tees", href: "#" },
    //   ],
    //   brands: [
    //     { name: "Significant Other", href: "#" },
    //     { name: "My Way", href: "#" },
    //     { name: "Counterfeit", href: "#" },
    //     { name: "Re-Arranged", href: "#" },
    //     { name: "Full Nelson", href: "#" },
    //   ],
    // },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type LoaderData = {
  posts: Post[];
  categories: Category[];
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  const categories = await getCategories();

  return json<LoaderData>({ posts, categories });
};

export default function Index() {
  const user = useOptionalUser();
  const { posts, categories } = useLoaderData<LoaderData>();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  navigation.categories.push(
    ...categories.map((category) => ({
      name: category.title,
      href: `/menu-kort/${category.slug}`,
    }))
  );

  return (
    <div className="bg-gray-50">
      {/* Mobile menu */}
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
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="flex px-4 -mb-px space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category, categoryIdx) => (
                      <Tab.Panel
                        key={category.name}
                        className="px-4 pt-10 pb-6 space-y-12"
                      >
                        <div className="grid items-start grid-cols-1 gap-y-10 gap-x-6">
                          <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                            <div>
                              <p
                                id={`mobile-take-away-heading-${categoryIdx}`}
                                className="font-medium text-gray-900"
                              >
                                Take Away
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`mobile-take-away-heading-${categoryIdx}`}
                                className="mt-6 space-y-6"
                              >
                                {category.takeAway.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a
                                      href={item.href}
                                      className="text-gray-500"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p
                                id="mobile-categories-heading"
                                className="font-medium text-gray-900"
                              >
                                Categories
                              </p>
                              <ul
                                role="list"
                                aria-labelledby="mobile-categories-heading"
                                className="mt-6 space-y-6"
                              >
                                {category.categories.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a
                                      href={item.href}
                                      className="text-gray-500"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-y-10 gap-x-6">
                            <div>
                              <p
                                id="mobile-collection-heading"
                                className="font-medium text-gray-900"
                              >
                                Collection
                              </p>
                              <ul
                                role="list"
                                aria-labelledby="mobile-collection-heading"
                                className="mt-6 space-y-6"
                              >
                                {category.collection.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a
                                      href={item.href}
                                      className="text-gray-500"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p
                                id="mobile-brand-heading"
                                className="font-medium text-gray-900"
                              >
                                Brands
                              </p>
                              <ul
                                role="list"
                                aria-labelledby="mobile-brand-heading"
                                className="mt-6 space-y-6"
                              >
                                {category.brands.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a
                                      href={item.href}
                                      className="text-gray-500"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
                {user ? (
                  <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                    <div className="flow-root">
                      <Link
                        to={routes.dashboard}
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        {translations.routes.dashboard}
                      </Link>
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
                      <Link
                        to={routes.signUp}
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        {translations.routes.signUp}
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        to={routes.signIn}
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        {translations.routes.signIn}
                      </Link>
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
            {/* Top navigation */}
            <div className="bg-gray-900">
              <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Spacer */}
                <div>&nbsp;</div>

                <div className="flex items-center space-x-6">
                  {user ? (
                    <React.Fragment>
                      <Link
                        to={routes.dashboard}
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        {translations.routes.dashboard}
                      </Link>
                      <Form action={routes.signOut} method="post">
                        <button
                          type="submit"
                          className="px-4 py-2 text-blue-100 rounded bg-slate-600 hover:bg-blue-500 active:bg-blue-600"
                        >
                          {translations.routes.signOut}
                        </button>
                      </Form>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Link
                        to={routes.signIn}
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        {translations.routes.signIn}
                      </Link>
                      <Link
                        to={routes.signUp}
                        className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        {translations.routes.signUp}
                      </Link>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>

            {/* Secondary navigation */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    <Popover.Group className="ml-8">
                      <div className="flex justify-center h-full space-x-8">
                        {navigation.categories.map((category, categoryIdx) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? "border-white text-white"
                                        : "border-transparent text-white",
                                      "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                    )}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 text-gray-500 top-full sm:text-sm">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div
                                      className="absolute inset-0 bg-white shadow top-1/2"
                                      aria-hidden="true"
                                    />

                                    <div className="relative bg-white">
                                      <div className="px-8 mx-auto max-w-7xl">
                                        <div className="grid items-start grid-cols-2 pt-10 pb-12 gap-y-10 gap-x-8">
                                          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                                            <div>
                                              <p
                                                id={`desktop-featured-heading-${categoryIdx}`}
                                                className="font-medium text-gray-900"
                                              >
                                                Featured
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.takeAway.map(
                                                  (item) => (
                                                    <li
                                                      key={item.name}
                                                      className="flex"
                                                    >
                                                      <a
                                                        href={item.href}
                                                        className="hover:text-gray-800"
                                                      >
                                                        {item.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                            <div>
                                              <p
                                                id="desktop-categories-heading"
                                                className="font-medium text-gray-900"
                                              >
                                                Categories
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-categories-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.categories.map(
                                                  (item) => (
                                                    <li
                                                      key={item.name}
                                                      className="flex"
                                                    >
                                                      <a
                                                        href={item.href}
                                                        className="hover:text-gray-800"
                                                      >
                                                        {item.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                                            <div>
                                              <p
                                                id="desktop-collection-heading"
                                                className="font-medium text-gray-900"
                                              >
                                                Collection
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-collection-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.collection.map(
                                                  (item) => (
                                                    <li
                                                      key={item.name}
                                                      className="flex"
                                                    >
                                                      <a
                                                        href={item.href}
                                                        className="hover:text-gray-800"
                                                      >
                                                        {item.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </div>

                                            <div>
                                              <p
                                                id="desktop-brand-heading"
                                                className="font-medium text-gray-900"
                                              >
                                                Brands
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-brand-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.brands.map((item) => (
                                                  <li
                                                    key={item.name}
                                                    className="flex"
                                                  >
                                                    <a
                                                      href={item.href}
                                                      className="hover:text-gray-800"
                                                    >
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}
                      </div>
                    </Popover.Group>
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
                        className="p-2 text-white lg:hidden"
                        href={`tel:${Phone}`}
                      >
                        <span className="sr-only">
                          ring til Anne på 2014 4080
                        </span>
                        <PhoneOutgoingIcon className="w-6 h-6" />
                      </a>
                      <a
                        href={`tel:${Phone}`}
                        className="hidden text-sm font-medium text-white lg:flex lg:justify-evenly lg:space-x-1"
                      >
                        <PhoneOutgoingIcon className="w-6 h-6" />
                        <span>{Phone}</span>
                      </a>

                      <a
                        className="p-2 text-white lg:hidden"
                        href={`email:${Email}`}
                      >
                        <AtSymbolIcon className="w-6 h-6" />
                      </a>
                      <a
                        href={`email:${Email}`}
                        className="hidden text-sm font-medium text-white lg:flex lg:justify-evenly lg:space-x-1"
                      >
                        <AtSymbolIcon className="w-6 h-6" />
                        <span>{Email}</span>
                      </a>

                      {/* Cart */}
                      <div className="flow-root ml-4 lg:ml-8">
                        <button
                          onClick={() => setCartOpen(!cartOpen)}
                          className="flex items-center p-2 -m-2 group"
                        >
                          <ShoppingBagIcon
                            className="flex-shrink-0 w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-white">
                            0
                          </span>
                          <span className="sr-only">Varer i indkøbskurv</span>
                        </button>
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
        {/* Collection section */}
        {collections.map((category) => (
          <section
            key={category.name}
            aria-labelledby="collection-heading"
            className="max-w-xl px-4 pt-24 mx-auto sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
          >
            <h2
              id="collection-heading"
              className="text-2xl font-extrabold tracking-tight text-gray-900"
            >
              {category.name}
            </h2>

            <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
              {category.featured.map((collection) => (
                <a
                  key={collection.name}
                  href={collection.href}
                  className="block group"
                >
                  <div
                    aria-hidden="true"
                    className="overflow-hidden rounded-lg aspect-w-3 aspect-h-2 group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
                  >
                    <img
                      src={collection.imageSrc}
                      alt={collection.imageAlt}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {collection.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ))}

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
                      <Link to={post.slug} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">
                          {post.title}
                        </p>
                        <div
                          className="mt-3 text-base text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: marked(post.markdown),
                          }}
                        ></div>
                      </Link>
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

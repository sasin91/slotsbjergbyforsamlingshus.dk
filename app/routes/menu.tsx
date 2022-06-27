import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition
} from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import type { Product } from "@prisma/client";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Fragment, useState } from "react";
import Footer from "~/components/Footer";
import { IntlMoney } from "~/components/IntlMoney";
import Navbar from "~/components/Navbar";
import { getCategories } from "~/models/category.server";
import { getProducts } from "~/models/product.server";
import { classNames } from "~/utils";

type FilterId = "category";
type FilterOption = {
  checked: boolean;
  value: string;
  label: string;
};
type Filter = {
  id: FilterId;
  name: string;
  options: FilterOption[];
};

type LoaderData = {
  filters: Filter[];
  products: Product[];
};

const sortOptions = [
  { name: "Most Popular", href: "#" },
  { name: "Best Rating", href: "#" },
  { name: "Newest", href: "#" },
  { name: "Price: Low to High", href: "#" },
  { name: "Price: High to Low", href: "#" },
];

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const categoryDataLoader = getCategories();
  const categories = await categoryDataLoader({
    select: { title: true, slug: true },
  });

  const productDataLoader = getProducts();
  const products = search.has("category[]")
    ? await productDataLoader({
        where: {
          categories: {
            some: {
              categoryId: {
                in: search.getAll("category[]"),
              },
            },
          },
        },
        take: 15,
      })
    : await productDataLoader({
        take: 15,
      });

  const filterOptions: FilterOption[] = categories.map(({ title, slug }) => ({
    checked: search.getAll("category[]").includes(slug),
    label: title,
    value: slug,
  }));

  const filters: Filter[] = [
    {
      id: "category",
      name: "Produkt kategori",
      options: filterOptions,
    },
  ];

  return json<LoaderData>({ products, filters });
};

export default function MenuPage() {
  const { products, filters } = useLoaderData<LoaderData>();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-gray-50">
      <Navbar />

      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 sm:hidden"
            onClose={setMobileFiltersOpen}
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filtrer produkter
                    </h2>
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Luk menu</span>
                      <XIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <Form className="mt-4" action="" method="get">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.name}
                        className="px-4 py-6 border-t border-gray-200"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="flow-root -mx-2 -my-3">
                              <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-sm text-gray-400 bg-white">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="flex items-center ml-6">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </Form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main>
          <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-24 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                Minimum 10 kuverter.
              </h1>
              {/* <p className="max-w-3xl mx-auto mt-4 text-base text-gray-500">
                Thoughtfully designed objects for the workspace, home, and
                travel.
              </p> */}
            </div>

            {/* Filters */}
            <section
              aria-labelledby="filter-heading"
              className="pt-6 border-t border-gray-200"
            >
              <h2 id="filter-heading" className="sr-only">
                Produkt filtre
              </h2>

              <div className="flex items-center justify-between">
                <Menu as="div" className="relative z-10 inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                      Sorter
                      <ChevronDownIcon
                        className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-0 z-10 w-40 mt-2 origin-top-left bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm font-medium text-gray-900"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  Filtrér
                </button>

                <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
                  {filters.map((section, sectionIdx) => (
                    <Popover
                      as="div"
                      key={section.name}
                      id="menu"
                      className="relative z-10 inline-block text-left"
                    >
                      <div>
                        <Popover.Button className="inline-flex items-center justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                          <span>{section.name}</span>
                          <span className="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700">
                            {
                              section.options.filter((opt) => opt.checked)
                                .length
                            }
                          </span>
                          <ChevronDownIcon
                            className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Popover.Panel className="absolute right-0 p-4 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Form className="space-y-4" action="" method="get">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  type="checkbox"
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="pr-6 ml-3 text-sm font-medium text-gray-900 whitespace-nowrap"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}

                            <button
                              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400"
                              type="submit"
                            >
                              Filtrér
                            </button>
                          </Form>
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </Popover.Group>
              </div>
            </section>

            {/* Product grid */}
            <section aria-labelledby="products-heading" className="mt-8">
              <h2 id="products-heading" className="sr-only">
                Produkter
              </h2>

              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    to={`/produkt/${product.slug}`}
                    className="group"
                  >
                    <div className="w-full overflow-hidden rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3">
                      <img
                        src={
                          product.imageSrc
                            ? product.imageSrc
                            : "https://via.placeholder.com/384x576"
                        }
                        alt={String(product.imageAlt)}
                        className="object-cover object-center w-full h-full group-hover:opacity-75"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-4 text-base font-medium text-gray-900">
                      <h3>{product.title}</h3>
                      <IntlMoney>{product.priceInDKK}</IntlMoney>
                    </div>
                    <p className="mt-1 text-sm italic text-gray-500">
                      {product.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

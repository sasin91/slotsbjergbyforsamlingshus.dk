/* This example requires Tailwind CSS v2.0+ */
import { Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { Link } from "@remix-run/react";
import { Fragment } from "react";
import { routes, translations } from "~/utils";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function Cart() {
  return (
    <Popover className="flow-root ml-4 text-sm lg:relative lg:ml-8">
      <Popover.Button className="flex items-center p-2 -m-2 group">
        <ShoppingBagIcon
          className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
        <span className="sr-only">Varer i indkøbskurv</span>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
          <h2 className="sr-only">Indkøbskurv</h2>

          <form className="max-w-2xl px-4 mx-auto">
            <ul role="list" className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex items-center py-6">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="flex-none w-16 h-16 border border-gray-200 rounded-md"
                  />
                  <div className="flex-auto ml-4">
                    <h3 className="font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p className="text-gray-500">{product.color}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to={routes.checkout}
              className="w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Til {translations.routes.checkout}
            </Link>

            {/* <p className="mt-6 text-center">
              <a
                href="#"
                className="text-sm font-medium text-rose-600 hover:text-rose-500"
              >
                View Shopping Bag
              </a>
            </p> */}
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

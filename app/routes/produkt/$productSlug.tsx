import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import Navbar from "~/components/Navbar";
import type { Product } from "~/models/product.server";
import { getProduct } from "~/models/product.server";
import { classNames } from "~/utils";
type LoaderData = {
    product: Product|null
}

export const loader: LoaderFunction = async ({ request, params}) => {
    if (!params.productSlug || String(params.productSlug) === "") {
        return redirect('404')
    }

    const slug = String(params.productSlug)

    const product = await getProduct(slug)

    if (!product) {
        return redirect('404')
    }
    
    return json<LoaderData>({ product })
}

export default function ProductPage() {
    const { product } = useLoaderData()

    return (
        <div className="bg-gray-50">
            <Navbar />

            <main className="mx-auto max-w-7xl sm:pt-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                <Tab
                      key="0"
                      className="relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{product.imageAlt}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img src={                    product.imageSrc
                            ? product.imageSrc
                            : "https://via.placeholder.com/384x576"} alt={product.imageAlt} className="object-cover object-center w-full h-full" />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                </Tab.List>
              </div>

              <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              <Tab.Panel key="0">
                    <img
                      src={                    product.imageSrc
                        ? product.imageSrc
                        : "https://via.placeholder.com/384x576"}
                      alt={product.imageAlt}
                      className="object-cover object-center w-full h-full sm:rounded-lg"
                    />
                  </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="px-4 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Produkt information</h2>
                <p className="text-3xl text-gray-900">{product.price}</p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} ud af 5 stjerner</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Beskrivelse</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
{/* 
              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="border-t divide-y divide-gray-200">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="relative flex items-center justify-between w-full py-6 text-left group">
                              <span
                                className={classNames(
                                  open ? 'text-indigo-600' : 'text-gray-900',
                                  'text-sm font-medium'
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="flex items-center ml-6">
                                {open ? (
                                  <MinusSmIcon
                                    className="block w-6 h-6 text-indigo-400 group-hover:text-indigo-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block w-6 h-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel as="div" className="pb-6 prose-sm prose">
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section> */}
            </div>
          </div>

          {/* <section aria-labelledby="related-heading" className="px-4 py-16 mt-10 border-t border-gray-200 sm:px-0">
            <h2 id="related-heading" className="text-xl font-bold text-gray-900">
              Customers also bought
            </h2>

            <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((product) => (
                <div key={product.id}>
                  <div className="relative">
                    <div className="relative w-full overflow-hidden rounded-lg h-72">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 opacity-50 h-36 bg-gradient-to-t from-black"
                      />
                      <p className="relative text-lg font-semibold text-white">{product.price}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <a
                      href={product.href}
                      className="relative flex items-center justify-center px-8 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200"
                    >
                      Add to bag<span className="sr-only">, {product.name}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section> */}
        </div>
      </main>

        </div>
    )
}
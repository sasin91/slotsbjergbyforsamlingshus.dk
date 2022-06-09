import type { User } from "@prisma/client";
import { Link, Form } from "@remix-run/react";
import { Fragment } from "react";
import { routes, translations } from "~/utils";

export default function TopNavigation({ user }: { user: User | undefined }) {
  return (
    <div className="bg-gray-900">
      <div className="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Spacer */}
        <div>&nbsp;</div>

        <div className="flex items-center space-x-6">
          {user ? (
            <Fragment>
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
            </Fragment>
          ) : (
            <Fragment>
              <Link
                to={routes.signUp}
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                {translations.routes.signUp}
              </Link>
              <Link
                to={routes.signIn}
                className="text-sm font-medium text-white hover:text-gray-100"
              >
                {translations.routes.signIn}
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

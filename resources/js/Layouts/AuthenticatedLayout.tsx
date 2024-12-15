import { usePage } from '@inertiajs/react'
import { PropsWithChildren, ReactNode, useState } from 'react'

export default function Authenticated({
  header,
  children,
}: PropsWithChildren<{ header?: ReactNode }>) {
  const user = usePage().props.auth.user

  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false)

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900'>
      <nav className='border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 justify-between'>
            <div className='-me-2 flex items-center sm:hidden'>
              <button
                onClick={() =>
                  setShowingNavigationDropdown(previousState => !previousState)
                }
                className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400'
              >
                <svg
                  className='h-6 w-6'
                  stroke='currentColor'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    className={
                      !showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                  <path
                    className={
                      showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'
          }
        >
          <div className='border-t border-gray-200 pb-1 pt-4 dark:border-gray-600'>
            <div className='px-4'>
              <div className='text-base font-medium text-gray-800 dark:text-gray-200'>
                {user.name}
              </div>
              <div className='text-sm font-medium text-gray-500'>
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  )
}

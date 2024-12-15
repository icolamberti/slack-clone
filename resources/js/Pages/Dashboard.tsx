import { Button } from '@/Components/Ui/button'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

export default function Dashboard() {
  return (
    <AuthenticatedLayout
      header={
        <h2 className='text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200'>
          Dashboard
        </h2>
      }
    >
      <Head title='Dashboard' />

      <div className='py-12'>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800'>
            <div className='p-6 text-gray-900 dark:text-gray-100'>
              You're logged in!
            </div>

            <Link href='/logout' method='post'>
              <Button>Logout</Button>
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

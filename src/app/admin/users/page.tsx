import db from "@/db/db"
import PageHeader from "../_components/PageHeader"


function AdminCustomersPage() {
  return (
  <>
    <PageHeader>Customers</PageHeader>
    <CustomersTable></CustomersTable>
  </>
  )
}

async function CustomersTable() {
  const customers = await db.user.findMany({
    select: {
      id: true,
      email: true,
      _count: {select: {orders: true}}
    },
    orderBy: {id: "asc"}
  })

  if (customers.length === 0) return <p>No customers</p>

  return (
    <>
      Aqui va la tabla
    </>
  )
}

export default AdminCustomersPage
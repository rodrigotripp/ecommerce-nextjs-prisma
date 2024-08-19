import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import db from "@/db/db"
import { formatNumber, formatCurrency } from "@/lib/formatters"

//Data from DB 
async function getSalesData() {
  const data = db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  })

  return { amount: ((await data)._sum.pricePaidInCents || 0) / 100, numberOfSales: (await data)._count }
}

//Data from DB 
async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ])

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  }
}

//Data from DB 
async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ])

  return { activeCount, inactiveCount }
}

export default async function AdminDashboard() {

  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData() 
  ])

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <DashboardCard title={"Sales"} subtitle={formatNumber(salesData.numberOfSales)} body={formatCurrency(salesData.amount)}></DashboardCard>
    <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average Value`}
        body={formatNumber(userData.userCount)}
      />
    <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
  </div>
}

type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
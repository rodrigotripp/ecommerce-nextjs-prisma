import db from "@/db/db"
import ProductGridSection from "./_components/_home/ProductGridSection"

function getPopularProducts() {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: { orders: {_count: "desc"} },
    take: 6
  })
}

function getNewestProducts() {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: { createdAt: "desc" },
    take: 6
  })
}

function HomePage() {
  return (
    <main className="space-y-12">HomePage
      <ProductGridSection productsFetcher={getPopularProducts} title="Popular"/>
      <ProductGridSection productsFetcher={getNewestProducts} title="Newest"/>
    </main>
  )
}



export default HomePage
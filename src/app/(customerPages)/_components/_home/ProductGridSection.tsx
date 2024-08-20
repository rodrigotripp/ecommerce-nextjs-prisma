import ProductSuspense, { ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import { Suspense } from "react"
import Link from "next/link"

type ProductGRidSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
}

async function ProductGridSection({ productsFetcher, title }: ProductGRidSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3x1 fontbold">
          {title}
        </h2>
        <Button variant="outline" className="space-x-2" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4"></ArrowRight>
          </Link>
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductSuspense productsFetcher={productsFetcher} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductGridSection
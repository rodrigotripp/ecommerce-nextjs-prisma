import { formatCurrency } from "@/lib/formatters"
import { Card, CardDescription, CardHeader, CardTitle,CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Product } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"

type ProductCardProps = {
  id: string,
  name: string,
  priceInCents: number,
  description: string,
  imagePath: string
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}

function ProductCard({id, name, priceInCents, description, imagePath}: ProductCardProps) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-square">
        <Image src={imagePath} fill alt={name}/>
      </div>
      <CardHeader>
        <CardTitle>
          {name}
        </CardTitle>
        <CardDescription>
          {formatCurrency(priceInCents/100)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {description}
      </CardContent>
      <CardFooter>
        <Button asChild size='lg' className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  return (await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product} />
  ))
}

export default ProductSuspense